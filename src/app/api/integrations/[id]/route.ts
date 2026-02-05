import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SupabaseWorkflowService } from '@/lib/supabase';
import { auditLogger } from '@/lib/audit-logger';
import { authOptions } from '@/lib/auth-options';

// GET /api/integrations/[id] - Get specific integration
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const service = new SupabaseWorkflowService(session.user.id);
        const integration = await service.getIntegration(id);

        if (!integration) {
            return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
        }

        await auditLogger.logApiCall(
            session.user.id,
            `/api/integrations/${id}`,
            'GET',
            200,
            0,
            { integrationId: id }
        );

        return NextResponse.json({ integration });
    } catch (error: any) {
        console.error('GET /api/integrations/[id] error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT /api/integrations/[id] - Update integration
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const integration = await req.json();

        if (!integration) {
            return NextResponse.json({ error: 'Integration data required' }, { status: 400 });
        }

        const service = new SupabaseWorkflowService(session.user.id);
        const updatedIntegration = await service.updateIntegration(id, integration);

        await auditLogger.logApiCall(
            session.user.id,
            `/api/integrations/${id}`,
            'PUT',
            200,
            0,
            { integrationId: id, type: integration.type }
        );

        return NextResponse.json({
            integration: updatedIntegration,
            message: 'Integration updated successfully'
        });
    } catch (error: any) {
        console.error('PUT /api/integrations/[id] error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/integrations/[id] - Delete integration
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const service = new SupabaseWorkflowService(session.user.id);
        await service.deleteIntegration(id);

        await auditLogger.logApiCall(
            session.user.id,
            `/api/integrations/${id}`,
            'DELETE',
            200,
            0,
            { integrationId: id }
        );

        return NextResponse.json({ message: 'Integration deleted successfully' });
    } catch (error: any) {
        console.error('DELETE /api/integrations/[id] error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}