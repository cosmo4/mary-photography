/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www.honeybook.com",
                pathname: "/**",
            },
        ],
    }
};

export default nextConfig;
