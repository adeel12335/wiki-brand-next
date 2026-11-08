import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { safeImageSrc } from "@/lib/image";
import { blogContent } from "@/content/blog";
import { shortDate, type CardPost } from "./utils";

interface BlogFeaturedProps {
  featured: CardPost;
  mostRead: CardPost[];
  authorName: string;
}

/** Figma: Blog Listing → Featured (page H1 + search, featured guide card, "Most read" list). */
export function BlogFeatured({ featured, mostRead, authorName }: BlogFeaturedProps) {
  const c = blogContent.featured;
  return (
    <section className="bg-white pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="shell flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4" data-aos="fade-up">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="h2 text-heading">
              {c.title}
              <br />
              <span className="text-gold">{c.highlight}</span>
            </h1>
          </div>
          <SearchForm placeholder={c.searchPlaceholder} label={c.searchLabel} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_388px] lg:gap-8">
          <Link
            href={`/blog/${featured.slug}/`}
            className="group relative isolate flex min-h-[480px] flex-col justify-end overflow-hidden rounded-3xl bg-ink"
            data-aos="fade-up"
          >
            <Image
              src={safeImageSrc(featured.ogImage)}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 780px, 100vw"
              className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 -z-10 bg-linear-to-b from-ink/10 via-ink/55 to-ink/95" />
            <span className="flex flex-col gap-4 p-5 pt-40 md:p-10">
              <span className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-gold px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-on-gold uppercase">
                  {c.featuredTag}
                </span>
                {featured.category ? (
                  <span className="rounded-full border border-white/50 px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-white uppercase">
                    {featured.category}
                  </span>
                ) : null}
              </span>
              <span className="max-w-[700px] text-[26px] leading-tight font-bold text-white transition-colors group-hover:text-gold-light md:text-[34px]">
                {featured.title}
              </span>
              <span className="max-w-[700px] text-base leading-relaxed text-on-dark">{featured.excerpt}</span>
              <span className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-gold text-[15px] font-bold text-on-gold">{authorName.charAt(0)}</span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-white">{authorName}</span>
                    <span className="text-[13px] text-on-dark-muted">
                      {shortDate(featured.publishedAt)}
                      <span className="px-2">·</span>
                      {featured.readingMinutes} min read
                    </span>
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5.5 py-3 text-sm font-semibold text-heading transition-colors group-hover:bg-gold group-hover:text-on-gold sm:self-auto">
                  {c.featuredCta}
                  <Icon name="arrow" size={14} />
                </span>
              </span>
            </span>
          </Link>

          {mostRead.length ? (
            <div className="flex flex-col rounded-3xl border border-heading/10 bg-white px-6 pt-8 pb-5 md:px-8" data-aos="fade-up" data-aos-delay="100">
              <p className="flex items-center justify-between border-b border-heading/10 pb-4">
                <span className="text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{c.mostRead.label}</span>
                <span className="text-[13px] text-body">{c.mostRead.period}</span>
              </p>
              <ol className="flex flex-col">
                {mostRead.map((post, i) => (
                  <li key={post.slug} className="border-b border-heading/10 last:border-b-0">
                    <Link href={`/blog/${post.slug}/`} className="group flex gap-4 py-4.5">
                      <span className="w-7 shrink-0 text-[22px] leading-tight font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex flex-col gap-1">
                        {post.category ? <span className="text-[10px] font-bold tracking-[0.16em] text-body uppercase">{post.category}</span> : null}
                        <span className="text-[15px] leading-snug font-semibold text-heading transition-colors group-hover:text-gold-dark">{post.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Pill search (GET /blog/?q=) - same endpoint as the footer search. */
export function SearchForm({ placeholder, label, action = "/blog/" }: { placeholder: string; label: string; action?: string }) {
  return (
    <form
      action={action}
      method="get"
      role="search"
      className="flex h-14 w-full items-center gap-3 rounded-full border border-heading/12 bg-white pr-1.5 pl-5 transition-colors focus-within:border-gold lg:w-[400px]"
      data-aos="fade-up"
    >
      <Icon name="search" size={18} className="shrink-0 text-heading" />
      <label htmlFor={`search-${action.replace(/[^a-z0-9]+/gi, "")}`} className="sr-only">
        {placeholder}
      </label>
      <input
        id={`search-${action.replace(/[^a-z0-9]+/gi, "")}`}
        name="q"
        type="search"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-heading placeholder:text-body/75 focus:outline-none"
      />
      <button type="submit" className="h-[43px] shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-on-gold">
        {label}
      </button>
    </form>
  );
}
