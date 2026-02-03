import { Trigger, WebhookTriggerConfig, ScheduleTriggerConfig } from '../src/events';
import { WorkflowDefinition } from '../src/workflow';

// Helper to register trigger
async function registerTrigger(trigger: Trigger) {
    const res = await fetch('http://localhost:3000/api/triggers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trigger)
    });
    const data = await res.json();
    console.log(`Register Trigger ${trigger.id}:`, data);
}

// Helper to register workflow
async function registerWorkflow(workflow: WorkflowDefinition) {
    // Requires workflow API to support saving without executing (we added executeImmediate: false)
    const res = await fetch('http://localhost:3000/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...workflow, executeImmediate: false })
    });
    const data = await res.json();
    console.log(`Register Workflow ${workflow.id}:`, data);
}

// Main Setup
async function setupEventListeners() {
    console.log('--- Setting up Event Triggers ---');

    const workflowId = 'wf-event-handler-001';

    // 1. Define a workflow that handles events
    const eventWorkflow: WorkflowDefinition = {
        id: workflowId,
        name: 'Event Response Workflow',
        version: '1.0.0',
        steps: [
            {
                id: 'step1',
                name: 'Log Event',
                type: 'code',
                codeConfig: {
                    language: 'javascript',
                    code: `
                        console.log('Workflow triggered by:', context.triggerSource);
                        console.log('Event payload:', JSON.stringify(context.event));
                        return { processed: true, received: context.event };
                    `
                }
            }

        ]
    };

    await registerWorkflow(eventWorkflow);

    // 2. Register Webhook Trigger
    const webhookTrigger: Trigger = {
        id: 'github-push',
        type: 'webhook',
        config: {},
        workflowId: workflowId,
        isActive: true
    };
    await registerTrigger(webhookTrigger);

    // 3. Register Schedule Trigger (Every minute)
    const scheduleTrigger: Trigger = {
        id: 'scheduled-check',
        type: 'schedule',
        config: {
            cronExpression: '* * * * *' // Run every minute
        } as ScheduleTriggerConfig,
        workflowId: workflowId,
        isActive: true
    };
    await registerTrigger(scheduleTrigger);

    console.log('Setup complete. Waiting for events...');
    console.log('Test Webhook with: curl -X POST -H "Content-Type: application/json" -d "{\\"ref\\":\\"main\\"}" http://localhost:3000/api/webhooks/github-push');
}

// Check if server is up
fetch('http://localhost:3000/health')
    .then(() => setupEventListeners())
    .catch(() => console.error('Server not running. Please start server first.'));
