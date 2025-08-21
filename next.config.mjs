import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true, // enables server actions
  },
  // add more config options here if needed
};

export default nextConfig;
