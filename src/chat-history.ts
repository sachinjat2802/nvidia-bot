
import fs from 'fs';
import path from 'path';
import { Message } from './chat';

export interface ChatSessionData {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    messages: Message[];
}

export class ChatHistoryManager {
    private storageDir: string;

    constructor(storageDir: string) {
        this.storageDir = storageDir;
        if (!fs.existsSync(this.storageDir)) {
            fs.mkdirSync(this.storageDir, { recursive: true });
        }
    }

    private getFilePath(id: string): string {
        return path.join(this.storageDir, `${id}.json`);
    }

    async createSession(title: string, initialMessages: Message[] = []): Promise<ChatSessionData> {
        const id = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
        const session: ChatSessionData = {
            id,
            title,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: initialMessages
        };
        await this.saveSession(session);
        return session;
    }

    async saveSession(session: ChatSessionData): Promise<void> {
        session.updatedAt = Date.now();
        await fs.promises.writeFile(this.getFilePath(session.id), JSON.stringify(session, null, 2));
    }

    async getSession(id: string): Promise<ChatSessionData | null> {
        try {
            const data = await fs.promises.readFile(this.getFilePath(id), 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }

    async deleteSession(id: string): Promise<boolean> {
        try {
            await fs.promises.unlink(this.getFilePath(id));
            return true;
        } catch (error) {
            return false;
        }
    }

    async listSessions(): Promise<Omit<ChatSessionData, 'messages'>[]> {
        try {
            const files = await fs.promises.readdir(this.storageDir);
            const sessions = await Promise.all(
                files
                    .filter(f => f.endsWith('.json'))
                    .map(async f => {
                        try {
                            const data = await fs.promises.readFile(path.join(this.storageDir, f), 'utf-8');
                            const session = JSON.parse(data);
                            return {
                                id: session.id,
                                title: session.title,
                                createdAt: session.createdAt,
                                updatedAt: session.updatedAt
                            };
                        } catch (e) {
                            return null;
                        }
                    })
            );
            return sessions
                .filter((s): s is Omit<ChatSessionData, 'messages'> => s !== null)
                .sort((a, b) => b.updatedAt - a.updatedAt);
        } catch (error) {
            return [];
        }
    }

    async updateSessionMessages(id: string, messages: Message[]): Promise<boolean> {
        const session = await this.getSession(id);
        if (!session) return false;

        session.messages = messages;
        await this.saveSession(session);
        return true;
    }
}
