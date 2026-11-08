import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  linkLabel?: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Figma: O2 / Service Tile - Tone (Light / Dark) × State (Default / Hover). */
export function ServiceCard({ title, description, href, icon, linkLabel = "Learn More", tone = "light", className }: ServiceCardProps) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col items-start gap-3.5 rounded-card border px-6 pt-9 pb-8 transition-all duration-300 hover:-translate-y-1",
        dark
          ? "border-white/10 bg-ink-raised hover:border-gold hover:shadow-[0_10px_28px_rgb(217_166_59/0.22)]"
          : "border-heading/10 bg-white shadow-card hover:border-gold hover:shadow-card-hover",
        className,
      )}
    >
      <span
        className={cn(
          "mb-2 grid size-[76px] place-items-center rounded-full transition-colors duration-300",
          dark ? "border-[1.5px] border-transparent bg-gold/12 text-gold group-hover:border-gold group-hover:bg-ink" : "bg-gold/12 text-gold group-hover:bg-heading",
        )}
      >
        <Icon name={icon} size={34} />
      </span>
      <h3 className={cn("text-xl font-bold md:text-[22px]", dark ? "text-white" : "text-heading")}>{title}</h3>
      <p className={cn("text-[15px] leading-relaxed", dark ? "text-on-dark-muted" : "text-body")}>{description}</p>
      <span className={cn("mt-auto inline-flex items-center gap-2 pt-1.5 text-sm font-semibold", dark ? "text-gold-eyebrow" : "text-gold-dark")}>
        {linkLabel}
        <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
