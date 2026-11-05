import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { TrustpilotStars } from "@/components/trustpilot/TrustpilotRating";
import { SITE_PHONE, SITE_PHONE_RAW, url } from "@/lib/config";
import { AUDIENCE_LINKS, CASE_STUDIES_LINK } from "@/lib/data/audience-links";
import { pricingTiers } from "@/lib/data/pricing";
import type { TrustpilotSummary } from "@/lib/trustpilot";

/* Hero trust row ---------------------------------------------------------- */

export function HomeTrustRow({
  summary,
  reviewUrl,
}: {
  summary: TrustpilotSummary | null;
  reviewUrl: string;
}) {
  const badges = [
    { icon: "i-shield", label: "Disclosed paid editing" },
    { icon: "i-search", label: "Free notability assessment" },
    { icon: "i-check", label: `Published pricing from $${pricingTiers[0].price}` },
  ];

  return (
    <ul className="hx-trust" aria-label="Why clients trust us">
      {summary ? (
        <li className="hx-trust-tp">
          <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
            <TrustpilotStars stars={summary.stars} />
            <span>
              <b>{summary.trustScore.toFixed(1)}</b> on Trustpilot
            </span>
          </a>
        </li>
      ) : null}
      {badges.map((badge) => (
        <li key={badge.label}>
          <Icon name={badge.icon} />
          {badge.label}
        </li>
      ))}
    </ul>
  );
}

/* What we do / what we won't --------------------------------------------- */

const WE_DO = [
  "Assess notability against independent sources before any draft",
  "Map every claim to a citation and run a second-editor check",
  "Declare the paid relationship under Wikimedia's Terms of Use",
  "Support the review, handle revisions and monitor the live page",
];

const WE_WONT = [
  "Promise approval, ranking or a Google knowledge panel",
  "Edit through sockpuppets or without disclosure",
  "Write promotional copy the sources cannot support",
  "Take your money for drafting when the coverage is not there",
];

export function HomeHonesty() {
  return (
    <section className="section-pad tone-light hx-honesty" aria-labelledby="hx-honesty-title">
      <div className="shell">
        <div className="hx-head reveal">
          <p className="micro-label">Our approach</p>
          <h2 id="hx-honesty-title">
            Wikipedia page creation, <span>done by the rules</span>
          </h2>
          <p>
            The encyclopedia only records what{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources"
              target="_blank"
              rel="noopener noreferrer"
            >
              reliable, independent sources
            </a>{" "}
            have already published. Our job is to find that coverage, judge it against{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wikipedia:Notability"
              target="_blank"
              rel="noopener noreferrer"
            >
              notability
            </a>
            , and write a neutral article those sources can support.
          </p>
        </div>

        <div className="hx-compare reveal">
          <div className="hx-compare-card hx-compare-card--do">
            <h3>
              <span className="hx-compare-icon">
                <Icon name="i-check" />
              </span>
              What we do
            </h3>
            <ul>
              {WE_DO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hx-compare-card hx-compare-card--dont">
            <h3>
              <span className="hx-compare-icon">
                <Icon name="i-close" />
              </span>
              What we won&apos;t do
            </h3>
            <ul>
              {WE_WONT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Mid-page CTA strip ------------------------------------------------------ */

export function HomeCtaStrip() {
  return (
    <section className="hx-strip" aria-label="Free notability assessment">
      <div className="shell hx-strip-inner">
        <div>
          <h2>Not sure your subject qualifies?</h2>
          <p>Send us the coverage you have. We reply with a written verdict before any work is commissioned.</p>
        </div>
        <div className="hx-strip-actions">
          <Link className="hx-btn hx-btn--dark" href={url("contact")}>
            Request a free assessment <Icon name="i-arrow" />
          </Link>
          <a className="hx-strip-phone" href={`tel:${SITE_PHONE_RAW}`}>
            <Icon name="i-contact-phone" />
            {SITE_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

/* Does your subject qualify? --------------------------------------------- */

const COUNTS = [
  "In-depth articles in independent newspapers and magazines",
  "Books and academic journals that discuss the subject",
  "Serious trade press with editorial oversight",
  "Coverage sustained over time, not a single news spike",
];

const DOES_NOT = [
  "Press releases, sponsored or paid-placement features",
  "Your own website, blog or social profiles",
  "Interviews where you are the main source",
  "Passing mentions, directory listings and award-site entries",
];

export function HomeNotability() {
  return (
    <section className="section-pad tone-light hx-qualify" aria-labelledby="hx-qualify-title">
      <div className="shell hx-qualify-grid">
        <div className="hx-qualify-copy reveal">
          <p className="micro-label">Notability, in plain English</p>
          <h2 id="hx-qualify-title">
            Does your subject <span>qualify?</span>
          </h2>
          <p>
            Most failed pages fail before a sentence is written. Wikipedia needs
            significant coverage in sources that are independent of you. Fame,
            revenue and follower counts do not count on their own.
          </p>
          <div className="hx-qualify-actions">
            <Link className="hx-btn hx-btn--gold" href={url("wikipedia-notability-checker")}>
              Try the notability checker <Icon name="i-arrow" />
            </Link>
            <Link className="text-link" href={url("blog/wikipedia-notability-requirements-explained")}>
              Read the notability guide <Icon name="i-arrow" />
            </Link>
          </div>
        </div>

        <div className="hx-qualify-lists reveal">
          <div className="hx-list hx-list--yes">
            <h3>Usually counts</h3>
            <ul>
              {COUNTS.map((item) => (
                <li key={item}>
                  <Icon name="i-check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hx-list hx-list--no">
            <h3>Usually does not</h3>
            <ul>
              {DOES_NOT.map((item) => (
                <li key={item}>
                  <Icon name="i-close" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Who we help ------------------------------------------------------------- */

const AUDIENCE_META: Record<string, { icon: string; copy: string }> = {
  "wikipedia-page-for-companies": {
    icon: "i-building",
    copy: "Brands, startups and established firms with independent business coverage.",
  },
  "wikipedia-page-for-authors": {
    icon: "i-write",
    copy: "Novelists and non-fiction writers with reviews in serious outlets.",
  },
  "wikipedia-page-for-academics": {
    icon: "i-research",
    copy: "Researchers, professors and scientists with cited, discussed work.",
  },
  "wikipedia-page-for-musicians": {
    icon: "i-users",
    copy: "Artists, bands and composers covered by independent music press.",
  },
};

export function HomeAudience() {
  return (
    <section className="section-pad tone-dark hx-audience" id="who-we-help" aria-labelledby="hx-audience-title">
      <div className="shell">
        <div className="hx-head hx-head--center reveal">
          <p className="micro-label">Who we work with</p>
          <h2 id="hx-audience-title">
            Wikipedia pages for <span>every kind of subject</span>
          </h2>
          <p>
            Notability rules differ by subject type. Start with the guide that
            matches your situation.
          </p>
        </div>
        <div className="hx-audience-grid reveal">
          {AUDIENCE_LINKS.map((item) => {
            const meta = AUDIENCE_META[item.slug];
            return (
              <Link key={item.slug} className="hx-audience-card" href={url(item.slug)}>
                <span className="hx-audience-icon">
                  <Icon name={meta?.icon ?? "i-users"} />
                </span>
                <h3>{item.label}</h3>
                {meta ? <p>{meta.copy}</p> : null}
                <span className="hx-audience-link">
                  Open guide <Icon name="i-arrow" />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="hx-audience-foot reveal">
          Want proof first?{" "}
          <Link href={url(CASE_STUDIES_LINK.slug)}>
            Read our {CASE_STUDIES_LINK.label.toLowerCase()}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* Pricing teaser ---------------------------------------------------------- */

const TIER_POINTS: Record<string, string[]> = {
  essential: ["Written notability report", "Up to 12 sources", "1 revision round", "30 days monitoring"],
  standard: ["Two editors + claim check", "Up to 25 sources", "Revisions until accepted", "90 days monitoring"],
  comprehensive: ["Senior editor + compliance review", "Books, journals, paywalled archives", "Gap plan if not yet notable", "6 months monitoring"],
};

export function HomePricing() {
  const tiers = pricingTiers.filter((tier) => tier.id in TIER_POINTS);
  const custom = pricingTiers.find((tier) => tier.id === "custom");

  return (
    <section className="section-pad tone-light hx-pricing" aria-labelledby="hx-pricing-title">
      <div className="shell">
        <div className="hx-head hx-head--center reveal">
          <p className="micro-label">What it costs</p>
          <h2 id="hx-pricing-title">
            Published pricing, <span>no surprises</span>
          </h2>
          <p>
            The free assessment tells you which tier applies before you commit.
            Every tier includes paid-contribution disclosure.
          </p>
        </div>

        <div className="hx-price-grid reveal">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={`hx-price-card${tier.badge ? " hx-price-card--featured" : ""}`}
            >
              {tier.badge ? <span className="hx-price-badge">{tier.badge}</span> : null}
              <h3>{tier.name}</h3>
              <p className="hx-price-value">
                <small>From</small>${tier.price.toLocaleString("en-US")}
              </p>
              <p className="hx-price-for">{tier.bestFor}</p>
              <ul>
                {TIER_POINTS[tier.id].map((point) => (
                  <li key={point}>
                    <Icon name="i-check" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                className={`hx-btn ${tier.badge ? "hx-btn--gold" : "hx-btn--outline"}`}
                href={url("contact")}
              >
                Get a free assessment <Icon name="i-arrow" />
              </Link>
            </article>
          ))}
        </div>

        <p className="hx-price-foot reveal">
          {custom ? <>Contested subjects or multi-language projects start {custom.priceLabel.toLowerCase()}. </> : null}
          <Link href={url("wikipedia-page-cost")}>
            See full pricing and add-ons <Icon name="i-arrow" />
          </Link>
        </p>
      </div>
    </section>
  );
}
