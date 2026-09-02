import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
} from "@/lib/utils";

export const revalidate = 3600;

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

  const others = (await getPublishedPortfolio()).filter(
    (item) => item.slug !== work.slug && isIndexablePortfolioItem(item),
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
      <BodyClass className={`page-portfolio-${work.slug}`} />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow={`Portfolio${work.category ? ` · ${work.category}` : ""}`}
        h1={portfolioHeading(work.title)}
        lede={work.summary}
        breadcrumbs={[{ label: "Portfolio", slug: "portfolio" }]}
        current={work.title}
        actions={[
          { label: "Discuss A Similar Project", href: url("contact") },
          { label: "All Portfolio Work", href: url("portfolio"), style: "button-outline" },
        ]}
      />

      <section className="section-pad">
        <div className="shell work-detail">
          {work.imageUrl ? (
            <figure className="work-figure reveal">
              <Image
                src={work.imageUrl}
                alt={work.imageAlt}
                width={960}
                height={640}
                sizes="(max-width: 900px) 100vw, 54vw"
              />
            </figure>
          ) : null}
          <div className="work-body reveal" data-delay="100">
            <p className="micro-label">Engagement Notes</p>
            {work.body
              .split(/\n{2,}/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            {work.externalUrl ? (
              <p>
                <a
                  className="text-link"
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the published work <Icon name="i-arrow" />
                </a>
              </p>
            ) : null}
            {work.updatedAt ? (
              <p className="reviewed-note">
                Last updated{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(work.updatedAt)}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="How Work Like This Runs"
            heading="The same standards on every engagement"
          />
          <div className="card-grid reveal">
            {[
              {
                icon: "i-search",
                title: "Sourcing decides the article",
                copy: "What went in, and what was left out, followed the independent coverage rather than the brief.",
              },
              {
                icon: "i-review",
                title: "Two editors on every draft",
                copy: "One researches and writes, a second checks each claim against the source cited for it.",
              },
              {
                icon: "i-users",
                title: "Disclosed, not covert",
                copy: "Paid contributions are declared on Wikipedia as its terms of use require.",
              },
            ].map((item) => (
              <article key={item.title} className="service-card">
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="section-pad">
          <div className="shell">
            <SectionHeading eyebrow="More Work" heading="Other engagements" />
            <div className="portfolio-grid reveal">
              {others.slice(0, 3).map((other) => (
                <article key={other.slug} className="portfolio-card static">
                  <Link href={url(`portfolio/${other.slug}`)}>
                    {other.imageUrl ? (
                      <Image
                        src={other.imageUrl}
                        alt={other.imageAlt}
                        width={960}
                        height={640}
                        sizes="(max-width: 760px) 100vw, 33vw"
                      />
                    ) : null}
                    <div>
                      <h3>{other.title}</h3>
                      <p>{other.summary}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        heading="Wondering whether your own coverage is <span>enough?</span>"
        copy="Every engagement here started with a notability assessment."
        label="Request An Assessment"
      />
    </>
  );
}
