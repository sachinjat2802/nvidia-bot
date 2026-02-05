import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { RAGManager } from '@/rag/rag-manager';
import { authOptions } from '@/lib/auth-options';
import { NVIDIAClient } from '@/nvidia-client';
import { Config } from '@/config';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { messages, model, useRag } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
        }

        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role !== 'user') {
            return NextResponse.json({ error: 'Last message must be from user' }, { status: 400 });
        }

        let context = '';
        let sources = [];

        if (useRag) {
            try {
                // Initialize RAG
                const { SupabaseVectorStore } = await import('@/rag/supabase-store');
                const store = new SupabaseVectorStore(session.user.id);
                const rag = new RAGManager(store);

                // Retrieve relevant documents
                const docs = await rag.retrieve(lastMessage.content);
                context = docs.map(d => d.content).join('\n\n');
                sources = docs.map(d => ({ id: d.id, content: d.content }));
            } catch (err) {
                console.error('RAG Retrieval Error:', err);
                // Continue without RAG if it fails
            }
        }

        const config: Config = {
            apiKey: process.env.NVIDIA_API_KEY || '',
            baseUrl: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
            defaultModel: process.env.DEFAULT_MODEL || 'meta/llama-3.1-70b-instruct',
            chatHistoryLimit: 50
        };

        const client = new NVIDIAClient(config);

        // Prepare messages with context
        const finalMessages = [...messages];
        if (context) {
            // Find system message or add one
            const systemIndex = finalMessages.findIndex(m => m.role === 'system');

            const contextPrompt = `\n\nUse the following context to answer the user's question. If the answer is not in the context, just say you don't know or answer from your general knowledge, but prioritize the context.\n\nContext:\n${context}`;

            if (systemIndex >= 0) {
                finalMessages[systemIndex].content += contextPrompt;
            } else {
                finalMessages.unshift({ role: 'system', content: `You are a helpful assistant.${contextPrompt}` });
            }
        }

        const stream = await client.chatStream(finalMessages, model);

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}