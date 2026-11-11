import NextAuth from "next-auth";
import type { NextFetchEvent, NextRequest } from "next/server";
import { authConfig } from "@/auth.config";

/**
 * - /portfolio, /portfolio/<slug>, /trustpilot, pricing (/wikipedia-page-cost, /pricing) → 403 Forbidden (pages disabled).
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
    return new Response("403 Forbidden", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
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
