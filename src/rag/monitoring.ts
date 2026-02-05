export interface SystemMetrics {
    timestamp: number;
    vectorStore: {
        documentCount: number;
        searchLatency: number;
        cacheHitRate: number;
        errors: number;
    };
    circuitBreaker: {
        state: string;
        failureCount: number;
    };
    cache: {
        size: number;
        hits: number;
        misses: number;
    };
    system: {
        memoryUsage: number;
        uptime: number;
    };
}

export class MetricsCollector {
    private metricsHistory: SystemMetrics[] = [];
    private retentionPeriod: number;
    private intervalId: NodeJS.Timeout | null = null;
    
    constructor(retentionPeriod: number = 60 * 60 * 1000) { // 1 hour default
        this.retentionPeriod = retentionPeriod;
    }
    
    recordMetrics(metrics: Partial<SystemMetrics>): void {
        const entry: SystemMetrics = {
            timestamp: Date.now(),
            vectorStore: {
                documentCount: 0,
                searchLatency: 0,
                cacheHitRate: 0,
                errors: 0,
                ...metrics.vectorStore
            },
            circuitBreaker: {
                state: 'CLOSED',
                failureCount: 0,
                ...metrics.circuitBreaker
            },
            cache: {
                size: 0,
                hits: 0,
                misses: 0,
                ...metrics.cache
            },
            system: {
                memoryUsage: process.memoryUsage().heapUsed,
                uptime: process.uptime(),
                ...metrics.system
            }
        };
        
        this.metricsHistory.push(entry);
        this.cleanupOldMetrics();
    }
    
    private cleanupOldMetrics(): void {
        const cutoff = Date.now() - this.retentionPeriod;
        this.metricsHistory = this.metricsHistory.filter(m => m.timestamp > cutoff);
    }
    
    getMetricsHistory(): SystemMetrics[] {
        return [...this.metricsHistory];
    }
    
    getLatestMetrics(): SystemMetrics | null {
        if (this.metricsHistory.length === 0) return null;
        return this.metricsHistory[this.metricsHistory.length - 1];
    }
    
    getAverageLatency(lastMinutes: number = 5): number {
        const cutoff = Date.now() - lastMinutes * 60 * 1000;
        const recent = this.metricsHistory.filter(m => m.timestamp > cutoff);
        if (recent.length === 0) return 0;
        const sum = recent.reduce((acc, m) => acc + m.vectorStore.searchLatency, 0);
        return sum / recent.length;
    }
    
    getErrorRate(lastMinutes: number = 5): number {
        const cutoff = Date.now() - lastMinutes * 60 * 1000;
        const recent = this.metricsHistory.filter(m => m.timestamp > cutoff);
        if (recent.length === 0) return 0;
        const totalErrors = recent.reduce((acc, m) => acc + m.vectorStore.errors, 0);
        return totalErrors / recent.length;
    }
    
    startAutomaticCollection(intervalMs: number = 30000): void {
        if (this.intervalId) return;
        
        this.intervalId = setInterval(() => {
            // Collect system metrics automatically
            this.recordMetrics({
                system: {
                    memoryUsage: process.memoryUsage().heapUsed,
                    uptime: process.uptime()
                }
            });
        }, intervalMs);
    }
    
    stopAutomaticCollection(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    getSummary(): {
        totalSearches: number;
        avgLatency: number;
        errorRate: number;
        cacheHitRate: number;
        uptime: number;
        memoryUsageMB: number;
    } {
        const latest = this.getLatestMetrics();
        if (!latest) {
            return {
                totalSearches: 0,
                avgLatency: 0,
                errorRate: 0,
                cacheHitRate: 0,
                uptime: 0,
                memoryUsageMB: 0
            };
        }
        
        return {
            totalSearches: this.metricsHistory.length,
            avgLatency: this.getAverageLatency(10),
            errorRate: this.getErrorRate(10),
            cacheHitRate: latest.vectorStore.cacheHitRate,
            uptime: latest.system.uptime,
            memoryUsageMB: latest.system.memoryUsage / 1024 / 1024
        };
    }
}

// Singleton instance for global metrics collection
let globalMetricsCollector: MetricsCollector | null = null;

export function getMetricsCollector(): MetricsCollector {
    if (!globalMetricsCollector) {
        globalMetricsCollector = new MetricsCollector();
    }
    return globalMetricsCollector;
}

export function initializeMetricsCollector(retentionPeriod: number = 60 * 60 * 1000): MetricsCollector {
    if (!globalMetricsCollector) {
        globalMetricsCollector = new MetricsCollector(retentionPeriod);
    }
    return globalMetricsCollector;
}