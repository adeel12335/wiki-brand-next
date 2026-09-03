import type {
  Faq,
  Metric,
  PortfolioFallbackItem,
  ProcessStep,
  ServicesMap,
  Testimonial,
} from "@/types";
import faqsJson from "./faqs.json";
import metricsJson from "./metrics.json";
import portfolioFallbackJson from "./portfolio-fallback.json";
import processStepsJson from "./process-steps.json";
import servicesJson from "./services.json";
import testimonialsJson from "./testimonials.json";

export const services = servicesJson as ServicesMap;
export const serviceSlugs = Object.keys(services) as (keyof ServicesMap)[];

export const faqs = faqsJson as Faq[];
export const metrics = metricsJson as Metric[];
export const testimonials = testimonialsJson as Testimonial[];
export const processSteps = processStepsJson as ProcessStep[];
export const portfolioFallback = portfolioFallbackJson as PortfolioFallbackItem[];

export { blogPosts } from "./blog-posts";

export function getService(slug: string) {
  return services[slug as keyof ServicesMap] ?? null;
}
