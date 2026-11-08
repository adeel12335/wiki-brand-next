import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSideContent, HeroSidePanel } from "@/components/hero/HeroSideContent";
import { Button } from "@/components/module/Button";
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
      offers: c.pricing.tiers.map((tier) => ({
        "@type": "Offer",
        name: `${tier.name} package`,
        description: tier.note,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(tier.amount),
          priceCurrency: "USD",
          ...(tier.from ? { minPrice: String(tier.amount) } : {}),
        },
        url: `${absUrl("wikipedia-page-cost")}#${tier.id}`,
      })),
    },
    faqNode(c.faq.items, pageSlug),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function HireWriterPage() {
  const w = c.writers;
  const p = c.pricing;

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
      <section id={p.id} className="section scroll-mt-24 bg-ink">
        <div className="shell flex flex-col items-center gap-10 md:gap-12">
          <SectionHeading title={p.title} highlight={p.highlight} lede={p.lede} align="center" tone="dark" />
          <div className="grid w-full gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
            {p.tiers.map((tier) => (
              <div
                key={tier.id}
                id={tier.id}
                /* featured tier: ink with a 10% gold wash (Figma #D8A53A @ 10%) */
                className={cn("flex flex-col gap-2.5 px-8 py-6 md:py-9", tier.featured ? "bg-[#171b1a]" : "bg-ink")}
              >
                <p className="text-[11px] font-bold tracking-[0.14em] whitespace-pre-wrap text-gold-light uppercase">{tier.kicker}</p>
                <p className="text-[34px] leading-tight font-bold text-white md:text-[40px]">{tier.price}</p>
                <p className="text-[15px] text-on-dark-muted">{tier.note}</p>
              </div>
            ))}
          </div>
          <Button href={p.cta.href} variant="gold" arrow>
            {p.cta.label}
          </Button>
        </div>
      </section>

      <FaqPanel heading={c.faq.heading} items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))} moreLabel="Explore All Questions" />
      <ContactSection heading={c.contact} submitLabel="Request Writer Consultation" />
    </>
  );
}
