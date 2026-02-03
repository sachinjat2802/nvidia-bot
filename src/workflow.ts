export type StepType = 'llm' | 'code' | 'conditional' | 'delay' | 'http' | 'file';

export interface WorkflowStep {
    id: string;
    type: StepType;
    name: string;
    description?: string;

    // LLM step config
    llmConfig?: {
        model?: string;
        systemPrompt?: string;
        temperature?: number;
        maxTokens?: number;
    };

    // Code step config
    codeConfig?: {
        language: 'javascript' | 'typescript' | 'python' | 'bash';
        code: string;
        timeoutMs?: number;
    };

    // Conditional step config
    conditionalConfig?: {
        condition: string; // JavaScript expression evaluating against context
        thenStepId: string;
        elseStepId?: string;
    };

    // Delay step config
    delayConfig?: {
        milliseconds: number;
    };

    // HTTP step config
    httpConfig?: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        headers?: Record<string, string>;
        body?: any;
        timeoutMs?: number;
    };

    // File step config
    fileConfig?: {
        operation: 'read' | 'write' | 'delete';
        path: string;
        content?: string;
    };

    // Dependencies
    dependsOn?: string[]; // Step IDs that must complete before this step

    // Output mapping
    outputMapping?: Record<string, string>; // Maps step outputs to context keys
}

export interface WorkflowContext {
    [key: string]: any;
    _stepResults: Record<string, StepResult>;
    _workflowId: string;
    _currentStepId?: string;
}

export interface StepResult {
    stepId: string;
    status: 'success' | 'failed' | 'skipped' | 'timeout';
    output?: any;
    error?: string;
    startedAt: Date;
    completedAt?: Date;
    durationMs?: number;
}

export interface WorkflowDefinition {
    id: string;
    name: string;
    description?: string;
    version: string;
    steps: WorkflowStep[];
    globalContext?: Record<string, any>;
    retryPolicy?: {
        maxRetries: number;
        backoffMs: number;
    };
    timeoutMs?: number;
}

export interface WorkflowExecution {
    id: string;
    workflowId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped';
    context: WorkflowContext;
    stepResults: StepResult[];
    currentStepId?: string;
    queuedSteps: string[]; // Step IDs waiting to execute
    completedSteps: Set<string>;
    startedAt: Date;
    completedAt?: Date;
    error?: string;
}

export interface WorkflowEngineOptions {
    maxConcurrentSteps?: number;
    onStepStart?: (execution: WorkflowExecution, step: WorkflowStep) => void;
    onStepComplete?: (execution: WorkflowExecution, step: WorkflowStep, result: StepResult) => void;
    onStepFailed?: (execution: WorkflowExecution, step: WorkflowStep, result: StepResult) => void;
    onWorkflowComplete?: (execution: WorkflowExecution) => void;
    onWorkflowFailed?: (execution: WorkflowExecution) => void;
}
