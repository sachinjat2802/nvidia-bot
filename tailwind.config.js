/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#00e5ff',
                    hover: '#00b8d4',
                    dim: 'rgba(0, 229, 255, 0.15)',
                },
                background: '#0a0a0f',
                surface: {
                    DEFAULT: '#12121e',
                    hover: '#1a1a2b',
                }
            },
            fontFamily: {
                heading: ['var(--font-orbitron)'],
                sans: ['var(--font-inter)'],
                mono: ['var(--font-mono)'],
            },
            boxShadow: {
                'glow': '0 0 15px rgba(0, 229, 255, 0.5)',
            }
        },
    },
    plugins: [],
}
