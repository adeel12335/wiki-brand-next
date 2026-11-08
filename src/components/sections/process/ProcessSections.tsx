import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { HeroContent } from "@/components/hero/HeroContent";
import { SectionHeading } from "@/components/module/SectionHeading";
import { processContent } from "@/content/process";
import { cn } from "@/lib/cn";

/** Figma: Our Process → Hero - globe photo behind an ink gradient, copy + four facts. */
export function ProcessHero() {
  const c = processContent.hero;
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image src={c.image.src} alt={c.image.alt} fill priority sizes="100vw" className="-z-10 object-cover object-right" />
      <span className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/90 to-ink/60" aria-hidden />
      <div className="shell flex flex-col gap-8 py-16 lg:gap-18 lg:pt-32 lg:pb-24">
        <HeroContent title={c.title} highlight={c.highlight} lede={c.lede} actions={c.actions} />
        <dl className="grid grid-cols-2 border-t border-on-dark/14 pt-2 lg:grid-cols-4 lg:pt-9" data-aos="fade-up" data-aos-delay="120">
          {c.facts.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "flex flex-col gap-1 py-4 lg:gap-1.5 lg:py-0",
                i % 2 === 0 ? "pr-3" : "border-l border-on-dark/14 pl-4",
                "lg:px-8 lg:first:pl-0",
                i > 0 && "lg:border-l lg:border-on-dark/14",
                i === 2 && "lg:pl-8",
              )}
            >
              <dd className="order-1 text-[27px] leading-tight font-bold text-gold-light lg:text-4xl">{f.value}</dd>
              <dt className="order-2 text-[15px] leading-snug text-on-dark-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Figma: Our Process → Five steps - zigzag cards around a dark centre line (single column with a left rail on mobile). */
export function ProcessSteps() {
  const c = processContent.steps;
  const last = c.items.length - 1;
  return (
    <section className="section bg-white">
      <div className="shell flex flex-col gap-8 md:gap-18">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} align="center" />
        <ol className="flex flex-col">
          {c.items.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li key={step.title} id={`step-${i + 1}`} className="grid scroll-mt-24 grid-cols-[48px_1fr] gap-x-4 lg:grid-cols-[1fr_112px_1fr] lg:gap-x-0">
                {/* marker + connecting line */}
                <div className="col-start-1 row-start-1 flex flex-col items-center lg:col-start-2" aria-hidden>
                  <span className={cn("hidden h-[26px] w-0.5 lg:block", i === 0 ? "bg-transparent" : "bg-ink")} />
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink/8 lg:size-16">
                    <span className="grid size-[35px] place-items-center rounded-full border border-gold bg-ink lg:size-[46px]">
                      <span className="size-3 rounded-full bg-gold-light lg:size-4" />
                    </span>
                  </span>
                  {i < last ? <span className="w-0.5 flex-1 bg-ink" /> : null}
                </div>
                <div className={cn("col-start-2 row-start-1 pb-6 lg:pb-10", i === last && "pb-0 lg:pb-0", left ? "lg:col-start-1" : "lg:col-start-3")}>
                  <article
                    className={cn("flex flex-col gap-3 rounded-[20px] border border-heading/10 bg-white p-6 shadow-card md:p-8", left && "lg:items-end lg:text-right")}
                    data-aos={left ? "fade-right" : "fade-left"}
                  >
                    <span className={cn("flex items-center gap-3.5", left && "lg:flex-row-reverse")}>
                      <span className="grid size-11 place-items-center rounded-xl bg-gold/12 text-gold-dark">
                        <Icon name={step.icon} size={20} />
                      </span>
                      <span className="text-xl font-bold text-gold-dark md:text-2xl">Step {String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <h3 className="text-xl font-bold text-heading md:text-2xl">{step.title}</h3>
                    <p className="text-base leading-relaxed text-body">{step.copy}</p>
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Figma: Our Process → Timeline - ink band with four phases joined by a gold rule. */
export function ProcessTimeline() {
  const c = processContent.timeline;
  return (
    <section className="section bg-ink">
      <div className="shell flex flex-col gap-8 md:gap-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} align="center" tone="dark" />
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {c.phases.map((p, i) => (
            <li key={p.title} className="flex flex-col gap-4 lg:pr-8" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="flex items-center">
                <span
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-full",
                    i === 0 ? "bg-gold text-on-gold" : "border border-gold/50 bg-ink-raised text-gold",
                  )}
                >
                  <Icon name={p.icon} size={22} />
                </span>
                <span className={cn("h-0.5 flex-1", i === c.phases.length - 1 ? "bg-transparent" : "bg-gold/35")} aria-hidden />
              </span>
              <span className="text-[22px] font-bold text-gold-light lg:text-[28px]">{p.range}</span>
              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">{p.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Figma: Our Process → Bring these - "Sources that help" vs "Sources reviewers ignore". */
export function ProcessBring() {
  const c = processContent.bring;
  return (
    <section className="bg-white pt-14 pb-4 md:pt-24 md:pb-4">
      <div className="shell flex flex-col gap-8 md:gap-14">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} align="center" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-[28px] bg-cream p-6 md:p-11" data-aos="fade-up">
            <p className="text-[11px] font-bold tracking-[0.14em] text-gold-dark uppercase">{c.good.kicker}</p>
            <h3 className="text-[22px] font-bold text-heading md:text-[28px]">{c.good.title}</h3>
            <ul className="flex flex-col">
              {c.good.items.map((item) => (
                <li key={item} className="flex items-start gap-3.5 border-t border-gold/25 py-3.5 text-base text-heading">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
                    <Icon name="tick" size={14} strokeWidth={2.4} />
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5 rounded-[28px] border border-heading/10 bg-mist p-6 md:p-11" data-aos="fade-up" data-aos-delay="100">
            <p className="text-[11px] font-bold tracking-[0.14em] text-body uppercase">{c.bad.kicker}</p>
            <h3 className="text-[22px] font-bold text-heading md:text-[28px]">{c.bad.title}</h3>
            <ul className="flex flex-col">
              {c.bad.items.map((item) => (
                <li key={item} className="flex items-start gap-3.5 border-t border-heading/10 py-3.5 text-base text-heading">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full text-body">
                    <Icon name="close" size={14} strokeWidth={2.2} />
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
