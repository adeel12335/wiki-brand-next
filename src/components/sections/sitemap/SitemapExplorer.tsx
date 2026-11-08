"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HeroWithoutImage } from "@/components/hero/HeroWithoutImage";
import { Icon } from "@/components/ui/Icon";
import { sitemapContent, type SitemapGroup } from "@/content/sitemap";
import { cn } from "@/lib/cn";

function GroupCard({ group, wide }: { group: SitemapGroup; wide?: boolean }) {
  return (
    <section aria-labelledby={`sm-${group.id}`} className="flex h-full flex-col rounded-[20px] border border-heading/10 bg-white px-7 pt-7 pb-4">
      <header className="flex items-center gap-3.5 border-b border-heading/10 pb-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-gold/12 text-gold-dark">
          <Icon name={group.icon} size={19} />
        </span>
        <h2 id={`sm-${group.id}`} className="flex-1 text-[19px] font-bold text-heading">
          {group.title}
        </h2>
        <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs font-bold text-body">{group.links.length}</span>
      </header>
      <ul className={cn(wide && "md:grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-3")}>
        {group.links.map((link) => (
          <li key={link.href} className="border-b border-heading/8 last:border-b-0">
            <Link href={link.href} className="group flex items-center justify-between gap-4 py-3 text-[15px] text-heading transition-colors hover:text-gold-dark">
              <span>{link.label}</span>
              <Icon name="arrow" size={14} className="shrink-0 transition-colors group-hover:text-gold-dark" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Figma: HTML Sitemap - centred hero with page filter + directory cards (filter is client-side). */
export function SitemapExplorer({ extraGroups }: { extraGroups: SitemapGroup[] }) {
  const h = sitemapContent.hero;
  const [query, setQuery] = useState("");

  const filter = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (groups: SitemapGroup[]) =>
      term
        ? groups.map((g) => ({ ...g, links: g.links.filter((l) => l.label.toLowerCase().includes(term)) })).filter((g) => g.links.length)
        : groups;
  }, [query]);

  const groups = filter(sitemapContent.groups);
  const extras = filter(extraGroups);

  return (
    <>
      <HeroWithoutImage title={h.title} highlight={h.highlight} lede={h.lede} align="center" titleClassName="lg:text-[56px]">
        <label className="mt-2 flex h-14 w-full max-w-[560px] items-center gap-3.5 rounded-full bg-white px-6">
          <Icon name="search" size={18} className="shrink-0 text-heading" />
          <span className="sr-only">Filter pages</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={h.filterPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-heading placeholder:text-body/75 focus:outline-none"
          />
        </label>
      </HeroWithoutImage>

      <div className="shell flex flex-col gap-6 pt-14 md:pt-28">
        {groups.length || extras.length ? (
          <>
            {groups.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.map((g) => (
                  <div key={g.id} data-aos="fade-up">
                    <GroupCard group={g} />
                  </div>
                ))}
              </div>
            ) : null}
            {extras.map((g) => (
              <div key={g.id} data-aos="fade-up">
                <GroupCard group={g} wide />
              </div>
            ))}
          </>
        ) : (
          <p className="text-center text-lg text-body">{h.noResults}</p>
        )}
      </div>
    </>
  );
}
