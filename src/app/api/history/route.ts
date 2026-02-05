import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getHistoryManager } from '@/lib/history';
import { authOptions } from '@/lib/auth-options';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const manager = getHistoryManager(session.user.id);
        const sessions = await manager.listSessions();
        return NextResponse.json(sessions);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, messages } = await req.json();
        const manager = getHistoryManager(session.user.id);
        const sessionData = await manager.createSession(title || 'New Chat', messages || []);
        return NextResponse.json(sessionData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
