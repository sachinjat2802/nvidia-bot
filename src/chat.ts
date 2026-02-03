export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export class ChatSession {
    private messages: Message[] = [];
    private historyLimit: number;

    constructor(systemPrompt?: string, historyLimit: number = 50) {
        this.historyLimit = historyLimit;
        if (systemPrompt) {
            this.messages.push({ role: 'system', content: systemPrompt });
        }
    }

    addUserMessage(content: string): void {
        this.messages.push({ role: 'user', content });
        this.enforceHistoryLimit();
    }

    addAssistantMessage(content: string): void {
        this.messages.push({ role: 'assistant', content });
        this.enforceHistoryLimit();
    }

    getMessages(): Message[] {
        return this.messages;
    }

    clear(): void {
        this.messages = [];
    }

    private enforceHistoryLimit(): void {
        if (this.messages.length > this.historyLimit) {
            const systemMessage = this.messages[0];
            this.messages = this.messages.slice(-this.historyLimit);
            if (systemMessage && this.messages[0]?.role !== 'system') {
                this.messages.unshift(systemMessage);
            }
        }
    }

    getMessageCount(): number {
        return this.messages.length;
    }
}