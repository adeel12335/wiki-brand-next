import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, type ButtonVariant } from "@/components/module/Button";
import { cn } from "@/lib/cn";

export interface HeroAction {
  label: string;
  href: string;
  variant?: ButtonVariant;
  arrow?: boolean;
}

export interface HeroContentProps {
  eyebrow?: string;
  /** First H1 line. */
  title: React.ReactNode;
  /** Second H1 line, in gold. */
  highlight?: React.ReactNode;
  lede?: React.ReactNode;
  actions?: HeroAction[];
  align?: "left" | "center";
  /** Extra content under the actions (chips, jump links, search…). */
  children?: React.ReactNode;
  className?: string;
  /** Per-page H1 tweaks where Figma differs from the default 52px Bold (e.g. "lg:text-[46px]"). */
  titleClassName?: string;
}

/** Shared hero copy block: eyebrow, 2-line H1 (2nd line gold), lede, actions. Text measure capped at 900px on desktop. */
export function HeroContent({ eyebrow, title, highlight, lede, actions, align = "left", children, className, titleClassName }: HeroContentProps) {
  const center = align === "center";
  return (
    <div className={cn("measure flex flex-col gap-5 md:gap-6", center && "mx-auto items-center text-center", className)} data-aos="fade-up">
      {eyebrow ? (
        <Eyebrow tone="dark" align={align}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h1 className={cn("h1 text-white", titleClassName)}>
        {title}
        {highlight ? (
          <>
            <br />
            <span className="text-gold">{highlight}</span>
          </>
        ) : null}
      </h1>
      {lede ? <p className="lede max-w-[680px] text-on-dark md:text-xl">{lede}</p> : null}
      {actions?.length ? (
        <div className={cn("flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap", center && "sm:justify-center")}>
          {actions.map((a, i) => (
            <Button key={a.href + a.label} href={a.href} variant={a.variant ?? (i === 0 ? "gold" : "ghost")} arrow={a.arrow ?? true}>
              {a.label}
            </Button>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** Dark gradient used behind every hero (Figma: Hero fill). */
export const heroBg = "bg-[linear-gradient(170deg,#041220_9%,#020c16_99%)]";
