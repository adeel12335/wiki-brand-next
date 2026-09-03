import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { PortfolioClientsGrid } from "@/components/sections/PortfolioClientsGrid";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url, absUrl } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";
import {
  getPublishedPortfolio,
  isIndexablePortfolioItem,
} from "@/lib/portfolio";

export const revalidate = 60;

const staticMeta = {
  slug: "portfolio",
  title: "Wikipedia Work & Case Studies",
  shortTitle: "Portfolios",
  description:
    "Explore selected Wikipedia editorial engagements for leaders, academics, athletes, and public figures, with links to published articles.",
  keywords:
    "wikipedia portfolio, wikipedia clients, wikipedia page examples, wikipedia case studies",
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
          url: isIndexablePortfolioItem(item)
            ? absUrl(`portfolio/${item.slug}`)
            : item.externalUrl ?? undefined,
        })),
      ),
    ],
  };

  return (
    <>
      <BodyClass className="page-portfolio" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Our Clients"
        h1="Selected work. <span>Published Wikipedia pages.</span>"
        lede="A selection of live Wikipedia articles across leadership, academia, sport, and public life."
        current="Portfolios"
        actions={[
          { label: "Discuss Your Project", href: url("contact") },
          { label: "Our Services", href: url("services"), style: "button-outline" },
        ]}
        image="/assets/portfolio-hero-archive-v3.png"
        imageWidth={1531}
        imageHeight={1027}
        visualClass="page-hero-visual--portfolio"
      />

      <section className="section-pad clients-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Published Work"
            heading="Profiles and articles in the encyclopedia"
            copy="Each card links to a live Wikipedia article."
            center={false}
          />
          <PortfolioClientsGrid items={items} />
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <div className="section-heading reveal">
            <p className="micro-label">Confidentiality</p>
            <h2>Why we showcase categories, not briefs</h2>
          </div>
          <div className="prose reveal">
            <p>
              Wikipedia articles belong to the encyclopedia, not to the subject or to
              the editor who drafted them. Each profile above links to a live article
              where sourcing and notability were established through independent
              coverage.
            </p>
            <p>
              If you want to know whether your own coverage would support a page,
              start with our{" "}
              <Link href={url("services/wikipedia-page-creation")}>
                notability assessment
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <CtaBand />
    </>
  );
}
