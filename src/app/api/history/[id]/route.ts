import { NextRequest, NextResponse } from 'next/server';
import { getHistoryManager } from '@/lib/history';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const manager = getHistoryManager();
        const session = await manager.getSession(params.id);
        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }
        return NextResponse.json(session);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { messages } = await req.json();
        const manager = getHistoryManager();
        const success = await manager.updateSessionMessages(params.id, messages);
        if (!success) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const manager = getHistoryManager();
        const success = await manager.deleteSession(params.id);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
