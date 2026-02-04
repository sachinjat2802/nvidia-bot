
import { VectorStore, Document } from './types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'simple-vectors.json');

export class SimpleVectorStore implements VectorStore {
    constructor() {
        try {
            const dir = path.dirname(DB_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        } catch (e) {
            console.error('SimpleVectorStore init error:', e);
        }
    }

    async addDocuments(documents: Document[]): Promise<void> {
        let currentDocs: Document[] = [];
        try {
            if (fs.existsSync(DB_PATH)) {
                const data = fs.readFileSync(DB_PATH, 'utf-8');
                currentDocs = JSON.parse(data);
            }
        } catch (e) {
            console.warn('Could not read existing vector store, starting new.');
        }

        // Remove old versions of documents with same ID
        const newIds = new Set(documents.map(d => d.id));
        const keptDocs = currentDocs.filter(d => !newIds.has(d.id));

        const combined = [...keptDocs, ...documents];

        fs.writeFileSync(DB_PATH, JSON.stringify(combined, null, 2));
        console.log(`Saved ${documents.length} docs to SimpleVectorStore. Total: ${combined.length}`);
    }

    async search(query: string, limit: number = 3): Promise<Document[]> {
        if (!fs.existsSync(DB_PATH)) return [];
        let docs: Document[] = [];
        try {
            docs = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (e) { return []; }

        const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
        if (terms.length === 0) return []; // Return nothing if query is empty

        const scored = docs.map(doc => {
            const content = (doc.content || '').toLowerCase();
            const title = (doc.metadata?.title || '').toString().toLowerCase();

            let score = 0;
            terms.forEach(term => {
                // Count occurrences
                const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                const contentMatches = (content.match(regex) || []).length;
                const titleMatches = (title.match(regex) || []).length;

                score += contentMatches + (titleMatches * 5);
            });
            return { doc, score };
        });

        const results = scored
            .filter(s => s.score > 0)
            .sort((a, b) => b.score - a.score);

        return results.slice(0, limit).map(s => s.doc);
    }
}
