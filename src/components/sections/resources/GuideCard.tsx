import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { safeImageSrc } from "@/lib/image";
import type { BlogPost } from "@/types";

type GuidePost = Pick<BlogPost, "slug" | "title" | "excerpt" | "readingMinutes" | "ogImage">;

/**
 * Figma: BL / Article Card (light) - image with ink category chip, read time, title, excerpt, "Read article".
 * Local: the shared BlogCard is the dark-tone variant only.
 */
export function GuideCard({ post, category, readLabel }: { post: GuidePost; category: string; readLabel: string }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-heading/10 bg-white transition-shadow duration-300 hover:shadow-card-hover"
    >
      <span className="relative aspect-[384/232] overflow-hidden">
        <Image
          src={safeImageSrc(post.ogImage)}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3.5 left-3.5 rounded-full bg-ink px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-gold-light uppercase">
          {category}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-3 px-[26px] pt-6 pb-[26px]">
        <span className="text-[13px] text-body">{post.readingMinutes} min read</span>
        <span className="text-xl leading-snug font-bold text-heading transition-colors group-hover:text-gold-dark">{post.title}</span>
        <span className="line-clamp-2 text-[15px] leading-relaxed text-body">{post.excerpt}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-1.5 text-sm font-semibold text-heading transition-colors group-hover:text-gold-dark">
          {readLabel}
          <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
