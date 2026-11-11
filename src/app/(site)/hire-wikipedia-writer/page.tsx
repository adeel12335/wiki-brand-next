import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSideContent, HeroSidePanel } from "@/components/hero/HeroSideContent";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { ContactSection } from "@/components/module/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { NumberedCard } from "@/components/sections/hire/NumberedCard";
import { hireContent } from "@/content/hire";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, faqNode, seoId } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { EditableHero } from "@/components/hero/EditableHero";

const c = hireContent;
const pageSlug = "hire-wikipedia-writer";

const pageMeta = {
  slug: pageSlug,
  title: "Hire a Wikipedia Writer | Professional Wikipedia Writers",
  shortTitle: "Hire a Wikipedia Writer",
  description:
    "Hire a professional Wikipedia writer for source research, neutral article drafting, editing, and submission support. Get a free notability assessment.",
  keywords:
    "hire a wikipedia writer, professional wikipedia writers, wikipedia writing services, wikipedia article writer, wikipedia editing experts, wikipedia writer cost",
  ogImage: "/assets/og/portfolio-author.jpg",
  ogImageAlt: "Hire a professional Wikipedia writer, The Wikipedia Studio",
  modified: "2026-11-07",
  schema: [
    {
      "@type": "Service",
      "@id": `${absUrl(pageSlug)}#service`,
      name: "Hire a Wikipedia Writer",
      serviceType: "Wikipedia writing services",
      provider: { "@id": seoId("organization") },
      areaServed: { "@type": "Place", name: "Worldwide" },
      description:
        "Professional Wikipedia writers for notability assessment, independent source research, neutral article drafting, editorial review, and disclosed submission support.",
    },
    faqNode(c.faq.items, pageSlug),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function HireWriterPage() {
  const w = c.writers;

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="hire-wikipedia-writer">
        <HeroSideContent
          title={c.hero.title}
          highlight={c.hero.highlight}
          lede={c.hero.lede}
          actions={c.hero.actions}
          titleClassName="text-[30px] lg:text-[46px]"
          side={
            <HeroSidePanel title={c.hero.panel.title} className="bg-ink-raised">
              <ul className="flex flex-col">
                {c.hero.panel.rows.map((row, i) => (
                  <li key={row.label} className={cn("flex items-center gap-3 py-3.5", i > 0 && "border-t border-white/8")}>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
                      <Icon name="tick" size={12} strokeWidth={2.4} />
                    </span>
                    <span className="flex-1 text-[15px] font-bold text-white">{row.label}</span>
                    <span className="text-right text-[13px] text-on-dark-muted">{row.note}</span>
                  </li>
                ))}
              </ul>
            </HeroSidePanel>
          }
        />
      </EditableHero>

      {/* What writers do */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <SectionHeading title={w.title} highlight={w.highlight} className="lg:max-w-[620px]" />
            <p className="max-w-[420px] text-base leading-relaxed text-body" data-aos="fade-up">
              {w.lede}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {w.items.map((item, i) => (
              <div key={item.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <NumberedCard {...item} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing strip */}

      <FaqPanel heading={c.faq.heading} items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))} moreLabel="Explore All Questions" />
      <ContactSection heading={c.contact} submitLabel="Request Writer Consultation" />
    </>
  );
}
