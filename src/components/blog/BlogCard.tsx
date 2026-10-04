import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { formatBlogDate } from "@/lib/blog";
import { url } from "@/lib/config";
import type { BlogPost } from "@/types";

/** Article card: image, category + date, title, excerpt, reading time. */
export function BlogCard({
  post,
  headingLevel = "h3",
}: {
  post: BlogPost;
  /** Kept for compatibility with existing pages. */
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const href = url(`blog/${post.slug}`);
  const imageSrc = post.ogImage || "/assets/og/hero-orbital-globe.jpg";
  const Heading = headingLevel;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] overflow-hidden bg-surface">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized={imageSrc.startsWith("http")}
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="type-small flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-semibold text-primary">
            {post.category}
          </span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
        </div>
        <Heading className="mt-4 font-heading text-lg leading-snug font-bold text-ink lg:text-xl">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="type-small mt-auto flex items-center justify-between pt-6 text-muted">
          <span>{post.readingMinutes} min read</span>
          <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent">
            Read article <Icon name="i-arrow" className="size-4" />
            <span className="sr-only">: {post.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
