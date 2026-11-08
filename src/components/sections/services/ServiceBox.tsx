import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface ServiceBoxProps {
  number: string;
  icon: IconName;
  title: string;
  copy: string;
  href: string;
  linkLabel: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Figma: S2 / Service Box - numbered visual tile, title, copy, underlined link row. Light (Services grid) / Dark (Where to Start). */
export function ServiceBox({ number, icon, title, copy, href, linkLabel, tone = "light", className }: ServiceBoxProps) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col gap-5 rounded-md border p-5 pb-6 transition-[border-color,box-shadow] duration-300",
        dark ? "border-white/8 bg-panel hover:border-gold/60" : "border-transparent bg-white hover:border-gold/50 hover:shadow-card",
        className,
      )}
    >
      <span className={cn("relative grid h-[150px] place-items-center rounded", dark ? "bg-ink-raised" : "bg-mist")}>
        <span className="absolute top-3 left-3.5 text-[11px] font-bold text-gold-dark">{number}</span>
        <span
          className={cn(
            "grid size-[68px] place-items-center rounded-2xl transition-colors duration-300",
            dark ? "bg-gold/12 text-gold group-hover:bg-gold group-hover:text-on-gold" : "bg-heading text-gold group-hover:bg-gold group-hover:text-heading",
          )}
        >
          <Icon name={icon} size={32} />
        </span>
      </span>
      <span className="flex flex-col gap-2.5">
        <span className={cn("text-xl leading-snug font-bold md:text-[22px]", dark ? "text-white" : "text-heading")}>{title}</span>
        <span className={cn("text-[15px] leading-relaxed", dark ? "text-on-dark-muted" : "text-body")}>{copy}</span>
      </span>
      <span className="mt-auto flex flex-col gap-3 pt-1">
        <span
          className={cn(
            "flex items-center justify-between gap-3 text-base font-bold transition-colors md:text-lg",
            dark ? "text-white group-hover:text-gold-eyebrow" : "text-heading group-hover:text-gold-dark",
          )}
        >
          {linkLabel}
          <Icon name="arrow" size={22} />
        </span>
        <span className={cn("h-0.5 w-full transition-colors", dark ? "bg-white/9 group-hover:bg-gold" : "bg-heading group-hover:bg-gold")} />
      </span>
    </Link>
  );
}
