import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SupabaseWorkflowService } from '@/lib/supabase';

// GET /api/triggers - List triggers
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const triggers = await service.listTriggers();

        return NextResponse.json({ triggers });
    } catch (error: any) {
        console.error('GET /api/triggers error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/triggers - Create trigger
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { workflowId, type, config, isActive = true } = body;

        if (!workflowId || !type) {
            return NextResponse.json({ error: 'workflowId and type are required' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const trigger = await service.createTrigger({
            workflowId,
            type,
            config: config || {},
            isActive,
        });

        return NextResponse.json({ trigger });
    } catch (error: any) {
        console.error('POST /api/triggers error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}