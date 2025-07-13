import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
    ],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

export default nextConfig;
