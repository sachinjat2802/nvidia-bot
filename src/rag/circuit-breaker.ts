export interface CircuitBreakerState {
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    failureCount: number;
    lastFailureTime: number | null;
    nextAllowedAttempt: number;
}

export class CircuitBreaker {
    private state: CircuitBreakerState;
    private failureThreshold: number;
    private resetTimeout: number;
    private halfOpenMaxCalls: number;
    private halfOpenCallCount: number;
    
    constructor(
        failureThreshold: number = 5,
        resetTimeout: number = 30000,
        halfOpenMaxCalls: number = 3
    ) {
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.halfOpenMaxCalls = halfOpenMaxCalls;
        this.halfOpenCallCount = 0;
        
        this.state = {
            state: 'CLOSED',
            failureCount: 0,
            lastFailureTime: null,
            nextAllowedAttempt: 0
        };
    }
    
    async execute<T>(operation: () => Promise<T>): Promise<T> {
        // Check if circuit is open
        if (this.state.state === 'OPEN') {
            const now = Date.now();
            if (now < this.state.nextAllowedAttempt) {
                throw new Error('Circuit breaker is OPEN. Operation rejected.');
            }
            // Transition to half-open
            this.state.state = 'HALF_OPEN';
            this.halfOpenCallCount = 0;
            console.log('Circuit breaker transitioning to HALF_OPEN');
        }
        
        // Half-open state: limited calls allowed
        if (this.state.state === 'HALF_OPEN') {
            if (this.halfOpenCallCount >= this.halfOpenMaxCalls) {
                throw new Error('Circuit breaker is HALF_OPEN. Too many concurrent calls.');
            }
            this.halfOpenCallCount++;
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    private onSuccess(): void {
        if (this.state.state === 'HALF_OPEN') {
            this.halfOpenCallCount--;
        }
        
        // Reset on success in half-open state
        if (this.state.state === 'HALF_OPEN') {
            this.state.state = 'CLOSED';
            this.state.failureCount = 0;
            this.state.lastFailureTime = null;
            this.halfOpenCallCount = 0;
            console.log('Circuit breaker CLOSED after successful operation');
        }
    }
    
    private onFailure(): void {
        this.state.failureCount++;
        this.state.lastFailureTime = Date.now();
        
        if (this.state.state === 'CLOSED' && this.state.failureCount >= this.failureThreshold) {
            this.state.state = 'OPEN';
            this.state.nextAllowedAttempt = Date.now() + this.resetTimeout;
            console.log(`Circuit breaker OPEN. Will retry after ${this.resetTimeout}ms`);
        } else if (this.state.state === 'HALF_OPEN') {
            // Any failure in half-open reopens the circuit
            this.state.state = 'OPEN';
            this.state.nextAllowedAttempt = Date.now() + this.resetTimeout;
            console.log(`Circuit breaker OPEN after half-open failure. Will retry after ${this.resetTimeout}ms`);
        }
    }
    
    getState(): CircuitBreakerState {
        return { ...this.state };
    }
    
    reset(): void {
        this.state = {
            state: 'CLOSED',
            failureCount: 0,
            lastFailureTime: null,
            nextAllowedAttempt: 0
        };
        this.halfOpenCallCount = 0;
        console.log('Circuit breaker manually reset to CLOSED');
    }
    
    isClosed(): boolean {
        return this.state.state === 'CLOSED';
    }
    
    isOpen(): boolean {
        return this.state.state === 'OPEN';
    }
    
    isHalfOpen(): boolean {
        return this.state.state === 'HALF_OPEN';
    }
}