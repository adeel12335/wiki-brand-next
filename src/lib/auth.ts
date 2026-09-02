import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { AdminUser } from "@/lib/db/models";
import { CACHE_KEYS, cacheGet, cacheSet } from "@/lib/cache/redis";

const MAX_ATTEMPTS = 8;
const ATTEMPT_WINDOW = 900;

async function getAttempts(ip: string): Promise<number> {
  const cached = await cacheGet<number>(CACHE_KEYS.loginAttempts(ip));
  return cached ?? 0;
}

async function recordAttempt(ip: string): Promise<void> {
  const current = await getAttempts(ip);
  await cacheSet(CACHE_KEYS.loginAttempts(ip), current + 1, ATTEMPT_WINDOW);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!isDbConfigured()) return null;

        const username = credentials?.username?.toString().trim() ?? "";
        const password = credentials?.password?.toString() ?? "";
        if (!username || !password) return null;

        const ip =
          request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          request?.headers?.get("x-real-ip") ??
          "unknown";

        if ((await getAttempts(ip)) >= MAX_ATTEMPTS) {
          return null;
        }

        await connectDB();
        const user = await AdminUser.findOne({ username }).lean();
        if (!user) {
          await recordAttempt(ip);
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          await recordAttempt(ip);
          return null;
        }

        await cacheSet(CACHE_KEYS.loginAttempts(ip), 0, ATTEMPT_WINDOW);

        await AdminUser.updateOne(
          { _id: user._id },
          { $set: { lastLoginAt: new Date() } },
        );

        return {
          id: user._id.toString(),
          name: user.username,
        };
      },
    }),
  ],
});
