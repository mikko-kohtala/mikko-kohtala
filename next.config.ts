import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/tmp/claude-code-insights",
        destination: "/tmp/claude-code-insights/index.html",
      },
      {
        source: "/nash-jocic-claude",
        destination: "/nash-jocic-claude/nash-jocic-programs.html",
      },
      {
        source: "/nash-jocic-codex",
        destination: "/nash-jocic-codex/nash-jocic-findings.html",
      },
    ];
  },
  // Keep selected public pages out of search indexes.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/2026-talousraportti-h1.html", headers: noindex },
      { source: "/nash-jocic-claude", headers: noindex },
      { source: "/nash-jocic-codex", headers: noindex },
      { source: "/nash-jocic-claude/:path*", headers: noindex },
      { source: "/nash-jocic-codex/:path*", headers: noindex },
    ];
  },
};

export default nextConfig;
