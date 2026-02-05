import { z } from 'zod';

// Validation result type
export interface ValidationResult<T> {
    data?: T;
    errors?: z.ZodError;
}

// Simple validate function that returns data or errors
export function validate<T>(schema: z.ZodType<T>, data: unknown): ValidationResult<T> {
    const result = schema.safeParse(data);
    if (result.success) {
        return { data: result.data };
    } else {
        return { errors: result.error };
    }
}

// Format validation errors into a user-friendly structure
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
    const formatted: Record<string, string> = {};

    for (const error of errors.errors) {
        const path = error.path.join('.');
        formatted[path] = error.message;
    }

    return formatted;
}

// Image Generation Schema
export const ImageGenSchema = z.object({
    prompt: z.string().min(1, 'Prompt is required'),
    style: z.string().optional().default('cyberpunk'),
    negative_prompt: z.string().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
});

// Chat Request Schema
export const ChatRequestSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })),
    model: z.string().optional(),
    stream: z.boolean().optional(),
    useRag: z.boolean().optional(),
});

// RAG Ingest Schema
export const RAGIngestSchema = z.object({
    url: z.string().url('Invalid URL format'),
    indexName: z.string().optional(),
});

// Workflow Schema - comprehensive based on WorkflowDefinition
export const WorkflowSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Workflow name is required'),
    description: z.string().optional(),
    version: z.string().default('1.0.0'),
    steps: z.array(z.object({
        id: z.string(),
        type: z.enum([
            'llm',
            'http',
            'code',
            'database',
            'email',
            'storage',
            'webhook',
            'transform',
            'conditional',
            'delay',
            'file'
        ]),
        name: z.string(),
        description: z.string().optional(),
        dependsOn: z.array(z.string()).optional(),
        outputMapping: z.record(z.string()).default({}),

        // Configs per step type
        llmConfig: z.object({
            model: z.string(),
            systemPrompt: z.string().optional(),
            content: z.string(),
            temperature: z.number().min(0).max(2).optional(),
            maxTokens: z.number().int().positive().optional(),
            topP: z.number().min(0).max(1).optional(),
            frequencyPenalty: z.number().min(-2).max(2).optional(),
            presencePenalty: z.number().min(-2).max(2).optional(),
            stopSequences: z.array(z.string()).optional(),
        }).optional(),

        codeConfig: z.object({
            code: z.string(),
            language: z.enum(['javascript', 'typescript', 'python']).optional(),
            timeoutMs: z.number().int().positive().optional(),
        }).optional(),

        conditionalConfig: z.object({
            condition: z.string(),
            thenStepId: z.string().optional(),
            elseStepId: z.string().optional(),
        }).optional(),

        delayConfig: z.object({
            milliseconds: z.number().int().positive(),
        }).optional(),

        httpConfig: z.object({
            url: z.string().url(),
            method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
            headers: z.record(z.string()).optional(),
            body: z.any().optional(),
            responseType: z.enum(['json', 'text', 'blob']).optional(),
            timeoutMs: z.number().int().positive().optional(),
            useIntegration: z.boolean().optional(),
            integrationId: z.string().optional(),
        }).optional(),

        fileConfig: z.object({
            operation: z.enum(['read', 'write', 'delete', 'exists']),
            path: z.string(),
            content: z.string().optional(),
            encoding: z.enum(['utf8', 'base64']).optional(),
        }).optional(),

        databaseConfig: z.object({
            useIntegration: z.boolean().optional(),
            integrationId: z.string().optional(),
            connection: z.object({
                type: z.enum(['postgres', 'mysql', 'mongodb', 'mssql', 'sqlite']),
                host: z.string().optional(),
                port: z.number().int().optional(),
                database: z.string().optional(),
                username: z.string().optional(),
                password: z.string().optional(),
                connectionString: z.string().optional(),
            }).optional(),
            operation: z.enum(['query', 'select', 'insert', 'update', 'delete']),
            query: z.string().optional(),
            collection: z.string().optional(),
            data: z.any().optional(),
        }).optional(),

        emailConfig: z.object({
            useIntegration: z.boolean().optional(),
            integrationId: z.string().optional(),
            to: z.union([z.string(), z.array(z.string())]),
            subject: z.string(),
            body: z.string(),
            isHtml: z.boolean().optional(),
            cc: z.union([z.string(), z.array(z.string())]).optional(),
            bcc: z.union([z.string(), z.array(z.string())]).optional(),
            attachments: z.array(z.object({
                filename: z.string(),
                content: z.string(),
                mimeType: z.string().optional(),
            })).optional(),
        }).optional(),

        storageConfig: z.object({
            useIntegration: z.boolean().optional(),
            integrationId: z.string().optional(),
            provider: z.enum(['s3', 'gcs', 'azure-blob', 'ftp', 'sftp']),
            operation: z.enum(['upload', 'download', 'delete', 'list']),
            bucket: z.string().optional(),
            key: z.string().optional(),
            localPath: z.string().optional(),
            contentType: z.string().optional(),
            acl: z.string().optional(),
            metadata: z.record(z.string()).optional(),
        }).optional(),

        webhookConfig: z.object({
            url: z.string().url(),
            method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
            headers: z.record(z.string()).optional(),
            body: z.any().optional(),
            timeoutMs: z.number().int().positive().optional(),
        }).optional(),

        transformConfig: z.object({
            mapping: z.array(z.object({
                source: z.string(),
                target: z.string(),
            })),
            filter: z.string().optional(),
            sortBy: z.string().optional(),
            sortOrder: z.enum(['asc', 'desc']).optional(),
            limit: z.number().int().positive().optional(),
            offset: z.number().int().min(0).optional(),
        }).optional(),
    })),

    globalContext: z.record(z.any()).default({}),
    retryPolicy: z.object({
        maxRetries: z.number().int().min(0).default(3),
        backoffMs: z.number().int().positive().default(1000),
    }),
    timeoutMs: z.number().int().positive().default(30000),
    concurrency: z.number().int().positive().default(1),
    tags: z.array(z.string()).default([]),
});

// Trigger Schema
export const TriggerSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Trigger name is required'),
    workflow_id: z.string().uuid('Invalid workflow ID'),
    type: z.enum(['webhook', 'schedule', 'event']),
    config: z.record(z.any()).default({}),
    is_active: z.boolean().default(true),
    description: z.string().optional(),
});

// Integration Schema
export const IntegrationSchema = z.object({
    id: z.string().optional(),
    type: z.string().min(1, 'Integration type is required'),
    name: z.string().min(1, 'Integration name is required'),
    description: z.string().optional(),
    config: z.record(z.any()).default({}),
    credentials: z.record(z.any()).default({}),
    is_active: z.boolean().default(true),
});

// User Profile Schema
export const UserProfileSchema = z.object({
    full_name: z.string().optional(),
    company_name: z.string().optional(),
    timezone: z.string().default('UTC'),
    theme: z.string().default('dark'),
    notifications_enabled: z.boolean().default(true),
    preferences: z.record(z.any()).default({}),
});

// Health Check Response
export const HealthCheckSchema = z.object({
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    timestamp: z.string(),
    services: z.record(z.object({
        status: z.enum(['up', 'down', 'degraded']),
        latency: z.number().optional(),
        error: z.string().optional(),
    })).optional(),
});

// API Key Validation
export const ApiKeySchema = z.object({
    apiKey: z.string().min(10, 'API key must be at least 10 characters'),
});

// File Upload Schema
export const FileUploadSchema = z.object({
    file: z.any(), // Will be validated by file size/type checks
    maxSize: z.number().int().positive().optional(),
    allowedTypes: z.array(z.string()).optional(),
});

// Pagination Schema
export const PaginationSchema = z.object({
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().optional().default(20),
    offset: z.number().int().min(0).optional(),
});

// Date Range Schema
export const DateRangeSchema = z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
});

// Webhook Signature Validation
export const WebhookSignatureSchema = z.object({
    payload: z.any(),
    signature: z.string().min(1, 'Signature is required'),
    timestamp: z.string().optional(),
});

// LocalStorage data schemas
export const ChatSessionSchema = z.object({
    id: z.string(),
    title: z.string(),
    updatedAt: z.number(),
    messages: z.array(z.object({
        id: z.string(),
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })),
});

// Helper to validate localStorage data
export function validateChatSession(data: any): data is z.infer<typeof ChatSessionSchema> {
    const result = ChatSessionSchema.safeParse(data);
    return result.success;
}

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
    // Remove potentially dangerous HTML/script content
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
        /on\w+="[^"]*"/gi, // Inline event handlers
        /javascript:/gi,
        /data:/gi,
    ];

    let sanitized = input;
    for (const pattern of dangerousPatterns) {
        sanitized = sanitized.replace(pattern, '');
    }

    // Also escape HTML entities
    const escapeMap: Record<string, string> = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#x27;',
    };

    sanitized = sanitized.replace(/[&<>"']/g, (char) => escapeMap[char]);

    return sanitized;
}

// Validate and sanitize in one step
export function validateAndSanitize<T>(schema: z.ZodType<T>, data: unknown, sanitizeFields?: string[]): ValidationResult<T> {
    const result = validate(schema, data);

    if (result.data && sanitizeFields && Array.isArray(sanitizeFields)) {
        for (const field of sanitizeFields) {
            if (typeof (result.data as any)[field] === 'string') {
                (result.data as any)[field] = sanitizeInput((result.data as any)[field]);
            }
        }
    }

    return result;
}