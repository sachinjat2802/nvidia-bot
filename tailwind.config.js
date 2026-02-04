/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary)',
                    hover: 'var(--primary-hover)',
                    dim: 'var(--primary-dim)',
                },
                background: 'var(--background)',
                surface: {
                    DEFAULT: 'var(--surface)',
                    hover: 'var(--surface-hover)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                },
                border: 'var(--border)',
            },
            fontFamily: {
                heading: ['var(--font-orbitron)'],
                sans: ['var(--font-inter)'],
                mono: ['var(--font-mono)'],
            },
            boxShadow: {
                'glow': '0 0 15px var(--primary-dim)',
            }
        },
    },
    plugins: [],
}
