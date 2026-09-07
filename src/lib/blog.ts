import { revalidateTag, unstable_cache } from "next/cache";
import { CACHE_KEYS, cacheDel, cacheGet, cacheSet } from "@/lib/cache/redis";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { BlogPostModel } from "@/lib/db/models";
import { blogPosts as staticBlogPosts } from "@/lib/data/blog-posts";
import { notifyIndexNow } from "@/lib/indexnow";
import { countWordsFromHtml, estimateReadingMinutes } from "@/lib/reading-time";
import type { BlogPost } from "@/types";

export const BLOG_PAGE_SIZE = 4;

const LOCAL_BLOG_TTL_MS = 5 * 60 * 1000;
const BLOG_CACHE_TAG = "published-blog";
const BLOG_CACHE_VERSION = "v1";

let localBlogCache: { posts: BlogPost[]; expiresAt: number } | null = null;

function withComputedReading(post: BlogPost): BlogPost {
  return {
    ...post,
    readingMinutes: estimateReadingMinutes(post.body),
    wordCount: countWordsFromHtml(post.body),
  };
}

function toDateString(value: Date | string | null | undefined): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (typeof value === "string") {
    return value.slice(0, 10);
  }
  return value.toISOString().slice(0, 10);
}

function mapStaticFallback(): BlogPost[] {
  return staticBlogPosts.map(withComputedReading);
}

function mapDoc(doc: {
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  category?: string;
  relatedService?: string | null;
  ogImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
}): BlogPost {
  const publishedAt = toDateString(doc.publishedAt);
  const modifiedAt = toDateString(doc.updatedAt ?? doc.publishedAt);
  return withComputedReading({
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.metaTitle || doc.title,
    metaDescription: doc.metaDescription || doc.excerpt || "",
    keywords: doc.keywords || "",
    excerpt: doc.excerpt || "",
    category: doc.category || "",
    publishedAt,
    modifiedAt,
    readingMinutes: 1,
    ogImage: doc.ogImage || "/assets/og/hero-orbital-globe.jpg",
    relatedService: doc.relatedService || undefined,
    body: doc.body || "",
  });
}

function sortByPublishedDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

function getLocalBlog(): BlogPost[] | null {
  if (!localBlogCache || localBlogCache.expiresAt <= Date.now()) {
    localBlogCache = null;
    return null;
  }
  return localBlogCache.posts;
}

function setLocalBlog(posts: BlogPost[]): BlogPost[] {
  localBlogCache = {
    posts,
    expiresAt: Date.now() + LOCAL_BLOG_TTL_MS,
  };
  return posts;
}

async function loadPublishedBlogPosts(): Promise<BlogPost[]> {
  const bypassCache = process.env.NODE_ENV === "development";

  if (!bypassCache) {
    const cached = await cacheGet<BlogPost[]>(CACHE_KEYS.blogList);
    if (cached?.length) return sortByPublishedDesc(cached.map(withComputedReading));
  }

  if (!isDbConfigured()) {
    return sortByPublishedDesc(mapStaticFallback());
  }

  try {
    await connectDB();
    const docs = await BlogPostModel.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean();

    const posts =
      docs.length > 0
        ? docs.map((doc) => mapDoc(doc as never))
        : mapStaticFallback();

    const sorted = sortByPublishedDesc(posts);
    if (!bypassCache) {
      await cacheSet(CACHE_KEYS.blogList, sorted);
    }
    return sorted;
  } catch {
    return sortByPublishedDesc(mapStaticFallback());
  }
}

const getCachedPublishedBlogPosts = unstable_cache(
  loadPublishedBlogPosts,
  [`published-blog-${BLOG_CACHE_VERSION}`],
  {
    tags: [BLOG_CACHE_TAG],
    revalidate: 60,
  },
);

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (process.env.NODE_ENV === "development") {
    localBlogCache = null;
    return loadPublishedBlogPosts();
  }

  const local = getLocalBlog();
  if (local) return local;

  const posts = await getCachedPublishedBlogPosts();
  return setLocalBlog(posts);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const normalized = slug.trim().toLowerCase();
  const all = await getAllBlogPosts();
  return all.find((post) => post.slug === normalized) ?? null;
}

export async function getBlogPageCount(
  pageSize = BLOG_PAGE_SIZE,
): Promise<number> {
  const all = await getAllBlogPosts();
  return Math.max(1, Math.ceil(all.length / pageSize));
}

export async function getBlogPostsPage(
  page: number,
  pageSize = BLOG_PAGE_SIZE,
): Promise<{ posts: BlogPost[]; page: number; totalPages: number; total: number }> {
  const all = await getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    posts: all.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    total: all.length,
  };
}

export async function getRelatedBlogPosts(
  slug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const all = await getAllBlogPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return all.slice(0, limit);
  return all
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export async function invalidateBlogCache(slug?: string): Promise<void> {
  localBlogCache = null;
  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  const keys: string[] = [CACHE_KEYS.blogList];
  if (slug) keys.push(CACHE_KEYS.blogItem(slug));
  await cacheDel(...keys);
  await notifyIndexNow(["blog", ...(slug ? [`blog/${slug}`] : [])]);
}

export function formatBlogDate(isoDate: string): string {
  const date = new Date(`${isoDate.slice(0, 10)}T12:00:00Z`);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function parsePublishedAt(value?: string | null): Date {
  if (!value) return new Date();
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(`${trimmed}T12:00:00.000Z`);
  }
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}
