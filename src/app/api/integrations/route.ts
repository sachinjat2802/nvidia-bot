import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SupabaseWorkflowService } from '@/lib/supabase';
import { auditLogger } from '@/lib/audit-logger';
import { authOptions } from '@/lib/auth-options';

// GET /api/integrations - List all integrations for user
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const integrations = await service.listIntegrations();

        await auditLogger.logApiCall(
            session.user.id,
            '/api/integrations',
            'GET',
            200,
            0,
            { count: integrations.length }
        );

        return NextResponse.json({ integrations });
    } catch (error: any) {
        console.error('GET /api/integrations error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/integrations - Create new integration
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const integration = await req.json();

        if (!integration) {
            return NextResponse.json({ error: 'Integration data required' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const newIntegration = await service.createIntegration(integration);

        await auditLogger.logApiCall(
            session.user.id,
            '/api/integrations',
            'POST',
            200,
            0,
            { integrationId: newIntegration.id, type: integration.type }
        );

        return NextResponse.json({
            integration: newIntegration,
            message: 'Integration created successfully'
        });
    } catch (error: any) {
        console.error('POST /api/integrations error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}