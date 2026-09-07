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
  "case-studies",
  "blog",
  "faq",
  "contact",
  "resources",
  "sitemap",
  "privacy-policy",
  "terms-conditions",
  "wikipedia-notability-checker",
  "how-to-choose-wikipedia-agency",
  "wikipedia-page-for-authors",
  "wikipedia-page-for-companies",
  "wikipedia-page-for-academics",
  "wikipedia-page-for-musicians",
];

const CONTENT_LAST_MODIFIED = "2026-09-04";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Never fail the whole sitemap if Mongo/Redis is briefly unavailable.
  const [portfolioItems, blogPosts] = await Promise.all([
    getPublishedPortfolio().catch(() => []),
    getAllBlogPosts().catch(() => []),
  ]);

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

  // Index article URLs in the sitemap — pagination is crawlable via hub links + rel prev/next.
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
