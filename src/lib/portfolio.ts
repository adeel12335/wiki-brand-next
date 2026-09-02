import { CACHE_KEYS, cacheDel, cacheGet, cacheSet } from "@/lib/cache/redis";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { PortfolioItem } from "@/lib/db/models";
import { portfolioFallback } from "@/lib/data";
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

export async function getPublishedPortfolio(): Promise<PublicPortfolioItem[]> {
  const cached = await cacheGet<PublicPortfolioItem[]>(CACHE_KEYS.portfolioList);
  if (cached) return cached;

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

    await cacheSet(CACHE_KEYS.portfolioList, items);
    return items;
  } catch {
    return mapFallback();
  }
}

export async function getFeaturedPortfolio(): Promise<PublicPortfolioItem[]> {
  const all = await getPublishedPortfolio();
  const featured = all.filter((item) => item.featuredOnHome);
  return featured.length > 0 ? featured : all.slice(0, 6);
}

export async function getPortfolioBySlug(
  slug: string,
): Promise<PublicPortfolioItem | null> {
  const normalized = slugify(slug);
  const cacheKey = CACHE_KEYS.portfolioItem(normalized);
  const cached = await cacheGet<PublicPortfolioItem>(cacheKey);
  if (cached) return cached;

  if (isDbConfigured()) {
    try {
      await connectDB();
      const doc = await PortfolioItem.findOne({
        slug: normalized,
        status: "published",
      }).lean();

      if (doc) {
        const item = mapDoc(doc as never);
        await cacheSet(cacheKey, item);
        return item;
      }
    } catch {
      // fall through to fallback
    }
  }

  const fallback = mapFallback().find((item) => item.slug === normalized) ?? null;
  if (fallback) await cacheSet(cacheKey, fallback);
  return fallback;
}

export async function invalidatePortfolioCache(slug?: string): Promise<void> {
  const keys: string[] = [CACHE_KEYS.portfolioList];
  if (slug) keys.push(CACHE_KEYS.portfolioItem(slugify(slug)));
  await cacheDel(...keys);
}
