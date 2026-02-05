import { VectorStore, Document } from './types';
import fs from 'fs';
import path from 'path';
import { LRUCache } from 'lru-cache';

const DB_PATH = path.join(process.cwd(), 'data', 'simple-vectors.json');

// BM25 parameters
const BM25_K1 = 1.5; // Term frequency saturation parameter
const BM25_B = 0.75; // Document length normalization parameter

export interface SmartVectorStoreConfig {
    cacheSize?: number;
    cacheTTL?: number;
    enableCache?: boolean;
    lockTimeout?: number;
    maxRetries?: number;
    useBM25?: boolean;
}

export class SmartVectorStore implements VectorStore {
    private lockFile: string;
    private lockTimeout: number;
    private maxRetries: number;
    private config: Required<SmartVectorStoreConfig>;
    
    // Document store
    private documents: Document[] = [];
    private docLengths: Map<string, number> = new Map();
    private avgDocLength: number = 0;
    private termDocFreq: Map<string, number> = new Map();
    private isIndexDirty: boolean = false;
    
    // Caching
    private cache: LRUCache<string, Document[]>;
    private metrics: {
        searches: number;
        cacheHits: number;
        cacheMisses: number;
        avgSearchTime: number;
        totalSearchTime: number;
        errors: number;
    };

    constructor(config: SmartVectorStoreConfig = {}) {
        this.config = {
            cacheSize: config.cacheSize || 1000,
            cacheTTL: config.cacheTTL || 5 * 60 * 1000, // 5 minutes
            enableCache: config.enableCache !== false,
            lockTimeout: config.lockTimeout || 30000,
            maxRetries: config.maxRetries || 10,
            useBM25: config.useBM25 !== false
        };
        
        this.lockFile = DB_PATH + '.lock';
        this.lockTimeout = this.config.lockTimeout;
        this.maxRetries = this.config.maxRetries;
        
        this.cache = new LRUCache<string, Document[]>({
            max: this.config.cacheSize,
            ttl: this.config.cacheTTL
        });
        
        this.metrics = {
            searches: 0,
            cacheHits: 0,
            cacheMisses: 0,
            avgSearchTime: 0,
            totalSearchTime: 0,
            errors: 0
        };
        
        this.initialize();
    }
    
    private initialize(): void {
        try {
            const dir = path.dirname(DB_PATH);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            this.loadDocuments();
            this.buildIndex();
            console.log(`SmartVectorStore initialized with ${this.documents.length} documents`);
        } catch (e) {
            console.error('SmartVectorStore init error:', e);
            this.metrics.errors++;
        }
    }
    
    private loadDocuments(): void {
        try {
            if (fs.existsSync(DB_PATH)) {
                const data = fs.readFileSync(DB_PATH, 'utf-8');
                this.documents = JSON.parse(data);
            }
        } catch (e) {
            console.error('Failed to load documents:', e);
            this.documents = [];
        }
    }
    
    private buildIndex(): void {
        if (this.documents.length === 0) return;
        
        // Calculate document lengths
        this.docLengths.clear();
        let totalLength = 0;
        
        for (const doc of this.documents) {
            const length = this.tokenize(doc.content).length;
            this.docLengths.set(doc.id, length);
            totalLength += length;
        }
        
        this.avgDocLength = totalLength / this.documents.length;
        
        // Calculate document frequency (inverse document frequency numerator)
        this.termDocFreq.clear();
        for (const doc of this.documents) {
            const tokens = new Set(this.tokenize(doc.content));
            for (const token of tokens) {
                this.termDocFreq.set(token, (this.termDocFreq.get(token) || 0) + 1);
            }
        }
        
        console.log(`Built search index: ${this.documents.length} docs, ${this.termDocFreq.size} unique terms`);
    }
    
    private tokenize(text: string): string[] {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(token => token.length > 0);
    }
    
    private async acquireLock(): Promise<boolean> {
        try {
            if (fs.existsSync(this.lockFile)) {
                try {
                    const lockTime = parseInt(fs.readFileSync(this.lockFile, 'utf-8'));
                    if (Date.now() - lockTime < this.lockTimeout) {
                        return false;
                    }
                    fs.unlinkSync(this.lockFile);
                } catch (e) {
                    try {
                        fs.unlinkSync(this.lockFile);
                    } catch (unlinkError) {
                        console.error('Failed to remove stale lock:', unlinkError);
                    }
                }
            }
            
            try {
                const fd = fs.openSync(this.lockFile, 'wx', 0o644);
                fs.writeSync(fd, Date.now().toString());
                fs.closeSync(fd);
                return true;
            } catch (e: any) {
                if (e.code === 'EEXIST') {
                    return false;
                }
                throw e;
            }
        } catch (e) {
            console.error('Failed to acquire lock:', e);
            return false;
        }
    }
    
    private releaseLock(): void {
        try {
            if (fs.existsSync(this.lockFile)) {
                fs.unlinkSync(this.lockFile);
            }
        } catch (e) {
            console.error('Failed to release lock:', e);
        }
    }
    
    private calculateBM25Score(content: string, queryTerms: string[]): number {
        if (!this.config.useBM25 || this.documents.length === 0) {
            return this.calculateSimpleScore(content, queryTerms);
        }
        
        const docLength = this.tokenize(content).length;
        const N = this.documents.length;
        let score = 0;
        
        for (const term of queryTerms) {
            const termFreq = this.tokenize(content).filter(t => t === term).length;
            const docFreq = this.termDocFreq.get(term) || 0;
            
            if (termFreq === 0 || docFreq === 0) continue;
            
            // IDF = log((N - df + 0.5) / (df + 0.5))
            const idf = Math.log((N - docFreq + 0.5) / (docFreq + 0.5) + 1);
            
            // TF normalization: (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (dl / avgdl)))
            const tfNorm = (termFreq * (BM25_K1 + 1)) / 
                          (termFreq + BM25_K1 * (1 - BM25_B + BM25_B * (docLength / this.avgDocLength)));
            
            score += idf * tfNorm;
        }
        
        return score;
    }
    
    private calculateSimpleScore(content: string, queryTerms: string[]): number {
        const lowerContent = content.toLowerCase();
        let matchCount = 0;
        
        for (const term of queryTerms) {
            if (lowerContent.includes(term)) {
                matchCount++;
            }
        }
        
        return matchCount / queryTerms.length;
    }
    
    async addDocuments(documents: Document[]): Promise<void> {
        let acquired = false;
        let retryCount = 0;
        const baseDelay = 100;
        
        try {
            while (retryCount < this.maxRetries) {
                acquired = await this.acquireLock();
                if (acquired) break;
                
                const delay = baseDelay * Math.pow(2, retryCount);
                await new Promise(resolve => setTimeout(resolve, delay));
                retryCount++;
            }
            
            if (!acquired) {
                throw new Error('Could not acquire lock for vector store after ' + this.maxRetries + ' attempts');
            }
            
            // Load existing if needed
            if (this.documents.length === 0 && fs.existsSync(DB_PATH)) {
                this.loadDocuments();
            }
            
            // Remove old versions with same ID
            const newIds = new Set(documents.map(d => d.id));
            const keptDocs = this.documents.filter(d => !newIds.has(d.id));
            const combined = [...keptDocs, ...documents];
            
            // Atomic write
            const tempPath = DB_PATH + '.tmp';
            fs.writeFileSync(tempPath, JSON.stringify(combined, null, 2));
            fs.renameSync(tempPath, DB_PATH);
            
            this.documents = combined;
            this.isIndexDirty = true;
            this.buildIndex();
            this.invalidateCache();
            
            console.log(`Saved ${documents.length} docs to SmartVectorStore. Total: ${combined.length}`);
        } finally {
            if (acquired) {
                this.releaseLock();
            }
        }
    }
    
    async search(query: string, limit: number = 5): Promise<Document[]> {
        const startTime = Date.now();
        this.metrics.searches++;
        
        try {
            // Check cache first
            const cacheKey = `${query}:${limit}`;
            if (this.config.enableCache) {
                const cached = this.cache.get(cacheKey);
                if (cached) {
                    this.metrics.cacheHits++;
                    return cached;
                }
                this.metrics.cacheMisses++;
            }
            
            if (this.documents.length === 0) {
                return [];
            }
            
            const queryTerms = this.preprocessQuery(query);
            if (queryTerms.length === 0) {
                return [];
            }
            
            const scored = this.documents.map(doc => {
                const score = this.calculateBM25Score(doc.content, queryTerms);
                return { doc, score };
            });
            
            const results = scored
                .filter(s => s.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, limit)
                .map(s => s.doc);
            
            // Cache results
            if (this.config.enableCache && results.length > 0) {
                this.cache.set(cacheKey, results);
            }
            
            return results;
        } catch (error) {
            this.metrics.errors++;
            console.error('Search error:', error);
            return [];
        } finally {
            const searchTime = Date.now() - startTime;
            this.metrics.totalSearchTime += searchTime;
            this.metrics.avgSearchTime = this.metrics.totalSearchTime / this.metrics.searches;
        }
    }
    
    private preprocessQuery(query: string): string[] {
        return this.tokenize(query)
            .filter(term => term.length > 1) // Filter out single characters
            .filter(term => !this.isStopWord(term)); // Remove stop words
    }
    
    private isStopWord(term: string): boolean {
        const stopWords = new Set([
            'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
            'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this',
            'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which',
            'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
            'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
            'than', 'too', 'very', 'just', 'here', 'there', 'now', 'then', 'up', 'down', 'out'
        ]);
        return stopWords.has(term);
    }
    
    private invalidateCache(): void {
        this.cache.clear();
    }
    
    async cleanupStaleLock(): Promise<void> {
        try {
            if (fs.existsSync(this.lockFile)) {
                const lockTime = parseInt(fs.readFileSync(this.lockFile, 'utf-8'));
                if (Date.now() - lockTime >= this.lockTimeout) {
                    fs.unlinkSync(this.lockFile);
                    console.log('Cleaned up stale lock file');
                }
            }
        } catch (e) {
            // Ignore cleanup errors
        }
    }
    
    async getStats(): Promise<{ 
        documentCount: number; 
        lockHeld: boolean;
        cacheSize: number;
        cacheHitRate: number;
        avgSearchTime: number;
        totalSearches: number;
        indexSize: number;
    }> {
        return {
            documentCount: this.documents.length,
            lockHeld: fs.existsSync(this.lockFile),
            cacheSize: this.cache.size,
            cacheHitRate: this.metrics.searches > 0 ? this.metrics.cacheHits / this.metrics.searches : 0,
            avgSearchTime: this.metrics.avgSearchTime,
            totalSearches: this.metrics.searches,
            indexSize: this.termDocFreq.size
        };
    }
    
    async healthCheck(): Promise<{ status: string; message: string }> {
        try {
            const dir = path.dirname(DB_PATH);
            const dirExists = fs.existsSync(dir);
            const fileExists = fs.existsSync(DB_PATH);
            
            if (!dirExists) {
                return { status: 'error', message: 'Data directory does not exist' };
            }
            
            return { 
                status: 'healthy', 
                message: `SmartVectorStore is healthy. Documents: ${this.documents.length}, Indexed: ${this.termDocFreq.size > 0}` 
            };
        } catch (error) {
            return { status: 'error', message: `Health check failed: ${error}` };
        }
    }
    
    // Clear cache manually if needed
    async clearCache(): Promise<void> {
        this.invalidateCache();
        console.log('Cache cleared');
    }
    
    // Get detailed metrics for monitoring
    getMetrics(): typeof this.metrics {
        return { ...this.metrics };
    }
}