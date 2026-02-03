import { VectorStore, Document } from './types';
import { Pinecone } from '@pinecone-database/pinecone';

export class PineconeVectorStore implements VectorStore {
    private client: Pinecone;
    private indexName: string;

    constructor(apiKey: string, indexName: string) {
        this.client = new Pinecone({
            apiKey: apiKey
        });
        this.indexName = indexName;
    }

    async addDocuments(documents: Document[]): Promise<void> {
        console.log(`Adding ${documents.length} documents to Pinecone Index: ${this.indexName}`);

        const index = this.client.index(this.indexName);

        // Convert documents to Pinecone records
        // Note: In a real app, we need an embedding model (like OpenAI or NVIDIAs) to generate vectors.
        // For this plumbing demo, we will generate "dummy" random vectors to satisfy the API check if needed,
        // OR warn that embeddings are missing.
        // Pinecone REQUIRES vectors. 

        console.log("NOTE: Real embeddings are required for Pinecone. Using mock random vectors for demonstration.");

        // Assuming 1536 dimensions (common for OpenAI text-embedding-ada-002)
        const records = documents.map(doc => ({
            id: doc.id,
            values: Array.from({ length: 1536 }, () => Math.random()), // MOCK VECTORS
            metadata: {
                ...doc.metadata,
                content: doc.content, // storing content in metadata for retrieval
                source: doc.source
            }
        }));

        // Batch upload (Pinecone limits batch sizes, usually 100-200 is safe)
        const batchSize = 100;
        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            await index.upsert({ records: batch });
        }

        console.log(`Successfully added documents to Pinecone.`);
    }

    async search(query: string, limit: number = 5): Promise<Document[]> {
        console.log(`Searching Pinecone for: "${query}"`);
        const index = this.client.index(this.indexName);

        // Again, we need a query vector.
        console.log("NOTE: Using mock query vector.");
        const queryVector = Array.from({ length: 1536 }, () => Math.random());

        const results = await index.query({
            vector: queryVector,
            topK: limit,
            includeMetadata: true
        });

        return results.matches.map(match => {
            const metadata = match.metadata as Record<string, any>;
            return {
                id: match.id,
                content: metadata.content || '',
                metadata: metadata,
                source: metadata.source || 'pinecone',
                createdAt: new Date() // Metadata usually doesn't store dates as objects
            };
        });
    }
}
