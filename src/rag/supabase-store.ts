import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VectorStore, Document } from './types';

// Simple pipeline for embeddings (in a real app, use an external service or HuggingFace API)
// This is a placeholder for actual embedding generation
async function generateEmbedding(text: string): Promise<number[]> {
    // Return a random 384-dimensional vector for demonstration purposes
    // IN PRODUCTION: Replace this with OpenAI, Cohere, or HuggingFace inference
    // e.g. await openai.embeddings.create({ input: text, model: "text-embedding-3-small" })
    return Array.from({ length: 384 }, () => Math.random() * 2 - 1);
}

export class SupabaseVectorStore implements VectorStore {
    private supabase: SupabaseClient;
    private userId: string;
    private modelId: string;

    constructor(userId: string, modelId?: string) {
        this.userId = userId;
        this.modelId = modelId || '00000000-0000-0000-0000-000000000000'; // Default or specific model
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        this.supabase = createClient(supabaseUrl, supabaseServiceKey);
    }

    async addDocuments(documents: Document[]): Promise<void> {
        // Ensure model exists (optional, could be done upfront)
        // await this.ensureModel();

        for (const doc of documents) {
            const embedding = await generateEmbedding(doc.content);

            const { error } = await this.supabase
                .from('documents')
                .insert({
                    user_id: this.userId,
                    model_id: this.modelId,
                    content: doc.content,
                    metadata: { ...doc.metadata, source: doc.source },
                    embedding
                });

            if (error) {
                console.error('Error inserting document:', error);
                throw error;
            }
        }
    }

    async search(query: string, limit: number = 5): Promise<Document[]> {
        const embedding = await generateEmbedding(query);

        const { data, error } = await this.supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.5, // Adjust threshold
            match_count: limit,
            filter_model_id: this.modelId,
            filter_user_id: this.userId
        });

        if (error) {
            console.error('Error searching documents:', error);
            throw error;
        }

        return (data || []).map((row: any) => ({
            id: row.id,
            content: row.content,
            metadata: row.metadata,
            source: row.metadata?.source || 'unknown',
            createdAt: new Date() // Date not returned by RPC usually but available in table
        }));
    }

    // Helper to list all documents (non-vector search)
    async listDocuments(): Promise<Document[]> {
        const { data, error } = await this.supabase
            .from('documents')
            .select('*')
            .eq('user_id', this.userId)
            .eq('model_id', this.modelId)
            .order('created_at', { ascending: false });

        if (error) return [];

        return data.map((row: any) => ({
            id: row.id,
            content: row.content,
            metadata: row.metadata,
            source: row.metadata?.source || 'unknown',
            createdAt: new Date(row.created_at)
        }));
    }
}
