import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { ExperiencePanel } from "@/components/sections/ExperiencePanel";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { absUrl, url } from "@/lib/config";
import { team } from "@/lib/data";
import { buildPageMetadata, seoId } from "@/lib/seo";

const pageMeta = {
  slug: "about-us",
  title: "About Our Wikipedia Editorial Agency",
  shortTitle: "About Us",
  description:
    "An editorial agency of Wikipedia specialists, researchers, and strategists working to the platform's own sourcing and neutrality standards.",
  keywords:
    "wikipedia agency, wikipedia editorial team, wikipedia specialists, professional wikipedia editors, about the wikipedia studio, wikipedia consultants",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "About The Wikipedia Studio",
  schema: [
    {
      "@type": "AboutPage",
      "@id": `${absUrl("about-us")}#aboutpage`,
      url: absUrl("about-us"),
      name: "About The Wikipedia Studio",
      mainEntity: { "@id": seoId("organization") },
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function AboutPage() {
  return (
    <>
      <BodyClass className="page-about-us" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="About The Wikipedia Studio"
        h1="A Wikipedia editorial agency where <span>excellence</span> meets global standards."
        lede="We are a team of Wikipedia specialists, researchers, and content strategists dedicated to creating, improving, and managing articles that meet the platform's strict guidelines and deliver real-world credibility."
        current="About Us"
        actions={[
          { label: "Talk To Our Team", href: url("contact") },
          { label: "Our Services", href: url("services"), style: "button-outline" },
        ]}
        image="/assets/about-knowledge-sphere.png"
        imageWidth={1536}
        imageHeight={1536}
        visualClass="page-hero-visual--knowledge"
      />

      <section className="about section-pad">
        <div className="shell about-grid">
          <div className="section-copy reveal">
            <p className="micro-label">How We Work</p>
            <h2>
              Guidelines first, <span>always.</span>
            </h2>
            <p>
              Wikipedia is not a marketing channel, and treating it like one is the
              most common reason articles get rejected, tagged, or deleted. Our work
              starts from the platform&apos;s own rules —{" "}
              <a
                href="https://en.wikipedia.org/wiki/Wikipedia:Notability"
                target="_blank"
                rel="noopener noreferrer"
              >
                notability
              </a>
              ,{" "}
              <a
                href="https://en.wikipedia.org/wiki/Wikipedia:Verifiability"
                target="_blank"
                rel="noopener noreferrer"
              >
                verifiability
              </a>
              , and{" "}
              <a
                href="https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view"
                target="_blank"
                rel="noopener noreferrer"
              >
                neutral point of view
              </a>{" "}
              — and everything else follows from them.
            </p>
            <p>
              That means we sometimes deliver news a client does not want to hear. We
              would rather say so in week one than take a commission for an article
              that cannot survive review.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="i-check" />
                100% guideline-compliant content
              </li>
              <li>
                <Icon name="i-check" />
                In-depth research and verified sourcing
              </li>
              <li>
                <Icon name="i-check" />
                Transparent process and clear communication
              </li>
              <li>
                <Icon name="i-check" />
                Long-term page monitoring and maintenance
              </li>
              <li>
                <Icon name="i-check" />
                Disclosed paid contributions, per Wikipedia&apos;s terms of use
              </li>
            </ul>
            <Link className="button button-gold button-small" href={url("our-process")}>
              See Our Process <Icon name="i-arrow" />
            </Link>
          </div>
          <ExperiencePanel />
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Principles"
            heading="Four commitments we do not trade away"
          />
          <div className="card-grid reveal">
            {[
              {
                icon: "i-shield",
                title: "Verifiability over persuasion",
                copy: "Every substantive statement is tied to an independent, reliable source. If a claim cannot be verified, it does not appear in the article.",
              },
              {
                icon: "i-users",
                title: "Disclosure over discretion",
                copy: "Paid editing is permitted on Wikipedia when it is declared. We declare it, on the record, rather than editing covertly.",
              },
              {
                icon: "i-search",
                title: "Research before writing",
                copy: "Source discovery comes first. The available coverage decides what the article can say — not a brief, and not a wish list.",
              },
              {
                icon: "i-check",
                title: "Honesty about outcomes",
                copy: "No guarantees of approval, no invented notability. You get a clear assessment of what is achievable before anything is commissioned.",
              },
            ].map((item) => (
              <article key={item.title} className="service-card">
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" id="editorial-team">
        <div className="shell">
          <SectionHeading
            eyebrow="Editorial team"
            heading="Roles that own the work — not anonymous ‘writers’"
            copy="We publish the desk structure behind assessments and drafts. Named personal bios are added when individuals choose to be listed; until then you still know who does what, and that paid work is disclosed."
          />
          <div className="card-grid reveal">
            {team.map((member) => (
              <article key={member.role} className="service-card">
                <Icon name={member.icon} />
                <h3>{member.name ?? member.role}</h3>
                {member.name ? (
                  <p className="team-role-label">{member.role}</p>
                ) : null}
                <p className="team-focus">{member.focus}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
          <p className="reviewed-note reveal" style={{ marginTop: 18 }}>
            Want a named editor on record for your engagement? Ask at enquiry —
            disclosure still happens on-wiki either way.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Who We Work With"
            heading="Individuals, businesses, and institutions"
          />
          <div className="card-grid audience-grid reveal">
            {[
              {
                icon: "i-users",
                title: "Individuals",
                copy: "Authors, academics, executives, founders, artists, and public figures with a documented record in independent media.",
              },
              {
                icon: "i-building",
                title: "Businesses",
                copy: "Companies whose history, products, and milestones have been covered by independent business and trade press.",
              },
              {
                icon: "i-globe",
                title: "Organisations",
                copy: "Non-profits, institutions, and associations that need an accurate, neutral public record of what they do.",
              },
            ].map((item) => (
              <article key={item.title} className="service-card">
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad standards-band">
        <div className="shell">
          <SectionHeading
            eyebrow="Editorial Standards"
            heading="How our work is checked"
            copy="Three checks that keep every draft accurate, sourced, and disclosed — before it ever reaches Wikipedia."
          />
          <div className="standards-grid reveal">
            {[
              {
                index: "01",
                icon: "i-review",
                title: "Dual editorial review",
                copy: "Every draft passes through two editors. The first researches and writes; the second checks each claim against the source cited for it, with no involvement in the drafting.",
              },
              {
                index: "02",
                icon: "i-research",
                title: "Source grading first",
                copy: "Sources are graded before anything is written, on independence, reliability, and depth of coverage. We record which source supports which statement.",
              },
              {
                index: "03",
                icon: "i-shield",
                title: "Full disclosure",
                copy: "Paid contributions are disclosed on Wikipedia as its terms of use require. We do not operate undeclared accounts.",
              },
            ].map((item) => (
              <article key={item.title} className="standards-card">
                <span className="standards-index" aria-hidden="true">
                  {item.index}
                </span>
                <Icon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("our-process")}>
              See The Full Process <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <section className="section-pad">
        <div className="shell answer-block reveal">
          <p className="micro-label">Independence</p>
          <h2>Not affiliated with Wikipedia</h2>
          <p>
            The Wikipedia Studio is an independent editorial service and is not
            affiliated with Wikipedia or the Wikimedia Foundation. Figures shown on
            this site (as of September 2026) describe our editorial capacity and
            working standards — not guaranteed publication outcomes.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
