import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const cases = [
  {
    slug: "david-bianchi",
    subject: "David Bianchi",
    image: "/assets/portfolio/david-bianchi.jpg",
    focus: ["Source audit", "Source hierarchy", "Disclosed paid editing"],
    angle: "Independent coverage first, then a durable biography structure",
    story:
      "The engagement started with a source audit: which outlets covered the subject independently, how deep that coverage ran, and whether the record could support a durable article. Drafting emphasised source hierarchy — claims entered only when a reliable citation could carry them. Paid editing was disclosed. Volunteer review still decides outcomes; a source-first draft is what gives an article its best chance to survive.",
  },
  {
    slug: "peter-abell",
    subject: "Peter Abell",
    image: "/assets/portfolio/peter-abell.jpg",
    focus: ["Independent verification", "Living-person policy", "Post-publication monitoring"],
    angle: "Proportion, neutrality, and post-publication realism",
    story:
      "Work focused on verifying independent reporting, avoiding résumé padding, and keeping living-person material inside policy. After acceptance, accuracy still depends on new independent reporting — monitoring catches vandalism and contested edits, but nobody can lock a page against the community.",
  },
];

const lessons = [
  {
    icon: "i-search",
    title: "The Sources Decide",
    copy: "Both engagements began with what independent outlets had actually published — and claims entered only when a reliable citation could carry them.",
  },
  {
    icon: "i-shield",
    title: "Neutral, Not Promotional",
    copy: "Proportion over résumé padding, living-person material kept inside policy, and paid editing disclosed on the record.",
  },
  {
    icon: "i-manage",
    title: "Aftercare Is Realistic",
    copy: "Review still decides outcomes, and after acceptance accuracy depends on new reporting — monitoring helps, but no one can lock a page.",
  },
];

const pageMeta = {
  slug: "case-studies",
  title: "Wikipedia Case Studies — Source-First Engagements",
  shortTitle: "Case Studies",
  description:
    "Detailed Wikipedia case studies: how source audits, neutral drafting, and paid-editing disclosure shaped real portfolio engagements — without publication guarantees.",
  keywords:
    "wikipedia case study, wikipedia page creation example, wikipedia portfolio case studies",
  modified: "2026-09-07",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function CaseStudiesPage() {
  return (
    <>
      <BodyClass className="page-case-studies" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Case Studies"
        h1="Source-First Wikipedia <span>Case Studies</span>"
        lede="Short narratives from published portfolio work: what we looked for in the sources, how drafting stayed neutral, and why disclosure and aftercare matter. Outcomes are never guaranteed."
        current="Case Studies"
        actions={[
          { label: "View Full Portfolio", href: url("portfolio") },
          { label: "Request Assessment", href: url("contact"), style: "button-outline" },
        ]}
      />

      {/* 1. Cases (white) — alternating feature rows */}
      <section className="section-pad tone-light cs-cases" aria-labelledby="cs-cases-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Published Work</p>
            <h2 id="cs-cases-title">
              What the Process Looked Like <span>on Real Files</span>
            </h2>
          </div>
          <div className="cs-list">
            {cases.map((item, index) => (
              <article
                key={item.slug}
                className={`cs-case reveal${index % 2 ? " cs-case--flip" : ""}`}
              >
                <div className="cs-case-media">
                  <Image
                    src={item.image}
                    alt={item.subject}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                  <span className="cs-case-index" aria-hidden="true">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="portfolio-watermark" aria-hidden="true">
                    The Wikipedia Studio
                  </span>
                </div>
                <div className="cs-case-body">
                  <p className="cs-case-subject">{item.subject}</p>
                  <h3>{item.angle}</h3>
                  <ul className="cs-case-focus" aria-label="Focus areas">
                    {item.focus.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="cs-case-story">{item.story}</p>
                  <Link className="cs-arrow-link" href={url(`portfolio/${item.slug}`)}>
                    Open portfolio page <Icon name="i-arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. What the cases have in common (gold band) */}
      <section className="cs-lessons-band" aria-labelledby="cs-lessons-title">
        <div className="shell reveal">
          <div className="cs-lessons-head">
            <p className="cs-band-label">The Common Thread</p>
            <h2 id="cs-lessons-title">
              What These Cases <span>Have in Common</span>
            </h2>
          </div>
          <ul className="cs-lessons-grid">
            {lessons.map((item) => (
              <li key={item.title}>
                <span className="cs-lesson-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Want This Level of Source Discipline <span>on Your File?</span>"
        copy="Free notability assessment first."
        label="Get Started"
      />
    </>
  );
}
