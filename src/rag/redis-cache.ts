import { Redis } from '@upstash/redis';
import { CircuitBreaker } from './circuit-breaker';

export interface CacheEntry<T> {
    value: T;
    expiresAt: number;
    createdAt: number;
}

export class RedisCache {
    private redis: Redis | null = null;
    private circuitBreaker: CircuitBreaker;
    private enabled: boolean;
    private localCache: Map<string, CacheEntry<any>>;
    private localCacheSize: number;
    
    constructor(
        options: {
            enabled?: boolean;
            useCircuitBreaker?: boolean;
            localCacheSize?: number;
        } = {}
    ) {
        this.enabled = options.enabled !== false;
        this.localCacheSize = options.localCacheSize || 100;
        this.localCache = new Map();
        
        // Initialize circuit breaker for Redis operations
        this.circuitBreaker = new CircuitBreaker(
            5, // failure threshold
            30000, // reset timeout
            10 // half-open max calls
        );
        
        if (this.enabled) {
            this.initializeRedis();
        }
    }
    
    private initializeRedis(): void {
        try {
            const token = process.env.UPSTASH_REDIS_REST_TOKEN;
            const url = process.env.UPSTASH_REDIS_REST_URL;
            
            if (token && url) {
                this.redis = new Redis({
                    token: token,
                    url: url
                });
                console.log('Redis cache initialized successfully');
            } else {
                console.warn('Redis credentials not found. Caching will use local memory only.');
                this.redis = null;
                this.enabled = true; // Still enabled, just local
            }
        } catch (error) {
            console.error('Failed to initialize Redis:', error);
            this.redis = null;
        }
    }
    
    async get<T>(key: string): Promise<T | null> {
        if (!this.enabled) return null;
        
        try {
            // Check local cache first
            const localEntry = this.localCache.get(key);
            if (localEntry && localEntry.expiresAt > Date.now()) {
                return localEntry.value as T;
            } else if (localEntry) {
                this.localCache.delete(key);
            }
            
            // Check Redis with circuit breaker
            if (this.redis) {
                return await this.circuitBreaker.execute(async () => {
                    const value = await this.redis.get(key);
                    if (value) {
                        // Store in local cache
                        const ttl = 300; // Default 5 minutes in seconds
                        this.setLocal(key, value, ttl * 1000);
                        return value as T;
                    }
                    return null;
                });
            }
            
            return null;
        } catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    }
    
    async set(key: string, value: any, ttl?: number): Promise<boolean> {
        if (!this.enabled) return false;
        
        try {
            const ttlSeconds = ttl ? Math.ceil(ttl / 1000) : 300; // Default 5 minutes
            
            // Set in local cache
            this.setLocal(key, value, ttl);
            
            // Set in Redis with circuit breaker
            if (this.redis) {
                return await this.circuitBreaker.execute(async () => {
                    await this.redis.set(key, value, { ex: ttlSeconds });
                    return true;
                });
            }
            
            return true; // Local cache only
        } catch (error) {
            console.error('Redis set error:', error);
            return false;
        }
    }
    
    async del(key: string): Promise<boolean> {
        if (!this.enabled) return false;
        
        try {
            this.localCache.delete(key);
            
            if (this.redis) {
                return await this.circuitBreaker.execute(async () => {
                    await this.redis.del(key);
                    return true;
                });
            }
            
            return true;
        } catch (error) {
            console.error('Redis del error:', error);
            return false;
        }
    }
    
    async exists(key: string): Promise<boolean> {
        if (!this.enabled) return false;
        
        try {
            const localEntry = this.localCache.get(key);
            if (localEntry && localEntry.expiresAt > Date.now()) {
                return true;
            }
            
            if (this.redis) {
                return await this.circuitBreaker.execute(async () => {
                    const exists = await this.redis.exists(key);
                    return exists === 1;
                });
            }
            
            return false;
        } catch (error) {
            console.error('Redis exists error:', error);
            return false;
        }
    }
    
    async clear(): Promise<void> {
        this.localCache.clear();
        
        if (this.redis) {
            try {
                await this.circuitBreaker.execute(async () => {
                    await this.redis.flushall();
                });
            } catch (error) {
                console.error('Redis clear error:', error);
            }
        }
    }
    
    async getStats(): Promise<{
        localSize: number;
        redisConnected: boolean;
        circuitBreakerState: string;
    }> {
        return {
            localSize: this.localCache.size,
            redisConnected: this.redis !== null,
            circuitBreakerState: this.circuitBreaker.getState().state
        };
    }
    
    private setLocal(key: string, value: any, ttl: number): void {
        if (this.localCache.size >= this.localCacheSize) {
            // Remove oldest entry (simple FIFO for local cache)
            const firstKey = this.localCache.keys().next().value;
            if (firstKey) {
                this.localCache.delete(firstKey);
            }
        }
        
        this.localCache.set(key, {
            value,
            expiresAt: Date.now() + ttl,
            createdAt: Date.now()
        });
    }
    
    // Cleanup expired local cache entries
    cleanupLocalCache(): void {
        const now = Date.now();
        for (const [key, entry] of this.localCache.entries()) {
            if (entry.expiresAt <= now) {
                this.localCache.delete(key);
            }
        }
    }
    
    isEnabled(): boolean {
        return this.enabled;
    }
    
    getCircuitBreakerState() {
        return this.circuitBreaker.getState();
    }
}