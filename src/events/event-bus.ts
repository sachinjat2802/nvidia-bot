import { EventEmitter } from 'events';
import { Event, Trigger, EventHandler } from './types';
import { WorkflowEngine } from '../workflow-engine';
import { WorkflowDefinition } from '../workflow';
import { SupabaseWorkflowService } from '../lib/supabase';
import { NVIDIAClient } from '../nvidia-client';
import { loadConfig } from '../config';

export class EventBus extends EventEmitter {
    private handlers: EventHandler[] = [];
    private triggers: Map<string, Trigger> = new Map();
    private workflowEngine: WorkflowEngine;
    private workflowService?: SupabaseWorkflowService;
    private nvidiaClient?: any;

    constructor(workflowEngine: WorkflowEngine, options?: { workflowService?: SupabaseWorkflowService; nvidiaClient?: any }) {
        super();
        this.workflowEngine = workflowEngine;
        this.workflowService = options?.workflowService;
        this.nvidiaClient = options?.nvidiaClient;

        // Default handler: Check triggers and execute workflows
        this.on('event', async (event: Event) => {
            console.log(`[EventBus] Received event: ${event.type} from ${event.source}`);
            await this.processEvent(event);
        });
    }

    public emitEvent(event: Event): void {
        this.emit('event', event);
    }

    public registerTrigger(trigger: Trigger): void {
        this.triggers.set(trigger.id, trigger);
        console.log(`[EventBus] Registered trigger: ${trigger.id} (${trigger.type}) -> Workflow ${trigger.workflowId}`);
    }

    public async initializeWithService(service: SupabaseWorkflowService, nvidiaClient?: any): Promise<void> {
        this.workflowService = service;
        this.nvidiaClient = nvidiaClient;
        console.log('[EventBus] Initialized with workflow service and NVIDIA client');
    }

    private async processEvent(event: Event): Promise<void> {
        // Find triggers that match this event
        for (const trigger of this.triggers.values()) {
            if (!trigger.isActive) continue;

            if (this.matches(trigger, event)) {
                console.log(`[EventBus] Event matched trigger ${trigger.id}. Executing Workflow ${trigger.workflowId}`);
                await this.executeWorkflow(trigger.workflowId, event);
            }
        }
    }

    private matches(trigger: Trigger, event: Event): boolean {
        if (trigger.type === 'webhook' && event.type === 'webhook') {
            // Check if the webhook source/id matches the trigger ID
            // Simple mapping: Webhook requests to /api/webhooks/:id maps to trigger.id
            return event.source === trigger.id;
        }

        if (trigger.type === 'schedule' && event.type === 'schedule') {
            // Schedule events payload usually contains the trigger ID
            return event.payload?.triggerId === trigger.id;
        }

        return false;
    }

    private async executeWorkflow(workflowId: string, event: Event): Promise<void> {
        try {
            if (!this.workflowService) {
                throw new Error('Workflow service not initialized. Call initializeWithService() first.');
            }

            // Fetch the workflow definition from the database
            const workflowRecord = await this.workflowService.getWorkflow(workflowId);
            if (!workflowRecord) {
                console.error(`[EventBus] Workflow not found: ${workflowId}`);
                return;
            }

            if (!workflowRecord.is_active) {
                console.log(`[EventBus] Workflow ${workflowId} is not active, skipping`);
                return;
            }

            const workflow = workflowRecord.definition;

            // Prepare input context from event
            const inputContext: Record<string, any> = {
                event: {
                    type: event.type,
                    source: event.source,
                    payload: event.payload,
                    timestamp: event.timestamp,
                },
                ...event.payload, // Flatten payload for easy access
            };

            // Initialize engine if not already done
            if (!this.nvidiaClient) {
                const config = loadConfig();
                this.nvidiaClient = new (await import('../nvidia-client')).NVIDIAClient(config);
            }

            // Create service with the workflow owner's user_id
            const userService = new SupabaseWorkflowService(workflowRecord.user_id);
            const engine = new WorkflowEngine(this.nvidiaClient, {
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
                inputContext: inputContext,
                startedAt: new Date(),
            });

            console.log(`[EventBus] Executing workflow ${workflowId} (${workflowRecord.name}) with engine`);

            // Execute workflow
            try {
                const execution = await engine.execute(workflow, inputContext);

                // Update execution record
                await userService.updateExecution(executionRecord.id, {
                    status: execution.status,
                    output_context: execution.outputContext,
                    step_results: execution.stepResults,
                    completed_at: new Date().toISOString(),
                });

                // Increment workflow execution count
                await userService.incrementWorkflowExecution(workflowRecord.id);

                console.log(`[EventBus] Workflow ${workflowId} completed with status: ${execution.status}`);

                // Emit completion event
                this.emit('workflow_completed', {
                    workflowId,
                    executionId: executionRecord.id,
                    status: execution.status,
                    stepResults: execution.stepResults,
                });

            } catch (executionError: any) {
                // Update execution record with error
                await userService.updateExecution(executionRecord.id, {
                    status: 'failed',
                    error: executionError.message,
                    completed_at: new Date().toISOString(),
                });

                console.error(`[EventBus] Workflow ${workflowId} failed:`, executionError.message);

                // Emit failure event
                this.emit('workflow_failed', {
                    workflowId,
                    executionId: executionRecord.id,
                    error: executionError.message,
                });
            }

        } catch (error: any) {
            console.error(`[EventBus] Failed to execute workflow ${workflowId}:`, error);
            this.emit('workflow_error', {
                workflowId,
                error: error.message,
            });
        }
    }
}