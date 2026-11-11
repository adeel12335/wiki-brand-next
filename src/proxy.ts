import NextAuth from "next-auth";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

/**
 * - /portfolio, /portfolio/<slug>, /trustpilot, pricing (/wikipedia-page-cost, /pricing) → 404 Not Found (pages disabled).
 * - /admin → edge-safe auth gate.
 * Host canonicalization (www → apex) and legacy path redirects live in next.config.ts.
 */
const { auth } = NextAuth(authConfig);

const BLOCKED_PREFIXES = ["/portfolio", "/trustpilot", "/wikipedia-page-cost", "/pricing"];

function isBlocked(pathname: string): boolean {
  return BLOCKED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  if (isBlocked(req.nextUrl.pathname)) {
    // Serve the site's own 404 page (header + footer, 404 status) via the
    // (site)/[...notFound] catch-all, while the browser URL stays unchanged.
    const res = NextResponse.rewrite(new URL("/__page-not-found__/", req.url));
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (auth as any)(req, event);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portfolio",
    "/portfolio/:path*",
    "/trustpilot",
    "/trustpilot/:path*",
    "/wikipedia-page-cost",
    "/wikipedia-page-cost/:path*",
    "/pricing",
    "/pricing/:path*",
  ],
};
