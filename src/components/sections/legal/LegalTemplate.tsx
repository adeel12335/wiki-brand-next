import Link from "next/link";
import { heroBg } from "@/components/hero/HeroContent";
import { Button } from "@/components/module/Button";
import { Icon } from "@/components/ui/Icon";
import { legalDocs, legalUi, type LegalDoc } from "@/content/legal";
import { SITE_EMAIL } from "@/lib/config";
import { cn } from "@/lib/cn";
import { LegalText } from "./LegalText";
import { LegalToc } from "./LegalToc";

/**
 * Figma: Privacy Policy (Legal) - shared template for Privacy Policy and Terms & Conditions.
 * Hero (doc switcher, one-line H1, meta row) + sticky contents card + numbered sections + contact card.
 */
export function LegalTemplate({ doc }: { doc: LegalDoc }) {
  const email = doc.email ?? SITE_EMAIL;
  const cta = doc.contactCta ?? legalUi.contactCta;
  return (
    <>
      <section className={cn("relative overflow-hidden", heroBg)}>
        <div className="shell relative flex flex-col items-start gap-5 py-12 md:py-[88px]" data-aos="fade-up">
          <nav aria-label="Legal documents" className="flex gap-1.5 rounded-full bg-ink-raised p-1.5">
            {legalDocs.map((d) => {
              const on = d.key === doc.key;
              return (
                <Link
                  key={d.key}
                  href={d.href}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "rounded-full px-[18px] py-2.5 text-sm font-semibold transition-colors",
                    on ? "bg-gold text-on-gold" : "text-on-dark hover:text-gold",
                  )}
                >
                  {d.tabLabel}
                </Link>
              );
            })}
          </nav>
          <h1 className="h1 text-white lg:text-[56px]">
            {doc.title} <span className="text-gold">{doc.highlight}</span>
          </h1>
          <p className="lede max-w-[730px] text-on-dark">{doc.lede}</p>
          <ul className="flex flex-col gap-3 pt-2 text-sm text-on-dark-muted md:flex-row md:flex-wrap md:gap-6">
            <li className="flex items-center gap-2">
              <Icon name="clock" size={16} className="text-gold" />
              {doc.updated}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="write" size={16} className="text-gold" />
              {doc.readTime}
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors hover:text-gold">
                <Icon name="mail" size={16} className="text-gold" />
                {email}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white pt-12 pb-16 md:pt-[88px] md:pb-30">
        <div className="shell grid items-start gap-6 lg:grid-cols-[300px_minmax(0,760px)] lg:justify-between lg:gap-16">
          <aside className="lg:sticky lg:top-28">
            <LegalToc title={legalUi.contents} items={doc.sections.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <div className="flex flex-col">
            <div className="flex items-start gap-4 rounded-2xl bg-cream px-6 py-6 md:px-7" data-aos="fade-up">
              <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-gold/12 text-gold-dark">
                <Icon name="shield" size={19} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.14em] text-gold-dark uppercase">{legalUi.inShort}</span>
                <span className="text-base leading-snug font-semibold text-heading">{doc.summary}</span>
              </span>
            </div>

            {doc.sections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={cn("flex scroll-mt-28 flex-col gap-3.5 pb-9", i === 0 ? "pt-11" : "border-t border-heading/10 pt-9")}
              >
                <h2 className="flex items-baseline gap-3.5 text-[22px] leading-tight font-bold text-heading md:text-[26px]">
                  <span className="text-sm font-bold text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) =>
                  b.type === "p" ? (
                    <p key={j} className="text-base leading-[1.75] text-body md:text-[17px]">
                      <LegalText text={b.text} email={email} />
                    </p>
                  ) : (
                    <ul key={j} className="flex flex-col gap-2.5 text-base leading-[1.75] text-body md:text-[17px]">
                      {b.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-gold" />
                          <span>
                            <LegalText text={item} email={email} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </article>
            ))}

            <div className="flex flex-col gap-5 rounded-[20px] bg-ink p-7 md:flex-row md:items-center" data-aos="fade-up">
              <span className="grid size-[52px] shrink-0 place-items-center rounded-[13px] bg-gold/14 text-gold">
                <Icon name="mail" size={23} />
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="text-[19px] font-bold text-white">{doc.contactTitle}</span>
                <span className="text-sm leading-relaxed text-on-dark-muted">
                  {doc.contactCopy.replace("{email}", email)}
                </span>
              </span>
              <Button href={cta.href} variant="gold" arrow className="self-start md:self-center">
                {cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
