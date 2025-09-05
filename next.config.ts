import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/', // The incoming request path
                destination: '/blogs', // The path you want to redirect to
                permanent: true, // Set to true for permanent redirects (308), false for temporary (307)
            },
        ];
    },
};

export default nextConfig;
