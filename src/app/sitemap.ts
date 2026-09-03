import type { MetadataRoute } from "next";
import { getAllBlogPosts, getBlogPageCount } from "@/lib/blog";
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
  "blog",
  "faq",
  "contact",
  "privacy-policy",
  "terms-conditions",
];

const CONTENT_LAST_MODIFIED = "2026-09-03";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const portfolioItems = await getPublishedPortfolio();
  const blogPosts = getAllBlogPosts();
  const blogPages = getBlogPageCount();

  const staticEntries = STATIC_ROUTES.map((slug) => ({
    url: absUrl(slug),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency:
      slug === "" || slug === "blog" ? ("weekly" as const) : ("monthly" as const),
    priority: slug === "" ? 1 : slug === "contact" || slug === "blog" ? 0.9 : 0.8,
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

  const blogPostEntries = blogPosts.map((post) => ({
    url: absUrl(`blog/${post.slug}`),
    lastModified: post.modifiedAt,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPageEntries = Array.from(
    { length: Math.max(0, blogPages - 1) },
    (_, index) => ({
      url: absUrl(`blog/page/${index + 2}`),
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.55,
    }),
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...blogPostEntries,
    ...blogPageEntries,
  ];
}
