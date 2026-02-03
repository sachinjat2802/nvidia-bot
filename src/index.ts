#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

import { loadConfig, getAvailableModels } from './config';
import { NVIDIAClient } from './nvidia-client';
import { ChatSession } from './chat';
import { WorkflowEngine } from './workflow-engine';
import { WorkflowDefinition } from './workflow';
import fs from 'fs';
import path from 'path';

const program = new Command();
const config = loadConfig();
const client = new NVIDIAClient(config);

program
    .name('nvidia-bot')
    .description('CLI chatbot using NVIDIA free models via API')
    .version('1.0.0');

program
    .command('chat')
    .description('Start an interactive chat session')
    .option('-m, --model <model>', 'Model to use', config.defaultModel)
    .option('-s, --system <prompt>', 'System prompt', 'You are a helpful assistant.')
    .action(async (options) => {
        console.log(
            gradient('cyan', 'blue')(figlet.textSync('NVIDIA Bot', { horizontalLayout: 'full' }))
        );
        console.log(chalk.gray(`Using model: ${options.model}`));
        console.log(chalk.gray(`System: ${options.system}`));
        console.log(chalk.yellow('\nType your message. Use /clear to reset, /model to change, /exit to quit.\n'));

        const chat = new ChatSession(options.system, config.chatHistoryLimit);

        while (true) {
            const { message } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'message',
                    message: chalk.cyan('You:'),
                },
            ]);

            if (message === '/exit' || message === '/quit') {
                console.log(chalk.yellow('Goodbye!'));
                break;
            }

            if (message === '/clear') {
                chat.clear();
                console.log(chalk.green('Chat history cleared.'));
                continue;
            }

            if (message === '/model') {
                const models = await client.listModels();
                const { selectedModel } = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'selectedModel',
                        message: 'Select a model:',
                        choices: models,
                    },
                ]);
                options.model = selectedModel;
                console.log(chalk.green(`Model changed to: ${selectedModel}`));
                continue;
            }

            if (!message.trim()) continue;

            chat.addUserMessage(message);

            const spinner = ora('Thinking...').start();
            let assistantResponse = '';

            try {
                const messages = chat.getMessages();
                const response = await client.chat(
                    messages.map(m => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
                    options.model,
                    (chunk) => {
                        process.stdout.write(chunk);
                        assistantResponse += chunk;
                    }
                );
                spinner.stop();
                chat.addAssistantMessage(assistantResponse);
                console.log(); // New line after response
            } catch (error: any) {
                spinner.stop();
                console.error(chalk.red(`\nError: ${error.message}`));
            }
        }
    });

program
    .command('models')
    .description('List available NVIDIA models')
    .action(async () => {
        const spinner = ora('Fetching models...').start();
        try {
            const models = await client.listModels();
            spinner.stop();
            console.log(chalk.cyan('\nAvailable NVIDIA Models:\n'));
            models.forEach((model, index) => {
                const isDefault = model === config.defaultModel ? chalk.green(' (default)') : '';
                console.log(chalk.white(`${index + 1}. ${model}${isDefault}`));
            });
            console.log();
        } catch (error) {
            spinner.stop();
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(chalk.red('Error fetching models:'), errorMessage);
        }
    });

program
    .command('test')
    .description('Test the NVIDIA API connection')
    .option('-m, --model <model>', 'Model to test', config.defaultModel)
    .action(async (options) => {
        const spinner = ora('Testing connection...').start();
        try {
            const testChat = new ChatSession('You are a helpful assistant.', 10);
            testChat.addUserMessage('Hello! Just testing the connection. Please respond with a short greeting.');

            const messages = testChat.getMessages();
            const response = await client.chat(
                messages.map(m => ({ role: m.role as 'user' | 'assistant' | 'system', content: m.content })),
                options.model
            );

            spinner.stop();
            console.log(chalk.green('\n✓ Connection successful!'));
            console.log(chalk.gray(`Model: ${options.model}`));
            console.log(chalk.white(`Response: ${response}\n`));
        } catch (error: any) {
            spinner.stop();
            console.error(chalk.red('\n✗ Connection failed:'), error.message);
            process.exit(1);
        }
    });

// Workflow commands

program
    .command('workflow-run <definitionFile>')
    .description('Run a workflow from a JSON definition file')
    .option('-o, --output <file>', 'Output execution results to file')
    .action(async (definitionFile, options) => {
        try {
            const absolutePath = path.resolve(definitionFile);
            const content = fs.readFileSync(absolutePath, 'utf-8');
            const definition: WorkflowDefinition = JSON.parse(content);

            const engine = new WorkflowEngine(client);
            console.log(chalk.cyan(`\nStarting workflow: ${definition.name} (${definition.id})`));

            const execution = await engine.execute(definition);

            console.log(chalk.green(`\nWorkflow started with execution ID: ${execution.id}`));
            console.log(chalk.gray(`Status: ${execution.status}`));
            console.log(chalk.gray(`Started at: ${execution.startedAt.toISOString()}`));

            if (options.output) {
                fs.writeFileSync(options.output, JSON.stringify(execution, null, 2));
                console.log(chalk.green(`\nExecution details saved to: ${options.output}`));
            }
        } catch (error: any) {
            console.error(chalk.red('\nWorkflow execution failed:'), error.message);
            process.exit(1);
        }
    });

program
    .command('workflow-list')
    .description('List all workflow executions')
    .action(async () => {
        const engine = new WorkflowEngine(client);
        const executions = engine.listExecutions();

        if (executions.length === 0) {
            console.log(chalk.yellow('\nNo workflow executions found.'));
            return;
        }

        console.log(chalk.cyan('\nWorkflow Executions:\n'));
        executions.forEach((exec, index) => {
            const statusColor = exec.status === 'completed' ? chalk.green :
                exec.status === 'failed' ? chalk.red :
                    exec.status === 'running' ? chalk.yellow : chalk.gray;
            console.log(chalk.white(`${index + 1}. ${exec.id}`));
            console.log(statusColor(`   Status: ${exec.status}`));
            console.log(chalk.gray(`   Workflow: ${exec.workflowId}`));
            console.log(chalk.gray(`   Started: ${exec.startedAt.toISOString()}`));
            if (exec.completedAt) {
                console.log(chalk.gray(`   Completed: ${exec.completedAt.toISOString()}`));
            }
            console.log(chalk.gray(`   Steps: ${exec.stepResults.length}`));
            if (exec.error) {
                console.log(chalk.red(`   Error: ${exec.error}`));
            }
            console.log();
        });
    });

program
    .command('workflow-status <executionId>')
    .description('Get detailed status of a workflow execution')
    .action(async (executionId) => {
        const engine = new WorkflowEngine(client);
        const execution = engine.getExecution(executionId);

        if (!execution) {
            console.log(chalk.red(`\nExecution not found: ${executionId}`));
            process.exit(1);
        }

        console.log(chalk.cyan(`\nWorkflow Execution: ${execution.id}`));
        console.log(chalk.gray(`Workflow ID: ${execution.workflowId}`));
        console.log(chalk.gray(`Status: ${execution.status}`));
        console.log(chalk.gray(`Started: ${execution.startedAt.toISOString()}`));
        if (execution.completedAt) {
            console.log(chalk.gray(`Completed: ${execution.completedAt.toISOString()}`));
        }
        console.log(chalk.gray(`\nContext:`));
        console.log(JSON.stringify(execution.context, null, 2));
        console.log(chalk.gray(`\nStep Results:`));
        execution.stepResults.forEach((result, index) => {
            const statusColor = result.status === 'success' ? chalk.green :
                result.status === 'failed' ? chalk.red : chalk.yellow;
            console.log(chalk.white(`  ${index + 1}. ${result.stepId}`));
            console.log(statusColor(`     Status: ${result.status}`));
            console.log(chalk.gray(`     Started: ${result.startedAt.toISOString()}`));
            if (result.completedAt) {
                console.log(chalk.gray(`     Completed: ${result.completedAt.toISOString()}`));
            }
            if (result.durationMs) {
                console.log(chalk.gray(`     Duration: ${result.durationMs}ms`));
            }
            if (result.output) {
                console.log(chalk.gray(`     Output: ${JSON.stringify(result.output).substring(0, 200)}...`));
            }
            if (result.error) {
                console.log(chalk.red(`     Error: ${result.error}`));
            }
            console.log();
        });
        if (execution.error) {
            console.log(chalk.red(`\nWorkflow Error: ${execution.error}`));
        }
    });

program
    .command('workflow-stop <executionId>')
    .description('Stop a running workflow execution')
    .action(async (executionId) => {
        const engine = new WorkflowEngine(client);
        const stopped = engine.stop(executionId);

        if (!stopped) {
            console.log(chalk.red(`\nExecution not found or already stopped: ${executionId}`));
            process.exit(1);
        }

        console.log(chalk.green(`\nWorkflow execution stopped: ${executionId}`));
    });

program.parse();