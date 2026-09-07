import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

const cases = [
  {
    slug: "david-bianchi",
    subject: "David Bianchi",
    angle: "Independent coverage first, then a durable biography structure",
    story:
      "The engagement started with a source audit: which outlets covered the subject independently, how deep that coverage ran, and whether the record could support a durable article. Drafting emphasised source hierarchy — claims entered only when a reliable citation could carry them. Paid editing was disclosed. Volunteer review still decides outcomes; a source-first draft is what gives an article its best chance to survive.",
  },
  {
    slug: "peter-abell",
    subject: "Peter Abell",
    angle: "Proportion, neutrality, and post-publication realism",
    story:
      "Work focused on verifying independent reporting, avoiding résumé padding, and keeping living-person material inside policy. After acceptance, accuracy still depends on new independent reporting — monitoring catches vandalism and contested edits, but nobody can lock a page against the community.",
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
        eyebrow="Case studies"
        h1="Source-first Wikipedia <span>case studies</span>"
        lede="Short narratives from published portfolio work: what we looked for in the sources, how drafting stayed neutral, and why disclosure and aftercare matter. Outcomes are never guaranteed."
        current="Case Studies"
        actions={[
          { label: "View full portfolio", href: url("portfolio") },
          { label: "Request assessment", href: url("contact"), style: "button-outline" },
        ]}
      />

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Published work"
            heading="What the process looked like on real files"
          />
          <div className="card-grid reveal">
            {cases.map((item) => (
              <article key={item.slug} className="service-card">
                <p className="micro-label">{item.subject}</p>
                <h3>{item.angle}</h3>
                <p>{item.story}</p>
                <Link className="text-link" href={url(`portfolio/${item.slug}`)}>
                  Open portfolio page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want this level of source discipline on your file?"
        copy="Free notability assessment first."
        label="Get started"
      />
    </>
  );
}
