import { DataSource, VectorStore, Document } from './types';

export class RAGManager {
    private sources: DataSource[] = [];
    private vectorStore: VectorStore;

    constructor(vectorStore: VectorStore) {
        this.vectorStore = vectorStore;
    }

    registerSource(source: DataSource) {
        this.sources.push(source);
        console.log(`Registered Data Source: ${source.name}`);
    }

    async ingestAll(): Promise<void> {
        console.log('Starting ingestion from all sources...');
        for (const source of this.sources) {
            try {
                await source.connect();
                console.log(`Fetching data from ${source.name}...`);
                const documents = await source.getData();
                console.log(`Retrieved ${documents.length} documents from ${source.name}.`);

                await this.vectorStore.addDocuments(documents);
                await source.disconnect();
            } catch (error) {
                console.error(`Error ingesting from ${source.name}:`, error);
            }
        }
        console.log('Ingestion complete.');
    }

    async retrieve(query: string): Promise<Document[]> {
        return this.vectorStore.search(query);
    }
}
