import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { url } from "@/lib/config";
import { buildPageMetadata, faqNode } from "@/lib/seo";

const faqs = [
  {
    q: "Should I choose the cheapest Wikipedia agency?",
    a: "Price alone is a weak signal. Ask what happens if sources are thin, whether paid editing is disclosed, and whether approval is “guaranteed” — guarantees usually mean policy risk.",
  },
  {
    q: "How do I spot a scam Wikipedia service?",
    a: "Red flags include guaranteed publication, undisclosed paid editing, fake reviewer accounts, refusal to show sample sourcing standards, and pressure to pay before a notability screen.",
  },
  {
    q: "What should an honest agency publish?",
    a: "Clear pricing bands, what is not included, disclosure practices, and a willingness to decline weak subjects. Our packages start at $700 after a free assessment.",
  },
];

const checks = [
  {
    title: "Notability before drafting fees",
    copy: "An honest desk screens independent sources first and will tell you when coverage is missing. Paying for prose without a source map is how pages get declined.",
  },
  {
    title: "Paid-contribution disclosure",
    copy: "Wikimedia Terms of Use require disclosure of paid editing. Agencies that hide client relationships create deletion risk for you and ban risk for editors.",
  },
  {
    title: "No approval guarantees",
    copy: "Volunteer reviewers decide. Guarantees and “100% approval” claims are marketing — not how English Wikipedia works.",
  },
  {
    title: "Published pricing and exclusions",
    copy: "Ask what is not included: PR placement, removing criticism, locking pages, or inventing coverage. Transparent desks publish those limits.",
  },
  {
    title: "Named process, not anonymous writers",
    copy: "You should know how research, drafting, and review are separated — and how conflicts of interest are handled on-wiki.",
  },
  {
    title: "Aftercare realism",
    copy: "Monitoring and talk-page engagement matter after publication. Nobody can “lock” a page against community edits.",
  },
];

const pageMeta = {
  slug: "how-to-choose-wikipedia-agency",
  title: "How to Choose a Wikipedia Agency (Without Getting Scammed)",
  shortTitle: "Choose an Agency",
  description:
    "How to choose a Wikipedia page creation agency: red flags, disclosure, pricing honesty, and questions that separate editorial desks from scam operators.",
  keywords:
    "how to choose wikipedia agency, wikipedia page creation scam, wikipedia agency red flags, paid wikipedia editing disclosure",
  modified: "2026-09-07",
  schema: [faqNode(faqs, "how-to-choose-wikipedia-agency")],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ChooseAgencyPage() {
  return (
    <>
      <BodyClass className="page-choose-agency" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Buyer guide"
        h1="How to choose a Wikipedia agency <span>without getting scammed</span>"
        lede="This niche attracts operators who sell guarantees and hide paid editing. Use this checklist to evaluate any desk — including ours — before you pay for a draft."
        current="How to Choose"
        actions={[
          { label: "Free notability checker", href: url("wikipedia-notability-checker") },
          {
            label: "See published pricing",
            href: url("wikipedia-page-cost"),
            style: "button-outline",
          },
        ]}
      />

      <section className="section-pad">
        <div className="shell">
          <SectionHeading
            eyebrow="Checklist"
            heading="Six questions that filter most bad actors"
            copy="If a vendor cannot answer these plainly, walk away."
          />
          <div className="card-grid reveal">
            {checks.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell definition-grid">
          <div>
            <p className="micro-label">Market context</p>
            <h2>Typical price bands (illustrative)</h2>
            <p>
              DIY is free but slow and easy to mishandle. Freelancers often sit
              around $500–$2,000 with uneven disclosure. Agencies commonly charge
              $2,500–$10,000+. Our published tiers run{" "}
              <Link href={url("wikipedia-page-cost")}>$700 to $2,500+</Link> after a
              free notability assessment — we decline when sources are not there.
            </p>
          </div>
          <div>
            <p className="micro-label">Our stance</p>
            <h2>What we will not sell</h2>
            <p>
              Guaranteed acceptance, undisclosed editing, paid positive coverage,
              or removal of well-sourced criticism. See the full exclusions on the{" "}
              <Link href={url("wikipedia-page-cost")}>pricing page</Link> and our{" "}
              <Link href={url("about-us")}>about page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <SectionHeading eyebrow="FAQ" heading="Common buyer questions" />
          <FaqList items={faqs} wide />
        </div>
      </section>

      <CtaBand
        heading="Start with sources, not a sales call"
        copy="Run the free checker or request a human assessment."
        label="Request free assessment"
      />
    </>
  );
}
