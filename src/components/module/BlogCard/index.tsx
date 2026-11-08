import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { BlogPost } from "@/types";
import { formatBlogDate } from "@/lib/blog";
import { safeImageSrc } from "@/lib/image";
import { cn } from "@/lib/cn";

type CardPost = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "publishedAt" | "readingMinutes" | "ogImage">;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-gold/12 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-gold-eyebrow uppercase md:text-[11px]">
      {children}
    </span>
  );
}

/** Figma: Blog Card - image on top, tag + date, title, excerpt, footer with read time. */
export function BlogCard({ post, className }: { post: CardPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-card border border-white/10 bg-panel transition-all duration-300",
        "hover:border-gold/35 hover:shadow-[0_18px_40px_rgb(0_0_0/0.4)]",
        className,
      )}
    >
      <span className="relative aspect-[382/202] overflow-hidden">
        <Image
          src={safeImageSrc(post.ogImage)}
          alt=""
          fill
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="flex flex-1 flex-col gap-3.5 px-6 pt-5.5 pb-6">
        <span className="flex flex-wrap items-center gap-3">
          {post.category ? <Tag>{post.category}</Tag> : null}
          <span className="text-[13px] text-on-dark-muted">{formatBlogDate(post.publishedAt)}</span>
        </span>
        <span className="text-lg leading-snug font-bold text-white transition-colors group-hover:text-gold-eyebrow">{post.title}</span>
        <span className="line-clamp-3 text-[15px] leading-relaxed text-on-dark-muted">{post.excerpt}</span>
        <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-3.5">
          <span className="text-[13px] text-on-dark-muted">{post.readingMinutes} min read</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-eyebrow">
            Read article
            <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </span>
      </span>
    </Link>
  );
}

/** Figma: H2 / Article Row - compact horizontal variant (thumbnail + copy). */
export function BlogRow({ post, className }: { post: CardPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        "group flex gap-4 rounded-[14px] border border-white/10 p-4 transition-colors duration-300 hover:border-gold/35 hover:bg-panel md:gap-6 md:p-5",
        className,
      )}
    >
      <span className="relative aspect-[168/128] w-28 shrink-0 overflow-hidden rounded-[10px] md:w-[168px]">
        <Image src={safeImageSrc(post.ogImage)} alt="" fill sizes="168px" className="object-cover" />
      </span>
      <span className="flex min-w-0 flex-col gap-2.5">
        <span className="flex flex-wrap items-center gap-2.5">
          {post.category ? <Tag>{post.category}</Tag> : null}
          <span className="text-[13px] text-on-dark-muted">{formatBlogDate(post.publishedAt)}</span>
        </span>
        <span className="line-clamp-2 text-base leading-snug font-bold text-white transition-colors group-hover:text-gold-eyebrow md:text-lg">
          {post.title}
        </span>
        <span className="flex items-center gap-2 text-[13px] text-on-dark-muted">
          {post.readingMinutes} min read
          <span className="size-[3px] rounded-full bg-on-dark-muted" />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-eyebrow">
            Read article <Icon name="arrow" size={14} />
          </span>
        </span>
      </span>
    </Link>
  );
}
