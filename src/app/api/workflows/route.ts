import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SupabaseWorkflowService } from '@/lib/supabase';
import { auditLogger } from '@/lib/audit-logger';
import { authOptions } from '@/lib/auth-options';

// GET /api/workflows - List all workflows for user
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const workflows = await service.listWorkflows();

        await auditLogger.logApiCall(
            session.user.id,
            '/api/workflows',
            'GET',
            200,
            0,
            { count: workflows.length }
        );

        return NextResponse.json({ workflows });
    } catch (error: any) {
        console.error('GET /api/workflows error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/workflows - Create new workflow
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const workflow = await req.json();

        if (!workflow) {
            return NextResponse.json({ error: 'Workflow data required' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const newWorkflow = await service.createWorkflow(workflow);

        await auditLogger.logApiCall(
            session.user.id,
            '/api/workflows',
            'POST',
            200,
            0,
            { workflowId: newWorkflow.id, name: workflow.name }
        );

        return NextResponse.json({
            workflow: newWorkflow,
            message: 'Workflow created successfully'
        });
    } catch (error: any) {
        console.error('POST /api/workflows error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}