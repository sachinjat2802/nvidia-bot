import { ChatHistoryManager } from '../chat-history';

export function getHistoryManager(userId: string) {
    if (!userId) {
        throw new Error("UserId is required for history manager");
    }
    return new ChatHistoryManager(userId);
}
