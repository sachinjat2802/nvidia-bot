
import { NextRequest, NextResponse } from 'next/server';
import { PineconeVectorStore } from '@/rag/pinecone-store';
import { RAGManager } from '@/rag/rag-manager';
import { WebDataSource } from '@/rag/index';

export async function POST(req: NextRequest) {
    try {
        const { url, indexName } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const apiKey = process.env.PINECONE_API_KEY;
        const targetIndex = indexName || process.env.PINECONE_INDEX || 'nvidia-bot';

        let store;

        if (apiKey) {
            store = new PineconeVectorStore(apiKey, targetIndex);
        } else {
            // Fallback to local
            const { SimpleVectorStore } = await import('@/rag/simple-store');
            store = new SimpleVectorStore();
            console.log('Using SimpleVectorStore (Fallback)');
        }

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
