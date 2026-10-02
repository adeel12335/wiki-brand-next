import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { PortfolioClientsGrid } from "@/components/sections/PortfolioClientsGrid";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
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

const confidentialityPoints = [
  {
    icon: "i-users",
    title: "Shown Only With Permission",
    copy: "Clients appear here only when they have agreed to it. Without a client's permission, we never name them or their article.",
  },
  {
    icon: "i-globe",
    title: "The Article Belongs to Wikipedia",
    copy: "Not to the subject, and not to the editor who drafted it — so we show the live result, not a private brief.",
  },
  {
    icon: "i-research",
    title: "Independent Coverage, Every Time",
    copy: "Each profile was built on significant coverage in sources independent of the subject.",
  },
  {
    icon: "i-shield",
    title: "Disclosed On-Wiki",
    copy: "Paid contributions are declared as Wikipedia's terms of use require, on every engagement.",
  },
];

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
        h1="Selected Work. <span>Published Wikipedia Pages.</span>"
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

      <section className="section-pad tone-light clients-section pf-work" aria-labelledby="pf-work-title">
        <div className="shell">
          <div className="pf-work-head reveal">
            <div>
              <p className="micro-label">Published Work</p>
              <h2 id="pf-work-title">
                Profiles and Articles in <span>the Encyclopedia</span>
              </h2>
              <p>
                Each card links to a live Wikipedia article or a short engagement
                profile — leadership, academia, sport, and public life.
              </p>
            </div>
            <p className="pf-count">
              <strong>{items.length}</strong>
              <span>Published profiles</span>
            </p>
          </div>
          <PortfolioClientsGrid items={items} />
        </div>
      </section>

      <TestimonialSection />

      <section className="section-pad tone-light pf-confidential" aria-labelledby="pf-confidential-title">
        <div className="shell pf-confidential-grid">
          <div className="pf-confidential-copy reveal">
            <p className="micro-label">Confidentiality</p>
            <h2 id="pf-confidential-title">
              Why We Showcase Categories, <span>Not Briefs</span>
            </h2>
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
            <Link className="button button-gold button-small" href={url("contact")}>
              Discuss Your Project <Icon name="i-arrow" />
            </Link>
          </div>
          <ul className="pf-points reveal" data-delay="100">
            {confidentialityPoints.map((item) => (
              <li key={item.title} className="pf-point">
                <span className="pf-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
