// Simple test script for workflow functionality
// Run with: npx ts-node test-workflow.ts

import { NVIDIAClient } from './src/nvidia-client';
import { WorkflowEngine } from './src/workflow-engine';
import { loadConfig } from './src/config';

async function testWorkflow() {
    try {
        console.log('Loading config...');
        const config = loadConfig();

        console.log('Creating NVIDIA client...');
        const client = new NVIDIAClient(config);

        console.log('Creating workflow engine...');
        const engine = new WorkflowEngine(client, {
            enablePersistence: false
        });

        console.log('Defining test workflow...');
        const workflow = {
            id: 'test-workflow',
            name: 'Test Workflow',
            version: '1.0.0',
            steps: [
                {
                    id: 'step1',
                    type: 'llm' as const,
                    name: 'Test LLM Call',
                    llmConfig: {
                        systemPrompt: 'You are a helpful assistant.',
                        content: 'Say "Hello from workflow test!" in exactly 5 words.'
                    },
                    outputMapping: {
                        response1: 'response'
                    }
                },
                {
                    id: 'step2',
                    type: 'code' as const,
                    name: 'Process Response',
                    dependsOn: ['step1'],
                    codeConfig: {
                        language: 'javascript' as const,
                        code: `const response = context.response1.response;
return { processed: true, wordCount: response.split(' ').length, original: response };`
                    }
                }
            ]
        };

        console.log('Executing workflow...');
        const execution = await engine.execute(workflow);

        console.log('\n=== Workflow Execution Results ===');
        console.log('Execution ID:', execution.id);
        console.log('Status:', execution.status);
        console.log('Workflow ID:', execution.workflowId);
        console.log('\nStep Results:');

        for (const result of execution.stepResults) {
            console.log(`\n  Step: ${result.stepId}`);
            console.log(`  Status: ${result.status}`);
            console.log(`  Duration: ${result.durationMs}ms`);
            if (result.output) {
                console.log(`  Output:`, JSON.stringify(result.output, null, 2));
            }
            if (result.error) {
                console.log(`  Error: ${result.error}`);
            }
        }

        console.log('\nFinal Context:');
        console.log(JSON.stringify(execution.context, null, 2));

        if (execution.status === 'completed') {
            console.log('\n✅ Workflow test PASSED');
        } else {
            console.log('\n❌ Workflow test FAILED:', execution.error);
        }

    } catch (error: any) {
        console.error('\n❌ Test failed with error:', error.message);
        process.exit(1);
    }
}

testWorkflow();
