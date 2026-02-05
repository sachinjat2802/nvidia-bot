import { DataSource, Document } from '../types';
import { Pool, PoolConfig } from 'pg';

export interface PostgresConfig extends PoolConfig {
    tableName: string;
    columns: {
        id: string;
        content: string; // The column to allow simple full-text search or just retrieval
        metadata?: string[]; // Columns to store as metadata
    };
}

// Whitelist of allowed characters for table and column names
const ALLOWED_IDENTIFIER_CHARS = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function validateIdentifier(name: string, field: string): void {
    if (!ALLOWED_IDENTIFIER_CHARS.test(name)) {
        throw new Error(`Invalid ${field}: "${name}". Only alphanumeric and underscore allowed, must start with letter.`);
    }
}

export class PostgresDataSource implements DataSource {
    name = 'PostgreSQL Database';
    private pool: Pool;
    private config: PostgresConfig;
    private isConnected: boolean = false;

    constructor(config: PostgresConfig) {
        this.config = config;
        
        // Validate table and column names to prevent SQL injection
        validateIdentifier(config.tableName, 'tableName');
        validateIdentifier(config.columns.id, 'columns.id');
        validateIdentifier(config.columns.content, 'columns.content');
        if (config.columns.metadata) {
            config.columns.metadata.forEach((col, index) => {
                validateIdentifier(col, `columns.metadata[${index}]`);
            });
        }

        this.pool = new Pool(config);
    }

    async connect(): Promise<void> {
        try {
            await this.pool.query('SELECT NOW()');
            this.isConnected = true;
            console.log(`Connected to PostgreSQL Database at ${this.config.host}:${this.config.port}/${this.config.database}`);
        } catch (error) {
            throw new Error(`Failed to connect to PostgreSQL: ${error}`);
        }
    }

    async disconnect(): Promise<void> {
        if (this.isConnected) {
            await this.pool.end();
            this.isConnected = false;
            console.log('Disconnected from PostgreSQL Database');
        }
    }

    async getData(): Promise<Document[]> {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }

        const { tableName, columns } = this.config;
        const metadataCols = columns.metadata ? columns.metadata.join(', ') : '';
        const selectCols = `${columns.id} as id, ${columns.content} as content${metadataCols ? ', ' + metadataCols : ''}`;

        // Use parameterized query with validated identifiers
        const query = `SELECT ${selectCols} FROM ${tableName} LIMIT 100`;

        try {
            const res = await this.pool.query(query);

            return res.rows.map(row => {
                const metadata: Record<string, any> = {};
                if (columns.metadata) {
                    columns.metadata.forEach(col => {
                        metadata[col] = row[col];
                    });
                }
                metadata.sourceTable = tableName;

                return {
                    id: `pg-${tableName}-${row.id}`,
                    content: String(row.content),
                    metadata: metadata,
                    source: this.name,
                    createdAt: new Date()
                };
            });
        } catch (error) {
            console.error('Error fetching data from PostgreSQL:', error);
            throw error;
        }
    }
}
