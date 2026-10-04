import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { SITE_FACTS } from "@/lib/data/facts";

const TRUST_POINTS = ["Free notability assessment", "Disclosed paid editing", "No fake guarantees"];

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_85%_10%,var(--color-accent-soft),transparent_70%)]"
      />
      <Container className="relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <p className="type-eyebrow text-accent">The Wikipedia Studio</p>
          <h1 id="hero-title" className="type-h1 mt-4 max-w-2xl">
            Professional Wikipedia Page Creation &amp;{" "}
            <span className="text-primary">Editing Services</span>
          </h1>
          <p className="type-body mt-6 max-w-2xl text-muted">
            Wikipedia page creation is the process of confirming notability from independent
            sources, drafting a neutral cited article, and submitting it with paid-contribution
            disclosure. Roughly two thirds of the work happens before drafting begins — in the
            search for significant coverage.
          </p>
          <p className="type-body mt-4 max-w-2xl text-muted">
            We help individuals, businesses, and organisations build a credible Wikipedia presence
            without fake guarantees or undisclosed editing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={url("contact")}>Request a Free Assessment</ButtonLink>
            <ButtonLink href={url("services")} variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="type-small flex items-center gap-2 font-medium text-ink">
                <Icon name="i-check" className="size-5 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-accent-soft" />
          <Image
            src="/assets/about-knowledge-sphere.png"
            alt="Wikipedia puzzle globe representing encyclopedic, well-sourced knowledge"
            width={1303}
            height={1207}
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="relative h-auto w-full"
          />
          <div className="absolute bottom-[6%] left-0 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
            <p className="font-heading text-2xl font-extrabold text-primary">{SITE_FACTS.yearsEditorial}</p>
            <p className="type-small text-muted">Years of editorial work</p>
          </div>
          <div className="absolute top-[8%] right-0 rounded-2xl border border-line bg-white px-5 py-4 shadow-card">
            <p className="font-heading text-2xl font-extrabold text-primary">{SITE_FACTS.specialists}</p>
            <p className="type-small text-muted">Wikipedia specialists</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
