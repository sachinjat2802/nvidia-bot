import { createClient } from '@supabase/supabase-js';

export interface AuditLogEntry {
    userId?: string;
    sessionId?: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
    metadata?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
}

export class AuditLogger {
    private supabase: ReturnType<typeof createClient>;
    private sessionId: string;

    constructor() {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('AuditLogger: Supabase environment variables missing!');
            this.supabase = {
                from: () => ({
                    insert: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
                })
            } as any;
        } else {
            this.supabase = createClient(supabaseUrl, supabaseAnonKey);
        }
        this.sessionId = this.generateSessionId();
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    setSessionId(sessionId: string) {
        this.sessionId = sessionId;
    }

    setUserId(userId: string) {
        // This will be called when user logs in
    }

    async log(entry: AuditLogEntry): Promise<void> {
        try {
            // Use service role if available for audit logs (bypasses RLS)
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

            const client = supabaseServiceKey
                ? createClient(supabaseUrl, supabaseServiceKey)
                : this.supabase;

            await client.from('audit_logs').insert({
                user_id: entry.userId,
                session_id: entry.sessionId || this.sessionId,
                action: entry.action,
                resource_type: entry.resourceType,
                resource_id: entry.resourceId,
                old_values: entry.oldValues,
                new_values: entry.newValues,
                metadata: entry.metadata || {},
                ip_address: entry.ipAddress,
                user_agent: entry.userAgent,
            });
        } catch (error) {
            console.error('Audit log failed:', error);
            // Don't throw - audit logging should not break the main flow
        }
    }

    // Helper methods for common actions
    async logWorkflowCreated(userId: string, workflowId: string, workflow: any) {
        await this.log({
            userId,
            action: 'workflow.created',
            resourceType: 'workflow',
            resourceId: workflowId,
            newValues: workflow,
            metadata: { version: workflow.version }
        });
    }

    async logWorkflowUpdated(userId: string, workflowId: string, oldWorkflow: any, newWorkflow: any) {
        await this.log({
            userId,
            action: 'workflow.updated',
            resourceType: 'workflow',
            resourceId: workflowId,
            oldValues: oldWorkflow,
            newValues: newWorkflow,
        });
    }

    async logWorkflowDeleted(userId: string, workflowId: string, workflow: any) {
        await this.log({
            userId,
            action: 'workflow.deleted',
            resourceType: 'workflow',
            resourceId: workflowId,
            oldValues: workflow,
        });
    }

    async logWorkflowExecuted(
        userId: string,
        workflowId: string,
        executionId: string,
        inputContext: any,
        status: string,
        error?: string
    ) {
        await this.log({
            userId,
            action: 'workflow.executed',
            resourceType: 'execution',
            resourceId: executionId,
            metadata: {
                workflowId,
                status,
                error: error || undefined,
                inputContext: this.sanitizeContext(inputContext)
            }
        });
    }

    async logTriggerCreated(userId: string, triggerId: string, trigger: any) {
        await this.log({
            userId,
            action: 'trigger.created',
            resourceType: 'trigger',
            resourceId: triggerId,
            newValues: trigger,
        });
    }

    async logTriggerUpdated(userId: string, triggerId: string, oldTrigger: any, newTrigger: any) {
        await this.log({
            userId,
            action: 'trigger.updated',
            resourceType: 'trigger',
            resourceId: triggerId,
            oldValues: oldTrigger,
            newValues: newTrigger,
        });
    }

    async logTriggerDeleted(userId: string, triggerId: string, trigger: any) {
        await this.log({
            userId,
            action: 'trigger.deleted',
            resourceType: 'trigger',
            resourceId: triggerId,
            oldValues: trigger,
        });
    }

    async logIntegrationCreated(userId: string, integrationId: string, integration: any) {
        await this.log({
            userId,
            action: 'integration.created',
            resourceType: 'integration',
            resourceId: integrationId,
            newValues: this.sanitizeIntegration(integration),
        });
    }

    async logIntegrationUpdated(userId: string, integrationId: string, oldIntegration: any, newIntegration: any) {
        await this.log({
            userId,
            action: 'integration.updated',
            resourceType: 'integration',
            resourceId: integrationId,
            oldValues: this.sanitizeIntegration(oldIntegration),
            newValues: this.sanitizeIntegration(newIntegration),
        });
    }

    async logIntegrationDeleted(userId: string, integrationId: string, integration: any) {
        await this.log({
            userId,
            action: 'integration.deleted',
            resourceType: 'integration',
            resourceId: integrationId,
            oldValues: this.sanitizeIntegration(integration),
        });
    }

    async logUserLogin(userId: string, ipAddress?: string, userAgent?: string) {
        await this.log({
            userId,
            action: 'user.login',
            resourceType: 'user',
            resourceId: userId,
            metadata: { sessionId: this.sessionId },
            ipAddress,
            userAgent,
        });
    }

    async logUserLogout(userId: string) {
        await this.log({
            userId,
            action: 'user.logout',
            resourceType: 'user',
            resourceId: userId,
            metadata: { sessionId: this.sessionId },
        });
    }

    async logUserSignup(userId: string, email: string, fullName?: string) {
        await this.log({
            userId,
            action: 'user.signup',
            resourceType: 'user',
            resourceId: userId,
            newValues: { email, full_name: fullName },
        });
    }

    async logApiCall(
        userId: string,
        endpoint: string,
        method: string,
        statusCode: number,
        durationMs: number,
        metadata?: any
    ) {
        await this.log({
            userId,
            action: 'api.call',
            resourceType: 'api',
            metadata: {
                endpoint,
                method,
                statusCode,
                durationMs,
                ...metadata
            }
        });
    }

    // Sanitize sensitive data before logging
    private sanitizeIntegration(integration: any): any {
        if (!integration) return integration;

        const sanitized = { ...integration };
        // Remove sensitive credentials from logs
        if (sanitized.credentials) {
            sanitized.credentials = { ...sanitized.credentials };
            if (sanitized.credentials.password) sanitized.credentials.password = '***REDACTED***';
            if (sanitized.credentials.api_key) sanitized.credentials.api_key = '***REDACTED***';
            if (sanitized.credentials.secret) sanitized.credentials.secret = '***REDACTED***';
            if (sanitized.credentials.token) sanitized.credentials.token = '***REDACTED***';
        }
        if (sanitized.config) {
            sanitized.config = { ...sanitized.config };
            // Redact any field that looks like a password/key
            Object.keys(sanitized.config).forEach(key => {
                if (key.toLowerCase().includes('password') ||
                    key.toLowerCase().includes('key') ||
                    key.toLowerCase().includes('secret') ||
                    key.toLowerCase().includes('token')) {
                    sanitized.config[key] = '***REDACTED***';
                }
            });
        }
        return sanitized;
    }

    private sanitizeContext(context: any): any {
        if (!context) return context;

        const sanitized = { ...context };
        // Remove sensitive fields from context
        const sensitiveKeys = ['password', 'api_key', 'secret', 'token', 'authorization', 'credentials'];
        sensitiveKeys.forEach(key => {
            if (sanitized[key]) {
                sanitized[key] = '***REDACTED***';
            }
        });

        // Recursively sanitize nested objects
        Object.keys(sanitized).forEach(key => {
            if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
                sanitized[key] = this.sanitizeContext(sanitized[key]);
            }
        });

        return sanitized;
    }
}

// Singleton instance
export const auditLogger = new AuditLogger();