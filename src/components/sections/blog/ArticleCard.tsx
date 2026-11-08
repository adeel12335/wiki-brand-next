import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { safeImageSrc } from "@/lib/image";
import { cn } from "@/lib/cn";
import { shortDate, type CardPost } from "./utils";

/**
 * Figma: BL / Article Card - white card, photo with ink category chip, meta, title, excerpt, "Read article".
 * Light counterpart of the shared dark `BlogCard` (used on the blog listing + author page).
 */
export function ArticleCard({ post, linkLabel = "Read article", className }: { post: CardPost; linkLabel?: string; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[20px] border border-heading/10 bg-white transition-[border-color,box-shadow] duration-300",
        "hover:border-gold/60 hover:shadow-card-hover",
        className,
      )}
    >
      <span className="relative aspect-[382/232] overflow-hidden bg-mist">
        <Image
          src={safeImageSrc(post.ogImage)}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {post.category ? (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-ink px-3 py-1.5 text-[10px] leading-none font-bold tracking-[0.16em] text-gold-light uppercase">
            {post.category}
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-6.5 md:px-6.5">
        <span className="text-[13px] text-body">
          {shortDate(post.publishedAt)}
          <span className="px-2">·</span>
          {post.readingMinutes} min read
        </span>
        <span className="text-xl leading-snug font-bold text-heading transition-colors group-hover:text-gold-dark">{post.title}</span>
        <span className="line-clamp-2 text-[15px] leading-relaxed text-body">{post.excerpt}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-1.5 text-sm font-semibold text-heading transition-colors group-hover:text-gold-dark">
          {linkLabel}
          <Icon name="arrow" size={14} />
        </span>
      </span>
    </Link>
  );
}
