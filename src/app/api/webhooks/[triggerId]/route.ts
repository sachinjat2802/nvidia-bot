import { NextRequest, NextResponse } from 'next/server';
import { SupabaseWorkflowService } from '@/lib/supabase';
import { WorkflowEngine } from '@/workflow-engine';
import { NVIDIAClient } from '@/nvidia-client';
import { loadConfig } from '@/config';
import { validate, TriggerSchema, formatValidationErrors } from '@/lib/validation';
import { createHmac, timingSafeEqual } from 'crypto';

// POST /api/webhooks/[triggerId] - Trigger workflow via webhook
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ triggerId: string }> }
) {
    try {
        const { triggerId } = await params;

        // Validate triggerId
        if (!triggerId || typeof triggerId !== 'string') {
            return NextResponse.json({ error: 'Invalid trigger ID' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService();
        const trigger = await service.getTrigger(triggerId);

        if (!trigger) {
            return NextResponse.json({ error: 'Trigger not found' }, { status: 404 });
        }

        if (!trigger.is_active) {
            return NextResponse.json({ error: 'Trigger is disabled' }, { status: 400 });
        }

        // Read the raw body first
        const body = await req.text();
        let payload: any;

        // Verify webhook signature if secret is configured
        if (trigger.config?.secret) {
            const signature = req.headers.get('x-webhook-signature');
            if (!signature) {
                return NextResponse.json({ error: 'Missing signature header' }, { status: 401 });
            }

            const expectedSignature = 'sha256=' + createHmac('sha256', trigger.config.secret)
                .update(body)
                .digest('hex');

            if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }

            // Parse the body after verification
            try {
                payload = JSON.parse(body);
            } catch (error: any) {
                return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
            }
        } else {
            // No signature verification required
            try {
                payload = JSON.parse(body);
            } catch (error: any) {
                return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
            }
        }

        // Get workflow
        const workflowRecord = await service.getWorkflow(trigger.workflow_id);
        if (!workflowRecord) {
            return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
        }

        const workflow = workflowRecord.definition;

        // Validate payload against trigger config schema if defined
        if (trigger.config?.schema) {
            const { data, errors } = validate(trigger.config.schema, payload);
            if (errors) {
                return NextResponse.json(
                    { error: 'Invalid payload', details: formatValidationErrors(errors) },
                    { status: 400 }
                );
            }
            payload = data;
        }

        // Initialize engine
        const config = loadConfig();
        const nvidiaClient = new NVIDIAClient(config);

        // Create service with the workflow owner's user_id
        const userService = new SupabaseWorkflowService(workflowRecord.user_id);
        const engine = new WorkflowEngine(nvidiaClient, {
            supabaseService: userService
        });

        // Load integrations
        const integrations = await userService.listIntegrations();
        await engine.setIntegrations(integrations);

        // Create execution record
        const executionRecord = await userService.createExecution({
            workflowId: workflowRecord.id,
            workflowVersion: workflowRecord.version,
            status: 'running',
            inputContext: payload,
            startedAt: new Date(),
        });

        // Mark trigger as fired
        await service.markTriggerFired(triggerId);

        // Execute workflow
        try {
            const execution = await engine.execute(workflow, payload);

            // Update execution record
            await userService.updateExecution(executionRecord.id, {
                status: execution.status,
                output_context: execution.outputContext,
                step_results: execution.stepResults,
                completed_at: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true,
                execution: {
                    id: executionRecord.id,
                    status: execution.status,
                    stepResults: execution.stepResults,
                }
            });
        } catch (executionError: any) {
            // Update execution record with error
            await userService.updateExecution(executionRecord.id, {
                status: 'failed',
                error: executionError.message,
                completed_at: new Date().toISOString(),
            });

            return NextResponse.json({
                success: false,
                error: executionError.message,
                execution: { id: executionRecord.id, status: 'failed' }
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Webhook execution error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET /api/webhooks/[triggerId] - Get trigger info (for debugging)
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ triggerId: string }> }
) {
    try {
        const { triggerId } = await params;

        const service = new SupabaseWorkflowService();
        const trigger = await service.getTrigger(triggerId);

        if (!trigger) {
            return NextResponse.json({ error: 'Trigger not found' }, { status: 404 });
        }

        // Get workflow name
        const workflowRecord = await service.getWorkflow(trigger.workflow_id);

        return NextResponse.json({
            trigger,
            workflow: {
                id: trigger.workflow_id,
                name: workflowRecord?.name,
            }
        });
    } catch (error: any) {
        console.error('GET webhook info error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}