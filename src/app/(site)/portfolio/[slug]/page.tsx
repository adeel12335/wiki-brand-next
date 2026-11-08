import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { TextLink } from "@/components/module/Button";
import { ContactSection } from "@/components/module/ContactForm";
import { SectionHeading } from "@/components/module/SectionHeading";
import { ArchiveIntroBand } from "@/components/sections/blog/ArchiveIntroBand";
import { CaseCard } from "@/components/sections/portfolio/CaseCard";
import { CaseHeader, CaseRail, CaseStudyBody } from "@/components/sections/portfolio/CaseDetail";
import { displayCategory, toCaseCard } from "@/components/sections/portfolio/toCaseCard";
import { portfolioContent, portfolioSingleContent } from "@/content/portfolio";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";
import { getPortfolioBySlug, getPublishedPortfolio, isIndexablePortfolioItem } from "@/lib/portfolio";
import { portfolioMetaDescription, portfolioMetaTitle } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const items = await getPublishedPortfolio();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getPortfolioBySlug(slug);
  if (!work) notFound();
  const isIndexable = isIndexablePortfolioItem(work);

  // toCaseCard links non-indexable items straight to Wikipedia, so they are safe to show here
  // without linking to noindex detail pages.
  const all = await getPublishedPortfolio();
  const category = displayCategory(work);
  const others = all.filter((item) => item.slug !== work.slug);
  const sameField = category ? others.filter((item) => displayCategory(item) === category) : [];
  const related = [...sameField, ...others.filter((item) => !sameField.includes(item))].slice(0, 4);

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

  const s = portfolioSingleContent;
  const g = portfolioContent.grid;
  const labels = { live: g.liveBadge, view: g.viewCase, external: g.viewOnWikipedia, fallbackCategory: g.fallbackCategory };

  return (
    <>
      <JsonLd page={pageMeta} />
      <ArchiveIntroBand {...portfolioContent.band} />
      <CaseHeader work={work} category={category} />

      <div className="bg-white pb-16 md:pb-30">
        <div className="shell">
          <div className="grid gap-12 border-t border-heading/10 pt-10 md:pt-14 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_760px] xl:justify-between">
            <CaseRail work={work} category={category} />
            <CaseStudyBody body={work.body} />
          </div>
        </div>
      </div>

      <ContactSection heading={s.contact} />

      {related.length ? (
        <section className="bg-white pt-14 pb-16 md:pt-24 md:pb-30">
          <div className="shell flex flex-col gap-10 md:gap-14">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={s.related.eyebrow} title={s.related.title} highlight={s.related.highlight} />
              <TextLink href={s.related.viewAll.href} tone="light">
                {s.related.viewAll.label}
              </TextLink>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {related.map((item, i) => (
                <li key={item.slug} data-aos="fade-up" data-aos-delay={i * 80}>
                  <CaseCard item={toCaseCard(item)} labels={labels} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
