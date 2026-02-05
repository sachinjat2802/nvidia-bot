import { VectorStore, Document } from './types';

export class MockVectorStore implements VectorStore {
    private store: Document[] = [];

    async addDocuments(documents: Document[]): Promise<void> {
        console.log(`Adding ${documents.length} documents to Vector Store...`);
        // In a real implementation, this would generate embeddings and upsert to Pinecone/Milvus/Weaviate
        this.store.push(...documents);
        console.log(`Vector Store now contains ${this.store.length} documents.`);
    }

    async search(query: string, limit: number = 5): Promise<Document[]> {
        console.log(`Searching Vector Store for: "${query}"`);
        // Naive mock search: filter by content containing the query string (case-insensitive)
        // detailed "simulated embedding" search is overkill, simple keyword overlap is enough to show "plumbing"

        const lowerQuery = query.toLowerCase();

        const results = this.store
            .map(doc => ({
                doc,
                score: this.calculateMockScore(doc.content, lowerQuery)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(item => item.doc);

        return results;
    }

    private calculateMockScore(content: string, query: string): number {
        const lowerContent = content.toLowerCase();
        const queryTerms = query.split(/\s+/);
        let matchCount = 0;

        for (const term of queryTerms) {
            if (lowerContent.includes(term)) {
                matchCount++;
            }
        }

        return matchCount / queryTerms.length;
    }
}