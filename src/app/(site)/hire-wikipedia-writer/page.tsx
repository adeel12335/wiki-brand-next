import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { absUrl, url } from "@/lib/config";
import { team } from "@/lib/data";
import { paymentSteps, pricingTiers } from "@/lib/data/pricing";
import { buildPageMetadata, faqNode, seoId } from "@/lib/seo";

const pageSlug = "hire-wikipedia-writer";

const faqs = [
  {
    q: "Can I hire someone to write my Wikipedia page?",
    a: "Yes — Wikipedia allows paid editing as long as the paid relationship is disclosed under the Wikimedia Terms of Use. What you cannot buy is approval: the subject still has to be notable, meaning independent, reliable sources have covered it in depth. A professional Wikipedia writer checks that first, then drafts a neutral, fully cited article and submits it with disclosure.",
  },
  {
    q: "How much does it cost to hire a Wikipedia writer?",
    a: "Our published packages run from $700 for straightforward subjects to $1,100 for most engagements, $1,800 for complex or previously rejected subjects, and $2,500+ for custom work. The notability assessment is free, and the price is fixed in writing before any work starts.",
  },
  {
    q: "Is it allowed to pay a Wikipedia editor?",
    a: "Paid editing is permitted on Wikipedia when it is declared. Editors must disclose who is paying them, and conflict-of-interest guidance applies. Agencies that hide paid editing put your article at risk of deletion — we disclose every paid contribution on-wiki.",
  },
  {
    q: "Can a Wikipedia writer guarantee my page will be approved?",
    a: "No honest writer can. Volunteer reviewers decide what is published. What a good writer can do is make sure the sourcing is there before drafting, write to Wikipedia's neutrality standard, and handle reviewer feedback — which is what gives an article its best chance.",
  },
  {
    q: "How long does it take to get a Wikipedia page written?",
    a: "Research and drafting usually take three to six weeks. The review queue that follows is controlled by volunteer reviewers and can clear in days or run to several months. We give you a realistic range, not a promise.",
  },
];

const reasons = [
  {
    icon: "i-search",
    title: "Research Before Writing",
    copy: "Your writer starts with a source search and a written notability verdict — so you never pay for a draft the coverage cannot support.",
  },
  {
    icon: "i-write",
    title: "Neutral, Encyclopedic Drafting",
    copy: "Wikipedia's tone, not marketing copy. Every substantive claim is tied to an independent, reliable source.",
  },
  {
    icon: "i-review",
    title: "Independent Review",
    copy: "Every draft gets an independent review pass before submission; Standard tiers and above use a second editor to check each claim against its source.",
  },
  {
    icon: "i-shield",
    title: "Disclosed, Never Covert",
    copy: "Paid contributions are declared on Wikipedia as its terms of use require. No undeclared accounts, ever.",
  },
];

const comparison = [
  {
    label: "Notability checked before you pay",
    diy: "Up to you",
    freelancer: "Often skipped",
    studio: "Free written assessment",
  },
  {
    label: "Paid-editing disclosure",
    diy: "Required if you have a COI",
    freelancer: "Uneven",
    studio: "Always, on-wiki",
  },
  {
    label: "Independent review before submission",
    diy: "None",
    freelancer: "Rarely",
    studio: "On every draft",
  },
  {
    label: "Published, fixed pricing",
    diy: "Free, but slow",
    freelancer: "Varies",
    studio: "From $700, fixed in writing",
  },
  {
    label: "Aftercare once the page is live",
    diy: "Up to you",
    freelancer: "Rarely",
    studio: "Monitoring included",
  },
];

const pageMeta = {
  slug: pageSlug,
  title: "Hire a Wikipedia Writer & Editor",
  shortTitle: "Hire a Wikipedia Writer",
  description:
    "Hire professional Wikipedia writers and editors from Wiki Studio. Free notability check, neutral cited drafting, disclosed submission. Packages from $700.",
  keywords:
    "hire wikipedia writer, hire wikipedia editor, wikipedia writers for hire, wikipedia page writer, professional wikipedia editor, wikipedia page creation service, wikipedia editing services, wikipedia service provider, wiki studio",
  ogImage: "/assets/og/portfolio-author.jpg",
  ogImageAlt: "Hire professional Wikipedia writers and editors — The Wikipedia Studio",
  modified: "2026-10-02",
  schema: [
    {
      "@type": "Service",
      "@id": `${absUrl(pageSlug)}#service`,
      name: "Hire a Wikipedia Writer & Editor",
      serviceType: "Wikipedia writing and editing",
      provider: { "@id": seoId("organization") },
      areaServed: { "@type": "Place", name: "Worldwide" },
      description:
        "Professional Wikipedia writers and editors: notability assessment, independent source research, neutral cited drafting, disclosed submission, and post-publication monitoring.",
      offers: pricingTiers.map((tier) => ({
        "@type": "Offer",
        name: `${tier.name} package`,
        priceSpecification: {
          "@type": "PriceSpecification",
          price: String(tier.price),
          priceCurrency: "USD",
        },
        url: `${absUrl("wikipedia-page-cost")}#${tier.id}`,
      })),
    },
    faqNode(faqs, pageSlug),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function HireWikipediaWriterPage() {
  return (
    <>
      <BodyClass className="page-hire-writer" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Wikipedia Writers for Hire"
        h1="Hire a Wikipedia Writer & Editor Who <span>Checks the Sources First</span>"
        lede="Professional Wikipedia writers and editors from The Wikipedia Studio (Wiki Studio). We confirm notability, draft a neutral, fully cited article, and submit it with paid-contribution disclosure — with a free assessment before you pay anything."
        current="Hire a Wikipedia Writer"
        actions={[
          { label: "Get a Free Assessment", href: url("contact") },
          { label: "See Packages From $700", href: url("wikipedia-page-cost"), style: "button-outline" },
        ]}
      />

      {/* 1. Why hire us (white) */}
      <section className="section-pad tone-light hw-why" aria-labelledby="hw-why-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Why Hire Our Writers</p>
            <h2 id="hw-why-title">
              Wikipedia Writers Who Work Like <span>Wikipedia Editors</span>
            </h2>
            <p className="section-heading-copy">
              Most rejected drafts fail on sourcing and tone, not grammar. Our writers
              are trained on Wikipedia&apos;s own notability, verifiability, and
              neutrality policies.
            </p>
          </div>
          <ul className="hw-reason-grid reveal">
            {reasons.map((item) => (
              <li key={item.title} className="hw-reason">
                <span className="hw-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Who you are hiring (dark) */}
      <section className="section-pad tone-dark hw-team" aria-labelledby="hw-team-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Who You Are Hiring</p>
            <h2 id="hw-team-title">
              A Desk of Specialists, <span>Not One Freelancer</span>
            </h2>
            <p className="section-heading-copy">
              When you hire a Wikipedia writer from us, research, drafting, review, and
              monitoring are handled by people in defined roles.
            </p>
          </div>
          <ul className="hw-team-grid reveal">
            {team.map((member) => (
              <li key={member.role} className="hw-role">
                <span className="hw-icon" aria-hidden="true">
                  <Icon name={member.icon} />
                </span>
                <h3>{member.role}</h3>
                <p className="hw-role-focus">{member.focus}</p>
              </li>
            ))}
          </ul>
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("about-us")}>
              Meet the Team <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DIY vs freelancer vs us (white) */}
      <section className="section-pad tone-light hw-compare" aria-labelledby="hw-compare-title">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Compare Your Options</p>
            <h2 id="hw-compare-title">
              DIY, a Freelancer, or <span>The Wikipedia Studio</span>
            </h2>
          </div>
          <div className="hw-table-wrap reveal">
            <table className="hw-table">
              <caption className="sr-only">
                Comparison of writing a Wikipedia page yourself, hiring a freelancer, and
                hiring The Wikipedia Studio
              </caption>
              <thead>
                <tr>
                  <th scope="col">What matters</th>
                  <th scope="col">DIY</th>
                  <th scope="col">Typical freelancer</th>
                  <th scope="col" className="is-us">The Wikipedia Studio</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td data-label="DIY">{row.diy}</td>
                    <td data-label="Typical freelancer">{row.freelancer}</td>
                    <td data-label="The Wikipedia Studio" className="is-us">
                      <Icon name="i-check" />
                      {row.studio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. How hiring works + pricing (dark) */}
      <section className="section-pad tone-dark hw-how" aria-labelledby="hw-how-title">
        <div className="shell hw-how-grid">
          <div className="reveal">
            <p className="micro-label">How Hiring Works</p>
            <h2 id="hw-how-title">
              From First Message to <span>Live Article</span>
            </h2>
            <ol className="hw-steps">
              {paymentSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="hw-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="hw-prices reveal" data-delay="100">
            <p className="micro-label">Published Packages</p>
            <h3>What It Costs to Hire a Wikipedia Writer</h3>
            <ul>
              {pricingTiers.map((tier) => (
                <li key={tier.id} className={tier.badge ? "is-featured" : undefined}>
                  <span>
                    <strong>{tier.name}</strong>
                    <small>{tier.bestFor}</small>
                  </span>
                  <b>{tier.priceLabel}</b>
                </li>
              ))}
            </ul>
            <Link className="button button-gold button-small" href={url("wikipedia-page-cost")}>
              Compare Every Package <Icon name="i-arrow" />
            </Link>
          </aside>
        </div>
      </section>

      {/* 5. FAQ (white) */}
      <section className="section-pad tone-light hw-faq" aria-labelledby="hw-faq-title">
        <div className="shell faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">Hiring FAQ</p>
            <h2 id="hw-faq-title">
              Before You Hire a <span>Wikipedia Writer</span>
            </h2>
            <p>
              Straight answers on cost, disclosure, approval, and timelines — the things
              to ask any Wikipedia writer before you pay.
            </p>
            <Link className="button button-gold button-small" href={url("how-to-choose-wikipedia-agency")}>
              How to Choose an Agency <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="faq-wide reveal">
            <FaqList items={faqs} wide />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Ready to Hire a Wikipedia Writer <span>the Right Way?</span>"
        copy="Start with a free notability assessment. If the coverage is not there yet, we will tell you before you pay for a draft."
        label="Get a Free Assessment"
      />
    </>
  );
}
