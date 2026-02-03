import { NextRequest, NextResponse } from 'next/server';
import { getHistoryManager } from '@/lib/history';

export async function GET() {
    try {
        const manager = getHistoryManager();
        const sessions = await manager.listSessions();
        return NextResponse.json(sessions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, messages } = await req.json();
        const manager = getHistoryManager();
        const session = await manager.createSession(title || 'New Chat', messages || []);
        return NextResponse.json(session);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
