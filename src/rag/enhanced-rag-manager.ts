import { DataSource, VectorStore, Document } from './types';
import { CircuitBreaker } from './circuit-breaker';
import { RedisCache } from './redis-cache';
import { RAGConfiguration } from './config';
import { getMetricsCollector, MetricsCollector } from './monitoring';

export interface EnhancedRAGManagerConfig {
    enableCircuitBreaker?: boolean;
    enableRedisCache?: boolean;
    enableMetrics?: boolean;
    circuitBreakerThreshold?: number;
    circuitBreakerResetTimeout?: number;
}

export class EnhancedRAGManager {
    private sources: DataSource[] = [];
    private vectorStore: VectorStore;
    private config: Required<EnhancedRAGManagerConfig>;
    private circuitBreaker: CircuitBreaker | null = null;
    private redisCache: RedisCache | null = null;
    private metrics: MetricsCollector | null = null;
    private isHealthy: boolean = true;
    
    constructor(
        vectorStore: VectorStore, 
        config: EnhancedRAGManagerConfig = {},
        ragConfig?: RAGConfiguration
    ) {
        this.vectorStore = vectorStore;
        this.config = {
            enableCircuitBreaker: config.enableCircuitBreaker !== false,
            enableRedisCache: config.enableRedisCache !== false,
            enableMetrics: config.enableMetrics !== false,
            circuitBreakerThreshold: config.circuitBreakerThreshold || 5,
            circuitBreakerResetTimeout: config.circuitBreakerResetTimeout || 30000
        };
        
        if (this.config.enableCircuitBreaker) {
            this.circuitBreaker = new CircuitBreaker(
                this.config.circuitBreakerThreshold,
                this.config.circuitBreakerResetTimeout
            );
        }
        
        if (this.config.enableRedisCache) {
            this.redisCache = new RedisCache({ enabled: true });
        }
        
        if (this.config.enableMetrics) {
            this.metrics = getMetricsCollector();
        }
        
        // Initialize health check
        this.performHealthCheck();
    }
    
    registerSource(source: DataSource) {
        this.sources.push(source);
        console.log(`Registered Data Source: ${source.name}`);
    }
    
    async ingestAll(): Promise<void> {
        if (!this.isHealthy) {
            throw new Error('RAG Manager is unhealthy. Ingestion aborted.');
        }
        
        console.log('Starting ingestion from all sources...');
        
        for (const source of this.sources) {
            try {
                // Use circuit breaker if enabled
                const ingestOperation = async () => {
                    await source.connect();
                    console.log(`Fetching data from ${source.name}...`);
                    const documents = await source.getData();
                    console.log(`Retrieved ${documents.length} documents from ${source.name}.`);
                    
                    await this.vectorStore.addDocuments(documents);
                    await source.disconnect();
                };
                
                if (this.circuitBreaker) {
                    await this.circuitBreaker.execute(ingestOperation);
                } else {
                    await ingestOperation();
                }
            } catch (error) {
                console.error(`Error ingesting from ${source.name}:`, error);
                
                // Record error in metrics
                if (this.metrics) {
                    const current = this.metrics.getLatestMetrics() || {
                        vectorStore: { errors: 0 },
                        circuitBreaker: { failureCount: 0 },
                        cache: { hits: 0, misses: 0 },
                        system: { memoryUsage: 0, uptime: 0 }
                    };
                    this.metrics.recordMetrics({
                        vectorStore: { ...current.vectorStore, errors: current.vectorStore.errors + 1 }
                    });
                }
                
                // Check if circuit breaker is open
                if (this.circuitBreaker && this.circuitBreaker.isOpen()) {
                    console.warn('Circuit breaker is OPEN. Skipping remaining sources.');
                    break;
                }
            }
        }
        
        console.log('Ingestion complete.');
    }
    
    async retrieve(query: string, limit?: number): Promise<Document[]> {
        const startTime = Date.now();
        
        try {
            // Check cache first if Redis is enabled
            if (this.redisCache && this.redisCache.isEnabled()) {
                const cacheKey = `rag:search:${query}:${limit || 5}`;
                const cached = await this.redisCache.get<Document[]>(cacheKey);
                if (cached) {
                    console.log('Cache hit for query:', query);
                    return cached;
                }
            }
            
            // Use circuit breaker for search operation
            let results: Document[];
            if (this.circuitBreaker) {
                results = await this.circuitBreaker.execute(() => 
                    this.vectorStore.search(query, limit)
                );
            } else {
                results = await this.vectorStore.search(query, limit);
            }
            
            // Cache results if Redis is enabled
            if (this.redisCache && this.redisCache.isEnabled() && results.length > 0) {
                const cacheKey = `rag:search:${query}:${limit || 5}`;
                await this.redisCache.set(cacheKey, results, 5 * 60 * 1000); // 5 minutes TTL
            }
            
            // Record metrics
            if (this.metrics) {
                const searchTime = Date.now() - startTime;
                const current = this.metrics.getLatestMetrics() || {
                    vectorStore: { documentCount: 0, searchLatency: 0, cacheHitRate: 0, errors: 0 },
                    circuitBreaker: { state: 'CLOSED', failureCount: 0 },
                    cache: { size: 0, hits: 0, misses: 0 },
                    system: { memoryUsage: 0, uptime: 0 }
                };
                
                this.metrics.recordMetrics({
                    vectorStore: {
                        ...current.vectorStore,
                        searchLatency: searchTime
                    },
                    cache: {
                        ...current.cache,
                        misses: current.cache.misses + 1
                    }
                });
            }
            
            return results;
        } catch (error) {
            console.error('Search error in EnhancedRAGManager:', error);
            
            if (this.metrics) {
                const current = this.metrics.getLatestMetrics() || {
                    vectorStore: { errors: 0 },
                    circuitBreaker: { failureCount: 0 },
                    cache: { hits: 0, misses: 0 },
                    system: { memoryUsage: 0, uptime: 0 }
                };
                this.metrics.recordMetrics({
                    vectorStore: { ...current.vectorStore, errors: current.vectorStore.errors + 1 }
                });
            }
            
            throw error;
        }
    }
    
    async getStats(): Promise<any> {
        const stats: any = {};
        
        // Vector store stats
        if (typeof this.vectorStore.getStats === 'function') {
            stats.vectorStore = await this.vectorStore.getStats();
        } else {
            stats.vectorStore = { documentCount: 0 };
        }
        
        // Circuit breaker stats
        if (this.circuitBreaker) {
            stats.circuitBreaker = this.circuitBreaker.getState();
        }
        
        // Redis cache stats
        if (this.redisCache) {
            stats.cache = await this.redisCache.getStats();
        }
        
        // Metrics summary
        if (this.metrics) {
            stats.metrics = this.metrics.getSummary();
        }
        
        // Health status
        stats.health = {
            isHealthy: this.isHealthy,
            lastCheck: Date.now()
        };
        
        return stats;
    }
    
    async healthCheck(): Promise<{ status: string; message: string }> {
        try {
            // Check vector store
            if (typeof this.vectorStore.healthCheck === 'function') {
                const vsHealth = await this.vectorStore.healthCheck();
                if (vsHealth.status !== 'healthy') {
                    this.isHealthy = false;
                    return { status: 'unhealthy', message: `Vector store unhealthy: ${vsHealth.message}` };
                }
            }
            
            // Check Redis cache if enabled
            if (this.redisCache) {
                const redisStats = await this.redisCache.getStats();
                if (!redisStats.redisConnected) {
                    console.warn('Redis cache is not connected (this may be expected if not configured)');
                }
            }
            
            this.isHealthy = true;
            return { 
                status: 'healthy', 
                message: `EnhancedRAGManager is healthy. Sources: ${this.sources.length}, Circuit Breaker: ${this.circuitBreaker?.getState().state || 'disabled'}` 
            };
        } catch (error) {
            this.isHealthy = false;
            return { status: 'error', message: `Health check failed: ${error}` };
        }
    }
    
    async resetCircuitBreaker(): Promise<void> {
        if (this.circuitBreaker) {
            this.circuitBreaker.reset();
            console.log('Circuit breaker reset manually');
        }
    }
    
    async clearCache(): Promise<void> {
        if (this.redisCache) {
            await this.redisCache.clear();
            console.log('Redis cache cleared');
        }
    }
    
    async getMetrics(): Promise<any> {
        if (this.metrics) {
            return this.metrics.getSummary();
        }
        return null;
    }
    
    async getDetailedMetrics(): Promise<any> {
        if (this.metrics) {
            return {
                summary: this.metrics.getSummary(),
                history: this.metrics.getMetricsHistory().slice(-100) // Last 100 data points
            };
        }
        return null;
    }
    
    private async performHealthCheck(): Promise<void> {
        try {
            const health = await this.healthCheck();
            if (health.status !== 'healthy') {
                console.warn('Initial health check warning:', health.message);
            }
        } catch (error) {
            console.error('Health check failed during initialization:', error);
        }
    }
    
    // Get configuration
    getConfig(): Required<EnhancedRAGManagerConfig> {
        return { ...this.config };
    }
    
    // Update configuration dynamically
    updateConfig(config: Partial<EnhancedRAGManagerConfig>): void {
        this.config = { ...this.config, ...config };
        
        // Reinitialize components if needed
        if (config.enableRedisCache !== undefined && !this.redisCache) {
            this.redisCache = new RedisCache({ enabled: config.enableRedisCache });
        }
        
        if (config.enableCircuitBreaker !== undefined && !this.circuitBreaker) {
            this.circuitBreaker = new CircuitBreaker(
                config.circuitBreakerThreshold || this.config.circuitBreakerThreshold,
                config.circuitBreakerResetTimeout || this.config.circuitBreakerResetTimeout
            );
        }
    }
}