import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { HeroContent, heroBg } from "@/components/hero/HeroContent";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { ContactSection } from "@/components/module/ContactForm";
import { personaShared as shared, type PersonaPage } from "@/content/personas";
import { cn } from "@/lib/cn";

/** Figma: Persona hero - audience tab switcher (links to the four persona pages). */
function AudienceTabs({ active }: { active: PersonaPage["key"] }) {
  return (
    <nav aria-label="Guides by subject" className="flex flex-wrap gap-1.5 self-start rounded-[28px] border border-on-dark/12 bg-ink-raised p-1.5 md:rounded-full">
      {shared.tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full py-2.5 pr-5 pl-4.5 text-sm font-semibold transition-colors",
              isActive ? "bg-gold text-on-gold" : "text-on-dark hover:bg-white/6 hover:text-gold-eyebrow",
            )}
          >
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Figma: Persona hero → "Guideline card" (which guideline applies, what counts / does not). */
function GuidelineCard({ guideline }: { guideline: PersonaPage["guideline"] }) {
  return (
    <div className="rounded-3xl border border-gold/25 bg-ink-raised px-6 pt-8 pb-4 md:px-8">
      <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">{shared.guidelineLabel}</p>
      <a
        href={guideline.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 pt-3.5 pb-5 text-base leading-snug font-bold text-white transition-colors hover:text-gold-eyebrow"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/14 text-gold">
          <Icon name={guideline.icon} size={20} />
        </span>
        {guideline.name}
      </a>
      <ul>
        {guideline.counts.map((item) => (
          <li key={item} className="flex items-center gap-3 border-t border-on-dark/10 py-3.5 text-sm text-white">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
              <Icon name="tick" size={13} strokeWidth={2.4} />
            </span>
            {item}
          </li>
        ))}
        {guideline.doesNotCount.map((item) => (
          <li key={item} className="flex items-center gap-3 border-t border-on-dark/10 py-3.5 text-sm text-on-dark-muted">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-on-dark/30">
              <Icon name="close" size={12} />
              <span className="sr-only">Does not count:</span>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One template for the four "Wikipedia page for …" pages (Figma: Persona - Final). */
export function PersonaTemplate({ page }: { page: PersonaPage }) {
  const how = shared.howItWorks;
  return (
    <>
      {/* Hero */}
      <section className={cn("overflow-hidden", heroBg)}>
        <div className="shell flex flex-col gap-8 pt-12 pb-16 md:gap-14 md:pt-18 md:pb-26">
          <AudienceTabs active={page.key} />
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_440px] lg:gap-20">
            <HeroContent
              title={page.hero.title}
              highlight={page.hero.highlight}
              lede={page.hero.lede}
              actions={shared.actions}
              className="[&_h1]:text-[30px] md:[&_h1]:text-[44px]"
            />
            <div data-aos="fade-left">
              <GuidelineCard guideline={page.guideline} />
            </div>
          </div>
        </div>
      </section>

      {/* What reviewers check */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-8 md:gap-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
            <SectionHeading eyebrow={shared.checksEyebrow} title={page.checks.title} highlight={page.checks.highlight} className="md:max-w-[560px]" />
            <p className="max-w-[330px] text-base leading-relaxed text-body" data-aos="fade-up">
              {page.checks.aside}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {page.checks.items.map((item, i) => (
              <div
                key={item.title}
                className="group flex flex-col gap-4 rounded-[20px] border border-heading/10 bg-white px-8 py-6 transition-colors hover:border-gold md:py-9"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-13 place-items-center rounded-[14px] bg-gold/12 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-on-gold">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <span className="text-[15px] font-bold text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-[19px] leading-snug font-bold text-heading md:text-[22px]">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink py-16 md:py-30">
        <div className="shell flex flex-col gap-8 md:gap-16">
          <SectionHeading eyebrow={how.eyebrow} title={how.title} highlight={how.highlight} align="center" tone="dark" />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-0">
            {how.steps.map((step, i) => (
              <li key={step.title} className="group flex flex-col gap-4 md:pr-10" data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="flex items-center">
                  <span
                    className={cn(
                      "grid size-15 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                      i === 0
                        ? "border-gold bg-gold text-on-gold"
                        : "border-gold/50 bg-ink-raised text-gold group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold",
                    )}
                  >
                    <Icon name={step.icon} size={24} />
                  </span>
                  <span className={cn("hidden h-0.5 flex-1 md:block", i < how.steps.length - 1 ? "bg-gold/35" : "bg-transparent")} aria-hidden />
                </span>
                <span className="text-[11px] font-bold tracking-[0.14em] text-gold-light">{step.label}</span>
                <span className="text-[19px] leading-snug font-bold text-white md:text-[22px]">{step.title}</span>
                <span className="text-[15px] leading-relaxed text-on-dark-muted">{step.copy}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqPanel
        heading={{ eyebrow: page.faq.eyebrow, title: page.faq.title, highlight: page.faq.highlight, lede: page.faq.lede }}
        items={page.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <ContactSection heading={shared.contact} />
    </>
  );
}
