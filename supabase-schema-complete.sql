-- =====================================================
-- MOONU BOT - COMPLETE DATABASE SCHEMA
-- Production-ready schema with RLS and audit logging
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USER PROFILES (extends Supabase Auth users)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    company_name VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'UTC',
    theme VARCHAR(20) DEFAULT 'dark',
    notifications_enabled BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}', -- User-specific preferences
    usage_quota JSONB DEFAULT '{"workflows": 100, "executions": 1000, "api_calls": 10000}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_company ON user_profiles(company_name);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- WORKFLOWS (with full definition)
-- =====================================================
CREATE TABLE IF NOT EXISTS workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    definition JSONB NOT NULL, -- Full WorkflowDefinition
    version VARCHAR(50) DEFAULT '1.0.0',
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false, -- For sharing/templates
    execution_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_created_at ON workflows(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflows_is_active ON workflows(is_active);
CREATE INDEX IF NOT EXISTS idx_workflows_tags ON workflows USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_workflows_definition ON workflows USING GIN(definition);

-- RLS for workflows
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own workflows" ON workflows
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workflows" ON workflows
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workflows" ON workflows
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workflows" ON workflows
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS (webhook, schedule, event)
-- =====================================================
CREATE TABLE IF NOT EXISTS triggers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('webhook', 'schedule', 'event')),
    config JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMPTZ,
    trigger_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, workflow_id, type)
);

CREATE INDEX IF NOT EXISTS idx_triggers_user_id ON triggers(user_id);
CREATE INDEX IF NOT EXISTS idx_triggers_workflow_id ON triggers(workflow_id);
CREATE INDEX IF NOT EXISTS idx_triggers_type ON triggers(type);
CREATE INDEX IF NOT EXISTS idx_triggers_is_active ON triggers(is_active);
CREATE INDEX IF NOT EXISTS idx_triggers_config ON triggers USING GIN(config);

-- RLS for triggers
ALTER TABLE triggers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own triggers" ON triggers
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own triggers" ON triggers
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own triggers" ON triggers
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own triggers" ON triggers
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- WORKFLOW EXECUTIONS (detailed tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    workflow_version VARCHAR(50) NOT NULL,
    trigger_id UUID REFERENCES triggers(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed', 'stopped', 'timeout')),
    input_context JSONB DEFAULT '{}',
    output_context JSONB DEFAULT '{}',
    step_results JSONB DEFAULT '[]',
    error TEXT,
    error_type VARCHAR(100),
    duration_ms INTEGER,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_executions_user_id ON executions(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_workflow_id ON executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_executions_status ON executions(status);
CREATE INDEX IF NOT EXISTS idx_executions_created_at ON executions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_executions_started_at ON executions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_executions_trigger_id ON executions(trigger_id);
CREATE INDEX IF NOT EXISTS idx_executions_input ON executions USING GIN(input_context);
CREATE INDEX IF NOT EXISTS idx_executions_output ON executions USING GIN(output_context);

-- RLS for executions
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own executions" ON executions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own executions" ON executions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own executions" ON executions
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- INTEGRATIONS (API keys, DB connections, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- e.g., 'postgres', 'mongodb', 'slack', 's3', 'smtp', 'openai', 'anthropic'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    config JSONB NOT NULL DEFAULT '{}', -- Encrypted in application layer
    credentials JSONB DEFAULT '{}', -- Sensitive credentials (encrypted)
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_integrations_type ON integrations(type);
CREATE INDEX IF NOT EXISTS idx_integrations_is_active ON integrations(is_active);
CREATE INDEX IF NOT EXISTS idx_integrations_config ON integrations USING GIN(config);

-- RLS for integrations
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own integrations" ON integrations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own integrations" ON integrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own integrations" ON integrations
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own integrations" ON integrations
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- AUDIT LOGS (comprehensive tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    action VARCHAR(100) NOT NULL, -- e.g., 'workflow.created', 'user.login', 'integration.deleted'
    resource_type VARCHAR(50) NOT NULL, -- e.g., 'workflow', 'trigger', 'execution', 'integration', 'user'
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_session ON audit_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_metadata ON audit_logs USING GIN(metadata);

-- RLS for audit_logs (users can only see their own logs)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own audit logs" ON audit_logs
    FOR SELECT USING (auth.uid() = user_id);
-- INSERT is allowed from backend only (service role)

-- =====================================================
-- API USAGE METRICS (track quotas, rate limits)
-- =====================================================
CREATE TABLE IF NOT EXISTS usage_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL, -- 'api_call', 'workflow_execution', 'llm_token', 'file_upload'
    endpoint VARCHAR(255),
    workflow_id UUID REFERENCES workflows(id) ON DELETE SET NULL,
    count INTEGER DEFAULT 1,
    tokens INTEGER DEFAULT 0, -- For LLM usage
    bytes BIGINT DEFAULT 0, -- For file/data transfer
    cost_cents INTEGER DEFAULT 0, -- Cost in cents
    metadata JSONB DEFAULT '{}',
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, metric_type, endpoint, workflow_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_usage_metrics_user_id ON usage_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_metrics_period ON usage_metrics(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_usage_metrics_type ON usage_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_usage_metrics_workflow ON usage_metrics(workflow_id);

-- RLS for usage_metrics
ALTER TABLE usage_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own usage metrics" ON usage_metrics
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage metrics" ON usage_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- NOTIFICATIONS (in-app notifications)
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'execution_complete', 'workflow_error', 'trigger_fired', 'system'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_expires ON notifications(expires_at) WHERE expires_at IS NOT NULL;

-- RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON notifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- WEBHOOK SUBSCRIPTIONS (for external callbacks)
-- =====================================================
CREATE TABLE IF NOT EXISTS webhook_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    trigger_id UUID NOT NULL REFERENCES triggers(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    secret VARCHAR(255), -- For HMAC verification
    events TEXT[] DEFAULT '{}', -- Events to subscribe to
    is_active BOOLEAN DEFAULT true,
    last_delivered_at TIMESTAMPTZ,
    failure_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(trigger_id, url)
);

CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_user_id ON webhook_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_trigger_id ON webhook_subscriptions(trigger_id);
CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_is_active ON webhook_subscriptions(is_active);

-- RLS for webhook_subscriptions
ALTER TABLE webhook_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own webhook subscriptions" ON webhook_subscriptions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own webhook subscriptions" ON webhook_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own webhook subscriptions" ON webhook_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own webhook subscriptions" ON webhook_subscriptions
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FILE UPLOADS (track uploaded files)
-- =====================================================
CREATE TABLE IF NOT EXISTS file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL, -- Path in storage (S3, GCS, etc.)
    storage_provider VARCHAR(50) DEFAULT 'local',
    metadata JSONB DEFAULT '{}',
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_storage_path ON file_uploads(storage_path);
CREATE INDEX IF NOT EXISTS idx_file_uploads_created_at ON file_uploads(created_at DESC);

-- RLS for file_uploads
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own file uploads" ON file_uploads
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own file uploads" ON file_uploads
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own file uploads" ON file_uploads
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- TEMPLATES (workflow templates for sharing)
-- =====================================================
CREATE TABLE IF NOT EXISTS workflow_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for official templates
    name VARCHAR(255) NOT NULL,
    description TEXT,
    definition JSONB NOT NULL,
    category VARCHAR(100),
    tags TEXT[] DEFAULT '{}',
    is_official BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workflow_templates_is_public ON workflow_templates(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_workflow_templates_category ON workflow_templates(category);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_tags ON workflow_templates USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_definition ON workflow_templates USING GIN(definition);

-- RLS for workflow_templates
ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view public templates" ON workflow_templates
    FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert own templates" ON workflow_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update own templates" ON workflow_templates
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own templates" ON workflow_templates
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS FOR AUDIT LOGGING
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
    BEFORE UPDATE ON workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_triggers_updated_at
    BEFORE UPDATE ON triggers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at
    BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_subscriptions_updated_at
    BEFORE UPDATE ON webhook_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_templates_updated_at
    BEFORE UPDATE ON workflow_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment workflow execution count
CREATE OR REPLACE FUNCTION increment_workflow_execution_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' OR NEW.status = 'failed' THEN
        UPDATE workflows
        SET execution_count = execution_count + 1,
            last_executed_at = NEW.started_at
        WHERE id = NEW.workflow_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_workflow_execution
    AFTER INSERT ON executions
    FOR EACH ROW EXECUTE FUNCTION increment_workflow_execution_count();

-- Function to increment trigger count
CREATE OR REPLACE FUNCTION increment_trigger_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE triggers
    SET trigger_count = trigger_count + 1,
        last_triggered_at = NOW()
    WHERE id = NEW.trigger_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_trigger_trigger_count
    AFTER INSERT ON executions
    FOR EACH ROW
    WHEN (NEW.trigger_id IS NOT NULL)
    EXECUTE FUNCTION increment_trigger_count();

-- =====================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- =====================================================

-- Get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    stats JSONB;
BEGIN
    SELECT jsonb_build_object(
        'workflows_count', (SELECT COUNT(*) FROM workflows WHERE user_id = p_user_id AND is_active = true),
        'executions_today', (SELECT COUNT(*) FROM executions WHERE user_id = p_user_id AND DATE(created_at) = CURRENT_DATE),
        'triggers_count', (SELECT COUNT(*) FROM triggers WHERE user_id = p_user_id AND is_active = true),
        'integrations_count', (SELECT COUNT(*) FROM integrations WHERE user_id = p_user_id AND is_active = true),
        'total_executions', (SELECT COUNT(*) FROM executions WHERE user_id = p_user_id),
        'success_rate', (
            SELECT ROUND(
                (COUNT(*) FILTER (WHERE status = 'completed')::NUMERIC / NULLIF(COUNT(*), 0)) * 100, 2
            )
            FROM executions
            WHERE user_id = p_user_id
        )
    ) INTO stats;

    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clean up old audit logs (retention: 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void AS $$
BEGIN
    DELETE FROM audit_logs
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL DATA (optional system templates)
-- =====================================================

-- Insert some default workflow templates
INSERT INTO workflow_templates (id, user_id, name, description, definition, category, tags, is_official, is_public) VALUES
(
    uuid_generate_v4(),
    NULL,
    'Simple Greeting',
    'A simple workflow that generates a greeting message',
    '{"name": "Simple Greeting", "description": "Generates a personalized greeting", "version": "1.0.0", "steps": [{"id": "greet", "type": "llm", "name": "Generate Greeting", "llmConfig": {"model": "meta/llama-3.1-8b-instruct", "content": "Hello ${input.name}! How can I help you today?"}}]}',
    'Utilities',
    ARRAY['greeting', 'simple', 'llm'],
    true,
    true
) ON CONFLICT DO NOTHING;

INSERT INTO workflow_templates (id, user_id, name, description, definition, category, tags, is_official, is_public) VALUES
(
    uuid_generate_v4(),
    NULL,
    'HTTP Request',
    'Make an HTTP API call and process the response',
    '{"name": "HTTP Request", "description": "Fetches data from an API", "version": "1.0.0", "steps": [{"id": "http", "type": "http", "name": "Fetch Data", "httpConfig": {"url": "https://api.example.com/data", "method": "GET", "responseType": "json"}}]}',
    'API',
    ARRAY['http', 'api', 'rest'],
    true,
    true
) ON CONFLICT DO NOTHING;

-- =====================================================
-- COMMENTS (documentation)
-- =====================================================

COMMENT ON TABLE user_profiles IS 'Extended user profile information beyond Supabase Auth';
COMMENT ON TABLE workflows IS 'User-defined workflows with full JSONB definition';
COMMENT ON TABLE triggers IS 'Workflow triggers (webhook, schedule, event)';
COMMENT ON TABLE executions IS 'Detailed execution history and results';
COMMENT ON TABLE integrations IS 'Stored integrations (DB connections, API keys, etc.)';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for all user actions';
COMMENT ON TABLE usage_metrics IS 'Usage tracking for quotas and billing';
COMMENT ON TABLE notifications IS 'In-app notification system';
COMMENT ON TABLE webhook_subscriptions IS 'External webhook endpoints for notifications';
COMMENT ON TABLE file_uploads IS 'Track uploaded files and metadata';
COMMENT ON TABLE workflow_templates IS 'Reusable workflow templates (official and user-created)';

COMMENT ON COLUMN user_profiles.preferences IS 'JSON object storing user preferences like default model, theme settings, etc.';
COMMENT ON COLUMN user_profiles.usage_quota IS 'JSON object with quota limits: {"workflows": 100, "executions": 1000, "api_calls": 10000}';
COMMENT ON COLUMN workflows.definition IS 'Complete workflow definition including steps, connections, and configuration';
COMMENT ON COLUMN executions.step_results IS 'Array of step execution results with status, output, duration, and errors';
COMMENT ON COLUMN integrations.config IS 'Non-sensitive configuration (encrypted at rest by application)';
COMMENT ON COLUMN integrations.credentials IS 'Sensitive credentials (API keys, passwords) - must be encrypted by application';
COMMENT ON COLUMN audit_logs.metadata IS 'Additional context like browser info, location, etc.';
COMMENT ON COLUMN usage_metrics.metric_type IS 'Type of metric: api_call, workflow_execution, llm_token, file_upload';
COMMENT ON COLUMN usage_metrics.cost_cents IS 'Cost in cents for this metric (for billing)';

-- =====================================================
-- GRANTS (for service role only)
-- =====================================================

-- Grant usage on schemas
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant all privileges on all tables to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================
-- END OF SCHEMA
-- =====================================================