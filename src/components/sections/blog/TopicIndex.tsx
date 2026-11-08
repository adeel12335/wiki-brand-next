import Link from "next/link";
import { SectionHeading } from "@/components/module/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { blogContent } from "@/content/blog";

export interface TopicRow {
  slug: string;
  title: string;
  question: string;
  count: number;
  latest: string | null;
}

/**
 * Figma: Blog Listing → Browse by topic (ink). Full-width (col-12) list of BL / Topic Row;
 * hover only changes colours - nothing moves.
 */
export function TopicIndex({ rows }: { rows: TopicRow[] }) {
  const c = blogContent.topics;
  if (!rows.length) return null;
  return (
    <section className="section bg-ink">
      <div className="shell flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} tone="dark" className="lg:max-w-[560px]" />
          <div className="flex w-full flex-col gap-3.5 rounded-[20px] border border-white/10 bg-ink-raised p-7 lg:w-[400px]" data-aos="fade-up">
            <p className="flex items-center gap-3.5">
              <span className="grid size-11 place-items-center rounded-xl border border-gold/35 bg-gold/14 text-gold">
                <Icon name={c.help.icon} size={20} />
              </span>
              <span className="text-[17px] font-bold text-white">{c.help.title}</span>
            </p>
            <p className="text-sm leading-relaxed text-on-dark-muted">{c.help.copy}</p>
            <Link href={c.help.link.href} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-gold-light transition-colors hover:text-white">
              {c.help.link.label}
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>

        <ol className="flex flex-col border-t border-white/10" data-aos="fade-up">
          {rows.map((row, i) => (
            <li key={row.slug} className="border-b border-white/10">
              <Link href={`/blog/?topic=${row.slug}#guides`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3.5 py-5 md:gap-8 md:py-7.5 lg:grid-cols-[auto_minmax(0,1fr)_360px_auto_auto]">
                <span className="w-5 text-[15px] font-bold text-on-dark-muted transition-colors group-hover:text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-xl leading-tight font-bold text-white transition-colors group-hover:text-gold-light md:text-[26px]">{row.title}</span>
                  <span className="text-sm text-on-dark-muted md:text-[15px]">{row.question}</span>
                </span>
                <span className="hidden min-w-0 items-center gap-2.5 text-sm text-on-dark-muted lg:flex">
                  {row.latest ? (
                    <>
                      <span className="size-1.5 shrink-0 rounded-full bg-on-dark-muted transition-colors group-hover:bg-gold" />
                      <span className="truncate">Latest: {row.latest}</span>
                    </>
                  ) : null}
                </span>
                <span className="hidden rounded-full border border-on-dark/60 px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap text-on-dark transition-colors group-hover:border-gold group-hover:text-gold-light lg:inline-block">
                  {row.count} {row.count === 1 ? "guide" : "guides"}
                </span>
                <span className="grid size-10 place-items-center rounded-full border border-white/70 text-white transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold md:size-12">
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
