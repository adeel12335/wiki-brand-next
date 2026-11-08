import { Button } from "@/components/module/Button";
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

/** Figma: Service Single → "Fees" strip - starting prices + "See Full Pricing". */
export function FeesPanel({ fees, cta }: { fees: Array<{ label: string; value: string; caption: string }>; cta: { label: string; href: string } }) {
  return (
    <div
      className="flex flex-col gap-6 rounded-[20px] border border-gold/30 bg-ink-raised p-6 md:flex-row md:flex-wrap md:items-center md:gap-12 md:px-10 md:py-9"
      data-aos="fade-up"
    >
      {fees.map((f) => (
        <div key={f.value + f.caption} className="flex flex-col gap-1">
          <span className="text-[11px] font-bold tracking-[0.14em] text-on-dark-muted uppercase">{f.label}</span>
          <span className="text-2xl leading-tight font-bold text-gold-light md:text-[32px]">{f.value}</span>
          <span className="text-sm text-on-dark-muted">{f.caption}</span>
        </div>
      ))}
      <Button href={cta.href} variant="gold" arrow className="w-full md:ml-auto md:w-auto">
        {cta.label}
      </Button>
    </div>
  );
}
