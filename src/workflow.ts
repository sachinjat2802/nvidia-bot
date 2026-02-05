// Workflow type definitions

export type StepType = 
    | 'llm'
    | 'http'
    | 'code'
    | 'database'
    | 'email'
    | 'storage'
    | 'webhook'
    | 'transform'
    | 'conditional'
    | 'delay'
    | 'file';

export interface WorkflowStep {
    id: string;
    type: StepType;
    name: string;
    description?: string;
    dependsOn?: string[];
    outputMapping: Record<string, string>;
    
    // Configuration per step type
    llmConfig?: LLMConfig;
    codeConfig?: CodeConfig;
    conditionalConfig?: ConditionalConfig;
    delayConfig?: DelayConfig;
    httpConfig?: HttpConfig;
    fileConfig?: FileConfig;
    databaseConfig?: DatabaseConfig;
    emailConfig?: EmailConfig;
    storageConfig?: StorageConfig;
    webhookConfig?: WebhookConfig;
    transformConfig?: TransformConfig;
}

export interface LLMConfig {
    model: string;
    systemPrompt?: string;
    content: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stopSequences?: string[];
}

export interface CodeConfig {
    code: string;
    language?: 'javascript' | 'typescript' | 'python';
    timeoutMs?: number;
}

export interface ConditionalConfig {
    condition: string;
    thenStepId?: string;
    elseStepId?: string;
}

export interface DelayConfig {
    milliseconds: number;
}

export interface HttpConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    responseType?: 'json' | 'text' | 'blob';
    timeoutMs?: number;
    useIntegration?: boolean;
    integrationId?: string;
}

export interface FileConfig {
    operation: 'read' | 'write' | 'delete' | 'exists';
    path: string;
    content?: string;
    encoding?: 'utf8' | 'base64';
}

export interface DatabaseConnection {
    type: 'postgres' | 'mysql' | 'mongodb' | 'mssql' | 'sqlite';
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    connectionString?: string;
}

export interface DatabaseConfig {
    useIntegration?: boolean;
    integrationId?: string;
    connection?: DatabaseConnection;
    operation: 'query' | 'select' | 'insert' | 'update' | 'delete';
    query?: string;
    collection?: string; // For MongoDB
    data?: any; // For insert/update operations
}

export interface EmailConfig {
    useIntegration?: boolean;
    integrationId?: string;
    to: string | string[];
    subject: string;
    body: string;
    isHtml?: boolean;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    content: string; // base64 encoded
    mimeType?: string;
}

export interface StorageConfig {
    useIntegration?: boolean;
    integrationId?: string;
    provider: 's3' | 'gcs' | 'azure-blob' | 'ftp' | 'sftp';
    operation: 'upload' | 'download' | 'delete' | 'list';
    bucket?: string;
    key?: string;
    localPath?: string;
    contentType?: string;
    acl?: string;
    metadata?: Record<string, string>;
}

export interface WebhookConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    timeoutMs?: number;
}

export interface TransformMapping {
    source: string; // e.g., "users[0].name"
    target: string; // e.g., "firstName"
}

export interface TransformConfig {
    mapping: TransformMapping[];
    filter?: string; // JavaScript expression
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface RetryPolicy {
    maxRetries: number;
    backoffMs: number;
}

export interface WorkflowDefinition {
    id?: string;
    name: string;
    description?: string;
    version: string;
    steps: WorkflowStep[];
    globalContext: Record<string, any>;
    retryPolicy: RetryPolicy;
    timeoutMs: number;
    concurrency: number;
    tags: string[];
}

export interface IntegrationRecord {
    id: string;
    user_id: string;
    type: string;
    name: string;
    config: Record<string, any>;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ExecutionResult {
    status: 'completed' | 'failed' | 'stopped';
    outputContext: Record<string, any>;
    stepResults: StepResult[];
    error?: string;
}

export interface StepResult {
    stepId: string;
    status: 'success' | 'failed';
    output: any;
    durationMs: number;
    startedAt: string;
    completedAt: string;
    error?: string;
}

export interface WorkflowExecutionContext {
    input: Record<string, any>;
    context: Record<string, any>;
    stepResults: Record<string, StepResult>;
    workflow: WorkflowDefinition;
}