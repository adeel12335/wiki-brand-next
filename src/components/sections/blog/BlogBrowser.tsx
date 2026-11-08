"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { blogContent } from "@/content/blog";
import { ArticleCard } from "./ArticleCard";
import { FilterChip, Pagination } from "./ListControls";
import { NewsletterBand } from "./NewsletterBand";
import { slugifyTopic, type CardPost } from "./utils";

export interface TopicChip {
  slug: string;
  label: string;
  count: number;
}

export interface TopicGroup {
  slug: string;
  title: string;
  categories: string[];
}

interface GuidesViewProps {
  /** Posts to render (already filtered / paginated). */
  posts: CardPost[];
  total: number;
  chips: TopicChip[];
  activeTopic?: string | null;
  activeLabel?: string | null;
  query?: string | null;
  sort?: "newest" | "oldest";
  /** Pagination (unfiltered view only). */
  page?: number;
  totalPages?: number;
  filtered?: boolean;
}

const c = blogContent.guides;

function listHref(params: Record<string, string | null | undefined>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const qs = sp.toString();
  return `/blog/${qs ? `?${qs}` : ""}`;
}

export const blogPageHref = (n: number) => (n <= 1 ? "/blog/" : `/blog/page/${n}/`);

/** Figma: Blog Listing → All guides (filter bar, chips, sort, card grid with newsletter band, pagination). Hook-free so it can also be the Suspense fallback. */
export function GuidesView({
  posts,
  total,
  chips,
  activeTopic = null,
  activeLabel = null,
  query = null,
  sort = "newest",
  page = 1,
  totalPages = 1,
  filtered = false,
}: GuidesViewProps) {
  const visible = chips.slice(0, c.visibleChips);
  const more = chips.slice(c.visibleChips);
  const moreActive = more.some((chip) => chip.slug === activeTopic);
  const bandIndex = Math.min(posts.length, 6) - 1;

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-5 border-y border-heading/10 py-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[19px] font-bold text-heading md:text-[22px]">
            {c.title}
            {activeLabel || query ? (
              <span className="ml-2 font-normal text-body">
                · {activeLabel ?? `“${query}”`}
              </span>
            ) : null}
          </h2>
          <div className="flex items-center gap-3">
            <p className="text-sm text-body">
              Showing {posts.length} of {total}
            </p>
            <details className="group/sort relative">
              <summary className="flex h-10.5 cursor-pointer list-none items-center gap-2.5 rounded-[10px] border border-heading/12 bg-white pr-3.5 pl-4 text-sm transition-colors hover:border-gold [&::-webkit-details-marker]:hidden">
                <span className="text-body">{c.sort.label}</span>
                <span className="font-semibold text-heading">{sort === "oldest" ? c.sort.oldest : c.sort.newest}</span>
                <Icon name="chevron-down" size={14} className="transition-transform group-open/sort:rotate-180" />
              </summary>
              <div className="absolute right-0 z-20 mt-2 flex w-44 flex-col rounded-xl border border-heading/10 bg-white p-1.5 shadow-card">
                {(["newest", "oldest"] as const).map((key) => (
                  <Link
                    key={key}
                    href={listHref({ topic: activeTopic, q: query, sort: key === "oldest" ? "oldest" : null })}
                    scroll={false}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-mist hover:text-gold-dark ${sort === key ? "font-semibold text-heading" : "text-body"}`}
                  >
                    {c.sort[key]}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <FilterChip label={c.allLabel} count={total} active={!activeTopic && !query} href="/blog/" />
          {visible.map((chip) => (
            <FilterChip key={chip.slug} label={chip.label} count={chip.count} active={chip.slug === activeTopic} href={listHref({ topic: chip.slug })} />
          ))}
          {more.length ? (
            <details className="group/more relative">
              <summary
                className={`inline-flex h-10.5 cursor-pointer list-none items-center gap-2 rounded-full border pr-4 pl-4.5 text-sm font-semibold transition-colors [&::-webkit-details-marker]:hidden ${
                  moreActive ? "border-ink bg-ink text-white" : "border-transparent text-heading hover:text-gold-dark"
                }`}
              >
                {c.moreTopics}
                <Icon name="chevron-down" size={14} className="transition-transform group-open/more:rotate-180" />
              </summary>
              <div className="absolute left-0 z-20 mt-2 flex w-56 flex-col rounded-xl border border-heading/10 bg-white p-1.5 shadow-card">
                {more.map((chip) => (
                  <Link
                    key={chip.slug}
                    href={listHref({ topic: chip.slug })}
                    scroll={false}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-mist hover:text-gold-dark ${
                      chip.slug === activeTopic ? "font-semibold text-heading" : "text-body"
                    }`}
                  >
                    {chip.label}
                    <span className="rounded-full bg-mist px-2 text-xs font-bold text-body">{chip.count}</span>
                  </Link>
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </div>

      {posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Fragment key={post.slug}>
              <div data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <ArticleCard post={post} linkLabel={c.readArticle} />
              </div>
              {i === bandIndex ? <NewsletterBand /> : null}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-mist p-8">
          <p className="text-base text-body">{c.empty}</p>
          <Link href="/blog/" scroll={false} className="text-sm font-semibold text-gold-dark hover:text-heading">
            {c.clear}
          </Link>
        </div>
      )}

      {!filtered ? <Pagination page={page} totalPages={totalPages} hrefFor={blogPageHref} /> : null}
    </div>
  );
}

interface BlogBrowserProps {
  allPosts: CardPost[];
  pagePosts: CardPost[];
  totalPages: number;
  chips: TopicChip[];
  groups: TopicGroup[];
}

/** Reads `?topic=`, `?q=` (footer + hero search) and `?sort=` and filters the full guide list client-side. */
export function BlogBrowser({ allPosts, pagePosts, totalPages, chips, groups }: BlogBrowserProps) {
  const params = useSearchParams();
  const topic = params.get("topic")?.trim().toLowerCase() || null;
  const query = params.get("q")?.trim() || null;
  const sort = params.get("sort") === "oldest" ? "oldest" : "newest";

  if (!topic && !query && sort === "newest") {
    return <GuidesView posts={pagePosts} total={allPosts.length} chips={chips} page={1} totalPages={totalPages} />;
  }

  const group = topic ? groups.find((g) => g.slug === topic) : undefined;
  const groupCats = group ? group.categories.map((cat) => slugifyTopic(cat)) : null;
  const terms = query ? query.toLowerCase().split(/\s+/).filter(Boolean) : [];

  let list = allPosts.filter((post) => {
    const cat = slugifyTopic(post.category || "");
    if (topic && !(groupCats ? groupCats.includes(cat) : cat === topic)) return false;
    if (terms.length) {
      const hay = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
  if (sort === "oldest") list = [...list].reverse();

  const activeLabel = group?.title ?? chips.find((chip) => chip.slug === topic)?.label ?? null;

  return (
    <GuidesView
      posts={list}
      total={allPosts.length}
      chips={chips}
      activeTopic={topic}
      activeLabel={activeLabel}
      query={query}
      sort={sort}
      filtered
    />
  );
}
