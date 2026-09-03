export type ServiceSlug =
  | "wikipedia-page-creation"
  | "wikipedia-page-editing"
  | "wikipedia-content-writing"
  | "wikipedia-page-management"
  | "wikipedia-reputation-management";

export interface ServiceOutcome {
  title: string;
  copy: string;
}

export interface ServiceDeliverable {
  title: string;
  copy: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  name: string;
  icon: string;
  card: string;
  eyebrow: string;
  h1: string;
  lede: string;
  meta_title: string;
  meta_desc: string;
  keywords: string;
  og_image: string;
  what_is_heading: string;
  what_is: string;
  who_needs_heading: string;
  who_needs: string[];
  process_heading: string;
  process_steps: string[];
  pricing_heading: string;
  pricing: string;
  outcomes_heading: string;
  outcomes: ServiceOutcome[];
  includes: string[];
  deliverables: ServiceDeliverable[];
  faqs: ServiceFaq[];
}

export type ServicesMap = Record<ServiceSlug, Service>;

export interface ProcessStep {
  icon: string;
  title: string;
  card: string;
  copy: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Metric {
  icon: string;
  value: string;
  label: string;
}

export interface PortfolioFallbackItem {
  image: string;
  alt: string;
  title: string;
  copy: string;
  detail: string;
  externalUrl?: string | null;
  featuredOnHome?: boolean;
}

export interface PortfolioItem {
  _id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  body?: string | null;
  externalUrl?: string | null;
  image: {
    cloudinaryId: string;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  status: "draft" | "published";
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PageMeta {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  robots?: string;
  breadcrumbs?: Array<{ label: string; slug: string }>;
  breadcrumbName?: string;
  modified?: string;
  schema?: Record<string, unknown>[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  modifiedAt: string;
  readingMinutes: number;
  ogImage: string;
  relatedService?: string;
  body: string;
}
