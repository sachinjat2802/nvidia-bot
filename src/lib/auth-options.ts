import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                console.log('Auth attempt for:', credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log('Missing credentials');
                    return null;
                }

                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
                const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
                const supabase = createClient(supabaseUrl, supabaseAnonKey);

                // Sign in with Supabase Auth
                console.log('Attempting Supabase sign in...');
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (error) {
                    console.error('Supabase auth error:', error.message, error);
                    return null;
                }

                if (!data.user) {
                    console.error('No user returned from Supabase');
                    return null;
                }

                console.log('Supabase auth successful for user:', data.user.id);

                // Get user profile (may not exist if user was created before profile table)
                let profile: any = null;
                try {
                    console.log('Querying user_profiles for user:', data.user.id);
                    const { data: profileData, error: profileError } = await supabase
                        .from('user_profiles')
                        .select('*')
                        .eq('id', data.user.id)
                        .single();

                    if (profileError) {
                        // If the error is "no rows", that's fine - user just doesn't have a profile yet
                        if (profileError.code === 'PGRST116') {
                            console.log('No user profile exists yet (PGRST116), using user_metadata fallback');
                        } else {
                            console.error('Profile query error:', profileError.code, profileError.message);
                        }
                    } else {
                        console.log('Profile found:', profileData);
                        profile = profileData;
                    }
                } catch (err) {
                    console.error('Profile query exception:', err);
                }

                // If no profile exists, create default userMetadata from Supabase user_metadata
                const userMetadata = {
                    full_name: profile?.full_name || data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
                    company_name: profile?.company_name || data.user.user_metadata?.company_name || null,
                    timezone: profile?.timezone || data.user.user_metadata?.timezone || 'UTC',
                    theme: profile?.theme || data.user.user_metadata?.theme || 'cyber',
                    notifications_enabled: profile?.notifications_enabled ?? data.user.user_metadata?.notifications_enabled ?? true,
                };

                console.log('Returning user object:', {
                    id: data.user.id,
                    email: data.user.email,
                    name: userMetadata.full_name,
                    userMetadata,
                });

                return {
                    id: data.user.id,
                    email: data.user.email,
                    name: userMetadata.full_name,
                    image: data.user.user_metadata?.avatar_url,
                    userMetadata,
                };
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    picture: user.image,
                    userMetadata: user.userMetadata,
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
                session.user.userMetadata = token.userMetadata as any;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};