import type { Metadata } from "next";
import Image from "next/image";
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
import { SITE_FACTS } from "@/lib/data/facts";
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

const pillars = [
  {
    icon: "i-globe",
    title: "Our Mission",
    copy: "To give every notable subject an accurate, neutral, well-sourced Wikipedia article — and to say so honestly when the sources are not there yet.",
  },
  {
    icon: "i-network",
    title: "Our Vision",
    copy: "A Wikipedia presence clients never have to worry about: compliant on day one, maintained over time, and trusted by readers and editors alike.",
  },
  {
    icon: "i-shield",
    title: "Our Promise",
    copy: "No fake guarantees, no undisclosed editing, and no shortcuts that put your article at risk of tagging or deletion.",
  },
];

const introFacts = [
  { value: SITE_FACTS.yearsEditorial, label: "Years of editorial work" },
  { value: SITE_FACTS.specialists, label: "Wikipedia specialists" },
  { value: SITE_FACTS.industries, label: "Industries served" },
  { value: "Global", label: "Remote-first, worldwide" },
];

const inclusions = [
  {
    icon: "i-search",
    title: "Free Notability Assessment",
    copy: "A written verdict on whether independent coverage supports an article — before any fee is agreed.",
  },
  {
    icon: "i-research",
    title: "Graded Source Dossier",
    copy: "Every usable reference graded for independence, reliability, and depth, and mapped to the claims it supports.",
  },
  {
    icon: "i-write",
    title: "Neutral, Cited Drafting",
    copy: "Encyclopedic prose in Wikipedia's own tone, with every substantive statement tied to a reliable source.",
  },
  {
    icon: "i-review",
    title: "Dual Editorial Review",
    copy: "A second editor checks each claim against its citation before anything is submitted for review.",
  },
  {
    icon: "i-shield",
    title: "Disclosed Submission",
    copy: "Paid-contribution disclosure on-wiki, as Wikipedia's terms of use require — never an undeclared account.",
  },
  {
    icon: "i-manage",
    title: "Post-Publication Care",
    copy: "Monitoring through the early, unstable period, with clear updates whenever meaningful edits arrive.",
  },
];

const principles = [
  {
    icon: "i-shield",
    title: "Verifiability Over Persuasion",
    copy: "Every substantive statement is tied to an independent, reliable source. If a claim cannot be verified, it does not appear in the article.",
  },
  {
    icon: "i-users",
    title: "Disclosure Over Discretion",
    copy: "Paid editing is permitted on Wikipedia when it is declared. We declare it, on the record, rather than editing covertly.",
  },
  {
    icon: "i-search",
    title: "Research Before Writing",
    copy: "Source discovery comes first. The available coverage decides what the article can say — not a brief, and not a wish list.",
  },
  {
    icon: "i-check",
    title: "Honesty About Outcomes",
    copy: "No guarantees of approval, no invented notability. You get a clear assessment of what is achievable before anything is commissioned.",
  },
];

const audiences = [
  {
    icon: "i-users",
    title: "Individuals",
    image: "/assets/portfolio-public-figure.jpg",
    copy: "Authors, academics, executives, founders, artists, and public figures with a documented record in independent media.",
  },
  {
    icon: "i-building",
    title: "Businesses",
    image: "/assets/portfolio-business-leader.jpg",
    copy: "Companies whose history, products, and milestones have been covered by independent business and trade press.",
  },
  {
    icon: "i-globe",
    title: "Organisations",
    image: "/assets/portfolio-organisation.jpg",
    copy: "Non-profits, institutions, and associations that need an accurate, neutral public record of what they do.",
  },
];

const standards = [
  {
    index: "01",
    title: "Dual Editorial Review",
    copy: "Every draft passes through two editors. The first researches and writes; the second checks each claim against the source cited for it, with no involvement in the drafting.",
  },
  {
    index: "02",
    title: "Source Grading First",
    copy: "Sources are graded before anything is written, on independence, reliability, and depth of coverage. We record which source supports which statement.",
  },
  {
    index: "03",
    title: "Full Disclosure",
    copy: "Paid contributions are disclosed on Wikipedia as its terms of use require. We do not operate undeclared accounts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BodyClass className="page-about-us" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="About The Wikipedia Studio"
        h1="A Wikipedia Editorial Agency Where <span>Excellence</span> Meets Global Standards."
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


      <section className="section-pad tone-light ab-intro" aria-labelledby="about-intro-title">
        <div className="shell">
          <div className="ab-intro-grid">
            <div className="ab-intro-copy reveal">
              <p className="micro-label">About Us</p>
              <h2 id="about-intro-title">
                Who We Are and <span>Why We Exist</span>
              </h2>
              <p className="ab-intro-lead">
                The Wikipedia Studio is an independent editorial agency that helps
                people, companies, and institutions earn an accurate presence on
                Wikipedia — the reference that search engines, journalists, and AI
                assistants turn to first.
              </p>
              <p>
                We were built around one observation: most Wikipedia drafts fail not
                because of bad writing, but because nobody checked whether the sources
                were there. So we research first, tell clients plainly what the
                coverage supports, and only then write — neutrally, with every claim
                cited and every paid contribution disclosed.
              </p>
              <p>
                Our specialists work remote-first with clients worldwide, across
                academia, publishing, business, technology, the arts, and the
                non-profit sector.
              </p>
              <Link className="text-link" href={url("contact")}>
                Start with a free notability assessment <Icon name="i-arrow" />
              </Link>
            </div>

            <ul className="ab-pillars reveal" data-delay="100">
              {pillars.map((item) => (
                <li key={item.title} className="ab-pillar">
                  <span className="ab-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="ab-intro-facts reveal">
            {introFacts.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      <section className="section-pad tone-light ab-principles">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Principles"
            heading="Four Commitments We Do Not <span>Trade Away</span>"
            copy="The rules every engagement runs on — whoever the client is and whatever the brief says."
          />
          <div className="ab-principle-grid reveal">
            {principles.map((item, index) => (
              <article key={item.title} className="ab-principle">
                <span className="ab-card-top">
                  <span className="ab-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <span className="ab-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad tone-dark ab-includes" aria-labelledby="ab-includes-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Every Engagement</p>
            <h2 id="ab-includes-title">
              What Every Engagement <span>Includes</span>
            </h2>
            <p className="section-heading-copy">
              At The Wikipedia Studio, every client gets the same safeguards —
              whatever the subject, and whichever package applies.
            </p>
          </div>

          <ul className="ab-includes-grid reveal">
            {inclusions.map((item) => (
              <li key={item.title} className="ab-include">
                <span className="ab-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad tone-light ab-standards">
        <div className="shell">
          <SectionHeading
            eyebrow="Editorial Standards"
            heading="How Our Work Is <span>Checked</span>"
            copy="Three checks that keep every draft accurate, sourced, and disclosed — before it ever reaches Wikipedia."
          />
          <ol className="ab-standards-grid reveal">
            {standards.map((item) => (
              <li key={item.title} className="ab-standard">
                <span className="ab-standard-index" aria-hidden="true">
                  {item.index}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
          <div className="section-actions reveal">
            <Link className="button button-gold button-small" href={url("our-process")}>
              See The Full Process <Icon name="i-arrow" />
            </Link>
          </div>

          <aside className="ab-independence reveal" aria-labelledby="independence-title">
            <span className="ab-icon" aria-hidden="true">
              <Icon name="i-shield" />
            </span>
            <div>
              <p className="micro-label">Independence</p>
              <h2 id="independence-title">Not Affiliated With Wikipedia</h2>
              <p>
                The Wikipedia Studio is an independent editorial service and is not
                affiliated with Wikipedia or the Wikimedia Foundation. Figures shown on
                this site (as of September 2026) describe our editorial capacity and
                working standards — not guaranteed publication outcomes.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad tone-dark ab-team" id="editorial-team">
        <div className="shell">
          <SectionHeading
            eyebrow="Editorial Team"
            heading="Roles That Own the Work — <span>Not Anonymous ‘Writers’</span>"
            copy="We publish the desk structure behind assessments and drafts. Named personal bios are added when individuals choose to be listed; until then you still know who does what, and that paid work is disclosed."
          />
          <div className="ab-team-grid reveal">
            {team.map((member) => (
              <article key={member.role} className="ab-team-card">
                <header className="ab-team-head">
                  <span className="ab-icon" aria-hidden="true">
                    <Icon name={member.icon} />
                  </span>
                  <span>
                    <h3>{member.name ?? member.role}</h3>
                    {member.name ? (
                      <span className="team-role-label">{member.role}</span>
                    ) : null}
                  </span>
                </header>
                <p className="ab-team-focus">{member.focus}</p>
                <p className="ab-team-bio">{member.bio}</p>
                {member.linkedIn || member.wikipediaUserPage ? (
                  <p className="team-links">
                    {member.linkedIn ? (
                      <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    ) : null}
                    {member.wikipediaUserPage ? (
                      <a
                        href={member.wikipediaUserPage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Wikipedia user page
                      </a>
                    ) : null}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
          <p className="ab-team-note reveal">
            <Icon name="i-users" />
            <span>
              Want a named editor on record for your engagement? Ask at enquiry —
              disclosure still happens on-wiki either way.
            </span>
          </p>
        </div>
      </section>

      <section className="ab-team-band" aria-labelledby="ab-team-band-title">
        <div className="shell ab-team-band-inner reveal">
          <p className="ab-panel-label">Our Team</p>
          <h2 id="ab-team-band-title">
            A Team Shaped by <span>Editorial Standards</span>
          </h2>
          <p>
            Our researchers and editors work inside Wikipedia&apos;s own policies —
            notability, verifiability, and neutral point of view — giving us a
            firsthand understanding of what survives review, and what gets tagged or
            deleted.
          </p>
          <Link className="ab-pill" href={url("contact")}>
            Talk To Our Team <Icon name="i-arrow" />
          </Link>
        </div>
      </section>

      <section className="section-pad tone-light ab-audience">
        <div className="shell">
          <SectionHeading
            eyebrow="Who We Work With"
            heading="Individuals, Businesses, and <span>Institutions</span>"
            copy="What they share is independent coverage — the one thing Wikipedia asks for before anything else."
          />
          <div className="ab-audience-grid reveal">
            {audiences.map((item) => (
              <article key={item.title} className="ab-audience-card">
                <div className="ab-audience-media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  <span className="ab-icon ab-audience-icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                </div>
                <div className="ab-audience-body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <section className="section-pad tone-light ab-next" aria-labelledby="ab-next-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Next Steps</p>
            <h2 id="ab-next-title">
              Explore Before You <span>Enquire</span>
            </h2>
            <p className="section-heading-copy">
              Two free ways to find out where your subject stands before you talk to
              anyone.
            </p>
          </div>
          <div className="ab-duo">
            <article className="ab-duo-card ab-duo-card--gold reveal">
              <p className="ab-panel-label">Free Tool</p>
              <h2>
                Check Your <span>Notability</span>
              </h2>
              <p>
                Answer a few questions about the coverage you already have and see
                whether a Wikipedia article is realistic — before you spend anything.
              </p>
              <Link className="ab-pill" href={url("wikipedia-notability-checker")}>
                Learn More <Icon name="i-arrow" />
              </Link>
            </article>
            <article className="ab-duo-card ab-duo-card--slate reveal" data-delay="100">
              <p className="ab-panel-label">Wikipedia 101</p>
              <h2>
                What Makes a Subject <span>Notable?</span>
              </h2>
              <p>
                Wikipedia looks for significant coverage in reliable sources that are
                independent of the subject — not followers, fame, or advertising. Our
                guides explain what counts and what does not.
              </p>
              <Link className="ab-pill" href={url("resources")}>
                Learn More <Icon name="i-arrow" />
              </Link>
            </article>
          </div>
        </div>
      </section>


      <CtaBand />
    </>
  );
}
