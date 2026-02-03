import { DataSource, Document } from '../types';

export class MockCMSDataSource implements DataSource {
    name = 'Headless CMS';
    private apiUrl: string;
    private apiKey: string;

    constructor(apiUrl: string, apiKey: string) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async connect(): Promise<void> {
        console.log(`Connected to CMS at ${this.apiUrl}`);
    }

    async disconnect(): Promise<void> {
        console.log('Disconnected from CMS');
    }

    async getData(): Promise<Document[]> {
        // Mock fetching articles/pages from a CMS
        const mockArticles = [
            {
                id: 'article-1',
                title: 'NVIDIA H100 Architecture',
                body: 'The NVIDIA H100 Tensor Core GPU delivers unprecedented performance...'
            },
            {
                id: 'article-2',
                title: 'Data Center Solutions',
                body: 'Our data center platform accelerates every workload...'
            }
        ];

        return mockArticles.map(article => ({
            id: `cms-${article.id}`,
            content: `# ${article.title}\n\n${article.body}`,
            metadata: {
                type: 'article',
                sourceId: article.id,
                url: `${this.apiUrl}/articles/${article.id}`
            },
            source: this.name,
            createdAt: new Date()
        }));
    }
}
