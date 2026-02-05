-- Workflow Tables

-- Workflows Table
CREATE TABLE IF NOT EXISTS workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    definition JSONB NOT NULL,
    version TEXT DEFAULT '1.0.0',
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workflows" ON workflows FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own workflows" ON workflows FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own workflows" ON workflows FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own workflows" ON workflows FOR DELETE USING (auth.uid()::text = user_id::text);

-- Triggers Table
CREATE TABLE IF NOT EXISTS triggers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    trigger_count INTEGER DEFAULT 0,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_triggers_user_id ON triggers(user_id);
ALTER TABLE triggers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own triggers" ON triggers FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own triggers" ON triggers FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own triggers" ON triggers FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own triggers" ON triggers FOR DELETE USING (auth.uid()::text = user_id::text);

-- Executions Table
CREATE TABLE IF NOT EXISTS executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    workflow_version TEXT,
    trigger_id UUID REFERENCES triggers(id) ON DELETE SET NULL,
    status TEXT NOT NULL,
    input_context JSONB DEFAULT '{}',
    output_context JSONB DEFAULT '{}',
    step_results JSONB DEFAULT '[]',
    error TEXT,
    error_type TEXT,
    duration_ms INTEGER,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_executions_user_id ON executions(user_id);
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own executions" ON executions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own executions" ON executions FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own executions" ON executions FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Integrations Table
CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    config JSONB DEFAULT '{}',
    credentials JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMPTZ,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_integrations_user_id ON integrations(user_id);
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own integrations" ON integrations FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own integrations" ON integrations FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own integrations" ON integrations FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own integrations" ON integrations FOR DELETE USING (auth.uid()::text = user_id::text);

-- Usage Metrics Table
CREATE TABLE IF NOT EXISTS usage_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    metric_type TEXT NOT NULL,
    endpoint TEXT,
    workflow_id UUID,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    count INTEGER DEFAULT 0,
    tokens INTEGER DEFAULT 0,
    bytes INTEGER DEFAULT 0,
    cost_cents INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, metric_type, endpoint, workflow_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_usage_metrics_user_id ON usage_metrics(user_id);
ALTER TABLE usage_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage metrics" ON usage_metrics FOR SELECT USING (auth.uid()::text = user_id::text);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid()::text = user_id::text);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY, -- Should match Auth User ID
    email TEXT,
    full_name TEXT,
    company_name TEXT,
    timezone TEXT DEFAULT 'UTC',
    theme TEXT DEFAULT 'dark',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    usage_quota JSONB DEFAULT '{"workflows": 10, "executions": 1000, "api_calls": 10000}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid()::text = id::text);

-- Trigger function for creating profile on signup (Optional, specific to provider)
-- ... (skipping for now, can be added if using Supabase Auth triggers)

-- Template Table (Public)
CREATE TABLE IF NOT EXISTS workflow_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name TEXT NOT NULL,
    description TEXT,
    definition JSONB NOT NULL,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    is_official BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE workflow_templates ENABLE ROW LEVEL SECURITY;

-- Everyone can read public templates
CREATE POLICY "Public templates are viewable by everyone" ON workflow_templates FOR SELECT USING (is_public = TRUE);
-- Only creators/admins can update
CREATE POLICY "Creators can update own templates" ON workflow_templates FOR UPDATE USING (auth.uid()::text = user_id::text);
