-- Enable pgvector extension
create extension if not exists vector;

-- RAG Models Table
CREATE TABLE IF NOT EXISTS rag_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE rag_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own rag models" ON rag_models FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own rag models" ON rag_models FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own rag models" ON rag_models FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own rag models" ON rag_models FOR DELETE USING (auth.uid()::text = user_id::text);

-- Documents Table (Embeddings)
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    model_id UUID REFERENCES rag_models(id) ON DELETE CASCADE,
    content TEXT,
    metadata JSONB DEFAULT '{}',
    embedding vector(384), -- Using 384 dimensions for all-MiniLM-L6-v2, adjust if using OpenAI (1536)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents" ON documents FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete own documents" ON documents FOR DELETE USING (auth.uid()::text = user_id::text);

-- Similarity Search Function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(384),
  match_threshold float,
  match_count int,
  filter_model_id uuid,
  filter_user_id uuid
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  AND documents.model_id = filter_model_id
  AND documents.user_id = filter_user_id
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
