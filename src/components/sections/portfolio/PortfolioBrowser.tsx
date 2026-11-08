"use client";

import { useMemo, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { FilterChip, Pagination } from "@/components/sections/blog/ListControls";
import { portfolioContent } from "@/content/portfolio";
import { CaseCard, type CaseCardItem } from "./CaseCard";

interface PortfolioBrowserProps {
  items: CaseCardItem[];
  /** Section heading shown left of the search field (rendered here, not passed as JSX from the server). */
  heading: { eyebrow?: string; title: string; highlight: string };
  /** Stats strip under the heading row (rendered here so no server-built list is passed as a prop). */
  stats?: Array<{ value: string; label: string }>;
}

const c = portfolioContent;

/**
 * Figma: Portfolio Listing → Intro + All work. Search, field filters, sort and pagination run client-side;
 * every card stays in the HTML (off-page ones are `hidden`) so crawlers still see each link.
 */
export function PortfolioBrowser({ items, heading, stats }: PortfolioBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "az">("featured");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((item) => {
      if (item.category) map.set(item.category, (map.get(item.category) ?? 0) + 1);
    });
    return [...map].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [items]);

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    let list = items.filter((item) => {
      if (category && item.category !== category) return false;
      if (!terms.length) return true;
      const hay = `${item.title} ${item.summary} ${item.category ?? ""}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    if (sort === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [items, query, category, sort]);

  const perPage = c.grid.perPage;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;

  const reset = () => {
    setQuery("");
    setCategory(null);
    setPage(1);
  };

  const goTo = (n: number) => {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const labels = { live: c.grid.liveBadge, view: c.grid.viewCase, external: c.grid.viewOnWikipedia, fallbackCategory: c.grid.fallbackCategory };

  return (
    <>
      <section className="bg-white pt-12 md:pt-20">
        <div className="shell flex flex-col gap-6 md:gap-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4" data-aos="fade-up">
              {heading.eyebrow ? <Eyebrow>{heading.eyebrow}</Eyebrow> : null}
              <h1 className="h2 text-heading">
                {heading.title}
                <br />
                <span className="text-gold">{heading.highlight}</span>
              </h1>
            </div>
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="flex h-14 w-full items-center gap-3 rounded-full border border-heading/12 bg-white pr-1.5 pl-5 transition-colors focus-within:border-gold lg:w-[400px]"
              data-aos="fade-up"
            >
              <Icon name="search" size={18} className="shrink-0 text-heading" />
              <label htmlFor="portfolio-search" className="sr-only">
                {c.intro.searchPlaceholder}
              </label>
              <input
                id="portfolio-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={c.intro.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-[15px] text-heading placeholder:text-body/75 focus:outline-none"
              />
              <button
                type="submit"
                onClick={() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="h-[43px] shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-on-gold"
              >
                {c.intro.searchLabel}
              </button>
            </form>
          </div>
          {stats?.length ? (
            <ul className="grid grid-cols-2 border-y border-heading/10 lg:grid-cols-4" data-aos="fade-up">
              {stats.map((stat, i) => (
                <li
                  key={stat.label}
                  className={`flex flex-col gap-1 py-4 lg:flex-row lg:items-center lg:gap-3.5 lg:px-8 lg:py-7 ${i % 2 ? "pl-4" : ""} ${i > 0 ? "lg:border-l lg:border-heading/10 lg:pl-8" : "lg:pl-0"}`}
                >
                  <span className="text-2xl leading-tight font-bold text-gold-dark lg:text-[32px]">{stat.value}</span>
                  <span className="max-w-[210px] text-sm leading-snug text-body">{stat.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="bg-white pt-6 pb-16 md:pb-28">
        <div ref={gridRef} className="shell flex scroll-mt-28 flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
              <FilterChip
                label={c.grid.allLabel}
                count={items.length}
                active={!category}
                onClick={() => {
                  setCategory(null);
                  setPage(1);
                }}
              />
              {categories.map((cat) => (
                <FilterChip
                  key={cat.label}
                  label={cat.label}
                  count={cat.count}
                  active={cat.label === category}
                  onClick={() => {
                    setCategory(cat.label);
                    setPage(1);
                  }}
                />
              ))}
            </div>
            <label className="flex h-10.5 shrink-0 items-center gap-2.5 self-start rounded-[10px] border border-heading/12 bg-white pr-3 pl-4 text-sm transition-colors focus-within:border-gold hover:border-gold">
              <span className="text-body">{c.grid.sort.label}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value === "az" ? "az" : "featured")}
                className="cursor-pointer bg-transparent font-semibold text-heading focus:outline-none"
              >
                <option value="featured">{c.grid.sort.featured}</option>
                <option value="az">{c.grid.sort.az}</option>
              </select>
            </label>
          </div>

          {filtered.length ? (
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {filtered.map((item, i) => (
                <li key={item.slug} className={i >= start && i < start + perPage ? undefined : "hidden"}>
                  <CaseCard item={item} labels={labels} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-4 rounded-3xl bg-mist p-8">
              <p className="text-base text-body">{c.grid.empty}</p>
              <button type="button" onClick={reset} className="text-sm font-semibold text-gold-dark hover:text-heading">
                {c.grid.clear}
              </button>
            </div>
          )}

          <Pagination page={current} totalPages={totalPages} onSelect={goTo} />
        </div>
      </section>
    </>
  );
}
