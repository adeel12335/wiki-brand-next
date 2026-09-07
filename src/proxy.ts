import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * Edge-safe auth gate for /admin only.
 * Host canonicalization (www → apex) and legacy path redirects live in next.config.ts.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
