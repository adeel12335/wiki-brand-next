import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { HeroWithoutImage } from "@/components/hero/HeroWithoutImage";
import { searchSite, type SearchKind } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search The Wikipedia Studio: services, guides, FAQs and published work.",
  robots: { index: false, follow: true },
};

const KIND_STYLE: Record<SearchKind, string> = {
  Service: "bg-gold/12 text-gold-dark",
  Guide: "bg-heading/8 text-heading",
  FAQ: "bg-mist text-body",
  Portfolio: "bg-gold/12 text-gold-deep",
  Page: "bg-mist text-body",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const results = q ? await searchSite(q) : [];

  return (
    <>
      <HeroWithoutImage
        eyebrow="Search"
        title="Search the"
        highlight="Wikipedia Studio"
        lede="Find services, guides, answers and published work."
      >
        <form action="/search/" method="get" role="search" className="flex w-full max-w-[640px] items-center gap-2 rounded-full bg-white p-1.5 pl-5">
          <Icon name="search" size={20} className="shrink-0 text-gold-dark" />
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="e.g. notability, pricing, editing"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-heading placeholder:text-body/70 focus:outline-none"
          />
          <button type="submit" className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-on-gold transition-colors hover:bg-gold-light">
            Search
          </button>
        </form>
      </HeroWithoutImage>

      <section className="section bg-white">
        <div className="shell max-w-[900px]">
          {!q ? (
            <p className="text-body">Type a word or phrase above to search the site.</p>
          ) : results.length === 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold text-heading">No results for “{q}”.</p>
              <p className="text-body">
                Try a shorter word, browse the{" "}
                <Link href="/sitemap/" className="font-semibold text-gold-dark hover:text-heading">
                  sitemap
                </Link>
                , or{" "}
                <Link href="/contact/" className="font-semibold text-gold-dark hover:text-heading">
                  ask an editor
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-body">
                {results.length} result{results.length === 1 ? "" : "s"} for <strong className="text-heading">“{q}”</strong>
              </p>
              <ol className="flex flex-col">
                {results.map((r) => (
                  <li key={r.kind + r.href + r.title} className="border-b border-heading/10">
                    <Link href={r.href} className="group flex flex-col gap-2 py-5">
                      <span className={`self-start rounded px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase ${KIND_STYLE[r.kind]}`}>{r.kind}</span>
                      <span className="text-lg font-bold text-heading transition-colors group-hover:text-gold-dark">{r.title}</span>
                      <span className="line-clamp-2 text-[15px] leading-relaxed text-body">{r.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </>
  );
}
