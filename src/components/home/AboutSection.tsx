import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";
import { SITE_FACTS } from "@/lib/data/facts";

const COMMITMENTS = [
  "100% guideline-compliant content",
  "In-depth research and verified sourcing",
  "Transparent process and clear communication",
  "Long-term page monitoring and maintenance",
];

const PROOF = [
  { icon: "i-clock", value: SITE_FACTS.yearsEditorial, label: "Years of editorial work" },
  { icon: "i-research", value: "Source-first", label: "Research before drafting" },
  { icon: "i-users", value: SITE_FACTS.specialists, label: "Wikipedia specialists" },
  { icon: "i-globe", value: "Global", label: `${SITE_FACTS.areaServed} clientele` },
];

export function AboutSection() {
  return (
    <Section tone="white" id="about" labelledBy="about-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader
            id="about-title"
            align="left"
            eyebrow="About The Wikipedia Studio"
            title={
              <>
                Where Editorial <span>Excellence</span> Meets Global Standards
              </>
            }
            description={
              <>
                The Wikipedia Studio — Wiki Studio for short — is a professional Wikipedia service
                provider: a team of Wikipedia specialists, researchers, and content strategists
                dedicated to creating, improving, and managing Wikipedia pages that meet the
                platform&apos;s strict guidelines and deliver real-world results.
              </>
            }
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {COMMITMENTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] font-medium text-ink lg:text-base">
                <Icon name="i-check" className="mt-0.5 size-5 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={url("about-us")} className="mt-10">
            Learn More About Us
          </ButtonLink>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:gap-6">
          {PROOF.map((item, index) => (
            <li
              key={item.label}
              className={`rounded-2xl border border-line bg-surface p-6 lg:p-8 ${index % 2 === 1 ? "sm:translate-y-8" : ""}`}
            >
              <IconBadge name={item.icon} className="bg-white" />
              <p className="mt-6 font-heading text-3xl font-extrabold text-primary">{item.value}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
