import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/module/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { caseStudiesContent } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { safeImageSrc } from "@/lib/image";

/** Figma: Case Studies → Hero side panel "Inside every case" (numbered checklist). */
export function InsideEveryCase() {
  const p = caseStudiesContent.hero.panel;
  return (
    <div className="rounded-3xl border border-white/10 bg-ink-raised px-6 pt-8 pb-4 md:px-8">
      <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-gold-light uppercase">{p.title}</p>
      <ol>
        {p.items.map((item, i) => (
          <li key={item.title} className={cn("flex items-center gap-4 py-4", i < p.items.length - 1 && "border-b border-white/10")}>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/14 text-gold">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-base font-bold text-white">{item.title}</span>
              <span className="text-[13px] text-on-dark-muted">{item.copy}</span>
            </span>
            <span className="text-[13px] font-bold text-gold-light">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export interface FeaturedCase {
  slug: string;
  subject: string;
  role: string;
  image: string;
  imageAlt: string;
  wikipedia: string | null;
  /** Internal detail page, or null when it is noindex (then the Wikipedia link is the primary action). */
  caseHref: string | null;
  title: string;
  story: string;
  focus: string[];
}

/** Figma: Case Studies → Cases (white cards, photo alternating left/right, tags, actions). */
export function FeaturedCases({ cases }: { cases: FeaturedCase[] }) {
  const c = caseStudiesContent.cases;
  return (
    <section className="section bg-white">
      <div className="shell flex flex-col gap-8 md:gap-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} />
          <p className="max-w-[390px] text-base leading-relaxed text-body" data-aos="fade-up">
            {c.aside}
          </p>
        </div>
        {cases.map((item, index) => (
          <article
            key={item.slug}
            className="grid overflow-hidden rounded-[28px] border border-heading/10 bg-white lg:min-h-[520px] lg:grid-cols-[460px_1fr]"
            data-aos="fade-up"
          >
            <div className={cn("relative min-h-[396px] bg-mist", index % 2 === 1 && "lg:order-2")}>
              <Image src={safeImageSrc(item.image)} alt={item.imageAlt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-top" />
              {item.wikipedia ? (
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-[13px] leading-none font-semibold text-heading">
                  <span className="size-2 rounded-full bg-[#33b86b]" />
                  {c.liveBadge}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col justify-center gap-5 p-6 md:p-14">
              <p className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-gold-light uppercase">
                  Case {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-body">
                  {item.subject}
                  <span className="px-2">·</span>
                  {item.role}
                </span>
              </p>
              <h3 className="text-2xl leading-tight font-bold text-heading md:text-[30px]">{item.title}</h3>
              <p className="text-base leading-relaxed text-body md:text-[17px]">{item.story}</p>
              <ul className="flex flex-wrap gap-2">
                {item.focus.map((tag) => (
                  <li key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-gold/12 py-1.5 pr-3.5 pl-3 text-[13px] font-semibold text-gold-dark">
                    <Icon name="check" size={12} />
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-5">
                {item.caseHref ? (
                  <Link
                    href={item.caseHref}
                    className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-gold hover:text-on-gold"
                  >
                    {c.readCase}
                    <Icon name="arrow" size={14} />
                  </Link>
                ) : null}
                {item.wikipedia ? (
                  <a
                    href={item.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 self-start text-[15px] font-semibold transition-colors",
                      item.caseHref
                        ? "text-heading hover:text-gold-dark"
                        : "h-12 rounded-full bg-ink px-6 text-white hover:bg-gold hover:text-on-gold",
                    )}
                  >
                    {c.viewOnWikipedia}
                    <Icon name="arrow" size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Figma: Case Studies → Lessons (ink, three numbered cards). */
export function CaseLessons() {
  const c = caseStudiesContent.lessons;
  return (
    <section className="section bg-ink">
      <div className="shell flex flex-col gap-10 md:gap-14">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} align="center" tone="dark" />
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {c.items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4 rounded-[20px] border border-white/10 bg-ink-raised px-8 py-9" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="flex items-center justify-between">
                <span className="grid size-13 place-items-center rounded-[14px] border border-gold/35 bg-gold/14 text-gold">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="text-[15px] font-bold text-gold-light">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="text-[22px] font-bold text-white">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
