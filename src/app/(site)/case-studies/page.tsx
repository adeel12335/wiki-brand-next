import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSideContent } from "@/components/hero/HeroSideContent";
import { ContactSection } from "@/components/module/ContactForm";
import { CaseLessons, FeaturedCases, InsideEveryCase, type FeaturedCase } from "@/components/sections/case-studies/CaseStudySections";
import { caseStudiesContent } from "@/content/case-studies";
import { buildPageMetadata } from "@/lib/seo";
import { getPortfolioBySlug } from "@/lib/portfolio";
import { EditableHero } from "@/components/hero/EditableHero";

export const revalidate = 3600;

const pageMeta = {
  slug: "case-studies",
  title: "Wikipedia Case Studies, Source-First Engagements",
  shortTitle: "Case Studies",
  description:
    "Detailed Wikipedia case studies: how source audits, neutral drafting, and paid-editing disclosure shaped real portfolio engagements, without publication guarantees.",
  keywords: "wikipedia case study, wikipedia page creation example, wikipedia portfolio case studies",
  modified: "2026-09-07",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function CaseStudiesPage() {
  const c = caseStudiesContent;

  const cases: FeaturedCase[] = await Promise.all(
    c.cases.items.map(async (item) => {
      const work = await getPortfolioBySlug(item.slug);
      return {
        slug: item.slug,
        subject: work?.title ?? item.subject,
        role: item.role,
        image: work?.imageUrl ?? item.image,
        imageAlt: work?.imageAlt || item.subject,
        wikipedia: work?.externalUrl ?? item.wikipedia,
        caseHref: null,
        title: item.title,
        story: item.story,
        focus: item.focus,
      };
    }),
  );

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="case-studies">
        <HeroSideContent
          title={c.hero.title}
          highlight={c.hero.highlight}
          lede={c.hero.lede}
          actions={c.hero.actions}
          titleClassName="lg:text-[54px]"
          side={<InsideEveryCase />}
        />
      </EditableHero>
      <FeaturedCases cases={cases} />
      <CaseLessons />
      <ContactSection heading={c.contact} />
    </>
  );
}
