import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  if (!redis) {
    redis = new Redis({ url, token });
  }

  return redis;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedis();
  if (!client) return null;
  try {
    return await client.get<T>(key);
  } catch {
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds = 3600,
): Promise<void> {
  const client = getRedis();
  if (!client) return;
  try {
    await client.set(key, value, { ex: ttlSeconds });
  } catch {
    // Graceful degradation when Redis is unavailable
  }
}

export async function cacheDel(...keys: string[]): Promise<void> {
  const client = getRedis();
  if (!client || keys.length === 0) return;
  try {
    await client.del(...keys);
  } catch {
    // ignore
  }
}

export const CACHE_KEYS = {
  portfolioList: "portfolio:list:published:v4",
  portfolioItem: (slug: string) => `portfolio:item:v4:${slug}`,
  loginAttempts: (ip: string) => `admin:login:attempts:${ip}`,
} as const;
