
import { DataSource, Document } from '../types';

export class RawTextDataSource implements DataSource {
    name = 'Raw Text';
    private text: string;
    private title: string;

    constructor(text: string, title?: string) {
        this.text = text;
        this.title = title || 'Untitled Text Snippet';
    }

    async connect(): Promise<void> { }
    async disconnect(): Promise<void> { }

    async getData(): Promise<Document[]> {
        return [{
            id: `text-${Date.now()}`,
            content: this.text,
            metadata: {
                title: this.title,
                sourceType: 'raw-text'
            },
            source: 'raw-text',
            createdAt: new Date()
        }];
    }
}
