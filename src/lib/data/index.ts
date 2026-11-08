import type { PortfolioFallbackItem } from "@/types";
import portfolioFallbackJson from "./portfolio-fallback.json";

/**
 * Minimal data the backend still needs after the frontend wipe:
 * service slugs/names (contact form subjects, blog "related service"
 * validation, sitemap) and the portfolio fallback used when MongoDB is off.
 */
export const services = {
  "wikipedia-page-creation": { name: "Wikipedia Page Creation" },
  "wikipedia-page-editing": { name: "Page Editing & Expansion" },
  "wikipedia-content-writing": { name: "Content Writing & Research" },
  "wikipedia-page-management": { name: "Ongoing Page Management" },
  "wikipedia-reputation-management": { name: "Reputation & Entity Building" },
  "wikipedia-notability-assessment": { name: "Notability Assessment" },
  "google-knowledge-panel-creation": { name: "Google Knowledge Panel Creation" },
  "wikipedia-page-monitoring": { name: "Wikipedia Page Monitoring" },
} as const;

export type ServiceSlug = keyof typeof services;
export const serviceSlugs = Object.keys(services) as ServiceSlug[];

export const portfolioFallback = portfolioFallbackJson as PortfolioFallbackItem[];

export { blogPosts } from "./blog-posts";
