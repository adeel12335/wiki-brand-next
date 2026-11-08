import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { HeroImage } from "@/components/hero/HeroImage";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { Cta } from "@/components/module/Cta";
import { ServiceBox } from "@/components/sections/services/ServiceBox";
import { serviceDetails, servicesContent } from "@/content/services";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, faqNode, itemListNode } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const c = servicesContent;

const pageMeta = {
  slug: "services",
  title: c.seo.title,
  shortTitle: "Services",
  description: c.seo.description,
  keywords: c.seo.keywords,
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: "Wikipedia editorial services from The Wikipedia Studio",
  schema: [
    itemListNode(
      "services",
      "Wikipedia editorial services",
      serviceDetails.map((s) => ({ name: c.all.cards[s.slug]?.title ?? s.name, url: absUrl(`services/${s.slug}`), description: c.all.cards[s.slug]?.copy ?? s.card.copy })),
    ),
    faqNode(c.faq.items, "services"),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ServicesPage() {
  return (
    <>
      <JsonLd page={pageMeta} />

      <EditableHero pageKey="services">
        <HeroImage
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          highlight={c.hero.highlight}
          lede={c.hero.lede}
          actions={c.hero.actions}
          photo={c.hero.photo}
          titleClassName="font-semibold leading-[1.1]"
        />
      </EditableHero>

      {/* All services */}
      <section className="bg-white px-5 py-6 md:px-10">
        <div className="flex flex-col items-center gap-8 rounded-lg bg-mist px-6 py-6 md:gap-14 md:px-10 md:py-24 lg:px-20">
          <SectionHeading eyebrow={c.all.eyebrow} title={c.all.title} highlight={c.all.highlight} lede={c.all.lede} align="center" />
          <div className="grid w-full max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceDetails.map((s, i) => {
              const card = c.all.cards[s.slug] ?? { ...s.card, linkLabel: "Explore Service" };
              return (
                <div key={s.slug} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                  <ServiceBox
                    number={String(i + 1).padStart(2, "0")}
                    icon={s.icon}
                    title={card.title}
                    copy={card.copy}
                    href={`/services/${s.slug}/`}
                    linkLabel={card.linkLabel}
                  />
                </div>
              );
            })}
          </div>
          <nav aria-label={c.all.audiencesLabel} className="flex flex-wrap items-center justify-center gap-3" data-aos="fade-up">
            <span className="w-full text-center text-[15px] text-body sm:w-auto">{c.all.audiencesLabel}</span>
            {c.all.audiences.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-heading/10 bg-white py-2 pr-3.5 pl-4 text-sm font-semibold text-heading transition-colors hover:border-gold hover:text-gold-dark"
              >
                {a.label}
                <Icon name="arrow" size={14} />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Where to start */}
      <section className="bg-ink py-16 md:py-28">
        <div className="shell flex flex-col gap-8 md:gap-14">
          <SectionHeading eyebrow={c.start.eyebrow} title={c.start.title} highlight={c.start.highlight} lede={c.start.lede} align="center" tone="dark" />
          <div className="grid gap-6 lg:grid-cols-3">
            {c.start.paths.map((p, i) => (
              <div key={p.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <ServiceBox
                  number={String(i + 1).padStart(2, "0")}
                  icon={p.icon}
                  title={p.title}
                  copy={p.copy}
                  href={p.link.href}
                  linkLabel={p.link.label}
                  tone="dark"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqPanel
        heading={{ eyebrow: c.faq.eyebrow, title: c.faq.title, highlight: c.faq.highlight, lede: c.faq.lede }}
        items={c.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <Cta {...c.cta} />
    </>
  );
}
