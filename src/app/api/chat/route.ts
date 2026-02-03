import { NextRequest, NextResponse } from 'next/server';
import { NVIDIAClient } from '@/nvidia-client';
import { loadConfig } from '@/config';

export async function POST(req: NextRequest) {
    try {
        const { messages, model, stream } = await req.json();
        const config = loadConfig();
        const client = new NVIDIAClient(config);

        if (stream) {
            // Logic for streaming response
            const responseStream = await client.chatStream(messages, model);

            return new Response(responseStream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        } else {
            const content = await client.chat(messages, model);
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
