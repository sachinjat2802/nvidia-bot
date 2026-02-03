import { EventEmitter } from 'events';
import { Event, Trigger, EventHandler } from './types';
import { WorkflowEngine } from '../workflow-engine';
import { WorkflowDefinition } from '../workflow';

export class EventBus extends EventEmitter {
    private handlers: EventHandler[] = [];
    private triggers: Map<string, Trigger> = new Map();
    private workflowEngine: WorkflowEngine;

    constructor(workflowEngine: WorkflowEngine) {
        super();
        this.workflowEngine = workflowEngine;

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
        // In a real app, we would load the definition from DB/File
        // Here we assume the IDs passed are valid or we need a way to look them up.
        // Since WorkflowEngine doesn't store definitions (only executions), 
        // we'll need a mechanism to fetch definitions.
        // FOR NOW: We will assume we have a way to define workflows or pass a "template" workflow.

        // HACK for demo: Create a dynamic workflow definition based on the event
        // In reality, you'd fetch `WorkflowDefinition` from a DB by `workflowId`.

        try {
            // Just logging for now as we don't have a "WorkflowDefinition Store" yet.
            console.log(`[EventBus] Triggering workflow ${workflowId} with payload:`, JSON.stringify(event.payload).substring(0, 100));

            // If the user provided a mechanism to look up workflows, we'd use it.
            // We will emit a 'workflow_trigger' event that main app can listen to and actually run the engine.
            this.emit('workflow_trigger', { workflowId, event });

        } catch (error) {
            console.error(`[EventBus] Failed to execute workflow ${workflowId}:`, error);
        }
    }
}
