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
            // Validate URL to prevent SSRF
            this.validateUrl(this.url);

            const response = await axios.get(this.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                timeout: 10000,
                // Disable following redirects to prevent SSRF via redirects
                maxRedirects: 0,
                validateStatus: (status) => status < 400
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

    private validateUrl(url: string): void {
        try {
            const urlObj = new URL(url);
            
            // Only allow http and https
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                throw new Error(`Invalid URL protocol: ${urlObj.protocol}. Only http and https are allowed.`);
            }

            // Block localhost and private IP ranges
            const hostname = urlObj.hostname.toLowerCase();
            
            // Block localhost variants
            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname.startsWith('localhost.')) {
                throw new Error('Access to localhost is not allowed');
            }

            // Block private IP ranges
            const privateIPPatterns = [
                /^127\./,
                /^10\./,
                /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
                /^192\.168\./,
                /^169\.254\./, // Link-local
                /^::1$/,
                /^fc00:/,
                /^fe80:/,
            ];

            for (const pattern of privateIPPatterns) {
                if (pattern.test(hostname)) {
                    throw new Error(`Access to private IP ranges is not allowed: ${hostname}`);
                }
            }

            // Block AWS metadata endpoint and other cloud metadata services
            if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal') {
                throw new Error('Access to cloud metadata endpoints is not allowed');
            }

            // Block common internal/external IPs used in SSRF
            if (hostname === '0.0.0.0' || hostname === '0.0.0.1') {
                throw new Error('Access to this IP is not allowed');
            }

        } catch (error: any) {
            if (error instanceof TypeError) {
                throw new Error(`Invalid URL: ${error.message}`);
            }
            throw error;
        }
    }
}