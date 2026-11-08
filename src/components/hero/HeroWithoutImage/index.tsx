import { HeroContent, heroBg, type HeroContentProps } from "../HeroContent";
import { cn } from "@/lib/cn";

/** Compact text hero (Privacy / Terms, Sitemap, FAQ with "Jump to" links via children). */
export function HeroWithoutImage(props: HeroContentProps) {
  return (
    <section className={cn("relative overflow-hidden", heroBg)}>
      <span className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(217_166_59/0.16),transparent_65%)]" />
      <div className="shell relative py-14 md:py-24">
        <HeroContent {...props} />
      </div>
    </section>
  );
}
