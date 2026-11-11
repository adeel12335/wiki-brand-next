import { cn } from "@/lib/cn";

/** Figma: Service Single → Process "Steps" - numbered gold circles joined by a hairline (dark section). Stacks on mobile. */
export function EngagementSteps({ steps }: { steps: Array<{ title: string; copy: string }> }) {
  return (
    <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className="group flex flex-col gap-4" data-aos="fade-up" data-aos-delay={i * 70}>
          <span className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full border text-[15px] font-bold transition-colors duration-300",
                i === 0
                  ? "border-gold bg-gold text-on-gold"
                  : "border-gold/50 bg-ink-raised text-gold-light group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("h-px flex-1", i < steps.length - 1 ? "bg-gold/35" : "bg-transparent")} aria-hidden />
          </span>
          <span className="text-[17px] font-bold text-white md:text-xl">{step.title}</span>
          <span className="text-[15px] leading-relaxed text-on-dark-muted">{step.copy}</span>
        </li>
      ))}
    </ol>
  );
}

