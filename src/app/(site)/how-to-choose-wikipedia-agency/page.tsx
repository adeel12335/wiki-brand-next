import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { ContactSection } from "@/components/module/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { PillHero } from "@/components/sections/checker/PillHero";
import { NumberedCard } from "@/components/sections/hire/NumberedCard";
import { chooseAgencyContent } from "@/content/choose-agency";
import { buildPageMetadata, faqNode } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { EditableHero } from "@/components/hero/EditableHero";

const c = chooseAgencyContent;

const pageMeta = {
  slug: "how-to-choose-wikipedia-agency",
  title: "How to Choose a Wikipedia Agency (Without Getting Scammed)",
  shortTitle: "Choose an Agency",
  description:
    "How to choose a Wikipedia page creation agency: red flags, disclosure, pricing honesty, and questions that separate editorial desks from scam operators.",
  keywords:
    "how to choose wikipedia agency, wikipedia page creation scam, wikipedia agency red flags, paid wikipedia editing disclosure",
  modified: "2026-09-07",
  schema: [faqNode(c.faq.items, "how-to-choose-wikipedia-agency")],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ChooseAgencyPage() {
  const ch = c.checklist;
  const o = c.options;

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="how-to-choose-agency">
        <PillHero pill={c.hero.pill} title={c.hero.title} highlight={c.hero.highlight} lede={c.hero.lede} actions={c.hero.actions} align="center" />
      </EditableHero>

      {/* Checklist */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <SectionHeading eyebrow={ch.eyebrow} title={ch.title} highlight={ch.highlight} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ch.items.map((item, i) => (
              <div key={item.title} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <NumberedCard {...item} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section bg-ink">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <SectionHeading eyebrow={o.eyebrow} title={o.title} highlight={o.highlight} align="center" tone="dark" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {o.items.map((item, i) => {
              const rec = "recommended" in item && item.recommended;
              return (
                <article
                  key={item.title}
                  className={cn("flex flex-col gap-4 rounded-[20px] px-7 py-8", rec ? "bg-gold" : "bg-ink-raised")}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <span
                    className={cn(
                      "grid size-[52px] place-items-center rounded-[13px]",
                      rec ? "bg-ink text-gold" : "bg-gold/14 text-gold",
                    )}
                  >
                    <Icon name={item.icon} size={23} />
                  </span>
                  <p className={cn("text-[11px] font-bold tracking-[0.14em] uppercase", rec ? "text-on-gold" : "text-gold-light")}>{item.kicker}</p>
                  <h3 className={cn("text-[21px] leading-snug font-bold", rec ? "text-on-gold" : "text-white")}>{item.title}</h3>
                  <p className={cn("text-[15px] leading-relaxed", rec ? "text-on-gold" : "text-on-dark-muted")}>{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FaqPanel heading={c.faq.heading} items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))} />
      <ContactSection heading={c.contact} />
    </>
  );
}
