import { HeroContent, heroBg, type HeroContentProps } from "../HeroContent";
import { cn } from "@/lib/cn";

interface HeroSideContentProps extends HeroContentProps {
  /** Right-hand panel: checklist card, pricing summary, persona criteria, etc. */
  side: React.ReactNode;
}

/** Copy left + any side panel right (Services, Persona, Resources, Hire, Pricing heroes). Stacks on mobile. */
export function HeroSideContent({ side, ...content }: HeroSideContentProps) {
  return (
    <section className={cn("overflow-hidden", heroBg)}>
      <div className="shell grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_420px] lg:gap-16">
        <HeroContent {...content} />
        <div data-aos="fade-left">{side}</div>
      </div>
    </section>
  );
}

/** Default side panel style: glass ink card with gold hairline. */
export function HeroSidePanel({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-panel border border-gold/35 bg-[#091926]/80 p-6 md:p-8", className)}>
      {title ? <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-gold-eyebrow uppercase">{title}</p> : null}
      {children}
    </div>
  );
}
