import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
