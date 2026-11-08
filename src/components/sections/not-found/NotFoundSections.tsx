import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { HeadingRow } from "@/components/sections/about/InfoCards";
import { notFoundContent } from "@/content/not-found";
import { safeImageSrc } from "@/lib/image";
import type { BlogPost } from "@/types";

/** Figma: 404 → Not found - outlined "404", citation-needed chip, 2-line H1, site search + popular links. */
export function NotFoundHero() {
  const c = notFoundContent.hero;
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="shell flex flex-col items-center gap-7 py-16 text-center lg:pt-28 lg:pb-32" data-aos="fade-up">
        <p className="text-[120px] leading-none font-bold text-transparent [-webkit-text-stroke:2px_var(--color-gold)] lg:text-[220px]" aria-hidden>
          {c.code}
        </p>
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/12 py-2 pr-4 pl-3.5 text-sm font-semibold text-gold-light">
          <Icon name="info" size={16} />
          {c.badge}
        </p>
        <h1 className="h1 text-white">
          {c.title}
          <br />
          <span className="text-gold-light">{c.highlight}</span>
        </h1>
        <p className="lede max-w-[600px] text-on-dark">{c.lede}</p>
        <form action={c.searchAction} method="get" role="search" className="flex w-full max-w-[560px] items-center gap-3.5 rounded-full bg-white py-2 pr-2 pl-6 focus-within:ring-3 focus-within:ring-gold/40">
          <Icon name="search" size={18} className="shrink-0 text-heading" />
          <label htmlFor="nf-search" className="sr-only">
            {c.searchPlaceholder}
          </label>
          <input
            id="nf-search"
            name="q"
            type="search"
            placeholder={c.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-heading placeholder:text-body/75 focus:outline-none"
          />
          <button type="submit" className="h-[43px] shrink-0 rounded-full bg-gold px-5.5 text-sm font-bold text-on-gold transition-colors hover:bg-gold-light">
            Search
          </button>
        </form>
        <nav aria-label="Popular pages" className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <span className="text-sm text-on-dark-muted">{c.popularLabel}</span>
          {c.popular.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-on-dark/25 py-2 pr-3 pl-3.5 text-[13px] font-semibold text-on-dark transition-colors hover:border-gold hover:bg-gold hover:text-on-gold"
            >
              {l.label}
              <Icon name="arrow" size={13} />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

type GuidePost = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "readingMinutes" | "ogImage">;

/** Figma: BL / Article Card - light article card (image + ink category chip, read time, title, excerpt, link). */
function GuideCard({ post }: { post: GuidePost }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-heading/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-card-hover"
    >
      <span className="relative aspect-[384/232] overflow-hidden bg-mist">
        <Image src={safeImageSrc(post.ogImage)} alt="" fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {post.category ? (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-ink px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-gold-light uppercase">
            {post.category}
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-3 px-6.5 pt-6 pb-6.5">
        <span className="text-[13px] text-body">{post.readingMinutes} min read</span>
        <span className="text-xl leading-snug font-bold text-heading transition-colors group-hover:text-gold-dark">{post.title}</span>
        <span className="line-clamp-2 text-[15px] leading-relaxed text-body">{post.excerpt}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-1.5 text-sm font-semibold text-heading transition-colors group-hover:text-gold-dark">
          Read article
          <Icon name="arrow" size={14} />
        </span>
      </span>
    </Link>
  );
}

/** Figma: 404 → "While you wait" - three popular guides from the blog. */
export function NotFoundGuides({ posts }: { posts: GuidePost[] }) {
  const c = notFoundContent.guides;
  if (!posts.length) return null;
  return (
    <section className="section bg-white">
      <div className="shell flex flex-col gap-6 md:gap-12">
        <HeadingRow eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} aside={c.aside} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={post.slug} data-aos="fade-up" data-aos-delay={i * 80}>
              <GuideCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
