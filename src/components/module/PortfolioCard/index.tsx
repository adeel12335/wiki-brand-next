import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PublicPortfolioItem } from "@/lib/portfolio";
import { safeImageSrc } from "@/lib/image";
import { cn } from "@/lib/cn";

interface PortfolioCardProps {
  item: Pick<PublicPortfolioItem, "slug" | "title" | "category" | "summary" | "imageUrl" | "imageAlt">;
  linkLabel?: string;
  className?: string;
}

/** Figma: H2 / Case Card (photo card, dark shade, tag + name + role). */
export function PortfolioCard({ item, linkLabel = "View publication", className }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${item.slug}/`}
      className={cn(
        "group relative flex aspect-[282/420] flex-col justify-end gap-2 overflow-hidden rounded-panel border border-white/10 bg-panel p-6",
        "transition-all duration-300 hover:border-gold hover:shadow-[0_18px_40px_rgb(217_166_59/0.25)]",
        className,
      )}
    >
      <Image
        src={safeImageSrc(item.imageUrl)}
        alt={item.imageAlt || item.title}
        fill
        sizes="(min-width: 1024px) 282px, (min-width: 640px) 45vw, 80vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-linear-to-b from-ink/0 from-35% to-ink/92 transition-colors duration-300 group-hover:from-ink/10 group-hover:from-15% group-hover:to-ink/96" />
      <span className="relative self-start rounded-full border border-gold/35 bg-[#091926]/80 px-2.5 py-1 text-[11px] font-bold tracking-[0.16em] text-gold-eyebrow uppercase">
        {item.category || "Published"}
      </span>
      <span className="relative mt-1 text-xl font-bold text-white md:text-[22px]">{item.title}</span>
      {item.summary ? <span className="relative line-clamp-2 text-[15px] text-on-dark-muted">{item.summary}</span> : null}
      <span className="relative inline-flex items-center gap-2 pt-1.5 text-sm font-semibold text-gold-eyebrow">
        {linkLabel}
        <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
