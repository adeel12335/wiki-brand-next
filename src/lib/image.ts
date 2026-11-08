/** Hosts allowed in next.config `images.remotePatterns`. */
const ALLOWED_HOSTS = new Set([
  "res.cloudinary.com",
  "thewikipediastudio.com",
  "www.thewikipediastudio.com",
  "thewikistudio.com",
]);

export const FALLBACK_IMAGE = "/assets/og/og-default.png";

/** Normalises CMS image URLs for next/image; unknown hosts fall back to the default artwork. */
export function safeImageSrc(src?: string | null, fallback = FALLBACK_IMAGE): string {
  if (!src) return fallback;
  if (src.startsWith("/")) return src;
  if (!/^https?:\/\//i.test(src)) return `/${src.replace(/^\.?\//, "")}`;
  try {
    const { protocol, hostname } = new URL(src);
    return protocol === "https:" && ALLOWED_HOSTS.has(hostname) ? src : fallback;
  } catch {
    return fallback;
  }
}
