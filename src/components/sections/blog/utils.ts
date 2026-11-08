import type { BlogPost } from "@/types";

/** Fields a listing card needs (kept small so it can be passed to client components). */
export type CardPost = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readingMinutes" | "ogImage">;

export function toCardPost(post: BlogPost): CardPost {
  const { slug, title, excerpt, category, publishedAt, readingMinutes, ogImage } = post;
  return { slug, title, excerpt, category, publishedAt, readingMinutes, ogImage };
}

/** "12 Aug 2026" - client-safe (no `@/lib/blog` import, which pulls in the DB layer). */
export function shortDate(iso: string): string {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** "October 19, 2026" - article rail format. */
export function longDate(iso: string): string {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function slugifyTopic(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Splits a post title into two heading lines (second line rendered gold).
 * Prefers a natural break (colon, dash, parenthesis), otherwise the word boundary nearest the middle.
 */
export function splitTitle(title: string): [string, string | null] {
  const colon = title.match(/^(.{12,}?[:?])\s+(.{8,})$/);
  if (colon) return [colon[1], colon[2]];
  const dash = title.match(/^(.{12,}?)\s+[ - - -]\s+(.{8,})$/);
  if (dash) return [dash[1], dash[2]];
  const paren = title.match(/^(.{12,}?)\s+(\(.{8,}\))$/);
  if (paren) return [paren[1], paren[2]];
  const words = title.split(/\s+/);
  if (words.length < 4) return [title, null];
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const left = words.slice(0, i).join(" ").length;
    const diff = Math.abs(left - title.length / 2);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
