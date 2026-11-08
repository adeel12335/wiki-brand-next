import Link from "next/link";
import { Button } from "@/components/module/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { blogSingleContent } from "@/content/blog";
import type { SiteAuthor } from "@/lib/data/authors";
import type { TocItem } from "./articleBody";
import { TocNav } from "./TocNav";
import { longDate } from "./utils";

interface ArticleRailProps {
  author: SiteAuthor;
  publishedAt: string;
  modifiedAt: string;
  readingMinutes: number;
  shareUrl: string;
  title: string;
  toc: TocItem[];
  relatedService?: { name: string; href: string } | null;
}

/** Figma: Blog Single → Rail (byline, facts, share, On this page, help card). Stacks above the article on mobile. */
export function ArticleRail({ author, publishedAt, modifiedAt, readingMinutes, shareUrl, title, toc, relatedService }: ArticleRailProps) {
  const r = blogSingleContent.rail;
  const facts = [
    { label: r.published, value: longDate(publishedAt), dateTime: publishedAt },
    ...(modifiedAt && modifiedAt !== publishedAt ? [{ label: r.updated, value: longDate(modifiedAt), dateTime: modifiedAt }] : []),
    { label: r.readingTime, value: `${readingMinutes} minutes` },
  ];
  const share: Array<{ icon: IconName; label: string; href: string }> = [
    { icon: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { icon: "x-social", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}` },
    { icon: "mail", label: "Share by email", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}` },
  ];

  return (
    <aside className="flex flex-col gap-8">
      <Link href={`/author/${author.slug}/`} className="group flex items-center gap-3.5">
        <span className="grid size-13 shrink-0 place-items-center rounded-full bg-ink text-xl font-bold text-gold-light">{author.name.charAt(0)}</span>
        <span className="flex flex-col gap-0.5">
          <span className="text-xs text-body">{r.writtenBy}</span>
          <span className="text-base font-bold text-heading transition-colors group-hover:text-gold-dark">{author.name}</span>
          <span className="text-[13px] text-gold-dark">{author.role}</span>
        </span>
      </Link>

      <dl className="border-t border-heading/10">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center justify-between border-b border-heading/10 py-3.5 text-[13px]">
            <dt className="text-body">{fact.label}</dt>
            <dd className="font-semibold text-heading">{fact.dateTime ? <time dateTime={fact.dateTime}>{fact.value}</time> : fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{r.share}</p>
        <ul className="flex gap-2.5">
          {share.map((s) => (
            <li key={s.icon}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-heading/10 bg-white text-heading transition-colors hover:border-gold hover:bg-gold hover:text-on-gold"
              >
                <Icon name={s.icon} size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-8 lg:sticky lg:top-28">
      <TocNav title={r.onThisPage} items={toc} />

      <div className="flex flex-col gap-3.5 rounded-2xl bg-ink p-7">
        <p className="text-[11px] font-bold tracking-[0.16em] text-gold-light uppercase">{r.help.eyebrow}</p>
        <p className="text-xl leading-snug font-bold text-white">{r.help.title}</p>
        <Button href={r.help.cta.href} variant="gold" size="sm" arrow className="self-start">
          {r.help.cta.label}
        </Button>
        {relatedService ? (
          <Link href={relatedService.href} className="inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white">
            {relatedService.name}
            <Icon name="arrow" size={14} />
          </Link>
        ) : null}
      </div>
      </div>
    </aside>
  );
}
