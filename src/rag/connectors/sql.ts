import { DataSource, Document } from '../types';

export class MockSQLDataSource implements DataSource {
    name = 'SQL Database';
    private connectionString: string;
    private isConnected: boolean = false;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    async connect(): Promise<void> {
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 500));
        this.isConnected = true;
        console.log(`Connected to SQL Database at ${this.connectionString}`);
    }

    async disconnect(): Promise<void> {
        this.isConnected = false;
        console.log('Disconnected from SQL Database');
    }

    async getData(): Promise<Document[]> {
        if (!this.isConnected) {
            throw new Error('Not connected to database');
        }

        // Simulate fetching data from a "users" table and "products" table
        const mockData = [
            { id: '1', table: 'users', data: { name: 'Alice', role: 'Admin', email: 'alice@example.com' } },
            { id: '2', table: 'users', data: { name: 'Bob', role: 'User', email: 'bob@example.com' } },
            { id: '101', table: 'products', data: { name: 'GPU H100', category: 'Hardware', price: 30000 } },
            { id: '102', table: 'products', data: { name: 'NVIDIA AI Enterprise', category: 'Software', price: 5000 } }
        ];

        return mockData.map(row => ({
            id: `${row.table}-${row.id}`,
            content: JSON.stringify(row.data, null, 2), // Convert row to text representation
            metadata: {
                table: row.table,
                primaryKey: row.id,
                origin: this.connectionString
            },
            source: this.name,
            createdAt: new Date()
        }));
    }
}
