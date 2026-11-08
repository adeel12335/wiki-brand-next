import { isIndexablePortfolioItem, type PublicPortfolioItem } from "@/lib/portfolio";
import type { CaseCardItem } from "./CaseCard";

/** CMS category, or null when it is missing / just repeats the title (fallback data). */
export function displayCategory(item: Pick<PublicPortfolioItem, "category" | "title">): string | null {
  const cat = item.category?.trim();
  return cat && cat.toLowerCase() !== item.title.trim().toLowerCase() ? cat : null;
}

/**
 * Server-side mapping. Like the previous grid, items without an indexable detail page
 * (thin / fallback copy, served noindex) link straight to their live Wikipedia article.
 */
export function toCaseCard(item: PublicPortfolioItem): CaseCardItem {
  const indexable = isIndexablePortfolioItem(item);
  const external = !indexable && Boolean(item.externalUrl);
  return {
    slug: item.slug,
    title: item.title,
    category: displayCategory(item),
    summary: item.summary,
    imageUrl: item.imageUrl,
    imageAlt: item.imageAlt,
    href: external && item.externalUrl ? item.externalUrl : `/portfolio/${item.slug}/`,
    external,
    live: Boolean(item.externalUrl),
  };
}
