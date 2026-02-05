import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
    title: 'Moonu Bot',
    description: 'A powerful AI assistant powered by NVIDIA AI',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Moonu Bot',
    },
    formatDetection: {
        telephone: false,
    },
};

export const viewport = {
    themeColor: '#76b900',
    initialScale: 1,
    width: 'device-width',
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}