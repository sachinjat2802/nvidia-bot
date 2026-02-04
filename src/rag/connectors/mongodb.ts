
import { DataSource, Document } from '../types';
import { MongoClient, ServerApiVersion } from 'mongodb';

export interface MongoConfig {
    uri: string;
    database: string;
    collection: string;
    fields: {
        id?: string;     // Default to _id
        content: string[]; // Fields to concatenate as content
        metadata?: string[];
    };
}

export class MongoDataSource implements DataSource {
    name = 'MongoDB';
    private client: MongoClient;
    private config: MongoConfig;
    private isConnected: boolean = false;

    constructor(config: MongoConfig) {
        this.config = config;
        this.client = new MongoClient(config.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            await this.client.db("admin").command({ ping: 1 });
            this.isConnected = true;
            console.log(`Connected to MongoDB: ${this.config.database}.${this.config.collection}`);
        } catch (error) {
            throw new Error(`Failed to connect to MongoDB: ${error}`);
        }
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.client.close();
            this.isConnected = false;
            console.log('Disconnected from MongoDB');
        }
    }

    async getData(): Promise<Document[]> {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }

        const db = this.client.db(this.config.database);
        const collection = db.collection(this.config.collection);

        // Limit to 50 documents for this demo to avoid token limits
        const cursor = collection.find({}).limit(50);

        const documents: Document[] = [];

        for await (const doc of cursor) {
            // Extract Content
            const contentParts = this.config.fields.content.map(field => {
                const val = doc[field];
                return val ? `${field}: ${val}` : '';
            });
            const content = contentParts.filter(s => s).join('\n');

            // Extract Metadata
            const metadata: Record<string, any> = {
                sourceType: 'mongodb',
                collection: this.config.collection
            };
            if (this.config.fields.metadata) {
                this.config.fields.metadata.forEach(field => {
                    if (doc[field]) metadata[field] = doc[field];
                });
            }

            // ID
            const idField = this.config.fields.id || '_id';
            const docId = doc[idField]?.toString() || new Date().toISOString();

            documents.push({
                id: `mongo-${this.config.collection}-${docId}`,
                content: content,
                metadata: metadata,
                source: this.name,
                createdAt: new Date()
            });
        }

        return documents;
    }
}
