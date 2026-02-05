-- Chat History Tables

CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Link to your auth system user ID (can be uuid or text depending on auth provider, assuming text/uuid consistent)
    title TEXT NOT NULL,
    messages JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by user (filtered by user_id always)
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at DESC);

-- RLS Policies (if using Supabase Auth, otherwise managed by service role in code)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their own chats
CREATE POLICY "Users can view own chat sessions" 
ON chat_sessions FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own chat sessions" 
ON chat_sessions FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own chat sessions" 
ON chat_sessions FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own chat sessions" 
ON chat_sessions FOR DELETE 
USING (auth.uid()::text = user_id::text);
