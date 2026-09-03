import dns from "node:dns";
import { promises as dnsPromises } from "node:dns";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

function applyDnsServers(): void {
  const fromEnv = process.env.MONGODB_DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (fromEnv?.length) {
    dns.setServers(fromEnv);
    return;
  }

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.MONGODB_URI?.startsWith("mongodb+srv://")
  ) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
}

/**
 * Next.js/Turbopack can isolate `node:dns` from the copy mongoose uses, so
 * `dns.setServers()` alone does not always fix mongodb+srv SRV lookups.
 * Resolve SRV/TXT with our dns binding, then connect over mongodb://.
 */
async function toDirectMongoUri(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  applyDnsServers();

  const withScheme = uri.replace(/^mongodb\+srv:\/\//i, "https://");
  const parsed = new URL(withScheme);
  const hostname = parsed.hostname;

  const srv = await dnsPromises.resolveSrv(`_mongodb._tcp.${hostname}`);
  if (!srv.length) {
    throw new Error(`No SRV records found for ${hostname}`);
  }

  const hosts = srv
    .map((record) => `${record.name.replace(/\.$/, "")}:${record.port}`)
    .join(",");

  const params = new URLSearchParams(parsed.search);
  params.delete("ssl");
  if (!params.has("tls")) params.set("tls", "true");
  if (!params.has("authSource")) params.set("authSource", "admin");
  if (!params.has("retryWrites")) params.set("retryWrites", "true");
  if (!params.has("w")) params.set("w", "majority");

  try {
    const txtRecords = await dnsPromises.resolveTxt(hostname);
    for (const chunks of txtRecords) {
      const line = chunks.join("");
      for (const part of line.split("&")) {
        const [rawKey, ...rest] = part.split("=");
        const key = rawKey?.trim();
        if (!key) continue;
        if (!params.has(key)) params.set(key, rest.join("=").trim());
      }
    }
  } catch {
    // TXT is optional; Atlas usually still connects with tls + authSource.
  }

  const auth =
    parsed.username || parsed.password
      ? `${decodeURIComponent(parsed.username)}:${decodeURIComponent(parsed.password)}@`
      : "";
  const database = parsed.pathname || "";

  return `mongodb://${auth}${hosts}${database}?${params.toString()}`;
}

async function resetConnectionCache(): Promise<void> {
  cached.conn = null;
  cached.promise = null;
  try {
    await mongoose.disconnect();
  } catch {
    // ignore — connection may never have opened
  }
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (cached.conn && mongoose.connection.readyState !== 1) {
    await resetConnectionCache();
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      const uri = await toDirectMongoUri(MONGODB_URI);
      return mongoose.connect(uri, {
        bufferCommands: false,
      });
    })().catch(async (error) => {
      await resetConnectionCache();
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}
