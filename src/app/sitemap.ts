import type { MetadataRoute } from "next";
import { getSiteUrl, url } from "@/lib/config";
import { serviceSlugs } from "@/lib/data";
import { getPublishedPortfolio } from "@/lib/portfolio";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const portfolioItems = await getPublishedPortfolio();

  const staticEntries = STATIC_ROUTES.map((slug) => ({
    url: `${base}${url(slug).slice(1)}`,
    lastModified: new Date(),
    changeFrequency: slug === "" ? ("weekly" as const) : ("monthly" as const),
    priority: slug === "" ? 1 : slug === "contact" ? 0.9 : 0.8,
  }));

  const serviceEntries = serviceSlugs.map((slug) => ({
    url: `${base}${url(`services/${slug}`).slice(1)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioEntries = portfolioItems.map((item) => ({
    url: `${base}${url(`portfolio/${item.slug}`).slice(1)}`,
    lastModified: item.updatedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries];
}
