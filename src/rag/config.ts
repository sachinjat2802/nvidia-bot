export interface RAGConfig {
    // Search configuration
    defaultLimit: number;
    maxLimit: number;
    enableBM25: boolean;
    enableCache: boolean;
    cacheSize: number;
    cacheTTL: number; // in milliseconds

    // Query processing
    enableQueryExpansion: boolean;
    enableStopWords: boolean;
    minTermLength: number;

    // Performance
    lockTimeout: number;
    maxRetries: number;
    batchSize: number;

    // Monitoring
    enableMetrics: boolean;
    metricsRetention: number; // in milliseconds

    // Circuit breaker
    circuitBreakerEnabled: boolean;
    circuitBreakerFailureThreshold: number;
    circuitBreakerResetTimeout: number; // in milliseconds
}

export const DEFAULT_RAG_CONFIG: RAGConfig = {
    defaultLimit: 5,
    maxLimit: 50,
    enableBM25: true,
    enableCache: true,
    cacheSize: 1000,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    enableQueryExpansion: true,
    enableStopWords: true,
    minTermLength: 2,
    lockTimeout: 30000,
    maxRetries: 10,
    batchSize: 100,
    enableMetrics: true,
    metricsRetention: 60 * 60 * 1000, // 1 hour
    circuitBreakerEnabled: true,
    circuitBreakerFailureThreshold: 5,
    circuitBreakerResetTimeout: 30000 // 30 seconds
};

export class RAGConfiguration {
    private config: RAGConfig;
    private static instance: RAGConfiguration;

    private constructor(config: Partial<RAGConfig> = {}) {
        this.config = { ...DEFAULT_RAG_CONFIG, ...config };
    }

    static getInstance(): RAGConfiguration {
        if (!RAGConfiguration.instance) {
            RAGConfiguration.instance = new RAGConfiguration();
        }
        return RAGConfiguration.instance;
    }

    setConfig(config: Partial<RAGConfig>): void {
        this.config = { ...this.config, ...config };
    }

    getConfig(): RAGConfig {
        return { ...this.config };
    }

    get(key: keyof RAGConfig): any {
        return this.config[key];
    }

    set(key: keyof RAGConfig, value: any): void {
        (this.config as any)[key] = value;
    }

    // Load from environment variables
    static fromEnv(): RAGConfiguration {
        const config = new RAGConfiguration();

        if (process.env.RAG_DEFAULT_LIMIT) {
            config.set('defaultLimit', parseInt(process.env.RAG_DEFAULT_LIMIT, 10));
        }
        if (process.env.RAG_MAX_LIMIT) {
            config.set('maxLimit', parseInt(process.env.RAG_MAX_LIMIT, 10));
        }
        if (process.env.RAG_ENABLE_BM25) {
            config.set('enableBM25', process.env.RAG_ENABLE_BM25 === 'true');
        }
        if (process.env.RAG_ENABLE_CACHE) {
            config.set('enableCache', process.env.RAG_ENABLE_CACHE === 'true');
        }
        if (process.env.RAG_CACHE_SIZE) {
            config.set('cacheSize', parseInt(process.env.RAG_CACHE_SIZE, 10));
        }
        if (process.env.RAG_CACHE_TTL) {
            config.set('cacheTTL', parseInt(process.env.RAG_CACHE_TTL, 10));
        }
        if (process.env.RAG_ENABLE_QUERY_EXPANSION) {
            config.set('enableQueryExpansion', process.env.RAG_ENABLE_QUERY_EXPANSION === 'true');
        }
        if (process.env.RAG_ENABLE_STOP_WORDS) {
            config.set('enableStopWords', process.env.RAG_ENABLE_STOP_WORDS === 'true');
        }
        if (process.env.RAG_MIN_TERM_LENGTH) {
            config.set('minTermLength', parseInt(process.env.RAG_MIN_TERM_LENGTH, 10));
        }
        if (process.env.RAG_LOCK_TIMEOUT) {
            config.set('lockTimeout', parseInt(process.env.RAG_LOCK_TIMEOUT, 10));
        }
        if (process.env.RAG_MAX_RETRIES) {
            config.set('maxRetries', parseInt(process.env.RAG_MAX_RETRIES, 10));
        }
        if (process.env.RAG_BATCH_SIZE) {
            config.set('batchSize', parseInt(process.env.RAG_BATCH_SIZE, 10));
        }
        if (process.env.RAG_ENABLE_METRICS) {
            config.set('enableMetrics', process.env.RAG_ENABLE_METRICS === 'true');
        }
        if (process.env.RAG_CIRCUIT_BREAKER_ENABLED) {
            config.set('circuitBreakerEnabled', process.env.RAG_CIRCUIT_BREAKER_ENABLED === 'true');
        }

        return config;
    }
}