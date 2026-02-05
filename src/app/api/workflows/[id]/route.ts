import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SupabaseWorkflowService } from '@/lib/supabase';
import { auditLogger } from '@/lib/audit-logger';
import { authOptions } from '@/lib/auth-options';

// GET /api/workflows/[id] - Get specific workflow
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const service = new SupabaseWorkflowService(session.user.id);
        const workflow = await service.getWorkflow(id);

        if (!workflow) {
            return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
        }

        await auditLogger.logApiCall(
            session.user.id,
            `/api/workflows/${id}`,
            'GET',
            200,
            0,
            { workflowId: id }
        );

        return NextResponse.json({ workflow });
    } catch (error: any) {
        console.error('GET /api/workflows/[id] error:', error);
        const session = await getServerSession(authOptions);
        if (session?.user?.id) {
            await auditLogger.logApiCall(
                session.user.id,
                `/api/workflows/${(await params).id}`,
                'GET',
                500,
                0,
                { error: error.message }
            );
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT /api/workflows/[id] - Update workflow
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const workflow = await req.json();

        if (!workflow) {
            return NextResponse.json({ error: 'Workflow data required' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const updatedWorkflow = await service.updateWorkflow(id, workflow);

        await auditLogger.logApiCall(
            session.user.id,
            `/api/workflows/${id}`,
            'PUT',
            200,
            0,
            { workflowId: id, name: workflow.name }
        );

        return NextResponse.json({
            workflow: updatedWorkflow,
            message: 'Workflow updated successfully'
        });
    } catch (error: any) {
        console.error('PUT /api/workflows/[id] error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/workflows/[id] - Delete workflow
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const service = new SupabaseWorkflowService(session.user.id);
        await service.deleteWorkflow(id);

        await auditLogger.logApiCall(
            session.user.id,
            `/api/workflows/${id}`,
            'DELETE',
            200,
            0,
            { workflowId: id }
        );

        return NextResponse.json({ message: 'Workflow deleted successfully' });
    } catch (error: any) {
        console.error('DELETE /api/workflows/[id] error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/workflows/[id]/execute - Execute workflow
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { input = {} } = await req.json();

        const service = new SupabaseWorkflowService(session.user.id);
        const workflow = await service.getWorkflow(id);

        if (!workflow) {
            return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
        }

        const { WorkflowEngine } = await import('@/workflow-engine');
        const { NVIDIAClient } = await import('@/nvidia-client');
        const { loadConfig } = await import('@/config');

        const config = loadConfig();
        const nvidiaClient = new NVIDIAClient(config);
        const engine = new WorkflowEngine(nvidiaClient, {
            supabaseService: service
        });

        // Load integrations
        const integrations = await service.listIntegrations();
        await engine.setIntegrations(integrations);

        // Create execution record
        const executionRecord = await service.createExecution({
            workflowId: workflow.id,
            workflowVersion: workflow.version,
            status: 'running',
            inputContext: input,
            startedAt: new Date(),
        });

        // Execute workflow
        const execution = await engine.execute(workflow.definition, input);

        await auditLogger.logApiCall(
            session.user.id,
            `/api/workflows/${id}/execute`,
            'POST',
            200,
            0,
            { workflowId: id, executionId: executionRecord.id, status: execution.status }
        );

        return NextResponse.json({
            execution,
            message: 'Workflow executed successfully'
        });
    } catch (error: any) {
        console.error('POST /api/workflows/[id]/execute error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}