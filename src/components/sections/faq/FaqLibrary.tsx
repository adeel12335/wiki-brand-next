"use client";

import { useMemo, useState } from "react";
import { HeroImage } from "@/components/hero/HeroImage";
import { FaqList } from "@/components/module/Faq";
import { Icon } from "@/components/ui/Icon";
import { faqContent, type FaqGroup } from "@/content/faq";

/**
 * Figma: FAQ - Hero (search + plain-text "Jump to" row) and FAQ library (topic groups, full-width divider accordion).
 * Hero and library share the search query, so both live in this client component.
 */
export function FaqLibrary() {
  const h = faqContent.hero;
  const [query, setQuery] = useState("");

  const groups = useMemo<FaqGroup[]>(() => {
    const term = query.trim().toLowerCase();
    if (!term) return faqContent.groups;
    return faqContent.groups
      .map((g) => ({ ...g, items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(term)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <>
      <HeroImage title={h.title} highlight={h.highlight} lede={h.lede} photo={h.photo}
        className="items-center text-center md:items-start md:text-left"
      >
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("faq-library")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-2 flex h-14 w-full max-w-[620px] items-center gap-2.5 rounded-full bg-white pr-1.5 pl-[18px] md:h-16 md:gap-3.5 md:pr-2 md:pl-6"
        >
          <Icon name="search" size={20} className="shrink-0 text-heading" />
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={h.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-heading placeholder:text-body/75 focus:outline-none md:text-base"
          />
          <button
            type="submit"
            className="h-[43px] shrink-0 rounded-full bg-gold px-5 text-[15px] font-bold text-on-gold transition-colors hover:bg-gold-light md:h-12 md:px-6"
          >
            {h.searchButton}
          </button>
        </form>
        <nav aria-label="FAQ topics" className="flex flex-wrap items-center justify-center gap-x-[22px] md:justify-start gap-y-3 pt-1 text-[15px]">
          <span className="text-on-dark-muted">{h.jumpLabel}</span>
          {faqContent.groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="font-bold text-white transition-colors hover:text-gold">
              {g.title}
            </a>
          ))}
        </nav>
      </HeroImage>

      <section id="faq-library" className="section scroll-mt-24 bg-white">
        <div className="shell flex flex-col gap-8 md:gap-14">
          {groups.length ? (
            groups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28" data-aos="fade-up">
                <h2 className="pb-5 text-[22px] leading-tight font-bold text-heading md:text-[26px]">{g.title}</h2>
                <FaqList items={g.items.map((i) => ({ question: i.q, answer: i.a }))} defaultOpen={query ? 0 : g.id === faqContent.groups[0].id ? 0 : null} />
              </div>
            ))
          ) : (
            <p className="text-lg text-body">{h.noResults}</p>
          )}
        </div>
      </section>
    </>
  );
}
