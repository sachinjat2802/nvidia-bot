import { VectorStore, Document } from './types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'simple-vectors.json');

export class SimpleVectorStore implements VectorStore {
    private lockFile!: string;
    private lockTimeout!: number;
    private maxRetries!: number;

    constructor() {
        try {
            const dir = path.dirname(DB_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            this.lockFile = DB_PATH + '.lock';
            this.lockTimeout = 30000; // 30 seconds
            this.maxRetries = 10;
        } catch (e) {
            console.error('SimpleVectorStore init error:', e);
        }
    }

    private async acquireLock(): Promise<boolean> {
        try {
            // Check if lock exists and is stale
            if (fs.existsSync(this.lockFile)) {
                try {
                    const lockTime = parseInt(fs.readFileSync(this.lockFile, 'utf-8'));
                    if (Date.now() - lockTime < this.lockTimeout) {
                        // Lock is still valid
                        return false;
                    }
                    // Lock is stale, remove it
                    fs.unlinkSync(this.lockFile);
                } catch (e) {
                    // Error reading lock file, assume stale and remove
                    try {
                        fs.unlinkSync(this.lockFile);
                    } catch (unlinkError) {
                        console.error('Failed to remove stale lock:', unlinkError);
                    }
                }
            }

            // Try to create lock file atomically using O_EXCL
            // This ensures only one process can create it
            try {
                const fd = fs.openSync(this.lockFile, 'wx', 0o644);
                fs.writeSync(fd, Date.now().toString());
                fs.closeSync(fd);
                return true;
            } catch (e: any) {
                if (e.code === 'EEXIST') {
                    // Another process created the lock
                    return false;
                }
                throw e;
            }
        } catch (e) {
            console.error('Failed to acquire lock:', e);
            return false;
        }
    }

    private releaseLock(): void {
        try {
            if (fs.existsSync(this.lockFile)) {
                fs.unlinkSync(this.lockFile);
            }
        } catch (e) {
            console.error('Failed to release lock:', e);
        }
    }

    async addDocuments(documents: Document[]): Promise<void> {
        let acquired = false;
        let retryCount = 0;
        const baseDelay = 100; // ms

        try {
            // Try to acquire lock with exponential backoff
            while (retryCount < this.maxRetries) {
                acquired = await this.acquireLock();
                if (acquired) break;

                // Wait before retry with exponential backoff
                const delay = baseDelay * Math.pow(2, retryCount);
                await new Promise(resolve => setTimeout(resolve, delay));
                retryCount++;
            }

            if (!acquired) {
                throw new Error('Could not acquire lock for vector store after ' + this.maxRetries + ' attempts');
            }

            // Load existing documents
            let currentDocs: Document[] = [];
            try {
                if (fs.existsSync(DB_PATH)) {
                    const data = fs.readFileSync(DB_PATH, 'utf-8');
                    currentDocs = JSON.parse(data);
                }
            } catch (e) {
                console.warn('Could not read existing vector store, starting new:', e);
            }

            // Remove old versions of documents with same ID
            const newIds = new Set(documents.map(d => d.id));
            const keptDocs = currentDocs.filter(d => !newIds.has(d.id));

            const combined = [...keptDocs, ...documents];

            // Atomic write: write to temp file then rename
            const tempPath = DB_PATH + '.tmp';
            fs.writeFileSync(tempPath, JSON.stringify(combined, null, 2));
            fs.renameSync(tempPath, DB_PATH);

            console.log(`Saved ${documents.length} docs to SimpleVectorStore. Total: ${combined.length}`);
        } finally {
            if (acquired) {
                this.releaseLock();
            }
        }
    }

    async search(query: string, limit: number = 3): Promise<Document[]> {
        if (!fs.existsSync(DB_PATH)) return [];
        let docs: Document[] = [];
        try {
            docs = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (e) {
            console.error('Failed to parse vector store:', e);
            return [];
        }

        if (docs.length === 0) return [];

        const terms = query.toLowerCase()
            .split(/\s+/)
            .filter(t => t.length > 0); // Allow 1+ character terms

        if (terms.length === 0) return [];

        const scored = docs.map(doc => {
            const content = (doc.content || '').toLowerCase();
            const title = (doc.metadata?.title || '').toString().toLowerCase();

            let score = 0;
            terms.forEach(term => {
                if (term.length < 2) {
                    // For very short terms, only match if they appear as whole words
                    const wordRegex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
                    score += (content.match(wordRegex) || []).length;
                    score += (title.match(wordRegex) || []).length * 5;
                } else {
                    // For longer terms, use substring matching
                    const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                    const contentMatches = (content.match(regex) || []).length;
                    const titleMatches = (title.match(regex) || []).length;
                    score += contentMatches + (titleMatches * 5);
                }
            });
            return { doc, score };
        });

        const results = scored
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score);

        return results.slice(0, limit).map(s => s.doc);
    }

    // Optional: Method to clean up stale lock file on startup
    async cleanupStaleLock(): Promise<void> {
        try {
            if (fs.existsSync(this.lockFile)) {
                const lockTime = parseInt(fs.readFileSync(this.lockFile, 'utf-8'));
                if (Date.now() - lockTime >= this.lockTimeout) {
                    fs.unlinkSync(this.lockFile);
                    console.log('Cleaned up stale lock file');
                }
            }
        } catch (e) {
            // Ignore cleanup errors
        }
    }

    // Optional: Get statistics for monitoring
    async getStats(): Promise<{ documentCount: number; lockHeld: boolean }> {
        let docs: Document[] = [];
        try {
            if (fs.existsSync(DB_PATH)) {
                docs = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
            }
        } catch (e) {
            // Ignore
        }

        return {
            documentCount: docs.length,
            lockHeld: fs.existsSync(this.lockFile)
        };
    }
}