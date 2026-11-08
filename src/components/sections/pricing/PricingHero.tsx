import { Icon } from "@/components/ui/Icon";
import { heroBg } from "@/components/hero/HeroContent";
import { cn } from "@/lib/cn";

interface PricingHeroProps {
  pill: string;
  title: string;
  highlight: string;
  lede: string;
  checks: string[];
}

/**
 * Figma: Pricing → Hero. Centred text hero with a gold pill above the H1 (instead of the globe eyebrow)
 * and an inline check row. Built locally because HeroWithoutImage always renders the globe Eyebrow.
 */
export function PricingHero({ pill, title, highlight, lede, checks }: PricingHeroProps) {
  return (
    <section className={cn("relative overflow-hidden", heroBg)}>
      <span className="pointer-events-none absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(217_166_59/0.14),transparent_65%)]" />
      <div className="shell relative flex flex-col items-center gap-7 py-16 text-center md:py-26" data-aos="fade-up">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/12 py-2 pr-4 pl-3.5 text-left text-sm font-semibold text-white">
          <Icon name="layers" size={18} className="shrink-0 text-gold" />
          <span className="md:whitespace-pre">{pill}</span>
        </p>
        <h1 className="h1 text-white lg:text-[56px]">
          {title}
          <br />
          <span className="text-gold">{highlight}</span>
        </h1>
        <p className="lede max-w-[780px] text-on-dark">{lede}</p>
        <ul className="flex flex-col items-start gap-4 pt-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-7">
          {checks.map((c) => (
            <li key={c} className="flex items-center gap-2 text-[15px] text-on-dark">
              <Icon name="check-circle" size={18} className="shrink-0 text-gold" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
