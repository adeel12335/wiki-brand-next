import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { PricingTier } from "@/content/pricing";

interface TierCardProps {
  tier: PricingTier;
  fromLabel: string;
  bestForLabel: string;
  cta: { label: string; href: string };
}

/** Figma: PR / Tier Card - light card, or ink "featured" card with gold border + badge. */
export function TierCard({ tier, fromLabel, bestForLabel, cta }: TierCardProps) {
  const dark = Boolean(tier.featured);
  return (
    <article
      id={tier.id}
      className={cn(
        "flex h-full scroll-mt-28 flex-col gap-5 rounded-3xl border px-7 py-8 transition-shadow duration-300",
        dark ? "border-gold bg-ink shadow-[0_18px_44px_rgb(2_12_22/0.28)]" : "border-heading/10 bg-white hover:shadow-card",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn("text-xl font-bold", dark ? "text-white" : "text-heading")}>{tier.name}</h3>
        {tier.badge ? (
          <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-on-gold">{tier.badge}</span>
        ) : null}
      </div>
      <p className={cn("min-h-[44px] text-sm leading-relaxed", dark ? "text-on-dark-muted" : "text-body")}>{tier.blurb}</p>
      <p className="flex items-baseline gap-1.5">
        <span className={cn("text-sm", dark ? "text-on-dark-muted" : "text-body")}>{fromLabel}</span>
        <span className={cn("text-[40px] leading-none font-bold md:text-[44px]", dark ? "text-gold-light" : "text-heading")}>{tier.priceLabel}</span>
      </p>
      <div className={cn("flex flex-col gap-1 rounded-xl p-3.5", dark ? "bg-ink-raised" : "bg-cream")}>
        <span className={cn("text-[10px] font-bold tracking-[0.12em]", dark ? "text-gold-light" : "text-gold-dark")}>{bestForLabel}</span>
        <span className={cn("text-[13px] leading-relaxed", dark ? "text-on-dark" : "text-heading")}>{tier.bestFor}</span>
      </div>
      <Link
        href={cta.href}
        className={cn(
          "group inline-flex h-12 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors",
          dark
            ? "border-gold bg-gold text-on-gold hover:bg-gold-light hover:shadow-gold"
            : "border-heading text-heading hover:border-gold hover:bg-gold hover:text-on-gold",
        )}
      >
        {cta.label}
        <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
      <span className={cn("h-px w-full", dark ? "bg-on-dark/80" : "bg-heading/10")} />
      <ul className="flex flex-col gap-3">
        {tier.features.map((f) => (
          <li key={f} className={cn("flex items-start gap-2.5 text-[13px]", dark ? "text-on-dark" : "text-heading")}>
            <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", dark ? "bg-gold text-on-gold" : "bg-gold/12 text-gold-dark")}>
              <Icon name="tick" size={12} strokeWidth={2.4} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}
