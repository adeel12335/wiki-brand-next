import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <Section tone="white" id="process" labelledBy="process-title">
      <SectionHeader
        id="process-title"
        eyebrow="Our Process"
        title={
          <>
            A Proven <span>5-Step</span> Process
          </>
        }
        description="Every engagement follows the same order — evidence first, writing second — so you always know exactly where your article stands."
      />

      <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-6">
        {/* Connector line behind the step numbers (desktop) */}
        <span aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-line lg:block" />
        {processSteps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col lg:items-center lg:text-center">
            <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-card">
              <Icon name={step.icon} className="size-6" />
            </span>
            <p className="type-small mt-5 font-semibold tracking-[0.12em] text-accent uppercase">
              Step {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="type-h4 mt-1">{step.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.card}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <ButtonLink href={url("our-process")} variant="secondary">
          See the Full Process
        </ButtonLink>
      </div>
    </Section>
  );
}
