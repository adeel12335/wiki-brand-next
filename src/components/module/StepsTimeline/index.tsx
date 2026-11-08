import { Fragment } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export interface Step {
  title: string;
  copy: string;
  icon: IconName;
}

/**
 * Figma: O2 / Process Step row (Home "A Simple, Transparent Process").
 * Desktop: horizontal with gold arrows. Mobile: vertical with a dark line on every step (including the last).
 */
export function StepsTimeline({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-3", className)}>
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <li className="group relative flex gap-5 pb-10 lg:w-[240px] lg:flex-col lg:items-center lg:gap-3 lg:pb-0 lg:text-center" data-aos="fade-up" data-aos-delay={i * 80}>
            {/* vertical connector (mobile) */}
            <span className="absolute top-[76px] bottom-0 left-[37px] w-0.5 bg-heading/80 lg:hidden" aria-hidden />
            <span className="relative grid size-[76px] shrink-0 place-items-center rounded-full bg-heading text-gold shadow-[0_8px_18px_rgb(10_26_41/0.18)] transition-all duration-300 group-hover:bg-gold group-hover:text-heading group-hover:shadow-gold">
              <Icon name={step.icon} size={34} />
            </span>
            <span className="flex flex-col gap-2 pt-3 lg:pt-1">
              <span className="text-lg font-bold text-heading transition-colors group-hover:text-gold-dark">
                {i + 1}. {step.title}
              </span>
              <span className="text-[15px] leading-relaxed text-body">{step.copy}</span>
            </span>
          </li>
          {i < steps.length - 1 ? (
            <li aria-hidden className="hidden pt-6 text-gold lg:block">
              <Icon name="arrow" size={28} />
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
