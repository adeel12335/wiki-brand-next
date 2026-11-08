import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/module/Button";
import { heroBg } from "@/components/hero/HeroContent";
import { cn } from "@/lib/cn";
import { AssessmentForm } from "./AssessmentForm";

interface ServiceHeroProps {
  icon: IconName;
  counter: string;
  title: string;
  highlight: string;
  lede: string;
  checks: string[];
  actions: Array<{ label: string; href: string }>;
  form: React.ComponentProps<typeof AssessmentForm>;
}

/**
 * Figma: Service Single → Hero. Copy (service counter, 2-line H1, lede, check list, outline buttons) left,
 * free-assessment form card right. Not a shared hero: no shared hero variant carries a form or a check list before the actions.
 */
export function ServiceHero({ icon, counter, title, highlight, lede, checks, actions, form }: ServiceHeroProps) {
  return (
    <section className={cn("overflow-hidden", heroBg)}>
      <div className="shell grid items-center gap-6 pt-12 pb-16 md:py-22 lg:grid-cols-[1fr_520px] lg:gap-15">
        <div className="measure flex flex-col gap-7" data-aos="fade-up">
          <div className="flex items-center gap-2.5">
            <span className="grid size-11 place-items-center rounded-xl border border-gold/40 bg-gold/14 text-gold">
              <Icon name={icon} size={22} />
            </span>
            <span className="text-sm font-semibold text-on-dark-muted">{counter}</span>
          </div>
          <h1 className="h1 text-[30px] text-white lg:text-[46px]">
            {title}
            <br />
            <span className="text-gold">{highlight}</span>
          </h1>
          <p className="lede max-w-[560px] text-on-dark">{lede}</p>
          <ul className="flex flex-col gap-3.5">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-3 text-base text-on-dark">
                <Icon name="check-circle" size={20} className="mt-0.5 shrink-0 text-gold" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3.5 pt-2">
            {actions.map((a) => (
              <Button key={a.href} href={a.href} variant="ghost" arrow>
                {a.label}
              </Button>
            ))}
          </div>
        </div>
        <div data-aos="fade-left">
          <AssessmentForm {...form} />
        </div>
      </div>
    </section>
  );
}
