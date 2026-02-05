import { createClient } from '@supabase/supabase-js';

// In-memory fallback for development or when Supabase is unreachable
const memoryStore = new Map<string, { count: number; reset: number }>();

// Lightweight Supabase client for Middleware (Edge Runtime compatible)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if env vars exist
const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

/**
 * Checks rate limit using Supabase RPC or In-Memory fallback
 * @param identifier Unique key (e.g. "ip:127.0.0.1")
 * @param limit Max requests
 * @param windowSeconds Time window in seconds
 */
export async function checkRateLimit(
    identifier: string,
    limit: number = 10,
    windowSeconds: number = 10
): Promise<RateLimitResult> {
    const now = Math.floor(Date.now() / 1000);

    // 1. Try Supabase if configured
    if (supabase) {
        try {
            const { data, error } = await supabase.rpc('check_rate_limit', {
                request_key: identifier,
                max_requests: limit,
                window_seconds: windowSeconds
            });

            if (!error && data) {
                return {
                    success: data.success,
                    limit: limit,
                    remaining: data.remaining,
                    reset: data.reset
                };
            }

            // If error is "function not found"
            if (error && (error.code === 'PGRST202' || error.message?.includes('function') || error.message?.includes('not found'))) {
                (console as any).warnOnce('Supabase rate check failed (RPC missing?). Falling back to memory.', error.message);
            } else {
                // Other errors (network, etc) -> Fallback
                console.error('Supabase rate check error:', error);
            }
        } catch (err) {
            console.error('Unexpected Supabase rate limit error:', err);
        }
    }

    // 2. Fallback: In-Memory (Not persistent across serverless invocations, but good for local/dev)
    const record = memoryStore.get(identifier);

    if (record) {
        if (now > record.reset) {
            // Expired
            memoryStore.set(identifier, { count: 1, reset: now + windowSeconds });
            return { success: true, limit, remaining: limit - 1, reset: now + windowSeconds };
        }

        if (record.count >= limit) {
            // Exceeded
            return { success: false, limit, remaining: 0, reset: record.reset };
        }

        // Increment
        record.count++;
        return { success: true, limit, remaining: limit - record.count, reset: record.reset };
    }

    // New
    memoryStore.set(identifier, { count: 1, reset: now + windowSeconds });
    return { success: true, limit, remaining: limit - 1, reset: now + windowSeconds };
}

// Helper to avoid spamming console
// @ts-ignore
console.warnOnce = (function () {
    const logged = new Set();
    return function (msg: string, ...args: any[]) {
        if (!logged.has(msg)) {
            console.warn(msg, ...args);
            logged.add(msg);
        }
    }
})();
