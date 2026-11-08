import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { ContactSection } from "@/components/module/ContactForm";
import { PricingHero } from "@/components/sections/pricing/PricingHero";
import { TierCard } from "@/components/sections/pricing/TierCard";
import { CompareTable } from "@/components/sections/pricing/CompareTable";
import { pricingContent as c } from "@/content/pricing";
import { absUrl } from "@/lib/config";
import { cn } from "@/lib/cn";
import { buildPageMetadata, faqNode, seoId } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageSlug = "wikipedia-page-cost";
const pageUrl = absUrl(pageSlug);

const pageMeta = {
  slug: pageSlug,
  title: "Wikipedia Page Cost 2026: Packages from $700",
  shortTitle: "Pricing",
  breadcrumbName: "Pricing",
  description:
    "Wikipedia page cost: four published tiers from $700 to $2,500+. What drives the price, what's included, and a free notability assessment before you pay.",
  keywords:
    "wikipedia page creation cost, wikipedia page cost, how much does a wikipedia page cost, wikipedia page price, wikipedia editing cost, wikipedia agency pricing",
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "Wikipedia page cost and pricing packages from The Wikipedia Studio",
  modified: "2026-11-07",
  schema: [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Wikipedia Page Creation",
      serviceType: "Wikipedia page creation and editing",
      provider: { "@id": seoId("organization") },
      areaServed: { "@type": "Place", name: "Worldwide" },
      description:
        "Guideline-compliant Wikipedia page creation with notability assessment, independent source research, neutral drafting, disclosed submission and post-publication monitoring.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wikipedia page packages",
        itemListElement: c.tiers.items.map((tier) => ({
          "@type": "Offer",
          "@id": `${pageUrl}#${tier.id}`,
          name: `${tier.name} Wikipedia page package`,
          description: tier.bestFor,
          price: String(tier.price),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${pageUrl}#${tier.id}`,
        })),
      },
    },
    faqNode(c.faq.items, pageSlug),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function PricingPage() {
  return (
    <>
      <JsonLd page={pageMeta} />

      <EditableHero pageKey="pricing">
        <PricingHero pill={c.hero.pill} title={c.hero.title} highlight={c.hero.highlight} lede={c.hero.lede} checks={c.hero.checks} />
      </EditableHero>

      {/* Tiers */}
      <section className="bg-white py-16 md:py-28">
        <div className="shell flex flex-col gap-6 md:gap-12">
          <SectionHeading eyebrow={c.tiers.eyebrow} title={c.tiers.title} highlight={c.tiers.highlight} align="center" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {c.tiers.items.map((tier, i) => (
              <div key={tier.id} data-aos="fade-up" data-aos-delay={i * 70}>
                <TierCard tier={tier} fromLabel={c.tiers.fromLabel} bestForLabel={c.tiers.bestForLabel} cta={c.tiers.cta} />
              </div>
            ))}
          </div>
          <p className="flex items-start gap-2.5 text-sm text-body md:items-center md:justify-center">
            <Icon name="info" size={16} className="mt-0.5 shrink-0 text-gold-dark md:mt-0" />
            {c.tiers.note}
          </p>
        </div>
      </section>

      {/* Compare */}
      <section className="bg-ink py-16 md:py-30">
        <div className="shell flex flex-col gap-8 md:gap-14">
          <SectionHeading eyebrow={c.compare.eyebrow} title={c.compare.title} highlight={c.compare.highlight} align="center" tone="dark" />
          <CompareTable
            firstColumn={c.compare.firstColumn}
            columns={c.compare.columns}
            featuredColumn={c.compare.featuredColumn}
            rows={c.compare.rows}
            swipeHint={c.compare.swipeHint}
          />
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white py-16 md:py-30">
        <div className="shell flex flex-col gap-6 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
            <SectionHeading eyebrow={c.addOns.eyebrow} title={c.addOns.title} highlight={c.addOns.highlight} className="md:max-w-[520px]" />
            <p className="max-w-[320px] text-base leading-relaxed text-body" data-aos="fade-up">
              {c.addOns.aside}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.addOns.items.map((item, i) => (
              <div
                key={item.title}
                className={cn("group flex flex-col gap-3.5 rounded-3xl px-7 py-8", i % 2 === 0 ? "bg-cream" : "bg-mist")}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 70}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-white text-gold-dark transition-colors group-hover:bg-gold group-hover:text-on-gold">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-gold-light">{item.price}</span>
                </div>
                <h3 className="pt-1 text-[17px] font-bold text-heading md:text-xl">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost drivers */}
      <section className="bg-ink py-16 md:py-30">
        <div className="shell grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow={c.drivers.eyebrow} title={c.drivers.title} highlight={c.drivers.highlight} tone="dark" />
            <p className="text-[17px] leading-relaxed text-on-dark" data-aos="fade-up">
              {c.drivers.lede}
            </p>
          </div>
          <div data-aos="fade-up">
            <div className="hidden grid-cols-[180px_1fr_1fr] gap-6 border-b border-on-dark/14 pb-4 md:grid">
              {c.drivers.headers.map((h, i) => (
                <span key={h} className={cn("text-[11px] font-bold tracking-[0.12em]", i === 0 ? "text-on-dark-muted" : "text-gold-light")}>
                  {h}
                </span>
              ))}
            </div>
            <dl>
              {c.drivers.rows.map((row) => (
                <div key={row.factor} className="grid gap-3 border-b border-on-dark/8 py-4.5 md:grid-cols-[180px_1fr_1fr] md:gap-6">
                  <dt className="text-[15px] font-bold text-white">{row.factor}</dt>
                  <dd className="flex flex-col gap-0.5 text-sm leading-relaxed text-on-dark">
                    <span className="text-[10px] font-bold tracking-[0.12em] text-gold-light md:hidden">{c.drivers.headers[1]}</span>
                    {row.down}
                  </dd>
                  <dd className="flex flex-col gap-0.5 text-sm leading-relaxed text-on-dark">
                    <span className="text-[10px] font-bold tracking-[0.12em] text-gold-light md:hidden">{c.drivers.headers[2]}</span>
                    {row.up}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <FaqPanel
        heading={{ eyebrow: c.faq.eyebrow, title: c.faq.title, highlight: c.faq.highlight, lede: c.faq.lede }}
        items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <ContactSection heading={c.contact} />
    </>
  );
}
