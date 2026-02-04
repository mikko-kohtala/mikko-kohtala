import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/tmp/claude-code-insights",
        destination: "/tmp/claude-code-insights/index.html",
      },
    ];
  },
};

export default nextConfig;
