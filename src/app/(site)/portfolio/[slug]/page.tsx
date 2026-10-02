import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioClientsGrid } from "@/components/sections/PortfolioClientsGrid";
import { url, absUrl } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";
import {
  getPortfolioBySlug,
  getPublishedPortfolio,
  isIndexablePortfolioItem,
} from "@/lib/portfolio";
import {
  portfolioHeading,
  portfolioMetaDescription,
  portfolioMetaTitle,
  titleCase,
} from "@/lib/utils";

export const revalidate = 3600;

const standards = [
  {
    icon: "i-search",
    title: "Sourcing Decides the Article",
    copy: "What went in, and what was left out, followed the independent coverage rather than the brief.",
  },
  {
    icon: "i-review",
    title: "Two Editors on Every Draft",
    copy: "One researches and writes, a second checks each claim against the source cited for it.",
  },
  {
    icon: "i-users",
    title: "Disclosed, Not Covert",
    copy: "Paid contributions are declared on Wikipedia as its terms of use require.",
  },
];

export async function generateStaticParams() {
  const items = await getPublishedPortfolio();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await getPortfolioBySlug(slug);
  if (!work) return {};
  const isIndexable = isIndexablePortfolioItem(work);

  return buildPageMetadata({
    slug: `portfolio/${work.slug}`,
    title: portfolioMetaTitle(work.title, work.metaTitle),
    shortTitle: work.title,
    breadcrumbName: work.title,
    description: portfolioMetaDescription(work.summary, work.metaDescription),
    keywords: work.keywords || `wikipedia portfolio, ${work.title.toLowerCase()} wikipedia page`,
    ogImage: work.imageUrl ?? "/assets/og/portfolio-public-figure.jpg",
    ogImageAlt: work.imageAlt,
    breadcrumbs: [{ label: "Portfolio", slug: "portfolio" }],
    modified: work.updatedAt?.toISOString(),
    robots: isIndexable ? undefined : "noindex, follow",
  });
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getPortfolioBySlug(slug);
  if (!work) notFound();
  const isIndexable = isIndexablePortfolioItem(work);

  // PortfolioClientsGrid links non-indexable items straight to Wikipedia, so
  // they are safe to show here without linking to noindex detail pages.
  const others = (await getPublishedPortfolio()).filter(
    (item) => item.slug !== work.slug,
  );

  const pageMeta = {
    slug: `portfolio/${work.slug}`,
    title: portfolioMetaTitle(work.title, work.metaTitle),
    shortTitle: work.title,
    breadcrumbName: work.title,
    description: portfolioMetaDescription(work.summary, work.metaDescription),
    keywords: work.keywords ?? undefined,
    ogImage: work.imageUrl ?? "/assets/og/portfolio-public-figure.jpg",
    breadcrumbs: [{ label: "Portfolio", slug: "portfolio" }],
    modified: work.updatedAt?.toISOString(),
    robots: isIndexable ? undefined : "noindex, follow",
    schema: isIndexable
      ? [
          {
            "@type": "CreativeWork",
            "@id": `${absUrl(`portfolio/${work.slug}`)}#work`,
            name: work.title,
            url: absUrl(`portfolio/${work.slug}`),
            description: work.summary,
            creator: { "@id": seoId("organization") },
            about: work.category || work.title,
            isPartOf: { "@id": `${absUrl("portfolio")}#itemlist` },
          },
        ]
      : [],
  };

  return (
    <>
      <BodyClass className="page-portfolio-detail" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow={`Portfolio${work.category ? ` · ${work.category}` : ""}`}
        h1={titleCase(portfolioHeading(work.title))}
        lede={work.summary}
        breadcrumbs={[{ label: "Portfolio", slug: "portfolio" }]}
        current={work.title}
        actions={[
          { label: "Discuss A Similar Project", href: url("contact") },
          { label: "All Portfolio Work", href: url("portfolio"), style: "button-outline" },
        ]}
      />

      {/* 1. Profile card + engagement notes (white) */}
      <section className="section-pad tone-light pd-detail" aria-labelledby="pd-notes-title">
        <div className="shell pd-grid">
          <aside className="pd-profile reveal">
            <div className="pd-photo">
              {work.imageUrl ? (
                <Image
                  src={work.imageUrl}
                  alt={work.imageAlt}
                  fill
                  sizes="(max-width: 960px) 100vw, 380px"
                  className="pd-photo-img"
                />
              ) : (
                <span className="pd-photo-initial" aria-hidden="true">
                  {work.title.charAt(0)}
                </span>
              )}
              {work.imageUrl ? (
                <span className="portfolio-watermark" aria-hidden="true">
                  The Wikipedia Studio
                </span>
              ) : null}
            </div>
            <div className="pd-profile-body">
              {work.category && work.category !== work.title ? (
                <span className="client-card-category">{work.category}</span>
              ) : null}
              <h2 className="pd-name">{work.title}</h2>
              <dl className="pd-facts">
                <div>
                  <dt>Engagement</dt>
                  <dd>Wikipedia article</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{work.externalUrl ? "Published on Wikipedia" : "Profile"}</dd>
                </div>
                {work.updatedAt ? (
                  <div>
                    <dt>Last updated</dt>
                    <dd>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        year: "numeric",
                      }).format(work.updatedAt)}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {work.externalUrl ? (
                <a
                  className="button button-gold button-small pd-wiki-button"
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Wikipedia <Icon name="i-arrow" />
                </a>
              ) : null}
            </div>
          </aside>

          <div className="pd-notes reveal" data-delay="100">
            <p className="micro-label">Engagement Notes</p>
            <h2 id="pd-notes-title">
              How This Article <span>Came Together</span>
            </h2>
            <div className="pd-notes-body">
              {work.body
                .split(/\n{2,}/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
            </div>
            <div className="pd-notes-cta">
              <p>
                <strong>Wondering whether your subject qualifies?</strong> Every
                engagement here started with a free notability assessment.
              </p>
              <Link className="pd-arrow-link" href={url("contact")}>
                Discuss a similar project <Icon name="i-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Standards (dark) */}
      <section className="section-pad tone-dark pd-standards" aria-labelledby="pd-standards-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">How Work Like This Runs</p>
            <h2 id="pd-standards-title">
              The Same Standards on <span>Every Engagement</span>
            </h2>
          </div>
          <ul className="pd-standard-grid reveal">
            {standards.map((item) => (
              <li key={item.title} className="pd-standard">
                <span className="pd-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Other engagements (white) — same cards as the portfolio index */}
      {others.length > 0 ? (
        <section className="section-pad tone-light pf-work pd-more" aria-labelledby="pd-more-title">
          <div className="shell">
            <div className="pd-more-head reveal">
              <div>
                <p className="micro-label">More Work</p>
                <h2 id="pd-more-title">
                  Other <span>Engagements</span>
                </h2>
              </div>
              <Link className="pd-arrow-link" href={url("portfolio")}>
                View all portfolio work <Icon name="i-arrow" />
              </Link>
            </div>
            <PortfolioClientsGrid items={others.slice(0, 3)} />
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Wondering Whether Your Own Coverage Is <span>Enough?</span>"
        copy="Every engagement here started with a notability assessment."
        label="Request An Assessment"
      />
    </>
  );
}
