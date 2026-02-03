import {
    WorkflowDefinition,
    WorkflowExecution,
    WorkflowStep,
    StepResult,
    WorkflowContext,
    WorkflowEngineOptions
} from './workflow';
import { NVIDIAClient } from './nvidia-client';
import fs from 'fs/promises';
import path from 'path';

const DEFAULT_PERSISTENCE_DIR = path.join(__dirname, 'workflow-data');

export class WorkflowEngine {
    private client: NVIDIAClient;
    private options: WorkflowEngineOptions;
    private executions: Map<string, WorkflowExecution> = new Map();
    private persistenceDir: string;
    private persistenceEnabled: boolean;

    constructor(client: NVIDIAClient, options: WorkflowEngineOptions & { persistenceDir?: string; enablePersistence?: boolean } = {}) {
        this.client = client;
        this.options = {
            maxConcurrentSteps: 1,
            ...options
        };
        this.persistenceDir = options.persistenceDir || DEFAULT_PERSISTENCE_DIR;
        this.persistenceEnabled = options.enablePersistence !== false;

        if (this.persistenceEnabled) {
            this.ensurePersistenceDir();
            this.loadPersistedExecutions();
        }
    }

    async execute(definition: WorkflowDefinition): Promise<WorkflowExecution> {
        const executionId = this.generateId();
        const execution: WorkflowExecution = {
            id: executionId,
            workflowId: definition.id,
            status: 'pending',
            context: {
                _workflowId: executionId,
                _stepResults: {},
                ...definition.globalContext
            },
            stepResults: [],
            queuedSteps: [...definition.steps.map(s => s.id)],
            completedSteps: new Set(),
            startedAt: new Date()
        };

        this.executions.set(executionId, execution);

        if (this.persistenceEnabled) {
            await this.persistExecution(execution);
        }

        try {
            execution.status = 'running';
            await this.runWorkflow(execution, definition);

            if (execution.status === 'running') {
                execution.status = 'completed';
                execution.completedAt = new Date();
                this.options.onWorkflowComplete?.(execution);
            }
        } catch (error: any) {
            execution.status = 'failed';
            execution.error = error.message;
            execution.completedAt = new Date();
            this.options.onWorkflowFailed?.(execution);
        } finally {
            if (this.persistenceEnabled) {
                await this.persistExecution(execution);
            }
        }

        return execution;
    }

    private async runWorkflow(execution: WorkflowExecution, definition: WorkflowDefinition): Promise<void> {
        const workflowTimeoutMs = definition.timeoutMs || 300000; // 5 min default
        const startTime = Date.now();

        while (execution.status === 'running' && execution.queuedSteps.length > 0) {
            if (Date.now() - startTime > workflowTimeoutMs) {
                throw new Error(`Workflow timeout after ${workflowTimeoutMs}ms`);
            }

            // Find steps ready to execute (dependencies satisfied)
            const readySteps = this.getReadySteps(execution, definition);

            if (readySteps.length === 0 && execution.queuedSteps.length > 0) {
                // No steps ready but still queued - could be a deadlock
                const remaining = execution.queuedSteps.join(', ');
                throw new Error(`Workflow deadlock detected. Queued steps: ${remaining}`);
            }

            // Execute ready steps (respecting concurrency limit)
            const batch = readySteps.slice(0, this.options.maxConcurrentSteps);
            const results = await Promise.allSettled(
                batch.map(step => this.executeStep(execution, step, definition))
            );

            // Process results
            for (let i = 0; i < batch.length; i++) {
                const step = batch[i];
                const result = results[i];

                if (result.status === 'fulfilled') {
                    execution.completedSteps.add(step.id);
                    execution.queuedSteps = execution.queuedSteps.filter(id => id !== step.id);
                    this.options.onStepComplete?.(execution, step, result.value);

                    if (this.persistenceEnabled) {
                        await this.persistExecution(execution);
                    }
                } else {
                    const stepResult: StepResult = {
                        stepId: step.id,
                        status: 'failed',
                        error: result.reason?.message || 'Unknown error',
                        startedAt: new Date(),
                        completedAt: new Date()
                    };
                    execution.stepResults.push(stepResult);
                    execution.completedSteps.add(step.id);
                    execution.queuedSteps = execution.queuedSteps.filter(id => id !== step.id);
                    this.options.onStepFailed?.(execution, step, stepResult);

                    // Check retry policy
                    if (!this.shouldRetry(step, definition, execution)) {
                        execution.status = 'failed';
                        execution.error = `Step ${step.id} failed: ${stepResult.error}`;
                        return;
                    }
                }
            }
        }
    }

    private getReadySteps(execution: WorkflowExecution, definition: WorkflowDefinition): WorkflowStep[] {
        return definition.steps.filter(step => {
            if (!execution.queuedSteps.includes(step.id)) {
                return false;
            }
            if (!step.dependsOn || step.dependsOn.length === 0) {
                return true;
            }
            return step.dependsOn.every(depId => execution.completedSteps.has(depId));
        });
    }

    private async executeStep(execution: WorkflowExecution, step: WorkflowStep, definition: WorkflowDefinition): Promise<StepResult> {
        const startTime = Date.now();
        const result: StepResult = {
            stepId: step.id,
            status: 'success',
            startedAt: new Date()
        };

        // Notify step start
        this.options.onStepStart?.(execution, step);

        try {
            let output: any;

            switch (step.type) {
                case 'llm':
                    output = await this.executeLLMStep(step, execution.context);
                    break;
                case 'code':
                    output = await this.executeCodeStep(step, execution.context);
                    break;
                case 'conditional':
                    output = await this.executeConditionalStep(step, execution.context);
                    break;
                case 'delay':
                    output = await this.executeDelayStep(step);
                    break;
                case 'http':
                    output = await this.executeHttpStep(step, execution.context);
                    break;
                case 'file':
                    output = await this.executeFileStep(step, execution.context);
                    break;
                default:
                    throw new Error(`Unknown step type: ${step.type}`);
            }

            result.output = output;
            result.completedAt = new Date();
            result.durationMs = Date.now() - startTime;

            // Apply output mapping to context
            if (step.outputMapping) {
                for (const [key, path] of Object.entries(step.outputMapping)) {
                    this.setContextValue(execution.context, path, output);
                }
            }

            // Store result in context
            execution.context._stepResults[step.id] = result;
            execution.stepResults.push(result);

            return result;
        } catch (error: any) {
            result.status = 'failed';
            result.error = error.message;
            result.completedAt = new Date();
            result.durationMs = Date.now() - startTime;
            execution.stepResults.push(result);
            execution.context._stepResults[step.id] = result;
            throw error;
        }
    }

    private async executeLLMStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
        if (!step.llmConfig) {
            throw new Error('LLM step missing llmConfig');
        }

        const { model, systemPrompt } = step.llmConfig;

        // Build messages from context if needed
        let messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [];

        if (systemPrompt) {
            messages.push({ role: 'system', content: systemPrompt });
        }

        // If content is directly provided in config, use it
        if (step.llmConfig && 'content' in step.llmConfig) {
            messages.push({ role: 'user', content: step.llmConfig.content as string });
        } else {
            // Otherwise, construct from context or use a default
            const userContent = this.resolveTemplate('${input}', context) || 'Hello';
            messages.push({ role: 'user', content: userContent });
        }

        const response = await this.client.chat(messages, model);
        return { response, model, tokens: response.length };
    }

    private async executeCodeStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
        if (!step.codeConfig) {
            throw new Error('Code step missing codeConfig');
        }

        const { language, code, timeoutMs = 30000 } = step.codeConfig;

        // Resolve variables in code
        const resolvedCode = this.resolveTemplate(code, context);

        // For security, we'll only allow JavaScript/TypeScript execution in a sandboxed way
        if (language === 'javascript' || language === 'typescript') {
            // Create a function with access to context
            const sandbox = {
                context: { ...context },
                console: {
                    log: (...args: any[]) => console.log('[Workflow Code]', ...args),
                    error: (...args: any[]) => console.error('[Workflow Code]', ...args)
                }
            };

            try {
                // eslint-disable-next-line no-new-func
                const fn = new Function('sandbox', `with (sandbox) { return (async () => { ${resolvedCode} })() }`);
                const result = await Promise.race([
                    fn(sandbox),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Code execution timeout')), timeoutMs)
                    )
                ]);
                return result;
            } catch (error: any) {
                throw new Error(`Code execution failed: ${error.message}`);
            }
        } else {
            throw new Error(`Unsupported code language: ${language}. Only javascript/typescript supported currently.`);
        }
    }

    private async executeConditionalStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
        if (!step.conditionalConfig) {
            throw new Error('Conditional step missing conditionalConfig');
        }

        const { condition, thenStepId, elseStepId } = step.conditionalConfig;

        try {
            // Evaluate condition in context
            const conditionResult = this.evaluateCondition(condition, context);

            if (conditionResult) {
                return { branch: 'then', nextStepId: thenStepId, conditionResult };
            } else if (elseStepId) {
                return { branch: 'else', nextStepId: elseStepId, conditionResult };
            } else {
                return { branch: 'none', conditionResult };
            }
        } catch (error: any) {
            throw new Error(`Conditional evaluation failed: ${error.message}`);
        }
    }

    private async executeDelayStep(step: WorkflowStep): Promise<any> {
        if (!step.delayConfig) {
            throw new Error('Delay step missing delayConfig');
        }

        const { milliseconds } = step.delayConfig;
        await new Promise(resolve => setTimeout(resolve, milliseconds));
        return { delayedMs: milliseconds };
    }

    private async executeHttpStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
        if (!step.httpConfig) {
            throw new Error('HTTP step missing httpConfig');
        }

        const { url, method = 'GET', headers = {}, body, timeoutMs = 30000 } = step.httpConfig;

        const resolvedUrl = this.resolveTemplate(url, context);
        const resolvedBody = body ? this.resolveTemplate(JSON.stringify(body), context) : undefined;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            const response = await fetch(resolvedUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: resolvedBody ? JSON.parse(resolvedBody) : undefined,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return { status: response.status, data };
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error(`HTTP request timeout after ${timeoutMs}ms`);
            }
            throw error;
        }
    }

    private async executeFileStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
        if (!step.fileConfig) {
            throw new Error('File step missing fileConfig');
        }

        const { operation, path: filePath, content } = step.fileConfig;
        const resolvedPath = this.resolveTemplate(filePath, context);
        const resolvedContent = content ? this.resolveTemplate(content, context) : undefined;

        // File operations are limited to read/write/delete
        // This is a simplified implementation - in production, add proper security
        switch (operation) {
            case 'read':
                try {
                    const fs = await import('fs/promises');
                    const fileContent = await fs.readFile(resolvedPath, 'utf-8');
                    return { operation: 'read', path: resolvedPath, content: fileContent };
                } catch (error: any) {
                    throw new Error(`File read failed: ${error.message}`);
                }

            case 'write':
                if (!resolvedContent) {
                    throw new Error('File write requires content');
                }
                try {
                    const fs = await import('fs/promises');
                    await fs.writeFile(resolvedPath, resolvedContent, 'utf-8');
                    return { operation: 'write', path: resolvedPath, bytes: resolvedContent.length };
                } catch (error: any) {
                    throw new Error(`File write failed: ${error.message}`);
                }

            case 'delete':
                try {
                    const fs = await import('fs/promises');
                    await fs.unlink(resolvedPath);
                    return { operation: 'delete', path: resolvedPath };
                } catch (error: any) {
                    throw new Error(`File delete failed: ${error.message}`);
                }

            default:
                throw new Error(`Unknown file operation: ${operation}`);
        }
    }

    private resolveTemplate(template: string, context: WorkflowContext): string {
        // Simple template replacement: ${key} or ${key.subkey}
        return template.replace(/\$\{([^}]+)\}/g, (match, path) => {
            const value = this.getContextValue(context, path.trim());
            if (value === undefined) {
                return match; // Leave unreplaced
            }
            return String(value);
        });
    }

    private getContextValue(context: WorkflowContext, path: string): any {
        const parts = path.split('.');
        let value: any = context;
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                return undefined;
            }
        }
        return value;
    }

    private setContextValue(context: WorkflowContext, path: string, value: any): void {
        const parts = path.split('.');
        let current: any = context;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!(part in current) || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }
        current[parts[parts.length - 1]] = value;
    }

    private evaluateCondition(condition: string, context: WorkflowContext): boolean {
        // Create a safe evaluation context with access to context data
        const safeContext = { ...context };
        // eslint-disable-next-line no-eval
        return eval(condition) === true;
    }

    private shouldRetry(step: WorkflowStep, definition: WorkflowDefinition, execution: WorkflowExecution): boolean {
        if (!definition.retryPolicy) {
            return false;
        }

        const retryCount = execution.stepResults.filter(r => r.stepId === step.id && r.status === 'failed').length;
        return retryCount < definition.retryPolicy.maxRetries;
    }

    async stop(executionId: string): Promise<boolean> {
        const execution = this.executions.get(executionId);
        if (execution) {
            execution.status = 'stopped';
            if (this.persistenceEnabled) {
                await this.persistExecution(execution);
            }
            return true;
        }
        return false;
    }

    getExecution(executionId: string): WorkflowExecution | undefined {
        return this.executions.get(executionId);
    }

    listExecutions(): WorkflowExecution[] {
        return Array.from(this.executions.values());
    }

    private generateId(): string {
        return `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private async ensurePersistenceDir(): Promise<void> {
        try {
            await fs.mkdir(this.persistenceDir, { recursive: true });
        } catch (error) {
            console.warn('Could not create persistence directory:', error);
        }
    }

    private async persistExecution(execution: WorkflowExecution): Promise<void> {
        try {
            const filePath = path.join(this.persistenceDir, `${execution.id}.json`);
            const data = JSON.stringify({
                ...execution,
                startedAt: execution.startedAt.toISOString(),
                completedAt: execution.completedAt?.toISOString(),
                context: {
                    ...execution.context,
                    _stepResults: execution.context._stepResults // Ensure step results are included
                }
            }, null, 2);
            await fs.writeFile(filePath, data, 'utf-8');
        } catch (error) {
            console.error('Failed to persist execution:', error);
        }
    }

    private async loadPersistedExecutions(): Promise<void> {
        try {
            const files = await fs.readdir(this.persistenceDir);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    try {
                        const filePath = path.join(this.persistenceDir, file);
                        const content = await fs.readFile(filePath, 'utf-8');
                        const data = JSON.parse(content);

                        // Rehydrate execution object
                        const execution: WorkflowExecution = {
                            ...data,
                            startedAt: new Date(data.startedAt),
                            completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
                            context: {
                                ...data.context,
                                _stepResults: data.context._stepResults || {},
                                _workflowId: data.id
                            },
                            completedSteps: new Set(data.completedSteps || [])
                        };

                        this.executions.set(execution.id, execution);
                        console.log(`[WorkflowEngine] Loaded persisted execution: ${execution.id}`);
                    } catch (error) {
                        console.error(`Failed to load execution from ${file}:`, error);
                    }
                }
            }
        } catch (error) {
            console.warn('Could not load persisted executions:', error);
        }
    }

    async cleanupOldExecutions(maxAgeDays: number = 7): Promise<number> {
        const cutoff = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
        let cleaned = 0;

        for (const [id, execution] of this.executions) {
            if (execution.startedAt.getTime() < cutoff) {
                this.executions.delete(id);
                if (this.persistenceEnabled) {
                    try {
                        const filePath = path.join(this.persistenceDir, `${id}.json`);
                        await fs.unlink(filePath).catch(() => { });
                    } catch {
                        // Ignore cleanup errors
                    }
                }
                cleaned++;
            }
        }

        return cleaned;
    }
}
