import { RAGManager, PineconeVectorStore, PostgresDataSource } from '../src/rag';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    console.log('--- RAG Real Connector Test ---');
    console.log('This script requires a valid Postgres DB and Pinecone API Key/Index.');

    // 1. Setup Vector Store (Pinecone)
    // Expects PINECONE_API_KEY and PINECONE_INDEX in .env
    const pineconeKey = process.env.PINECONE_API_KEY;
    const pineconeIndex = process.env.PINECONE_INDEX;

    if (!pineconeKey || !pineconeIndex) {
        console.warn('Skipping Pinecone test: missing PINECONE_API_KEY or PINECONE_INDEX in .env');
    } else {
        const vectorStore = new PineconeVectorStore(pineconeKey, pineconeIndex);
        const ragManager = new RAGManager(vectorStore);
        console.log('Initialized Pinecone Vector Store.');

        // Add Postgres Source if config exists
        const pgHost = process.env.PG_HOST;
        if (pgHost) {
            const pgSource = new PostgresDataSource({
                host: process.env.PG_HOST || 'localhost',
                user: process.env.PG_USER || 'postgres',
                password: process.env.PG_PASSWORD || 'password',
                database: process.env.PG_DB || 'postgres',
                port: Number(process.env.PG_PORT) || 5432,
                tableName: 'documents', // Assumes a table named 'documents'
                columns: {
                    id: 'id',
                    content: 'body_text',
                    metadata: ['title', 'created_at']
                }
            });
            ragManager.registerSource(pgSource);

            // Ingest
            // await ragManager.ingestAll(); // Validate before running this on real DB!
        }
    }
}

main().catch(console.error);
