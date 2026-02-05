# Smart RAG System - Optimized Implementation

This document describes the enhanced RAG (Retrieval-Augmented Generation) system with intelligent optimizations for production use.

## Architecture Overview

The system has been upgraded with multiple layers of intelligence:

```
┌─────────────────────────────────────────────────────────────┐
│                    Enhanced RAG System                      │
├─────────────────────────────────────────────────────────────┤
│  SmartVectorStore (BM25 + Caching + Indexing)              │
│  ├─ BM25 Scoring Algorithm                                │
│  ├─ LRU In-Memory Cache                                   │
│  ├─ Document Length Normalization                         │
│  ├─ Stop Word Removal                                     │
│  └─ Query Preprocessing                                   │
├─────────────────────────────────────────────────────────────┤
│  Circuit Breaker Pattern                                  │
│  ├─ Failure Threshold Detection                          │
│  ├─ Half-Open State for Recovery                         │
│  └─ Automatic State Transitions                          │
├─────────────────────────────────────────────────────────────┤
│  Redis Cache Layer (Optional)                             │
│  ├─ Distributed Caching                                   │
│  ├─ Local Fallback Cache                                 │
│  └─ Circuit Breaker Protection                           │
├─────────────────────────────────────────────────────────────┤
│  Metrics & Monitoring                                     │
│  ├─ Search Latency Tracking                              │
│  ├─ Cache Hit Rate Monitoring                            │
│  ├─ Error Rate Calculation                               │
│  └─ Health Checks                                        │
├─────────────────────────────────────────────────────────────┤
│  Configuration Management                                 │
│  ├─ Environment Variables                                │
│  ├─ Runtime Configuration                                │
│  └─ Dynamic Updates                                      │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. SmartVectorStore

Replaces the simple vector store with advanced features:

- **BM25 Scoring**: Industry-standard ranking function that considers:
  - Term frequency (TF)
  - Inverse document frequency (IDF)
  - Document length normalization
  - Saturation parameters (k1, b)

- **Intelligent Caching**: 
  - LRU (Least Recently Used) cache
  - Configurable size and TTL
  - Automatic cache invalidation on updates

- **Query Preprocessing**:
  - Stop word removal (configurable)
  - Minimum term length filtering
  - Tokenization and normalization

- **Indexing**:
  - Pre-built inverted index
  - Document length tracking
  - Term document frequency mapping

### 2. Circuit Breaker Pattern

Protects the system from cascading failures:

- **States**: CLOSED → OPEN → HALF_OPEN → CLOSED
- **Failure Threshold**: Configurable number of failures before opening
- **Reset Timeout**: Automatic retry after cooldown period
- **Half-Open Mode**: Limited test calls to verify recovery

### 3. Redis Cache Layer

Optional distributed caching with fallback:

- **Upstash Redis Integration**: Cloud-native Redis service
- **Local Fallback**: In-memory cache when Redis unavailable
- **Circuit Breaker**: Protects Redis operations
- **TTL Support**: Configurable expiration times

### 4. Metrics & Monitoring

Comprehensive observability:

- **Search Performance**: Latency tracking
- **Cache Effectiveness**: Hit/miss rates
- **Error Monitoring**: Error rate calculation
- **Health Checks**: System status verification
- **Automatic Collection**: Periodic metrics gathering

### 5. Configuration Management

Flexible configuration system:

- **Environment Variables**: All settings configurable via env
- **Runtime Updates**: Dynamic configuration changes
- **Sensible Defaults**: Production-ready out of the box

## Configuration Options

### RAG Configuration (RAGConfig)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `defaultLimit` | 5 | Default number of results per search |
| `maxLimit` | 50 | Maximum allowed results |
| `enableBM25` | true | Use BM25 scoring algorithm |
| `enableCache` | true | Enable in-memory caching |
| `cacheSize` | 1000 | Maximum cache entries |
| `cacheTTL` | 5min | Cache entry expiration |
| `enableQueryExpansion` | true | Expand search queries |
| `enableStopWords` | true | Filter stop words |
| `minTermLength` | 2 | Minimum query term length |
| `lockTimeout` | 30s | File lock timeout |
| `maxRetries` | 10 | Max lock acquisition retries |
| `batchSize` | 100 | Document batch size |
| `enableMetrics` | true | Enable metrics collection |
| `circuitBreakerEnabled` | true | Enable circuit breaker |

### Environment Variables

```bash
# RAG Configuration
RAG_DEFAULT_LIMIT=5
RAG_MAX_LIMIT=50
RAG_ENABLE_BM25=true
RAG_ENABLE_CACHE=true
RAG_CACHE_SIZE=1000
RAG_CACHE_TTL=300000
RAG_ENABLE_QUERY_EXPANSION=true
RAG_ENABLE_STOP_WORDS=true
RAG_MIN_TERM_LENGTH=2
RAG_LOCK_TIMEOUT=30000
RAG_MAX_RETRIES=10
RAG_BATCH_SIZE=100
RAG_ENABLE_METRICS=true
RAG_CIRCUIT_BREAKER_ENABLED=true

# Redis Configuration (Optional)
UPSTASH_REDIS_REST_TOKEN=your_token
UPSTASH_REDIS_REST_URL=your_url
```

## Usage Examples

### Basic Usage with SmartVectorStore

```typescript
import { SmartVectorStore } from '@/rag/smart-vector-store';
import { RAGConfiguration } from '@/rag/config';

// Load configuration from environment
const config = RAGConfiguration.fromEnv();

// Create store with custom settings
const store = new SmartVectorStore({
    cacheSize: 2000,
    cacheTTL: 10 * 60 * 1000, // 10 minutes
    enableCache: true,
    useBM25: true
});

// Add documents
await store.addDocuments(documents);

// Search with BM25 scoring
const results = await store.search('query string', 5);

// Get statistics
const stats = await store.getStats();
console.log(stats);
```

### Enhanced RAG Manager with All Features

```typescript
import { EnhancedRAGManager } from '@/rag/enhanced-rag-manager';
import { SmartVectorStore } from '@/rag/smart-vector-store';
import { RAGConfiguration } from '@/rag/config';
import { FileSystemDataSource } from '@/rag/connectors/file-system';

// Configure
const ragConfig = RAGConfiguration.fromEnv();
const store = new SmartVectorStore({
    cacheSize: ragConfig.get('cacheSize'),
    cacheTTL: ragConfig.get('cacheTTL'),
    enableCache: ragConfig.get('enableCache'),
    useBM25: ragConfig.get('enableBM25')
});

// Create enhanced manager
const manager = new EnhancedRAGManager(store, {
    enableCircuitBreaker: true,
    enableRedisCache: true,
    enableMetrics: true
});

// Register data sources
const fsSource = new FileSystemDataSource('/path/to/docs');
manager.registerSource(fsSource);

// Ingest with circuit breaker protection
await manager.ingestAll();

// Search with Redis caching
const results = await manager.retrieve('search query', 5);

// Get comprehensive stats
const stats = await manager.getStats();
console.log(stats);

// Health check
const health = await manager.healthCheck();
console.log(health);

// Get metrics
const metrics = await manager.getMetrics();
console.log(metrics);
```

### API Routes (Already Updated)

The existing API routes have been updated to use the enhanced system:

- `/api/rag/ingest-file` - File upload with SmartVectorStore
- `/api/rag/ingest-url` - URL ingestion with SmartVectorStore

Both automatically use SmartVectorStore when Pinecone is not configured.

## Performance Optimizations

### 1. BM25 Scoring

Traditional keyword matching is replaced with BM25, which:
- Weights terms by rarity (IDF)
- Normalizes for document length
- Provides better ranking than simple count

### 2. Caching Strategy

Multi-level caching:
1. **Local LRU Cache**: Fast in-memory access
2. **Redis Cache**: Distributed cache for multi-instance deployments
3. **Cache Invalidation**: Automatic on document updates

### 3. Circuit Breaker

Prevents system overload:
- Tracks failure rates
- Opens circuit after threshold
- Half-open state for recovery testing
- Automatic reset after timeout

### 4. Indexing

Pre-computed indexes:
- Document lengths cached
- Term document frequencies pre-calculated
- Average document length maintained
- Enables fast BM25 scoring

## Monitoring & Observability

### Metrics Collection

The system tracks:
- Search latency (average, p95, p99)
- Cache hit/miss rates
- Error rates
- Memory usage
- Circuit breaker state
- Document counts

### Health Checks

Comprehensive health monitoring:
- Vector store accessibility
- Redis connectivity
- Circuit breaker status
- System resources

### Accessing Metrics

```typescript
import { getMetricsCollector } from '@/rag/monitoring';

const collector = getMetricsCollector();
const summary = collector.getSummary();
console.log({
    avgLatency: summary.avgLatency,
    errorRate: summary.errorRate,
    cacheHitRate: summary.cacheHitRate,
    memoryUsageMB: summary.memoryUsageMB
});

// Get historical data
const history = collector.getMetricsHistory();
```

## Migration Guide

### From SimpleVectorStore to SmartVectorStore

The SmartVectorStore is backward compatible with the VectorStore interface:

```typescript
// Old code
import { SimpleVectorStore } from '@/rag/simple-store';
const store = new SimpleVectorStore();

// New code (drop-in replacement)
import { SmartVectorStore } from '@/rag/smart-vector-store';
const store = new SmartVectorStore(); // Uses defaults
```

### From RAGManager to EnhancedRAGManager

```typescript
// Old code
import { RAGManager } from '@/rag/rag-manager';
const manager = new RAGManager(store);

// New code (adds circuit breaker, caching, metrics)
import { EnhancedRAGManager } from '@/rag/enhanced-rag-manager';
const manager = new EnhancedRAGManager(store, {
    enableCircuitBreaker: true,
    enableRedisCache: true,
    enableMetrics: true
});
```

## Best Practices

### 1. Configuration

- Set appropriate cache sizes based on document count
- Tune BM25 parameters (k1, b) for your data
- Enable circuit breaker in production
- Configure Redis for multi-instance deployments

### 2. Performance

- Use batch operations for large document sets
- Monitor cache hit rates (aim for >70%)
- Track search latency (should be <100ms for cached, <500ms uncached)
- Set up alerts for error rate spikes

### 3. Scaling

- For large datasets (>10k docs), consider Pinecone or other vector DBs
- Use Redis for shared cache across instances
- Implement query logging for analytics
- Consider sharding for very large document collections

### 4. Monitoring

- Export metrics to monitoring system (Prometheus, Datadog, etc.)
- Set up dashboards for key metrics
- Alert on circuit breaker openings
- Track memory usage growth

## Troubleshooting

### High Search Latency

- Check if cache is enabled and working
- Verify index is built (check termDocFreq size)
- Consider reducing document count or increasing cache size
- Check for memory pressure

### Low Cache Hit Rate

- Increase cache size
- Adjust cache TTL
- Check query diversity (many unique queries = lower hit rate)
- Consider query normalization

### Circuit Breaker Opening

- Check underlying service health
- Review error logs
- Increase failure threshold if needed
- Verify network connectivity

### Memory Issues

- Reduce cache size
- Enable Redis for larger cache
- Monitor memory usage trends
- Consider document size reduction

## Advanced Topics

### Custom Tokenization

Override the `tokenize()` method in SmartVectorStore for custom text processing:

```typescript
class CustomVectorStore extends SmartVectorStore {
    private tokenize(text: string): string[] {
        // Custom tokenization logic
        return text.toLowerCase()
            .split(/\s+/)
            .map(term => this.stem(term))
            .filter(term => term.length >= 2);
    }
    
    private stem(term: string): string {
        // Implement stemming algorithm
        return term;
    }
}
```

### Query Expansion

Enable automatic query expansion to improve recall:

```typescript
const store = new SmartVectorStore({
    enableQueryExpansion: true,
    // Add synonyms or related terms
    synonyms: {
        'ai': ['artificial intelligence', 'machine learning'],
        'ml': ['machine learning']
    }
});
```

### Custom Metrics

Implement custom metrics collection:

```typescript
class CustomMetricsCollector extends MetricsCollector {
    recordCustomMetric(name: string, value: number): void {
        // Record custom business metrics
    }
}
```

## Future Enhancements

- [ ] Embedding generation integration (OpenAI, NVIDIA)
- [ ] Vector similarity search (cosine, euclidean)
- [ ] Hybrid search (keyword + vector)
- [ ] Query understanding and intent detection
- [ ] Automatic synonym expansion
- [ ] Faceted search capabilities
- [ ] Real-time index updates
- [ ] Multi-language support
- [ ] Query result clustering
- [ ] A/B testing framework

## Support

For issues or questions:
1. Check this README
2. Review logs for error messages
3. Verify configuration settings
4. Run health checks
5. Check metrics for performance insights