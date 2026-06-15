const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: false,
    aggressiveFrontEndNavCaching: false,
    reloadOnOnline: true,
    swMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ensure that we can use older packages if needed
    webpack: (config) => {
        config.externals = [...(config.externals || []), 'vm2'];
        config.resolve.fallback = { fs: false, path: false };
        return config;
    },
};

module.exports = withPWA(nextConfig);
