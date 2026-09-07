import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // Collapse www → apex so Google does not treat both hosts as duplicates.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thewikipediastudio.com" }],
        destination: "https://thewikipediastudio.com/:path*",
        permanent: true,
      },
      // Old pricing URL (keep both slash variants; trailingSlash may hop once).
      {
        source: "/pricing",
        destination: "/wikipedia-page-cost/",
        permanent: true,
      },
      {
        source: "/pricing/",
        destination: "/wikipedia-page-cost/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "thewikipediastudio.com",
      },
      {
        protocol: "https",
        hostname: "www.thewikipediastudio.com",
      },
      {
        protocol: "https",
        hostname: "thewikistudio.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
      },
      // Reinforce intentional noindex (meta + header) so GSC exclusion is deliberate.
      {
        source: "/thank-you",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/thank-you/",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
