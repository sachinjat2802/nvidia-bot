
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DataSource, Document } from '../types';

export class WebDataSource implements DataSource {
    name = 'Web';
    private url: string;

    constructor(url: string) {
        this.url = url;
        this.name = `Web (${url})`;
    }

    async connect(): Promise<void> {
        // No persistent connection needed for HTTP
    }

    async disconnect(): Promise<void> {
        // No disconnection needed
    }

    async getData(): Promise<Document[]> {
        console.log(`WebDataSource: Fetching ${this.url}`);
        try {
            const response = await axios.get(this.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                timeout: 10000
            });
            const html = response.data;
            const $ = cheerio.load(html);

            // Remove script and style elements
            $('script').remove();
            $('style').remove();
            $('noscript').remove();
            $('nav').remove();
            $('footer').remove();
            $('iframe').remove();

            // Extract title
            const title = $('title').text().trim() || this.url;

            // Extract main content - simplistic approach
            // Try to find main content containers if possible, otherwise body
            let content = '';
            const main = $('main');
            const article = $('article');
            const contentDiv = $('#content, .content, #main, .main');

            if (main.length > 0) {
                content = main.text();
            } else if (article.length > 0) {
                content = article.text();
            } else if (contentDiv.length > 0) {
                content = contentDiv.text();
            } else {
                content = $('body').text();
            }

            // Cleanup whitespace
            content = content.replace(/\s+/g, ' ').trim();

            if (!content) {
                console.warn(`WebDataSource: No content found for ${this.url}`);
            }

            const doc: Document = {
                id: this.url,
                content: content,
                metadata: {
                    title: title,
                    url: this.url,
                    sourceType: 'web',
                    dateFetched: new Date().toISOString()
                },
                source: 'web',
                createdAt: new Date()
            };

            return [doc];
        } catch (error: any) {
            console.error(`Failed to fetch URL ${this.url}:`, error.message);
            throw new Error(`Failed to fetch URL ${this.url}: ${error.message}`);
        }
    }
}
