import path from 'path';
import { ChatHistoryManager } from '../chat-history';

let historyManager: ChatHistoryManager | null = null;

export function getHistoryManager() {
    if (!historyManager) {
        const storageDir = process.env.CHAT_HISTORY_DIR || path.join(process.cwd(), 'chat-data');
        historyManager = new ChatHistoryManager(storageDir);
    }
    return historyManager;
}
