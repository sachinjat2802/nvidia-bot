
import { NextRequest, NextResponse } from 'next/server';
import { PineconeVectorStore } from '@/rag/pinecone-store';
import { RAGManager } from '@/rag/rag-manager';
import { WebDataSource } from '@/rag/connectors/web';
import { RawTextDataSource } from '@/rag/connectors/raw-text';
import { PostgresDataSource } from '@/rag/connectors/postgres';
import { MockCMSDataSource } from '@/rag/connectors/cms';
import { MongoDataSource } from '@/rag/connectors/mongodb';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, config, indexName } = body;

        if (!type || !config) {
            return NextResponse.json({ error: 'Type and config are required' }, { status: 400 });
        }

        // Initialize Vector Store (Pinecone or Local Fallback)
        const apiKey = process.env.PINECONE_API_KEY;
        const targetIndex = indexName || process.env.PINECONE_INDEX || 'nvidia-bot';
        let store;

        if (apiKey) {
            store = new PineconeVectorStore(apiKey, targetIndex);
        } else {
            const { SimpleVectorStore } = await import('@/rag/simple-store');
            store = new SimpleVectorStore();
            console.log('Using SimpleVectorStore (Fallback)');
        }

        const manager = new RAGManager(store);
        let source;

        // Initialize Source based on Type
        switch (type) {
            case 'web':
                if (!config.url) throw new Error('URL is required for Web source');
                source = new WebDataSource(config.url);
                break;
            case 'text':
                if (!config.text) throw new Error('Text is required for Raw Text source');
                source = new RawTextDataSource(config.text, config.title);
                break;
            case 'postgres':
                // config should match PostgresConfig
                source = new PostgresDataSource(config);
                break;
            case 'mongo':
                // config should match MongoConfig
                source = new MongoDataSource(config);
                break;
            case 'cms':
                if (!config.apiUrl || !config.apiKey) throw new Error('API URL and Key required for CMS');
                source = new MockCMSDataSource(config.apiUrl, config.apiKey);
                break;
            default:
                throw new Error(`Unknown source type: ${type}`);
        }

        manager.registerSource(source);
        await manager.ingestAll();

        return NextResponse.json({
            success: true,
            message: `Successfully ingested content from ${type} source.`
        });

    } catch (error: any) {
        console.error('Ingest API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
