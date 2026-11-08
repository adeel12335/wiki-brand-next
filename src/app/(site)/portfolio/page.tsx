import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/module/ContactForm";
import { ArchiveIntroBand } from "@/components/sections/blog/ArchiveIntroBand";
import { ConfidentialClients } from "@/components/sections/portfolio/ConfidentialClients";
import { PortfolioBrowser } from "@/components/sections/portfolio/PortfolioBrowser";
import { toCaseCard } from "@/components/sections/portfolio/toCaseCard";
import { portfolioContent } from "@/content/portfolio";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";
import { getPublishedPortfolio, isIndexablePortfolioItem } from "@/lib/portfolio";

export const revalidate = 60;

const staticMeta = {
  slug: "portfolio",
  title: "Wikipedia Work & Case Studies",
  shortTitle: "Portfolios",
  description:
    "Explore selected Wikipedia editorial engagements for leaders, academics, athletes, and public figures, with links to published articles.",
  keywords: "wikipedia portfolio, wikipedia clients, wikipedia page examples, wikipedia case studies",
  ogImage: "/assets/og/portfolio-public-figure.jpg",
  ogImageAlt: "Wikipedia editorial work by The Wikipedia Studio",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(staticMeta);
}

export default async function PortfolioPage() {
  const items = await getPublishedPortfolio();
  const pageMeta = {
    ...staticMeta,
    schema: [
      itemListNode(
        "portfolio",
        "Wikipedia client portfolio",
        items.map((item) => ({
          name: item.title,
          description: item.summary,
          url: isIndexablePortfolioItem(item) ? absUrl(`portfolio/${item.slug}`) : (item.externalUrl ?? undefined),
        })),
      ),
    ],
  };

  const c = portfolioContent.intro;
  const stats = c.stats.map((stat, i) => (i === 0 ? { ...stat, value: String(items.length) } : stat));

  return (
    <>
      <JsonLd page={pageMeta} />
      <ArchiveIntroBand {...portfolioContent.band} />

      <PortfolioBrowser
        items={items.map(toCaseCard)}
        heading={{ eyebrow: c.eyebrow, title: c.title, highlight: c.highlight }}
        stats={stats}
      />

      <ConfidentialClients />
      <ContactSection heading={portfolioContent.contact} />
    </>
  );
}
