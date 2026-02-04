
import { NextRequest, NextResponse } from 'next/server';
import { PineconeVectorStore } from '@/rag/pinecone-store';
import { RAGManager } from '@/rag/rag-manager';
import { RawTextDataSource } from '@/rag/connectors/raw-text';
import { extractTextFromBuffer } from '@/file-processor';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        }

        // Initialize Vector Store
        const apiKey = process.env.PINECONE_API_KEY;
        const indexName = (formData.get('indexName') as string) || process.env.PINECONE_INDEX || 'nvidia-bot';
        let store;

        if (apiKey) {
            store = new PineconeVectorStore(apiKey, indexName);
        } else {
            const { SimpleVectorStore } = await import('@/rag/simple-store');
            store = new SimpleVectorStore();
        }

        const manager = new RAGManager(store);
        let successCount = 0;

        for (const file of files) {
            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                const text = await extractTextFromBuffer(buffer, file.type, `.${file.name.split('.').pop()}`);

                if (!text || text.length < 50) {
                    console.log(`Skipping file ${file.name} (not enough text content)`);
                    continue;
                }

                const source = new RawTextDataSource(text, file.name);
                manager.registerSource(source);
                successCount++;
            } catch (err) {
                console.error(`Error processing file ${file.name}:`, err);
            }
        }

        if (successCount === 0) {
            return NextResponse.json({ error: 'No valid text could be extracted from uploaded files.' }, { status: 400 });
        }

        await manager.ingestAll();

        return NextResponse.json({
            success: true,
            message: `Successfully ingested ${successCount} files.`
        });

    } catch (error: any) {
        console.error('File Ingest Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
