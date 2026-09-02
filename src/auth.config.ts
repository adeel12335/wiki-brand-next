import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config — used by middleware only.
 * Do not import mongoose, bcrypt, or other Node-only modules here.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      const isLoginPage = path === "/admin" || path === "/admin/";

      if (isLoginPage) return true;

      if (path.startsWith("/admin")) {
        return !!auth?.user;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
