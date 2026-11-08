import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { ContactSection } from "@/components/module/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { PillHero } from "@/components/sections/checker/PillHero";
import { NotabilityChecker } from "@/components/sections/checker/NotabilityChecker";
import { checkerContent } from "@/content/checker";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, faqNode } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { EditableHero } from "@/components/hero/EditableHero";

const c = checkerContent;

const pageMeta = {
  slug: "wikipedia-notability-checker",
  title: "Free Wikipedia Notability Checker | Check Eligibility",
  shortTitle: "Notability Checker",
  description:
    "Use our free Wikipedia notability checker to review your independent sources and understand whether your subject may qualify for a Wikipedia article.",
  keywords:
    "Wikipedia Notability Checker, Wikipedia eligibility checker, Wikipedia notability guidelines, Wikipedia page eligibility, Wikipedia notability assessment",
  modified: "2026-09-07",
  schema: [
    {
      "@type": "WebApplication",
      name: "Wikipedia Notability Checker",
      url: absUrl("wikipedia-notability-checker"),
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Free Wikipedia notability checker that reviews the number, quality, and independence of sources covering your subject.",
    },
    faqNode(c.faq.items, "wikipedia-notability-checker"),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function NotabilityCheckerPage() {
  const r = c.results;
  const k = c.counts;
  const stages = [c.stages.building, c.stages.possible, c.stages.strong];

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="notability-checker">
        <PillHero
          title={c.hero.title}
          highlight={c.hero.highlight}
          lede={c.hero.lede}
          actions={c.hero.actions}
          align="center"
          titleClassName="lg:text-[56px]"
        />
      </EditableHero>

      {/* Checker tool */}
      <section id="checker" className="section scroll-mt-24 bg-white">
        <div className="shell">
          <NotabilityChecker />
        </div>
      </section>

      {/* Reading your result */}
      <section className="section bg-ink">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <SectionHeading
           
            title={r.title}
            highlight={r.highlight}
            lede={r.lede}
            align="center"
            tone="dark"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {stages.map((item, i) => (
              <article
                key={item.title}
                className="flex flex-col gap-4 rounded-[20px] bg-ink-raised px-8 py-9"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="flex gap-1.5" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={cn(
                        "h-2 w-9 rounded-full",
                        n <= i + 1 ? "bg-gold" : "bg-gold/20",
                      )}
                    />
                  ))}
                </span>
                <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">
                  {item.kicker}
                </p>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-on-dark-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What counts */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <SectionHeading
           
            title={k.title}
            highlight={k.highlight}
            lede={k.lede}
            align="center"
          />
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {[
              { ...k.strong, tone: "strong" as const },
              { ...k.weak, tone: "weak" as const },
            ].map((col, i) => (
              <div
                key={col.title}
                className={cn(
                  "flex flex-col gap-5 rounded-[28px] p-6 md:p-11",
                  col.tone === "strong" ? "bg-cream" : "bg-mist",
                )}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <h3 className="text-2xl font-bold text-heading md:text-[28px]">
                  {col.title}
                </h3>
                <ul className="flex flex-col">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 border-t border-heading/10 py-3.5 text-base text-heading"
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full",
                          col.tone === "strong"
                            ? "bg-gold text-on-gold"
                            : "bg-white text-body",
                        )}
                      >
                        <Icon
                          name={col.tone === "strong" ? "tick" : "close"}
                          size={14}
                          strokeWidth={2.2}
                        />
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqPanel
        heading={c.faq.heading}
        items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
        moreLabel={c.faq.moreLabel}
      />
      <ContactSection
        heading={c.contact.heading}
        submitLabel={c.contact.submitLabel}
      />
    </>
  );
}
