import { cn } from "@/lib/cn";

export interface Stat {
  label: string;
  value: string;
  caption?: string;
}

/**
 * Figma: Mini stats (Home About) / Statistics (About) / hero stats.
 * `tone="light"` → white cards with gold-deep numbers; `tone="dark"` → ink panel, gold numbers.
 */
export function StatsStrip({ stats, tone = "light", className }: { stats: Stat[]; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <dl
      className={cn(
        "grid overflow-hidden rounded-card border",
        stats.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3",
        dark ? "border-white/10 bg-panel" : "border-heading/10 bg-white",
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn("flex flex-col gap-1 px-4 py-4 md:px-5.5 md:py-4.5", i > 0 && (dark ? "border-l border-white/10" : "border-l border-heading/10"))}
        >
          <dt className={cn("order-1 text-[10px] font-bold tracking-[0.12em] uppercase", dark ? "text-gold-eyebrow" : "text-gold-deep")}>{s.label}</dt>
          <dd className={cn("order-2 text-[26px] leading-tight font-bold md:text-[34px]", dark ? "text-gold" : "text-gold-deep")}>{s.value}</dd>
          {s.caption ? <dd className={cn("order-3 text-xs md:text-[13px]", dark ? "text-on-dark-muted" : "text-body")}>{s.caption}</dd> : null}
        </div>
      ))}
    </dl>
  );
}
