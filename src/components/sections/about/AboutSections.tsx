import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { TextLink } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";
import { HeadingRow } from "./InfoCards";
import { aboutContent } from "@/content/about";

/** Figma: About → Our Story - copy left, photo with gold block + ink note card right. */
export function AboutStory() {
  const c = aboutContent.story;
  return (
    <section className="section bg-white">
      <div className="shell grid items-center gap-10 lg:grid-cols-[580px_1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading title={c.title} highlight={c.highlight} />
          <p className="text-[17px] leading-relaxed font-semibold text-heading lg:text-[19px]" data-aos="fade-up">
            {c.intro}
          </p>
          <p className="text-[17px] leading-relaxed text-body" data-aos="fade-up">
            {c.body}
          </p>
        </div>
        <div className="relative mx-auto aspect-[540/520] w-full max-w-[540px]" data-aos="fade-left">
          <span className="absolute bottom-[-6%] left-0 aspect-square w-[41%] rounded-[24px] bg-gold" aria-hidden />
          <div className="absolute inset-y-0 right-0 w-[92.6%] overflow-hidden rounded-[24px]">
            <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 500px, 90vw" className="object-cover" />
          </div>
          {c.note ? (
            <figure className="absolute top-[7.7%] left-0 flex w-[48%] flex-col gap-1.5 rounded-[18px] bg-ink p-4 shadow-card-hover md:gap-2.5 md:p-6">
              <Icon name="quote" size={24} className="size-4 text-gold-light md:size-6" />
              <blockquote className="text-[11px] leading-snug font-bold text-white sm:text-[15px] md:text-[17px]">{c.note.quote}</blockquote>
              <figcaption className="text-[8px] text-on-dark-muted sm:text-[11px] md:text-xs">{c.note.caption}</figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Figma: About → Statistics - photo background with ink overlay, heading row, glass stat bar. */
export function AboutStats() {
  const c = aboutContent.stats;
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image src={c.background} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <span className="absolute inset-0 -z-10 bg-linear-to-r from-ink/97 via-ink/90 to-ink/82" aria-hidden />
      <div className="section shell flex flex-col gap-8 md:gap-18">
        <HeadingRow title={c.title} highlight={c.highlight} aside={c.aside} tone="dark">
          {c.link ? (
            <TextLink href={c.link.href} className="self-start rounded-btn border border-gold/45 px-5.5 py-3.5 text-[15px] text-gold-light">
              {c.link.label}
            </TextLink>
          ) : null}
        </HeadingRow>
        <dl className="grid divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-ink-raised/72 backdrop-blur-sm lg:grid-cols-4 lg:divide-x lg:divide-y-0" data-aos="fade-up">
          {c.items.map((s) => (
            <div key={s.label} className="flex flex-col gap-4 p-6 lg:px-9 lg:py-10">
              <span className="grid size-12 place-items-center rounded-full bg-gold/14 text-gold">
                <Icon name={s.icon} size={20} />
              </span>
              <dd className="order-2 flex items-baseline gap-2">
                <span className="text-[30px] leading-none font-bold text-white lg:text-5xl">{s.value}</span>
                {s.unit ? <span className="text-base font-semibold text-gold-light">{s.unit}</span> : null}
              </dd>
              <dt className="order-3 text-base font-semibold text-white">{s.label}</dt>
              {s.copy ? <dd className="order-4 text-sm leading-relaxed text-on-dark-muted">{s.copy}</dd> : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Figma: About → Every Engagement - numbered project-inclusion cards (3 × 2). */
export function AboutEngagement() {
  const c = aboutContent.engagement;
  return (
    <section className="section bg-white">
      <div className="shell flex flex-col gap-8 md:gap-16">
        <SectionHeading title={c.title} highlight={c.highlight} lede={c.lede} align="center" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4 rounded-[18px] border border-heading/10 bg-white p-8 shadow-card" data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              <span className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-gold/12 text-gold-dark">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="text-[13px] font-bold text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="text-[17px] font-bold text-heading md:text-xl">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Figma: About → Principles - ink section, four numbered commitments + editorial-standard quote. */
export function AboutPrinciples() {
  const c = aboutContent.principles;
  return (
    <section id="principles" className="section scroll-mt-24 bg-ink">
      <div className="shell flex flex-col gap-8 md:gap-16">
        <SectionHeading title={c.title} highlight={c.highlight} lede={c.lede} align="center" tone="dark" />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4 rounded-[20px] border border-white/8 bg-ink-raised px-7 py-8" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="text-[15px] font-bold text-gold-light">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-0.5 w-8 bg-gold" aria-hidden />
              <h3 className="text-[17px] font-bold text-white md:text-xl">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">{item.copy}</p>
            </li>
          ))}
        </ol>
        {c.quote ? (
          <figure className="flex flex-col gap-5 rounded-[20px] border border-gold/20 bg-gold/8 p-6 md:flex-row md:gap-8 md:px-12 md:py-11" data-aos="fade-up">
            <Icon name="quote" size={48} className="size-9 shrink-0 text-gold-light md:size-12" />
            <div className="flex flex-col gap-3">
              <blockquote className="text-xl leading-snug font-semibold text-white md:text-2xl">{c.quote.text}</blockquote>
              <figcaption className="text-sm font-semibold text-gold-light">{c.quote.source}</figcaption>
            </div>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

/** Figma: About → Editorial Team - four accountable roles (id="team" for /about-us/#team). */
export function AboutTeam() {
  const c = aboutContent.team;
  return (
    <section id="team" className="section scroll-mt-24 bg-white">
      <div className="shell flex flex-col gap-8 md:gap-16">
        <SectionHeading title={c.title} highlight={c.highlight} lede={c.lede} align="center" />
        <ul className="grid gap-6 lg:grid-cols-2">
          {c.roles.map((r, i) => (
            <li key={r.role} className="flex gap-6 rounded-[20px] border border-heading/10 bg-white p-8 shadow-card" data-aos="fade-up" data-aos-delay={(i % 2) * 80}>
              <span className="grid size-[72px] shrink-0 place-items-center rounded-full bg-gold/12 text-gold-dark">
                <Icon name={r.icon} size={28} />
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="text-[17px] font-bold text-heading md:text-[21px]">{r.role}</h3>
                {r.focus ? <p className="text-[11px] font-bold tracking-[0.12em] text-gold-dark uppercase">{r.focus}</p> : null}
                <p className="text-[15px] leading-relaxed text-body">{r.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
