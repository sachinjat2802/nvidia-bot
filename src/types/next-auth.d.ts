import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            userMetadata?: {
                full_name: string;
                company_name: string | null;
                timezone: string;
                theme: string;
                notifications_enabled: boolean;
            };
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        userMetadata?: {
            full_name: string;
            company_name: string | null;
            timezone: string;
            theme: string;
            notifications_enabled: boolean;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        userMetadata?: {
            full_name: string;
            company_name: string | null;
            timezone: string;
            theme: string;
            notifications_enabled: boolean;
        };
    }
}