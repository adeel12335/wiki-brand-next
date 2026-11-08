import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { blogSingleContent } from "@/content/blog";
import type { SiteAuthor } from "@/lib/data/authors";
import { SITE_EMAIL } from "@/lib/config";

/** Author contact links: LinkedIn / Wikipedia user page when set, plus the editorial inbox. */
export function authorLinks(author: SiteAuthor): Array<{ icon: IconName; label: string; href: string }> {
  return [
    ...(author.linkedIn ? [{ icon: "linkedin" as IconName, label: `${author.name} on LinkedIn`, href: author.linkedIn }] : []),
    ...(author.wikipediaUserPage ? [{ icon: "globe" as IconName, label: `${author.name} on Wikipedia`, href: author.wikipediaUserPage }] : []),
    { icon: "mail" as IconName, label: `Email ${author.name}`, href: `mailto:${SITE_EMAIL}` },
  ];
}

/** Figma: Blog Single → About the author (ink header with avatar + name, bio, expertise chips, fact-check note). */
export function AuthorBox({ author }: { author: SiteAuthor }) {
  const c = blogSingleContent.author;
  return (
    <section aria-labelledby="about-author" className="overflow-hidden rounded-[20px] border border-heading/10 bg-white" data-aos="fade-up">
      <div className="flex flex-col gap-5 bg-ink p-6 sm:flex-row sm:items-center sm:gap-6 md:px-9 md:pt-9 md:pb-8">
        <span className="grid size-20 shrink-0 place-items-center rounded-full border border-gold bg-ink-raised text-[32px] font-bold text-gold-light md:size-24 md:text-4xl">
          {author.name.charAt(0)}
        </span>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[11px] font-bold tracking-[0.16em] text-gold-light uppercase">{c.eyebrow}</p>
          <h2 id="about-author" className="text-2xl leading-tight font-bold text-white md:text-[28px]">
            {author.name}
          </h2>
          <p className="text-[15px] text-on-dark-muted">{author.role}</p>
        </div>
        <ul className="flex gap-2.5">
          {authorLinks(author).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="grid size-10 place-items-center rounded-full border border-white/20 text-on-dark transition-colors hover:border-gold hover:bg-gold hover:text-on-gold"
              >
                <Icon name={link.icon} size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-5 p-6 md:px-9 md:pt-8 md:pb-9">
        <p className="text-base leading-relaxed text-body">{author.bio}</p>
        <ul className="flex flex-wrap gap-2">
          {c.skills.map((skill) => (
            <li key={skill} className="rounded-full bg-gold/12 px-3.5 py-1.5 text-[13px] font-semibold text-gold-dark">
              {skill}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 border-t border-heading/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-sm text-heading">
            <Icon name="check-circle" size={18} className="text-gold" />
            {c.factCheck}
          </p>
          <Link href={`/author/${author.slug}/`} className="inline-flex items-center gap-2 text-sm font-semibold text-heading transition-colors hover:text-gold-dark">
            {c.more}
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
