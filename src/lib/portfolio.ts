import { revalidateTag, unstable_cache } from "next/cache";
import { CACHE_KEYS, cacheDel, cacheGet, cacheSet } from "@/lib/cache/redis";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { PortfolioItem } from "@/lib/db/models";
import { portfolioFallback } from "@/lib/data";
import { notifyIndexNow } from "@/lib/indexnow";
import { slugify } from "@/lib/utils";

export interface PublicPortfolioItem {
  id: string | null;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string;
  externalUrl: string | null;
  featuredOnHome: boolean;
  imageUrl: string | null;
  imageAlt: string;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  updatedAt: Date | null;
  isFallback?: boolean;
}

const LOCAL_PORTFOLIO_TTL_MS = 5 * 60 * 1000;
const PORTFOLIO_CACHE_TAG = "published-portfolio";
const PORTFOLIO_CACHE_VERSION = "v3";
let localPortfolioCache:
  | { items: PublicPortfolioItem[]; expiresAt: number }
  | null = null;

function getLocalPortfolio(): PublicPortfolioItem[] | null {
  if (!localPortfolioCache || localPortfolioCache.expiresAt <= Date.now()) {
    localPortfolioCache = null;
    return null;
  }

  return localPortfolioCache.items;
}

function setLocalPortfolio(items: PublicPortfolioItem[]): PublicPortfolioItem[] {
  localPortfolioCache = {
    items,
    expiresAt: Date.now() + LOCAL_PORTFOLIO_TTL_MS,
  };
  return items;
}

function normalizeCachedPortfolio(
  items: PublicPortfolioItem[],
): PublicPortfolioItem[] {
  return items.map((item) => {
    const updatedAt = item.updatedAt as Date | string | null;
    const isFallback = item.isFallback ?? item.id === null;
    if (!updatedAt || updatedAt instanceof Date) {
      return { ...item, isFallback };
    }

    const parsed = new Date(updatedAt);
    return {
      ...item,
      updatedAt: Number.isNaN(parsed.getTime()) ? null : parsed,
      isFallback,
    };
  });
}

function mapFallback(): PublicPortfolioItem[] {
  return portfolioFallback.map((item, position) => ({
    id: null,
    slug: slugify(item.title),
    title: item.title,
    category: item.title,
    summary: item.copy,
    body: item.detail,
    externalUrl: item.externalUrl ?? null,
    featuredOnHome: item.featuredOnHome ?? false,
    imageUrl: item.image.startsWith("http")
      ? item.image
      : `/${item.image.replace(/^\//, "")}`,
    imageAlt: item.alt,
    metaTitle: null,
    metaDescription: null,
    keywords: null,
    updatedAt: null,
    isFallback: true,
    sortOrder: position,
  }));
}

function mapDoc(
  doc: {
    _id: { toString(): string };
    slug: string;
    title: string;
    category?: string;
    summary?: string;
    body?: string | null;
    externalUrl?: string | null;
    featuredOnHome?: boolean;
    image?: { url?: string; alt?: string } | null;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
    updatedAt?: Date;
  },
): PublicPortfolioItem {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    category: doc.category ?? "",
    summary: doc.summary ?? "",
    body: doc.body ?? "",
    externalUrl: doc.externalUrl ?? null,
    featuredOnHome: doc.featuredOnHome ?? false,
    imageUrl: doc.image?.url ?? null,
    imageAlt: doc.image?.alt ?? doc.title,
    metaTitle: doc.seo?.metaTitle ?? null,
    metaDescription: doc.seo?.metaDescription ?? null,
    keywords: doc.seo?.keywords ?? null,
    updatedAt: doc.updatedAt ?? null,
  };
}

async function loadPublishedPortfolio(): Promise<PublicPortfolioItem[]> {
  const bypassCache = process.env.NODE_ENV === "development";

  if (!bypassCache) {
    const cached = await cacheGet<PublicPortfolioItem[]>(CACHE_KEYS.portfolioList);
    if (cached) return normalizeCachedPortfolio(cached);
  }

  if (!isDbConfigured()) {
    return mapFallback();
  }

  try {
    await connectDB();
    const docs = await PortfolioItem.find({ status: "published" })
      .sort({ sortOrder: 1, createdAt: 1 })
      .lean();

    const items =
      docs.length > 0 ? docs.map((doc) => mapDoc(doc as never)) : mapFallback();

    if (!bypassCache) {
      await cacheSet(CACHE_KEYS.portfolioList, items);
    }
    return items;
  } catch {
    return mapFallback();
  }
}

const getCachedPublishedPortfolio = unstable_cache(
  loadPublishedPortfolio,
  [`published-portfolio-${PORTFOLIO_CACHE_VERSION}`],
  {
    tags: [PORTFOLIO_CACHE_TAG],
    revalidate: 60,
  },
);

export async function getPublishedPortfolio(): Promise<PublicPortfolioItem[]> {
  // Dev: always hit Mongo/fallback so imports show immediately.
  if (process.env.NODE_ENV === "development") {
    localPortfolioCache = null;
    return normalizeCachedPortfolio(await loadPublishedPortfolio());
  }

  const local = getLocalPortfolio();
  if (local) return local;

  const items = normalizeCachedPortfolio(await getCachedPublishedPortfolio());
  return setLocalPortfolio(items);
}

export async function getFeaturedPortfolio(): Promise<PublicPortfolioItem[]> {
  const all = await getPublishedPortfolio();
  const featured = all.filter((item) => item.featuredOnHome);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

export function isIndexablePortfolioItem(item: PublicPortfolioItem): boolean {
  const bodyWordCount = item.body.trim().split(/\s+/).filter(Boolean).length;
  return item.id !== null && item.isFallback !== true && bodyWordCount >= 80;
}

export async function getPortfolioBySlug(
  slug: string,
): Promise<PublicPortfolioItem | null> {
  const normalized = slugify(slug);
  const local = getLocalPortfolio();
  const localItem = local?.find((item) => item.slug === normalized);
  if (localItem) return localItem;

  const items = await getPublishedPortfolio();
  return items.find((item) => item.slug === normalized) ?? null;
}

export async function invalidatePortfolioCache(slug?: string): Promise<void> {
  localPortfolioCache = null;
  revalidateTag(PORTFOLIO_CACHE_TAG, { expire: 0 });
  const keys: string[] = [CACHE_KEYS.portfolioList];
  if (slug) keys.push(CACHE_KEYS.portfolioItem(slugify(slug)));
  await cacheDel(...keys);
  await notifyIndexNow(["", "portfolio", ...(slug ? [`portfolio/${slug}`] : [])]);
}
