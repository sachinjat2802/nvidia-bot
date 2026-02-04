import { NextRequest, NextResponse } from 'next/server';
import { NVIDIAClient } from '@/nvidia-client';
import { loadConfig } from '@/config';


export async function POST(req: NextRequest) {
    try {
        const { messages, model, stream, useRag } = await req.json();
        const config = loadConfig();
        const client = new NVIDIAClient(config);

        let systemContext = '';

        // RAG Integration
        // Only attempt RAG if useRag is not explicitly false
        if (useRag !== false) {
            try {
                let vectorStore;
                if (process.env.PINECONE_API_KEY) {
                    const { PineconeVectorStore } = await import('@/rag/pinecone-store');
                    const apiKey = process.env.PINECONE_API_KEY;
                    const indexName = process.env.PINECONE_INDEX || 'nvidia-bot';
                    vectorStore = new PineconeVectorStore(apiKey, indexName);
                } else {
                    const { SimpleVectorStore } = await import('@/rag/simple-store');
                    vectorStore = new SimpleVectorStore();
                }

                const { RAGManager } = await import('@/rag/rag-manager');
                const ragManager = new RAGManager(vectorStore);

                // Get the last user message for retrieval query
                const lastMessage = messages[messages.length - 1];
                if (lastMessage && lastMessage.role === 'user') {
                    console.log('Retrieving context for:', lastMessage.content);
                    const docs = await ragManager.retrieve(lastMessage.content);

                    if (docs && docs.length > 0) {
                        systemContext = `
The following is retrieved context from the knowledge base that may be relevant. 
Use this context to answer the user's question if applicable. 
If the context is not relevant, ignore it.

CONTEXT:
${docs.map(d => `[Source: ${d.metadata.title || d.id}]\n${d.content}`).join('\n\n')}
--------------------------------------------------
`;
                        console.log(`Retrieved ${docs.length} documents for context.`);
                    }
                }
            } catch (err: any) {
                console.error('RAG Retrieval failed (continuing without context):', err.message);
            }
        }

        // Inject context into the messages
        // If there is a system message, append to it. Else create one.
        const msgList = [...messages];
        if (systemContext) {
            const systemIndex = msgList.findIndex(m => m.role === 'system');
            if (systemIndex >= 0) {
                msgList[systemIndex].content += `\n\n${systemContext}`;
            } else {
                msgList.unshift({
                    role: 'system',
                    content: `You are a helpful AI assistant augmented with knowledge from a knowledge base.\n${systemContext}`
                });
            }
        }

        if (stream) {
            // Logic for streaming response
            const responseStream = await client.chatStream(msgList, model);

            return new Response(responseStream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        } else {
            const content = await client.chat(msgList, model);
            return NextResponse.json({ content });
        }
    } catch (error: any) {
        console.error('Chat API Error:', error.message || error);
        const status = error.status || 500;
        return NextResponse.json({
            error: error.message || 'Internal Server Error',
            details: error.response?.data || undefined
        }, { status });
    }
}
