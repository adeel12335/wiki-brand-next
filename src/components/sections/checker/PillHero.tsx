import { HeroContent, heroBg, type HeroContentProps } from "@/components/hero/HeroContent";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface PillHeroProps extends Omit<HeroContentProps, "eyebrow"> {
  /** Optional gold-tinted pill above the H1. */
  pill?: { icon: IconName; label: string };
  /** Optional right-hand panel (copy left, panel right on desktop). */
  side?: React.ReactNode;
}

export function HeroPill({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-gold/12 py-2 pr-4 pl-3.5 text-sm font-semibold text-white">
      <Icon name={icon} size={16} className="shrink-0 text-gold" />
      <span className="whitespace-pre-wrap">{label}</span>
    </span>
  );
}

/**
 * Hero with a pill above the 2-line H1 (Notability Checker, How to Choose an Agency, Resources).
 * Local to these pages: the shared HeroContent has no slot above the heading.
 */
export function PillHero({ pill, side, align = "left", ...content }: PillHeroProps) {
  const center = align === "center" && !side;
  return (
    <section className={cn("relative overflow-hidden", heroBg)}>
      <span className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(217_166_59/0.16),transparent_65%)]" />
      <div
        className={cn(
          "shell relative grid items-center gap-10 py-16 md:py-24",
          !!side && "lg:grid-cols-[1fr_400px] lg:gap-[72px]",
        )}
      >
        <div className={cn("flex flex-col gap-6 md:gap-7", center && "items-center")}>
          {pill ? (
            <div data-aos="fade-up">
              <HeroPill {...pill} />
            </div>
          ) : null}
          <HeroContent {...content} align={center ? "center" : "left"} />
        </div>
        {side ? <div data-aos="fade-left">{side}</div> : null}
      </div>
    </section>
  );
}
