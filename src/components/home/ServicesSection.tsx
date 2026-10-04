import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";
import { services } from "@/lib/data";

export function ServicesSection() {
  return (
    <Section tone="surface" id="services" labelledBy="services-title">
      <SectionHeader
        id="services-title"
        eyebrow="Our Services"
        title={
          <>
            Wikipedia Services Built on <span>Reliable Sources</span>
          </>
        }
        description="From the first notability check to long-term monitoring, every service follows Wikipedia's content policies and paid-contribution disclosure rules."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
        {Object.entries(services).map(([slug, service]) => (
          <li key={slug}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover lg:p-7">
              <IconBadge name={service.icon} className="transition-colors group-hover:bg-primary group-hover:text-white" />
              <h3 className="mt-6 font-heading text-lg leading-snug font-bold text-ink lg:text-xl">
                <Link href={url(`services/${slug}`)} className="after:absolute after:inset-0 after:rounded-2xl">
                  {service.name}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.card}</p>
              <span className="type-small mt-6 inline-flex items-center gap-1.5 font-semibold text-primary" aria-hidden="true">
                Learn more
                <Icon name="i-arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={url("services")} variant="secondary">
          View All Services
        </ButtonLink>
        <ButtonLink href={url("hire-wikipedia-writer")}>Hire a Wikipedia Writer</ButtonLink>
      </div>
    </Section>
  );
}
