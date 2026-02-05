/**
 * Workflow System Test Script
 * 
 * This script tests the complete workflow automation system:
 * - Supabase integration
 * - Workflow creation and execution
 * - All node types
 * - Trigger system
 */

import { createClient } from '@supabase/supabase-js';
import { WorkflowEngine } from './src/workflow-engine';
import { NVIDIAClient } from './src/nvidia-client';
import { loadConfig } from './src/config';
import { SupabaseWorkflowService } from './src/lib/supabase';

// Test configuration
const TEST_WORKFLOW = {
    name: 'Test Workflow - Data Processing',
    description: 'A simple workflow to test all components',
    version: '1.0.0',
    tags: ['test', 'automation'],
    steps: [
        {
            id: 'step_1_http',
            type: 'http',
            name: 'Fetch Data',
            description: 'Get data from API',
            httpConfig: {
                url: 'https://jsonplaceholder.typicode.com/posts/1',
                method: 'GET',
                timeoutMs: 10000
            },
            outputMapping: {
                apiData: 'output'
            }
        },
        {
            id: 'step_2_transform',
            type: 'transform',
            name: 'Extract Fields',
            description: 'Extract title and body',
            dependsOn: ['step_1_http'],
            transformConfig: {
                mapping: [
                    {
                        source: 'stepResults.step_1_http.output',
                        target: 'postTitle',
                        transform: 'value.title'
                    },
                    {
                        source: 'stepResults.step_1_http.output',
                        target: 'postBody',
                        transform: 'value.body'
                    }
                ]
            }
        },
        {
            id: 'step_3_llm',
            type: 'llm',
            name: 'Summarize with AI',
            description: 'Use LLM to summarize the post',
            dependsOn: ['step_2_transform'],
            llmConfig: {
                model: 'meta/llama-3.1-70b-instruct',
                systemPrompt: 'You are a helpful assistant that summarizes text.',
                content: 'Please summarize this post: ${context.postBody}',
                temperature: 0.7,
                maxTokens: 500
            },
            outputMapping: {
                summary: 'response.choices[0].message.content'
            }
        },
        {
            id: 'step_4_code',
            type: 'code',
            name: 'Format Output',
            description: 'Create final output object',
            dependsOn: ['step_3_llm'],
            codeConfig: {
                language: 'javascript',
                code: `
                    const title = context.postTitle;
                    const summary = context.stepResults.step_3_llm.output.response;
                    
                    return {
                        success: true,
                        title: title,
                        originalBody: context.postBody,
                        aiSummary: summary,
                        processedAt: new Date().toISOString()
                    };
                `,
                timeoutMs: 5000
            }
        },
        {
            id: 'step_5_webhook',
            type: 'webhook',
            name: 'Send Result',
            description: 'POST to webhook endpoint',
            dependsOn: ['step_4_code'],
            webhookConfig: {
                url: 'https://webhook.site/your-webhook-url', // Replace with actual webhook
                method: 'POST',
                body: {
                    workflowId: context._workflowId,
                    result: context.stepResults.step_4_code.output
                },
                timeoutMs: 10000
            }
        }
    ],
    globalContext: {
        environment: 'test'
    },
    retryPolicy: {
        maxRetries: 2,
        backoffMs: 1000
    },
    timeoutMs: 120000,
    concurrency: 1
};

async function testSupabaseConnection() {
    console.log('\n=== Testing Supabase Connection ===');
    
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.log('⚠️  Supabase credentials not found in environment');
        console.log('   Set SUPABASE_URL and SUPABASE_ANON_KEY in .env file');
        return false;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
        // Test connection
        const { data, error } = await supabase.from('workflows').select('count').limit(1);
        
        if (error) {
            console.log('❌ Supabase connection failed:', error.message);
            console.log('   Make sure you have run supabase-schema.sql in your Supabase project');
            return false;
        }
        
        console.log('✅ Supabase connection successful');
        return true;
    } catch (err: any) {
        console.log('❌ Supabase connection error:', err.message);
        return false;
    }
}

async function testWorkflowService() {
    console.log('\n=== Testing Workflow Service ===');
    
    try {
        const service = new SupabaseWorkflowService();
        
        // Test health check
        const healthy = await service.healthCheck();
        console.log(`Health check: ${healthy ? '✅ Healthy' : '❌ Unhealthy'}`);
        
        if (!healthy) {
            console.log('⚠️  Skipping service tests due to health check failure');
            return null;
        }
        
        // Test user ID (in real app, get from auth)
        const testUserId = '00000000-0000-0000-0000-000000000000'; // Replace with actual user ID
        
        console.log('📝 Creating test workflow...');
        const workflow = await service.createWorkflow(TEST_WORKFLOW, testUserId);
        console.log('✅ Workflow created:', workflow.id);
        
        console.log('📋 Listing workflows...');
        const workflows = await service.listWorkflows(testUserId);
        console.log(`✅ Found ${workflows.length} workflows`);
        
        console.log('🔍 Getting workflow...');
        const retrieved = await service.getWorkflow(workflow.id, testUserId);
        console.log('✅ Retrieved workflow:', retrieved?.name);
        
        console.log('💾 Creating integration...');
        const integration = await service.createIntegration({
            type: 'postgres',
            name: 'Test Database',
            config: {
                host: 'localhost',
                port: 5432,
                database: 'test'
            },
            isActive: true
        }, testUserId);
        console.log('✅ Integration created:', integration.id);
        
        console.log('📡 Listing integrations...');
        const integrations = await service.listIntegrations(testUserId);
        console.log(`✅ Found ${integrations.length} integrations`);
        
        return workflow;
    } catch (error: any) {
        console.log('❌ Workflow service test failed:', error.message);
        return null;
    }
}

async function testWorkflowEngine() {
    console.log('\n=== Testing Workflow Engine ===');
    
    try {
        const config = loadConfig();
        const nvidiaClient = new NVIDIAClient(config);
        
        // Check if NVIDIA API key is set
        if (!config.nvidiaApiKey || config.nvidiaApiKey === 'nvapi-your-api-key-here') {
            console.log('⚠️  NVIDIA API key not configured, LLM steps will fail');
            console.log('   Set NVIDIA_API_KEY in .env file');
        }
        
        const engine = new WorkflowEngine(nvidiaClient, {
            maxConcurrentSteps: 1,
            onStepStart: (execution, step) => {
                console.log(`  ▶️  Starting step: ${step.name} (${step.type})`);
            },
            onStepComplete: (execution, step, result) => {
                console.log(`  ✅ Completed step: ${step.name} (${result.durationMs}ms)`);
            },
            onStepFailed: (execution, step, result) => {
                console.log(`  ❌ Failed step: ${step.name} - ${result.error}`);
            },
            onWorkflowComplete: (execution) => {
                console.log(`\n🎉 Workflow completed! Status: ${execution.status}`);
                console.log(`   Total steps: ${execution.stepResults.length}`);
                console.log(`   Duration: ${execution.completedAt && execution.startedAt ? 
                    (execution.completedAt.getTime() - execution.startedAt.getTime()) + 'ms' : 'N/A'}`);
            },
            onWorkflowFailed: (execution) => {
                console.log(`\n💥 Workflow failed: ${execution.error}`);
            }
        });
        
        console.log('✅ WorkflowEngine initialized');
        
        // Test simple workflow (without API calls to avoid rate limits)
        const simpleWorkflow = {
            id: 'test_simple',
            name: 'Simple Test',
            version: '1.0.0',
            steps: [
                {
                    id: 'step_1_code',
                    type: 'code',
                    name: 'Test Code',
                    codeConfig: {
                        language: 'javascript',
                        code: `
                            const input = context._input || {};
                            const timestamp = new Date().toISOString();
                            return { 
                                message: 'Hello from Workflow Engine!',
                                received: input,
                                timestamp: timestamp,
                                computed: 2 + 2
                            };
                        `
                    }
                },
                {
                    id: 'step_2_llm',
                    type: 'llm',
                    name: 'Test LLM',
                    dependsOn: ['step_1_code'],
                    llmConfig: {
                        model: 'meta/llama-3.1-70b-instruct',
                        content: 'Say hello to ${context.stepResults.step_1_code.output.message}',
                        systemPrompt: 'You are a friendly assistant.'
                    }
                }
            ]
        };
        
        console.log('\n🧪 Executing simple test workflow...');
        const result = await engine.execute(simpleWorkflow, { test: true });
        
        console.log('\n📊 Execution Result:');
        console.log('  ID:', result.id);
        console.log('  Status:', result.status);
        console.log('  Steps completed:', result.stepResults.length);
        
        for (const stepResult of result.stepResults) {
            console.log(`  - ${stepResult.stepId}: ${stepResult.status} (${stepResult.durationMs}ms)`);
            if (stepResult.output) {
                console.log(`    Output:`, JSON.stringify(stepResult.output).substring(0, 100) + '...');
            }
        }
        
        return result.status === 'completed';
    } catch (error: any) {
        console.log('❌ Workflow engine test failed:', error.message);
        console.log(error.stack);
        return false;
    }
}

async function testWebhookTrigger() {
    console.log('\n=== Testing Webhook Trigger ===');
    
    try {
        const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
            console.log('⚠️  Skipping webhook test - no Supabase credentials');
            return false;
        }
        
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Create a test trigger
        console.log('📝 Creating webhook trigger...');
        
        // First get a workflow ID (use the one from testWorkflowService or create new)
        const { data: workflows } = await supabase
            .from('workflows')
            .select('id')
            .limit(1);
            
        if (!workflows || workflows.length === 0) {
            console.log('⚠️  No workflows found. Create a workflow first.');
            return false;
        }
        
        const workflowId = workflows[0].id;
        
        const { data: trigger, error } = await supabase
            .from('triggers')
            .insert({
                user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual user ID
                workflow_id: workflowId,
                type: 'webhook',
                config: {
                    secret: 'test-secret-123'
                },
                is_active: true
            })
            .select()
            .single();
            
        if (error) {
            console.log('❌ Failed to create trigger:', error.message);
            return false;
        }
        
        console.log('✅ Webhook trigger created:', trigger.id);
        console.log('🔗 Test with:');
        console.log(`   curl -X POST http://localhost:3000/api/webhooks/${trigger.id} \\`);
        console.log(`     -H "Content-Type: application/json" \\`);
        console.log(`     -H "X-Webhook-Secret: test-secret-123" \\`);
        console.log(`     -d '{"test": true}'`);
        
        return true;
    } catch (error: any) {
        console.log('❌ Webhook trigger test failed:', error.message);
        return false;
    }
}

async function runAllTests() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║       Workflow Automation System - Test Suite            ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    
    const results = {
        supabase: false,
        service: false,
        engine: false,
        webhook: false
    };
    
    // Test 1: Supabase Connection
    results.supabase = await testSupabaseConnection();
    
    // Test 2: Workflow Service (requires Supabase)
    if (results.supabase) {
        results.service = await testWorkflowService() !== null;
    }
    
    // Test 3: Workflow Engine
    results.engine = await testWorkflowEngine();
    
    // Test 4: Webhook Trigger
    if (results.supabase) {
        results.webhook = await testWebhookTrigger();
    }
    
    // Summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                   Test Results Summary                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`Supabase Connection: ${results.supabase ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Workflow Service:    ${results.service ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Workflow Engine:     ${results.engine ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Webhook Trigger:     ${results.webhook ? '✅ PASS' : '❌ FAIL'}`);
    
    const passed = Object.values(results).filter(r => r).length;
    const total = Object.keys(results).length;
    console.log(`\n📊 Total: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log('\n🎉 All tests passed! System is ready to use.');
    } else {
        console.log('\n⚠️  Some tests failed. Check configuration and try again.');
    }
    
    return results;
}

// Run tests if called directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

export { runAllTests };