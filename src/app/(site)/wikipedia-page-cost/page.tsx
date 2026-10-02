import type { Metadata } from "next";
import Link from "next/link";
import { BodyClass } from "@/components/layout/BodyClass";
import { PricingTrackLink } from "@/components/pricing/PricingTrackLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { absUrl, url } from "@/lib/config";
import {
  comparisonRows,
  costDrivers,
  notIncluded,
  paymentSteps,
  pricingAddOns,
  pricingFaqs,
  pricingTiers,
} from "@/lib/data/pricing";
import { buildPageMetadata, faqNode, productOfferNode, seoId } from "@/lib/seo";

const pageSlug = "wikipedia-page-cost";
const pageUrl = absUrl(pageSlug);

const offerNodes = pricingTiers.map((tier) => ({
  "@type": "Offer",
  name: tier.name,
  description: `${tier.bestFor}. ${tier.features.sources}. ${tier.features.editors}. ${tier.features.monitoring} monitoring.`,
  priceSpecification: {
    "@type": "PriceSpecification",
    price: String(tier.price),
    priceCurrency: "USD",
    valueAddedTaxIncluded: false,
  },
  availability: "https://schema.org/InStock",
  url: `${pageUrl}#${tier.id}`,
}));

const productNodes = pricingTiers.map((tier) =>
  productOfferNode({
    slug: pageSlug,
    name: `${tier.name} Wikipedia page package`,
    description: `${tier.bestFor}. ${tier.blurb}`,
    price: tier.price,
    url: `${pageUrl}#${tier.id}`,
  }),
);

const pageMeta = {
  slug: pageSlug,
  title: "Wikipedia Page Cost 2026: Packages from $700",
  shortTitle: "Pricing",
  breadcrumbName: "Pricing",
  description:
    "Wikipedia page cost: four published tiers from $700 to $2,500+. What drives the price, what's included, and a free notability assessment before you pay.",
  keywords:
    "wikipedia page creation cost, wikipedia page cost, how much does a wikipedia page cost, wikipedia page price, wikipedia editing cost, wikipedia agency pricing",
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "Wikipedia page cost and pricing packages from The Wikipedia Studio",
  modified: "2026-09-07",
  schema: [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Wikipedia Page Creation",
      serviceType: "Wikipedia page creation and editing",
      provider: { "@id": seoId("organization") },
      areaServed: { "@type": "Place", name: "Worldwide" },
      description:
        "Guideline-compliant Wikipedia page creation with notability assessment, independent source research, neutral drafting, disclosed submission and post-publication monitoring.",
      offers: offerNodes,
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}#management`,
      name: "Ongoing Wikipedia Page Management",
      provider: { "@id": seoId("organization") },
      description:
        "Watchlist monitoring, incoming-edit assessment, milestone updates, dead-link repair and quarterly reporting.",
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "250",
          priceCurrency: "USD",
          unitCode: "MON",
          billingIncrement: 1,
        },
      },
    },
    ...productNodes,
    faqNode([...pricingFaqs], pageSlug),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function WikipediaPageCostPage() {
  return (
    <>
      <BodyClass className="page-pricing" />
      <JsonLd page={pageMeta} />
      <PageHero
        eyebrow="Pricing"
        h1="What a Wikipedia Page Costs — and What Actually <span>Drives the Price</span>"
        lede="Professional Wikipedia page creation typically costs between $700 and $2,500+, depending on how much independent coverage exists about the subject and how much verification that coverage demands. Our published tiers run from $700 for straightforward subjects, $1,100 for most engagements, and $1,800 for complex or previously rejected ones — with Custom work from $2,500+. Every engagement begins with a free notability assessment."
        current="Pricing"
        actions={[
          {
            label: "Request a free notability assessment",
            href: url("contact"),
          },
          {
            label: "See what's included",
            href: `${url(pageSlug)}#packages`,
            style: "button-outline",
          },
        ]}
        image="/assets/og/reference-dark.jpg"
        imageWidth={1200}
        imageHeight={630}
        visualClass="page-hero-visual--archive"
      />

      {/* 1. Packages + comparison (white) */}
      <section
        className="section-pad tone-light pc-packages"
        id="packages"
        aria-labelledby="packages-heading"
      >
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Our Packages</p>
            <h2 id="packages-heading">
              Published Tiers, <span>Fixed After Assessment</span>
            </h2>
            <p className="section-heading-copy">
              Every engagement starts from one of these published tiers. Which one
              applies depends on how much source material exists and how much
              verification it demands — decided by the notability assessment, not by
              guesswork.
            </p>
          </div>

          <div className="pc-tier-grid reveal">
            {pricingTiers.map((tier) => (
              <article
                key={tier.id}
                id={tier.id}
                className={`pc-tier${tier.badge ? " is-featured" : ""}`}
              >
                {tier.badge ? <span className="pc-tier-badge">{tier.badge}</span> : null}
                <p className="pc-tier-name">{tier.name}</p>
                <p className="pc-tier-price">{tier.priceLabel}</p>
                <p className="pc-tier-blurb">{tier.blurb}</p>
                <p className="pc-tier-best">
                  <strong>Best for:</strong> {tier.bestFor}
                </p>
                <ul className="pc-tier-list">
                  <li>
                    <Icon name="i-check" />
                    {tier.features.sources}
                  </li>
                  <li>
                    <Icon name="i-check" />
                    {tier.features.editors}
                  </li>
                  <li>
                    <Icon name="i-check" />
                    {tier.features.monitoring} monitoring
                  </li>
                  <li>
                    <Icon name="i-check" />
                    {tier.features.revisions}
                  </li>
                </ul>
                <PricingTrackLink
                  className={`button button-small ${tier.badge ? "button-gold" : "button-outline"}`}
                  href={url("contact")}
                  event="pricing_tier_click"
                  tier={tier.name}
                >
                  Start with assessment <Icon name="i-arrow" />
                </PricingTrackLink>
              </article>
            ))}
          </div>

          <div className="pc-compare reveal" data-delay="80">
            <h3 className="pc-compare-title">Compare Every Package</h3>
            <div className="pricing-table-wrap">
              <table className="pricing-table pricing-table--compare">
                <caption className="sr-only">
                  Full package comparison for Essential, Standard, Comprehensive and Custom
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Included</th>
                    {pricingTiers.map((tier) => (
                      <th key={tier.id} scope="col">
                        {tier.name}
                        <span className="pricing-th-price">{tier.priceLabel}</span>
                        {tier.badge ? (
                          <span className="pricing-th-badge">{tier.badge}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.label}-${pricingTiers[index].id}`}
                          data-label={`${pricingTiers[index].name} · ${pricingTiers[index].priceLabel}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why the price varies + payment terms (dark) */}
      <section className="section-pad tone-dark pc-why" aria-labelledby="why-price-varies">
        <div className="shell pc-why-grid">
          <div className="pc-why-copy reveal">
            <p className="micro-label">Why It Varies</p>
            <h2 id="why-price-varies">
              Why the Price <span>Varies at All</span>
            </h2>
            <p>
              Pricing a Wikipedia article by word count makes no sense, because the
              writing is the small part. Roughly two thirds of the work happens before
              a single sentence is drafted, in the search for significant coverage
              published by sources independent of the subject.
            </p>
            <p>
              A founder with fifteen years of scattered trade-press mentions takes far
              longer to source properly than a subject with three strong national
              profiles — even though the finished articles look similar in length. That
              research burden is what the tiers reflect.
            </p>
            <p>
              The assessment tells us which tier applies. The figure is then fixed in
              writing before any work is commissioned.
            </p>
            <Link className="pc-arrow-link" href={url("our-process")}>
              See how the editorial process runs <Icon name="i-arrow" />
            </Link>
          </div>
          <aside className="pc-terms reveal" data-delay="100">
            <span className="pc-icon" aria-hidden="true">
              <Icon name="i-plan" />
            </span>
            <h3>Payment Terms</h3>
            <ul>
              <li>
                <Icon name="i-check" />
                Notability assessment: free, no commitment
              </li>
              <li>
                <Icon name="i-check" />
                50% at engagement start, 50% on draft submission
              </li>
              <li>
                <Icon name="i-check" />
                Quote fixed in writing after scope is agreed
              </li>
              <li>
                <Icon name="i-check" />
                No charge for approval — approval is not sold
              </li>
            </ul>
            <p>
              Priced in USD. Billed in your local currency at the prevailing rate when
              needed.
            </p>
          </aside>
        </div>
      </section>

      {/* 3. Cost drivers (white) */}
      <section className="section-pad tone-light pc-drivers" aria-labelledby="cost-drivers">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Cost Drivers</p>
            <h2 id="cost-drivers">
              What Drives the Cost <span>Up or Down</span>
            </h2>
          </div>
          <div className="pricing-table-wrap reveal">
            <table className="pricing-table pc-drivers-table">
              <caption className="sr-only">
                Factors that push Wikipedia page creation cost down or up
              </caption>
              <thead>
                <tr>
                  <th scope="col">Factor</th>
                  <th scope="col">Pushes cost down</th>
                  <th scope="col">Pushes cost up</th>
                </tr>
              </thead>
              <tbody>
                {costDrivers.map((row) => (
                  <tr key={row.factor}>
                    <th scope="row">{row.factor}</th>
                    <td data-label="Pushes cost down">{row.down}</td>
                    <td data-label="Pushes cost up">{row.up}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Add-ons (dark) */}
      <section className="section-pad tone-dark pc-addons" aria-labelledby="addons-heading">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Add-ons</p>
            <h2 id="addons-heading">
              Optional Work Beyond <span>the Package</span>
            </h2>
          </div>
          <ul className="pc-addon-grid reveal">
            {pricingAddOns.map((item) => (
              <li key={item.name} className="pc-addon">
                <span className="pc-addon-price">{item.price}</span>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. How money and work line up + cheaper options (white) */}
      <section className="section-pad tone-light pc-money" aria-labelledby="money-work">
        <div className="shell pc-money-grid">
          <div className="reveal">
            <p className="micro-label">How It Lines Up</p>
            <h2 id="money-work">
              How the Money and <span>the Work Line Up</span>
            </h2>
            <ol className="pc-steps">
              {paymentSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="pc-step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="pc-arrow-link" href={url("faq")}>
              More answers in the FAQ <Icon name="i-arrow" />
            </Link>
          </div>
          <aside className="pc-cheaper reveal" data-delay="100">
            <p className="micro-label">Cheaper Options</p>
            <h3>Is a Cheaper Wikipedia Page Worth It?</h3>
            <p>
              Below roughly $500, something is usually being skipped — normally the
              source research, occasionally the disclosure. Both create the same
              outcome: a draft that reads well, fails review, and leaves the subject
              with a rejection on record that makes the next attempt harder.
            </p>
            <p>
              The cheapest genuinely useful thing we offer is the notability
              assessment, and it is free. If the coverage is not there yet, that answer
              saves you the entire budget.
            </p>
            <Link className="pc-arrow-link" href={url("services/wikipedia-page-creation")}>
              Read about page creation <Icon name="i-arrow" />
            </Link>
          </aside>
        </div>
      </section>

      {/* 6. Not included at any price (dark) */}
      <section className="section-pad tone-dark pc-limits" aria-labelledby="not-included-heading">
        <div className="shell">
          <div className="section-heading center reveal">
            <p className="micro-label">Honest Limits</p>
            <h2 id="not-included-heading">
              What Is Not Included <span>at Any Price</span>
            </h2>
          </div>
          <ul className="pc-limit-grid reveal" id="not-included">
            {notIncluded.map((item) => (
              <li key={item.title} className="pc-limit">
                <span className="pc-limit-mark" aria-hidden="true">
                  <Icon name="i-close" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Ongoing management — full-width gold band */}
      <section className="pc-manage-band" aria-labelledby="management-heading">
        <div className="shell pc-manage-grid reveal">
          <div>
            <p className="pc-band-label">After Publication</p>
            <h2 id="management-heading">
              Ongoing Page <span>Management</span>
            </h2>
            <p>
              Publication is not the end. Articles get edited by anyone, milestones go
              stale, and links rot.
            </p>
            <p>
              <strong>$250/month or $2,500/year</strong> covers watchlist monitoring,
              assessment of incoming edits, milestone updates drawn from independent
              sources, dead-link repair, and a quarterly report in plain language
              explaining what changed and why.
            </p>
            <Link className="pc-pill" href={url("services/wikipedia-page-management")}>
              How Ongoing Management Works <Icon name="i-arrow" />
            </Link>
          </div>
          <aside className="pc-manage-card">
            <p className="pc-manage-price">
              $250<span>/month</span>
            </p>
            <p className="pc-manage-alt">or $2,500/year</p>
            <h3>Do You Need a Retainer?</h3>
            <p>
              You need it if the subject is active enough that facts change or the
              article attracts edits. If neither is true, a page can sit stable for
              years without it — and we will say so rather than sell you a retainer.
            </p>
          </aside>
        </div>
      </section>

      {/* 8. Pricing FAQ (white) */}
      <section className="section-pad tone-light pc-faq" aria-labelledby="pricing-faq">
        <div className="shell faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">Pricing FAQ</p>
            <h2 id="pricing-faq">
              Straight Answers on <span>Cost and Payment.</span>
            </h2>
            <p>
              If a quote elsewhere looks dramatically cheaper, ask what proportion of
              the fee covers independent source research before drafting starts.
            </p>
            <PricingTrackLink
              className="button button-gold button-small"
              href={url("contact")}
              event="pricing_cta_click"
            >
              Request a Free Assessment <Icon name="i-arrow" />
            </PricingTrackLink>
          </div>
          <div className="faq-wide reveal">
            <FaqList items={[...pricingFaqs]} wide />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Start With the Assessment, <span>Not the Invoice.</span>"
        copy="Bring the strongest independent coverage you have. We will tell you which tier applies — or that a page is not realistic yet."
        label="Request a free notability assessment"
      />
    </>
  );
}
