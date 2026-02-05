import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { RAGManager } from '@/rag/rag-manager';
import { RawTextDataSource } from '@/rag/connectors/raw-text';
import { extractTextFromBuffer } from '@/file-processor';
import { authOptions } from '@/lib/auth-options';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        }

        // Validate file count
        const MAX_FILES = 10;
        if (files.length > MAX_FILES) {
            return NextResponse.json(
                { error: `Too many files. Maximum ${MAX_FILES} files allowed per request.` },
                { status: 400 }
            );
        }

        // Validate each file
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        const ALLOWED_EXTENSIONS = ['.txt', '.pdf', '.docx', '.doc', '.md', '.html', '.json', '.csv'];

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: `File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
                    { status: 400 }
                );
            }

            const ext = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
                return NextResponse.json(
                    { error: `File type not allowed: ${file.name}. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}` },
                    { status: 400 }
                );
            }
        }

        // Initialize Vector Store
        // Initialize Supabase Vector Store
        const { SupabaseVectorStore } = await import('@/rag/supabase-store');
        const store = new SupabaseVectorStore(session.user.id, '00000000-0000-0000-0000-000000000000');
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