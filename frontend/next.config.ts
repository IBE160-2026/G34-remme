import type { NextConfig } from "next";

// Read when the Next server starts. 127.0.0.1 (not localhost), so Node does not resolve to ::1.
const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  // The app is opened at http://127.0.0.1:3000; Next 16 dev blocks its dev resources otherwise.
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
};

export default nextConfig;
