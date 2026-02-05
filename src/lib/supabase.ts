import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WorkflowDefinition } from '@/workflow';
import { auditLogger } from './audit-logger';
import { Utils } from './utils'; // Helper for server-side dynamic imports

export interface WorkflowRecord {
    id: string;
    user_id: string;
    name: string;
    description?: string;
    definition: WorkflowDefinition;
    version: string;
    tags: string[];
    is_active: boolean;
    execution_count: number;
    last_executed_at?: string;
    created_at: string;
    updated_at: string;
}

export interface TriggerRecord {
    id: string;
    user_id: string;
    workflow_id: string;
    type: 'webhook' | 'schedule' | 'event';
    config: Record<string, any>;
    is_active: boolean;
    trigger_count: number;
    last_triggered_at?: string;
    created_at: string;
    updated_at: string;
}

export interface ExecutionRecord {
    id: string;
    user_id: string;
    workflow_id: string;
    workflow_version: string;
    trigger_id?: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped' | 'timeout';
    input_context: Record<string, any>;
    output_context: Record<string, any>;
    step_results: Array<{
        stepId: string;
        status: 'success' | 'failed';
        output: any;
        durationMs: number;
        startedAt: string;
        completedAt: string;
        error?: string;
    }>;
    error?: string;
    error_type?: string;
    duration_ms?: number;
    started_at: string;
    completed_at?: string;
    created_at: string;
}

export interface IntegrationRecord {
    id: string;
    user_id: string;
    type: string;
    name: string;
    description?: string;
    config: Record<string, any>;
    credentials: Record<string, any>;
    is_active: boolean;
    last_used_at?: string;
    usage_count: number;
    created_at: string;
    updated_at: string;
}

export interface UserProfile {
    id: string;
    full_name?: string;
    company_name?: string;
    timezone: string;
    theme: string;
    notifications_enabled: boolean;
    email_verified: boolean;
    avatar_url?: string;
    preferences: Record<string, any>;
    usage_quota: {
        workflows: number;
        executions: number;
        api_calls: number;
    };
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export class SupabaseWorkflowService {
    private supabase: SupabaseClient;
    private userId: string;
    private auditEnabled: boolean;

    constructor(userId?: string, auditEnabled: boolean = true) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Supabase environment variables missing!');
            // Create a dummy client object to prevent immediate crash, but calls will fail
            this.supabase = {
                from: () => ({
                    select: () => ({ eq: () => ({ single: () => Promise.resolve({ error: { message: 'Supabase not configured' } }), order: () => Promise.resolve({ error: { message: 'Supabase not configured' } }), limit: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }) }),
                    insert: () => ({ select: () => ({ single: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }) }),
                    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }) }) }),
                    delete: () => ({ eq: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }) }),
                })
            } as any;
        } else {
            this.supabase = createClient(supabaseUrl, supabaseAnonKey);
        }

        this.userId = userId || '00000000-0000-0000-0000-000000000000';
        this.auditEnabled = auditEnabled;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    setAuditEnabled(enabled: boolean) {
        this.auditEnabled = enabled;
    }

    private async logAudit(action: string, resourceType: string, resourceId?: string, oldValues?: any, newValues?: any, metadata?: any) {
        if (!this.auditEnabled) return;
        try {
            await auditLogger.log({
                userId: this.userId,
                action,
                resourceType,
                resourceId,
                oldValues,
                newValues,
                metadata,
            });
        } catch (error) {
            console.error('Audit log failed:', error);
        }
    }

    // User Profile
    async getUserProfile(): Promise<UserProfile | null> {
        const { data, error } = await this.supabase
            .from('user_profiles')
            .select('*')
            .eq('id', this.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }

    async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
        const { data, error } = await this.supabase
            .from('user_profiles')
            .update(profile)
            .eq('id', this.userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Workflows
    async listWorkflows(): Promise<WorkflowRecord[]> {
        const { data, error } = await this.supabase
            .from('workflows')
            .select('*')
            .eq('user_id', this.userId)
            .order('updated_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async getWorkflow(id: string): Promise<WorkflowRecord | null> {
        const { data, error } = await this.supabase
            .from('workflows')
            .select('*')
            .eq('id', id)
            .eq('user_id', this.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }

    async createWorkflow(workflow: WorkflowDefinition): Promise<WorkflowRecord> {
        const { data, error } = await this.supabase
            .from('workflows')
            .insert({
                user_id: this.userId,
                name: workflow.name,
                description: workflow.description,
                definition: workflow,
                version: workflow.version,
                tags: workflow.tags,
                is_active: true,
            })
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('workflow.created', 'workflow', data.id, undefined, workflow, { version: workflow.version });
        return data;
    }

    async updateWorkflow(id: string, workflow: WorkflowDefinition): Promise<WorkflowRecord> {
        // Get old workflow for audit
        const oldWorkflow = await this.getWorkflow(id);

        const { data, error } = await this.supabase
            .from('workflows')
            .update({
                name: workflow.name,
                description: workflow.description,
                definition: workflow,
                tags: workflow.tags,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('user_id', this.userId)
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('workflow.updated', 'workflow', id, oldWorkflow?.definition, workflow);
        return data;
    }

    async deleteWorkflow(id: string): Promise<void> {
        const workflow = await this.getWorkflow(id);

        const { error } = await this.supabase
            .from('workflows')
            .delete()
            .eq('id', id)
            .eq('user_id', this.userId);

        if (error) throw error;

        await this.logAudit('workflow.deleted', 'workflow', id, workflow);
    }

    async incrementWorkflowExecution(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('workflows')
            .update({
                execution_count: (this.supabase as any).raw('execution_count + 1'),
                last_executed_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('user_id', this.userId);

        if (error) throw error;
    }

    // Triggers
    async listTriggers(workflowId?: string): Promise<TriggerRecord[]> {
        let query = this.supabase
            .from('triggers')
            .select('*')
            .eq('user_id', this.userId);

        if (workflowId) {
            query = query.eq('workflow_id', workflowId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
    }

    async createTrigger(trigger: {
        workflowId: string;
        type: 'webhook' | 'schedule' | 'event';
        config: Record<string, any>;
        isActive: boolean;
    }): Promise<TriggerRecord> {
        const { data, error } = await this.supabase
            .from('triggers')
            .insert({
                user_id: this.userId,
                workflow_id: trigger.workflowId,
                type: trigger.type,
                config: trigger.config,
                is_active: trigger.isActive,
            })
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('trigger.created', 'trigger', data.id, undefined, trigger);
        return data;
    }

    async getTrigger(id: string): Promise<TriggerRecord | null> {
        const { data, error } = await this.supabase
            .from('triggers')
            .select('*')
            .eq('id', id)
            .eq('user_id', this.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }

    async updateTrigger(id: string, updates: Partial<TriggerRecord>): Promise<TriggerRecord> {
        const oldTrigger = await this.getTrigger(id);

        const updateData: Record<string, any> = { ...updates };
        if (updates.is_active !== undefined) {
            updateData.is_active = updates.is_active;
        }

        const { data, error } = await this.supabase
            .from('triggers')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', this.userId)
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('trigger.updated', 'trigger', id, oldTrigger, data);
        return data;
    }

    async deleteTrigger(id: string): Promise<void> {
        const trigger = await this.getTrigger(id);

        const { error } = await this.supabase
            .from('triggers')
            .delete()
            .eq('id', id)
            .eq('user_id', this.userId);

        if (error) throw error;

        await this.logAudit('trigger.deleted', 'trigger', id, trigger);
    }

    async markTriggerFired(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('triggers')
            .update({
                last_triggered_at: new Date().toISOString(),
                trigger_count: (this.supabase as any).raw('trigger_count + 1'),
            })
            .eq('id', id);

        if (error) throw error;
    }

    // Executions
    async createExecution(execution: {
        workflowId: string;
        workflowVersion: string;
        status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped' | 'timeout';
        inputContext: Record<string, any>;
        startedAt: Date;
        triggerId?: string;
    }): Promise<ExecutionRecord> {
        const { data, error } = await this.supabase
            .from('executions')
            .insert({
                user_id: this.userId,
                workflow_id: execution.workflowId,
                workflow_version: execution.workflowVersion,
                trigger_id: execution.triggerId,
                status: execution.status,
                input_context: execution.inputContext,
                started_at: execution.startedAt.toISOString(),
            })
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('workflow.executed', 'execution', data.id, undefined, {
            workflowId: execution.workflowId,
            status: execution.status,
            inputContext: execution.inputContext,
        });

        return data;
    }

    async updateExecution(
        executionId: string,
        updates: Partial<{
            status: 'pending' | 'running' | 'completed' | 'failed' | 'stopped' | 'timeout';
            output_context: Record<string, any>;
            step_results: ExecutionRecord['step_results'];
            error: string;
            error_type: string;
            duration_ms: number;
            completed_at: string;
        }>
    ): Promise<void> {
        const updateData: Record<string, any> = {};
        if (updates.status) updateData.status = updates.status;
        if (updates.output_context) updateData.output_context = updates.output_context;
        if (updates.step_results) updateData.step_results = updates.step_results;
        if (updates.error) updateData.error = updates.error;
        if (updates.error_type) updateData.error_type = updates.error_type;
        if (updates.duration_ms) updateData.duration_ms = updates.duration_ms;
        if (updates.completed_at) updateData.completed_at = updates.completed_at;

        const { error } = await this.supabase
            .from('executions')
            .update(updateData)
            .eq('id', executionId)
            .eq('user_id', this.userId);

        if (error) throw error;
    }

    async getExecution(id: string): Promise<ExecutionRecord | null> {
        const { data, error } = await this.supabase
            .from('executions')
            .select('*')
            .eq('id', id)
            .eq('user_id', this.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }
        return data;
    }

    async listExecutions(workflowId?: string, limit: number = 50): Promise<ExecutionRecord[]> {
        let query = this.supabase
            .from('executions')
            .select('*')
            .eq('user_id', this.userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (workflowId) {
            query = query.eq('workflow_id', workflowId);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    }

    // Integrations
    async listIntegrations(): Promise<IntegrationRecord[]> {
        const { data, error } = await this.supabase
            .from('integrations')
            .select('*')
            .eq('user_id', this.userId)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    async createIntegration(integration: {
        type: string;
        name: string;
        description?: string;
        config: Record<string, any>;
        credentials: Record<string, any>;
        isActive: boolean;
    }): Promise<IntegrationRecord> {
        // Encrypt credentials before storing
        const encryptedCredentials = await Utils.encrypt(integration.credentials);

        const { data, error } = await this.supabase
            .from('integrations')
            .insert({
                user_id: this.userId,
                type: integration.type,
                name: integration.name,
                description: integration.description,
                config: integration.config,
                credentials: encryptedCredentials,
                is_active: integration.isActive,
            })
            .select()
            .single();

        if (error) throw error;

        await this.logAudit('integration.created', 'integration', data.id, undefined, {
            type: integration.type,
            name: integration.name,
            config: integration.config,
        });
        return data;
    }

    async getIntegration(id: string): Promise<IntegrationRecord | null> {
        const { data, error } = await this.supabase
            .from('integrations')
            .select('*')
            .eq('id', id)
            .eq('user_id', this.userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw error;
        }

        // Decrypt credentials before returning
        if (data) {
            try {
                data.credentials = await Utils.decrypt(data.credentials);
            } catch (decryptError) {
                console.error('Failed to decrypt credentials:', decryptError);
                // Return with empty credentials rather than fail
                data.credentials = {};
            }
        }

        return data;
    }

    async updateIntegration(
        id: string,
        updates: Partial<{
            type: string;
            name: string;
            description?: string;
            config: Record<string, any>;
            credentials: Record<string, any>;
            is_active: boolean;
        }>
    ): Promise<IntegrationRecord> {
        const oldIntegration = await this.getIntegration(id);

        const updateData: Record<string, any> = { ...updates };
        if (updates.is_active !== undefined) {
            updateData.is_active = updates.is_active;
        }

        if (updates.credentials) {
            updateData.credentials = await Utils.encrypt(updates.credentials);
        }

        const { data, error } = await this.supabase
            .from('integrations')
            .update(updateData)
            .eq('id', id)
            .eq('user_id', this.userId)
            .select()
            .single();

        if (error) throw error;

        // Decrypt credentials in response
        if (data) {
            try {
                data.credentials = await Utils.decrypt(data.credentials);
            } catch (decryptError) {
                console.error('Failed to decrypt credentials:', decryptError);
                data.credentials = {};
            }
        }

        await this.logAudit('integration.updated', 'integration', id, oldIntegration, data);
        return data;
    }

    async deleteIntegration(id: string): Promise<void> {
        const integration = await this.getIntegration(id);

        const { error } = await this.supabase
            .from('integrations')
            .delete()
            .eq('id', id)
            .eq('user_id', this.userId);

        if (error) throw error;

        await this.logAudit('integration.deleted', 'integration', id, integration);
    }

    async incrementIntegrationUsage(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('integrations')
            .update({
                usage_count: (this.supabase as any).raw('usage_count + 1'),
                last_used_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('user_id', this.userId);

        if (error) throw error;
    }

    // Usage Metrics
    async recordUsage(metric: {
        metricType: 'api_call' | 'workflow_execution' | 'llm_token' | 'file_upload';
        endpoint?: string;
        workflowId?: string;
        count?: number;
        tokens?: number;
        bytes?: number;
        costCents?: number;
        metadata?: Record<string, any>;
    }): Promise<void> {
        const today = new Date().toISOString().split('T')[0];
        const periodStart = today;
        const periodEnd = today;

        const { error } = await this.supabase
            .from('usage_metrics')
            .upsert({
                user_id: this.userId,
                metric_type: metric.metricType,
                endpoint: metric.endpoint,
                workflow_id: metric.workflowId,
                count: metric.count || 1,
                tokens: metric.tokens || 0,
                bytes: metric.bytes || 0,
                cost_cents: metric.costCents || 0,
                metadata: metric.metadata || {},
                period_start: periodStart,
                period_end: periodEnd,
            }, {
                onConflict: 'user_id,metric_type,endpoint,workflow_id,period_start'
            });

        if (error) throw error;
    }

    async getUsageMetrics(periodStart: string, periodEnd: string): Promise<any[]> {
        const { data, error } = await this.supabase
            .from('usage_metrics')
            .select('*')
            .eq('user_id', this.userId)
            .gte('period_start', periodStart)
            .lte('period_end', periodEnd)
            .order('period_start', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    // Notifications
    async createNotification(notification: {
        type: string;
        title: string;
        message: string;
        data?: Record<string, any>;
        expiresAt?: Date;
    }): Promise<void> {
        const { error } = await this.supabase
            .from('notifications')
            .insert({
                user_id: this.userId,
                type: notification.type,
                title: notification.title,
                message: notification.message,
                data: notification.data || {},
                expires_at: notification.expiresAt?.toISOString(),
            });

        if (error) throw error;
    }

    async listNotifications(unreadOnly?: boolean): Promise<any[]> {
        let query = this.supabase
            .from('notifications')
            .select('*')
            .eq('user_id', this.userId)
            .order('created_at', { ascending: false });

        if (unreadOnly) {
            query = query.eq('is_read', false);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    }

    async markNotificationRead(notificationId: string): Promise<void> {
        const { error } = await this.supabase
            .from('notifications')
            .update({
                is_read: true,
                read_at: new Date().toISOString(),
            })
            .eq('id', notificationId)
            .eq('user_id', this.userId);

        if (error) throw error;
    }

    // Templates
    async listPublicTemplates(category?: string, tags?: string[]): Promise<any[]> {
        let query = this.supabase
            .from('workflow_templates')
            .select('*')
            .eq('is_public', true);

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error } = await query.order('usage_count', { ascending: false });
        if (error) throw error;
        return data || [];
    }

    async createTemplate(template: {
        name: string;
        description?: string;
        definition: any;
        category?: string;
        tags?: string[];
        isPublic?: boolean;
    }): Promise<any> {
        const { data, error } = await this.supabase
            .from('workflow_templates')
            .insert({
                user_id: this.userId,
                name: template.name,
                description: template.description,
                definition: template.definition,
                category: template.category,
                tags: template.tags || [],
                is_public: template.isPublic || false,
                is_official: false,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Health check
    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        try {
            const { error } = await this.supabase
                .from('workflows')
                .select('id')
                .limit(1);

            return {
                status: error ? 'error' : 'healthy',
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            return {
                status: 'error',
                timestamp: new Date().toISOString(),
            };
        }
    }
}