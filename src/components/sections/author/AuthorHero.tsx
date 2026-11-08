import Image from "next/image";
import { HeroContent } from "@/components/hero/HeroContent";
import { Icon } from "@/components/ui/Icon";
import { authorLinks } from "@/components/sections/blog/AuthorBox";
import { authorContent } from "@/content/author";
import type { SiteAuthor } from "@/lib/data/authors";

interface AuthorHeroProps {
  author: SiteAuthor;
  stats: { guides: number; topics: number };
}

/** Figma: Author → Hero (background photo + ink gradient, chip, 2-line H1, actions, glass profile card). */
export function AuthorHero({ author, stats }: AuthorHeroProps) {
  const c = authorContent.hero;
  const heading = c.titles[author.slug] ?? { title: author.name, highlight: author.role };
  const lede = c.lede[author.slug] ?? author.bio;
  const statItems = [
    { value: stats.guides, label: c.stats.guides },
    { value: stats.topics, label: c.stats.topics },
    { value: c.stats.editorsValue, label: c.stats.editors },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image src={c.image.src} alt={c.image.alt} fill priority sizes="100vw" className="-z-10 object-cover object-right" />
      <span className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/88 to-ink/45" />
      <div className="shell grid items-center gap-10 py-16 md:py-30 lg:grid-cols-[minmax(0,720px)_400px] lg:justify-between">
        <div className="flex flex-col gap-6">
          <p className="flex flex-wrap items-center gap-2.5" data-aos="fade-up">
            <span className="rounded-full bg-gold px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-on-gold uppercase">{c.chip}</span>
            <span className="text-sm text-on-dark-muted">{c.org}</span>
          </p>
          <HeroContent
            title={heading.title}
            highlight={heading.highlight}
            lede={lede}
            titleClassName="lg:text-[56px]"
            actions={c.actions.map((a, i) => ({ ...a, variant: i === 0 ? ("gold" as const) : ("ghost" as const) }))}
          />
        </div>

        <div className="flex flex-col items-center gap-5 rounded-[28px] border border-white/10 bg-ink-raised/72 px-6 pt-9 pb-8 text-center backdrop-blur-md md:px-8" data-aos="fade-left">
          <span className="grid size-30 place-items-center rounded-full border-2 border-gold bg-ink text-[52px] font-bold text-gold-light">{author.name.charAt(0)}</span>
          <span className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-white">{author.name}</span>
            <span className="text-sm text-gold-light">{author.role}</span>
          </span>
          <dl className="grid w-full grid-cols-3 border-t border-white/10 pt-4">
            {statItems.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse gap-0.5 ${i > 0 ? "border-l border-white/10" : ""}`}>
                <dt className="text-xs text-on-dark-muted">{s.label}</dt>
                <dd className="text-[26px] leading-tight font-bold text-gold-light">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex gap-2.5">
            {authorLinks(author).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid size-10 place-items-center rounded-full border border-gold/45 text-gold transition-colors hover:bg-gold hover:text-on-gold"
                >
                  <Icon name={link.icon} size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
