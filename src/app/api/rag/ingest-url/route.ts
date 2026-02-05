import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { RAGManager } from '@/rag/rag-manager';
import { WebDataSource } from '@/rag/connectors/web';
import { validate, RAGIngestSchema, formatValidationErrors } from '@/lib/validation';
import { authOptions } from '@/lib/auth-options';
import { SupabaseVectorStore } from '@/rag/supabase-store';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // Validate request
        const { data, errors } = validate(RAGIngestSchema, body);
        if (errors || !data) {
            return NextResponse.json(
                { error: 'Validation failed', details: errors ? formatValidationErrors(errors) : 'Invalid data' },
                { status: 400 }
            );
        }

        const { url } = data;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Initialize Supabase Vector Store
        // Use a default model ID for now, or fetch active one
        // For simplicity, we use a nil UUID for the default model logic in the store
        const store = new SupabaseVectorStore(session.user.id, '00000000-0000-0000-0000-000000000000');
        const manager = new RAGManager(store);
        const webSource = new WebDataSource(url);

        manager.registerSource(webSource);
        await manager.ingestAll();

        return NextResponse.json({ success: true, message: `Successfully ingested content from ${url}` });
    } catch (error: any) {
        console.error('Ingest API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}