import "server-only";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Several imported portfolio entries ship the same generic grey silhouette
 * (the old WordPress default avatar) under different file names. Matching by
 * content hash lets the UI show a branded monogram instead of that image.
 */
const GENERIC_AVATAR_MD5 = "d78f3246d5d6910503e6941cdcef589b";
const cache = new Map<string, boolean>();

export function isGenericAvatar(src: string | null | undefined): boolean {
  if (!src) return true;
  const lower = src.toLowerCase();
  if (lower.includes("default-avatar") || lower.endsWith("/placeholder.png")) return true;
  if (!src.startsWith("/assets/")) return false;

  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  let generic = false;
  try {
    const file = readFileSync(path.join(process.cwd(), "public", src));
    generic = createHash("md5").update(file).digest("hex") === GENERIC_AVATAR_MD5;
  } catch {
    generic = false; // missing file: let next/image report it
  }
  cache.set(src, generic);
  return generic;
}
