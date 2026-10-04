import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { FaqSection } from "@/components/home/FaqSection";
import { GuideSection } from "@/components/home/GuideSection";
import { HomeHero } from "@/components/home/HomeHero";
import { InsightsSection } from "@/components/home/InsightsSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_NAME, absUrl } from "@/lib/config";
import { faqs, metrics, services } from "@/lib/data";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { buildPageMetadata, faqNode, itemListNode } from "@/lib/seo";

const homeFaqs = faqs.slice(0, 10);

const pageMeta = {
  slug: "",
  title: "Wikipedia Page Creation Service Provider",
  shortTitle: "Home",
  description:
    "Wiki Studio (The Wikipedia Studio) is a Wikipedia service provider for page creation and editing. Free notability assessment first, disclosed and compliant.",
  keywords:
    "wiki studio, wikipedia studio, wikipedia service provider, wiki services provider, wikipedia page creation service, wikipedia page, wiki page creation, create a wikipedia page, wikipedia editing services",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: `${SITE_NAME} — professional Wikipedia editorial services`,
  modified: "2026-09-07",
  schema: [
    itemListNode(
      "",
      "Wikipedia editorial services",
      Object.entries(services).map(([slug, service]) => ({
        name: service.name,
        url: absUrl(`services/${slug}`),
        description: service.card,
      })),
    ),
    faqNode(homeFaqs, ""),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function HomePage() {
  const [featuredPortfolio, allPosts] = await Promise.all([
    getFeaturedPortfolio(),
    getAllBlogPosts(),
  ]);

  return (
    <>
      <JsonLd page={pageMeta} />
      <HomeHero />
      <StatsStrip items={metrics} />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <GuideSection />
      <PortfolioSection items={featuredPortfolio} />
      <ReviewsSection />
      <InsightsSection posts={allPosts.slice(0, 3)} />
      <FaqSection items={homeFaqs} />
      <CtaBand
        heading="Let&apos;s Build Your Wikipedia Presence <span>the Right Way</span>"
        copy="Request an honest notability assessment. We will tell you what the sources support before any work is commissioned."
      />
    </>
  );
}
