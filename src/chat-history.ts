import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Message } from './chat';

export interface ChatSessionData {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    messages: Message[];
}

export class ChatHistoryManager {
    private supabase: SupabaseClient;
    private userId: string;

    constructor(userId: string) {
        this.userId = userId;
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        this.supabase = createClient(supabaseUrl, supabaseServiceKey);
    }

    async createSession(title: string, initialMessages: Message[] = []): Promise<ChatSessionData> {
        const { data, error } = await this.supabase
            .from('chat_sessions')
            .insert({
                user_id: this.userId,
                title: title,
                messages: initialMessages,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw new Error(`Failed to create session: ${error.message}`);

        return this.mapToSessionData(data);
    }

    async saveSession(session: ChatSessionData): Promise<void> {
        // In Supabase context, saveSession is effectively update
        const { error } = await this.supabase
            .from('chat_sessions')
            .update({
                title: session.title, // Title might have changed?
                messages: session.messages,
                updated_at: new Date().toISOString()
            })
            .eq('id', session.id)
            .eq('user_id', this.userId);

        if (error) throw new Error(`Failed to save session: ${error.message}`);
    }

    async getSession(id: string): Promise<ChatSessionData | null> {
        const { data, error } = await this.supabase
            .from('chat_sessions')
            .select('*')
            .eq('id', id)
            .eq('user_id', this.userId)
            .single();

        if (error || !data) return null;

        return this.mapToSessionData(data);
    }

    async deleteSession(id: string): Promise<boolean> {
        const { error } = await this.supabase
            .from('chat_sessions')
            .delete()
            .eq('id', id)
            .eq('user_id', this.userId);

        return !error;
    }

    async listSessions(): Promise<Omit<ChatSessionData, 'messages'>[]> {
        const { data, error } = await this.supabase
            .from('chat_sessions')
            .select('id, title, created_at, updated_at')
            .eq('user_id', this.userId)
            .order('updated_at', { ascending: false });

        if (error) return [];

        return (data || []).map((row: any) => ({
            id: row.id,
            title: row.title,
            createdAt: new Date(row.created_at).getTime(),
            updatedAt: new Date(row.updated_at).getTime()
        }));
    }

    async updateSessionMessages(id: string, messages: Message[]): Promise<boolean> {
        const { error } = await this.supabase
            .from('chat_sessions')
            .update({
                messages: messages,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .eq('user_id', this.userId);

        return !error;
    }

    private mapToSessionData(row: any): ChatSessionData {
        return {
            id: row.id,
            title: row.title,
            createdAt: new Date(row.created_at).getTime(),
            updatedAt: new Date(row.updated_at).getTime(),
            messages: row.messages || []
        };
    }
}
