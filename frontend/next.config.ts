import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    allowedDevOrigins: ["*.orb.local", "frontend.sentinel-apps.orb.local"],
  },
};

export default nextConfig;
