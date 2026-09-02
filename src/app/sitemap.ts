import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/config";
import { serviceSlugs } from "@/lib/data";
import {
  getPublishedPortfolio,
  isIndexablePortfolioItem,
} from "@/lib/portfolio";

const STATIC_ROUTES = [
  "",
  "about-us",
  "services",
  "our-process",
  "portfolio",
  "faq",
  "contact",
  "privacy-policy",
  "terms-conditions",
];

const CONTENT_LAST_MODIFIED = "2026-09-02";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioItems = await getPublishedPortfolio();

  const staticEntries = STATIC_ROUTES.map((slug) => ({
    url: absUrl(slug),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: slug === "" ? ("weekly" as const) : ("monthly" as const),
    priority: slug === "" ? 1 : slug === "contact" ? 0.9 : 0.8,
  }));

  const serviceEntries = serviceSlugs.map((slug) => ({
    url: absUrl(`services/${slug}`),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioEntries = portfolioItems
    .filter(isIndexablePortfolioItem)
    .map((item) => ({
      url: absUrl(`portfolio/${item.slug}`),
      ...(item.updatedAt ? { lastModified: item.updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries];
}
