/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ensure that we can use older packages if needed
    webpack: (config) => {
        config.resolve.fallback = { fs: false, path: false };
        return config;
    },
};

module.exports = nextConfig;
