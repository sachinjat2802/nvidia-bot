import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { withAuth } from "next-auth/middleware";

// Rate limit middleware
export async function rateLimitMiddleware(req: NextRequest, maxRequests: number = 10, windowSeconds: number = 10) {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const identifier = `rate-limit:${ip}`;

    try {
        const { success, limit, remaining, reset } = await checkRateLimit(identifier, maxRequests, windowSeconds);

        if (!success) {
            const retryAfter = Math.max(0, Math.ceil(reset - (Date.now() / 1000)));
            return NextResponse.json(
                { error: 'Too many requests', retryAfter, limit, remaining: 0 },
                { status: 429, headers: { 'Retry-After': retryAfter.toString() } }
            );
        }

        // Add rate limit headers (optional, modify response later or just return null)
        // Since we return null to continue, we can't easily set headers on the final response here 
        // without cloning or modifying the request context, but usually headers are set on the RESPONSE.
        // We will just let the request pass.

        return null; // Continue processing
    } catch (error) {
        console.error('Rate limit error:', error);
        return null; // Continue on error (fail open)
    }
}

// Request size limit middleware
export function sizeLimitMiddleware(maxSize: number = 1024 * 1024) { // Default 1MB
    return (req: NextRequest) => {
        const contentLength = req.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > maxSize) {
            return NextResponse.json(
                { error: `Request too large. Maximum size is ${maxSize} bytes` },
                { status: 413 }
            );
        }
        return null;
    };
}

// CSRF protection middleware (basic implementation)
export async function csrfMiddleware(req: NextRequest) {
    // Skip for GET, HEAD, OPTIONS
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return null;
    }

    // For same-origin requests, check the Origin/Referer header
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    const host = req.headers.get('host');

    // In development, allow localhost
    const allowedOrigins = [
        process.env.NEXT_PUBLIC_APP_URL,
        `http://localhost:${process.env.PORT || 3000}`,
        `http://127.0.0.1:${process.env.PORT || 3000}`,
    ].filter(Boolean);

    const isSameOrigin = origin && (
        origin.startsWith(`http://${host}`) ||
        origin.startsWith(`https://${host}`)
    );

    const isAllowedOrigin = origin && allowedOrigins.includes(origin);

    if (!isSameOrigin && !isAllowedOrigin) {
        return NextResponse.json(
            { error: 'Invalid origin' },
            { status: 403 }
        );
    }

    return null;
}

// Environment validation middleware (run at startup)
export function validateEnvironment() {
    // ... existing validation code ...
    return true;
}

// Main middleware that combines policies
export default withAuth(
    async function middleware(req: NextRequest) {
        try {
            // 1. Rate Limiting
            // Skip rate limiting for authenticated users
            const token = (req as any).nextauth?.token;
            if (!token) {
                const rateLimitRes = await rateLimitMiddleware(req);
                if (rateLimitRes) return rateLimitRes;
            }

            // 2. Size Limit Check (1MB default for API routes)
            if (req.nextUrl.pathname.startsWith('/api/')) {
                const sizeLimitRes = sizeLimitMiddleware(10 * 1024 * 1024)(req); // 10MB limit
                if (sizeLimitRes) return sizeLimitRes;
            }

            // 3. CSRF Check
            if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
                const csrfRes = await csrfMiddleware(req);
                if (csrfRes) return csrfRes;
            }

            return NextResponse.next();
        } catch (error) {
            console.error('Middleware error:', error);
            // fail open for static assets if they somehow got here, or return 500 for API
            if (req.nextUrl.pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            }
            return NextResponse.next();
        }
    },
    {
        pages: {
            signIn: '/login',
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
    ],
};