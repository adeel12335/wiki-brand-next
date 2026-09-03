import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
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
  "wikipedia-page-cost",
  "our-process",
  "portfolio",
  "blog",
  "faq",
  "contact",
  "sitemap",
  "privacy-policy",
  "terms-conditions",
];

const CONTENT_LAST_MODIFIED = "2026-09-03";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioItems = await getPublishedPortfolio();
  const blogPosts = getAllBlogPosts();

  const staticEntries = STATIC_ROUTES.map((slug) => ({
    url: absUrl(slug),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency:
      slug === "" || slug === "blog" ? ("weekly" as const) : ("monthly" as const),
    priority:
      slug === ""
        ? 1
        : slug === "contact" ||
            slug === "blog" ||
            slug === "wikipedia-page-cost"
          ? 0.9
          : 0.8,
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
      lastModified: item.updatedAt ?? CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Index article URLs only — skip /blog/page/N pagination (thin duplicates).
  const blogPostEntries = blogPosts.map((post) => ({
    url: absUrl(`blog/${post.slug}`),
    lastModified: post.modifiedAt,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...staticEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...blogPostEntries,
  ];
}
