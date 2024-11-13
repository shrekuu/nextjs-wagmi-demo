import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? "/nextjs-wagmi-demo/" : "",
  basePath: isProd ? "/nextjs-wagmi-demo" : "",
  eslint: {
    // disable linting during build phase
    ignoreDuringBuilds: true,
  },
  typescript: {
    // disable type-checking during build phase
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
