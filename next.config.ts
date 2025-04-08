import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds if needed (for temporary deployments)
  eslint: {
    ignoreDuringBuilds: true, // ← Set to false to enforce ESLint in production
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  // Add any other Next.js config options here
  images: {
    domains: ["example.com"], // Add your image domains if needed
  },

  // Optional: Configure TypeScript (if using)
  typescript: {
    ignoreBuildErrors: false, // Set to true if you have TS errors blocking deployment
  },
};

export default nextConfig;
