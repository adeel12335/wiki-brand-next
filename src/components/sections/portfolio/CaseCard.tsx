import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { safeImageSrc } from "@/lib/image";
import { cn } from "@/lib/cn";

export interface CaseCardItem {
  slug: string;
  title: string;
  /** Display category (null when the CMS has none). */
  category: string | null;
  summary: string;
  imageUrl: string | null;
  imageAlt: string;
  /** Detail page, or the live Wikipedia article for items without an indexable detail page. */
  href: string;
  external: boolean;
  live: boolean;
}

interface CaseCardProps {
  item: CaseCardItem;
  labels: { live: string; view: string; external: string; fallbackCategory: string };
  className?: string;
}

/** Figma: PF / Case Card - white card, portrait with "Live on Wikipedia" badge, field, name, role, "View case". */
export function CaseCard({ item, labels, className }: CaseCardProps) {
  const classes = cn(
    "group flex h-full flex-col overflow-hidden rounded-[20px] border border-heading/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-card-hover",
    className,
  );
  const body = (
    <>
      <span className="relative aspect-[280/300] overflow-hidden bg-mist">
        <Image
          src={safeImageSrc(item.imageUrl)}
          alt={item.imageAlt || item.title}
          fill
          sizes="(min-width: 1024px) 282px, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {item.live ? (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] leading-none font-semibold text-heading md:top-3.5 md:left-3.5 md:text-xs">
            <span className="size-1.5 rounded-full bg-[#33b86b] md:size-2" />
            {labels.live}
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col gap-2 p-3.5 pb-4 md:px-5.5 md:pt-5.5 md:pb-6">
        <span className="text-[10px] font-bold tracking-[0.16em] text-gold-dark uppercase">{item.category || labels.fallbackCategory}</span>
        <span className="text-base leading-snug font-bold text-heading transition-colors group-hover:text-gold-dark md:text-xl">{item.title}</span>
        {item.summary ? <span className="line-clamp-3 text-[13px] leading-relaxed text-body md:text-sm">{item.summary}</span> : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[13px] font-semibold text-heading transition-colors group-hover:text-gold-dark md:text-sm">
          {item.external ? labels.external : labels.view}
          <Icon name="arrow" size={14} />
        </span>
      </span>
    </>
  );

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={classes}>
      {body}
    </Link>
  );
}
