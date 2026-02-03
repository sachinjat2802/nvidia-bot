export interface Document {
    id: string;
    content: string;
    metadata: Record<string, any>;
    source: string; // e.g., "file-system", "sql-db", "cms"
    createdAt: Date;
}

export interface DataSource {
    name: string;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getData(): Promise<Document[]>;
}

export interface VectorStore {
    addDocuments(documents: Document[]): Promise<void>;
    search(query: string, limit?: number): Promise<Document[]>;
}
