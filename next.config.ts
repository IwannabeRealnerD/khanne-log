import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
