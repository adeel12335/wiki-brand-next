import Image from "next/image";
import { sanitizeRichText } from "@/lib/sanitize";
import Link from "next/link";
import { Button } from "@/components/module/Button";
import { Icon } from "@/components/ui/Icon";
import { portfolioSingleContent } from "@/content/portfolio";
import { safeImageSrc } from "@/lib/image";
import type { PublicPortfolioItem } from "@/lib/portfolio";

const c = portfolioSingleContent;

function LiveBadge() {
  return (
    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-[13px] leading-none font-semibold text-heading">
      <span className="size-2 rounded-full bg-[#33b86b]" />
      {c.liveBadge}
    </span>
  );
}

/** Figma: Portfolio Single → Case title (chip + field, 2-line H1, lede, actions, portrait). */
export function CaseHeader({ work, category }: { work: PublicPortfolioItem; category: string | null }) {
  const summary = work.summary.trim().replace(/\.$/, "");
  const highlight = summary && summary.length <= 42 ? summary : c.fallbackHighlight;
  const lede = summary ? `${summary}. ${c.ledeSuffix}` : c.ledeSuffix;
  return (
    <section className="bg-white pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="shell grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20">
        <div className="flex flex-col gap-6" data-aos="fade-up">
          <p className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
            <span className="self-start rounded-full bg-gold/12 px-3.5 py-2 text-[11px] leading-none font-bold tracking-[0.16em] text-gold-dark uppercase">{c.chip}</span>
            <span className="text-sm text-body">
              {category ? (
                <>
                  {category}
                  <span className="px-2">·</span>
                </>
              ) : null}
              {c.engagement}
            </span>
          </p>
          <h1 className="text-[30px] leading-[1.15] font-bold tracking-[-0.015em] text-heading lg:text-[50px]">
            {work.title}
            <br />
            <span className="text-gold">{highlight}</span>
          </h1>
          <p className="max-w-[680px] text-[17px] leading-relaxed text-body md:text-[19px]">{lede}</p>
          <div className="flex flex-col gap-3.5 pt-2 sm:flex-row">
            {work.externalUrl ? (
              <a
                href={work.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-gold hover:text-on-gold"
              >
                {c.actions.live}
                <Icon name="arrow" size={14} />
              </a>
            ) : null}
            <Button href={c.actions.similar.href} variant="gold" arrow className="self-start">
              {c.actions.similar.label}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[440/500] overflow-hidden rounded-[28px] bg-mist" data-aos="fade-left">
          <Image
            src={safeImageSrc(work.imageUrl, "/assets/og/portfolio-public-figure.jpg")}
            alt={work.imageAlt || work.title}
            fill
            priority
            sizes="(min-width: 1024px) 440px, 100vw"
            className="object-cover object-top"
          />
          {work.externalUrl ? <LiveBadge /> : null}
        </div>
      </div>
    </section>
  );
}

/** Figma: Portfolio Single → Rail (Project facts, help card) + related reading links. */
export function CaseRail({ work, category }: { work: PublicPortfolioItem; category: string | null }) {
  const f = c.facts;
  const rows = [
    { label: f.subject, value: work.title },
    ...(category ? [{ label: f.field, value: category }] : []),
    { label: f.engagement, value: c.engagement },
    { label: f.language, value: f.languageValue },
    { label: f.disclosure, value: f.disclosureValue },
    ...(work.updatedAt
      ? [{ label: f.updated, value: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(work.updatedAt) }]
      : []),
    { label: f.status, value: work.externalUrl ? f.live : f.profile, gold: Boolean(work.externalUrl) },
  ];

  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl bg-mist px-7 pt-7 pb-3">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{f.title}</p>
        <dl>
          {rows.map((row, i) => (
            <div key={row.label} className={`flex items-center justify-between gap-4 py-3.5 text-[13px] ${i < rows.length - 1 ? "border-b border-heading/10" : ""}`}>
              <dt className="text-body">{row.label}</dt>
              <dd className={`text-right font-semibold ${"gold" in row && row.gold ? "text-gold-dark" : "text-heading"}`}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-3.5 rounded-2xl bg-ink p-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-gold-light uppercase">{c.help.eyebrow}</p>
        <p className="text-xl leading-snug font-bold text-white">{c.help.title}</p>
        <Button href={c.help.cta.href} variant="gold" size="sm" arrow className="self-start">
          {c.help.cta.label}
        </Button>
      </div>

      <nav aria-label={c.relatedReading.title} className="flex flex-col gap-3 px-1">
        <p className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{c.relatedReading.title}</p>
        {c.relatedReading.links.map((link) => (
          <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-semibold text-heading transition-colors hover:text-gold-dark">
            <Icon name="arrow" size={14} className="text-gold" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function SubHeading({ eyebrow, title, highlight }: { eyebrow: string; title: string; highlight: string }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <p className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{eyebrow}</p>
      <h2 className="text-2xl leading-tight font-bold text-heading md:text-[30px]">
        {title} <span className="text-gold">{highlight}</span>
      </h2>
    </div>
  );
}

/** Figma: Portfolio Single → Case study column (engagement notes from the CMS, pull quote, standards applied). */
export function CaseStudyBody({ body }: { body: string }) {
  const isHtml = /<(p|h2|ul|ol)[\s>]/i.test(body);
  const paragraphs = isHtml
    ? []
    : body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);
  const lead = paragraphs.slice(0, 3);
  const rest = paragraphs.slice(3);
  const para = "text-[17px] leading-relaxed text-body md:text-lg";

  return (
    <div className="flex min-w-0 flex-col gap-7" data-aos="fade-up">
      <SubHeading {...c.notes} />
      {isHtml ? (
        <div className={`${para} flex flex-col gap-5 [&_a]:font-semibold [&_a]:text-gold-dark [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-heading [&_li]:ml-5 [&_li]:list-disc`} dangerouslySetInnerHTML={{ __html: sanitizeRichText(body) }} />
      ) : (
        lead.map((p) => (
          <p key={p.slice(0, 48)} className={para}>
            {p}
          </p>
        ))
      )}

      <figure className="flex flex-col gap-4 rounded-r-2xl border-l-4 border-gold bg-mist px-7 py-8 md:px-10 md:py-9">
        <Icon name="quote" size={32} className="text-gold" />
        <blockquote className="text-xl leading-snug font-semibold text-heading md:text-2xl">{c.quote}</blockquote>
      </figure>

      {rest.map((p) => (
        <p key={p.slice(0, 48)} className={para}>
          {p}
        </p>
      ))}

      <div className="rounded-[20px] border border-heading/10 bg-white px-6 pt-7 pb-4 md:px-8">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{c.standards.title}</p>
        <ul>
          {c.standards.items.map((item, i) => (
            <li key={item} className={`flex items-center gap-3.5 py-3.5 text-base text-heading ${i < c.standards.items.length - 1 ? "border-b border-heading/10" : ""}`}>
              <span className="grid size-6.5 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
                <Icon name="tick" size={13} strokeWidth={2.4} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {!paragraphs.length && !isHtml ? (
        <>
          <SubHeading eyebrow={c.after.eyebrow} title={c.after.title} highlight={c.after.highlight} />
          <p className={para}>{c.after.copy}</p>
        </>
      ) : null}
    </div>
  );
}
