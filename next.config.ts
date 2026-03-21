import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  typedRoutes: true,
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
