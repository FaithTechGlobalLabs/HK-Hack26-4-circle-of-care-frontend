import type { NextConfig } from "next";

// Django API origin. The browser only ever talks to this Next app; /api/* is proxied here,
// so there is no CORS to configure.
const API_URL = (process.env.API_URL || "http://localhost:8000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        // The app calls /api/requests/12/offers (no trailing slash; Next would 308-redirect one away).
        // Django's URLs need exactly one trailing slash, so add it here. The query string is kept.
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*/`,
      },
    ];
  },
};

export default nextConfig;
