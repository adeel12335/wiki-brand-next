import { HeroContent, heroBg, type HeroContentProps } from "../HeroContent";
import { StatsStrip, type Stat } from "@/components/module/StatsStrip";
import { cn } from "@/lib/cn";

interface HeroStatsProps extends HeroContentProps {
  stats: Stat[];
}

/** Copy + a stats strip underneath (Our Process hero, About statistics). */
export function HeroStats({ stats, ...content }: HeroStatsProps) {
  return (
    <section className={cn("overflow-hidden", heroBg)}>
      <div className="shell flex flex-col gap-10 py-14 md:gap-14 md:py-24">
        <HeroContent {...content} />
        <div data-aos="fade-up" data-aos-delay="120">
          <StatsStrip stats={stats} tone="dark" />
        </div>
      </div>
    </section>
  );
}
