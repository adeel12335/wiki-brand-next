import { TrustBox } from "@/components/trustpilot/TrustBox";
import { Icon } from "@/components/ui/Icon";
import {
  getTrustpilotBusinessUnitId,
  getTrustpilotCarouselTemplateId,
  getTrustpilotEvaluateUrl,
  getTrustpilotMicroTemplateId,
  getTrustpilotReviewUrl,
  isTrustpilotConfigured,
} from "@/lib/trustpilot";

/** Homepage Trustpilot block — free profile card, or paid TrustBox when configured. */
export function TrustpilotReviewsSection({
  className,
}: {
  className?: string;
} = {}) {
  const reviewUrl = getTrustpilotReviewUrl();
  const evaluateUrl = getTrustpilotEvaluateUrl();
  const hasTrustBox = isTrustpilotConfigured();

  return (
    <section
      className={["section-pad trustpilot-section", className].filter(Boolean).join(" ")}
      aria-labelledby="trustpilot-title"
    >
      <div className="shell tp-layout">
        <div className="tp-intro reveal">
          <p className="micro-label">Trustpilot</p>
          <h2 id="trustpilot-title">Independent Reviews on Trustpilot</h2>
          <p>
            We invite finished clients to leave an honest review on Trustpilot —
            not a private testimonial form we control.
          </p>
          <ul className="tp-points">
            <li>
              <span className="tp-point-icon" aria-hidden="true">
                <Icon name="i-shield" />
              </span>
              <span>
                <strong>Published by Trustpilot</strong>
                Reviews live on Trustpilot&apos;s platform, not on a page we edit.
              </span>
            </li>
            <li>
              <span className="tp-point-icon" aria-hidden="true">
                <Icon name="i-users" />
              </span>
              <span>
                <strong>Every finished client is invited</strong>
                Not a hand-picked shortlist of the happiest projects.
              </span>
            </li>
            <li>
              <span className="tp-point-icon" aria-hidden="true">
                <Icon name="i-search" />
              </span>
              <span>
                <strong>Read them before you commit</strong>
                Check what past clients wrote before you request an assessment.
              </span>
            </li>
          </ul>
        </div>

        {hasTrustBox ? (
          <div className="tp-card tp-card--widget reveal">
            <TrustBox
              businessUnitId={getTrustpilotBusinessUnitId()}
              templateId={getTrustpilotCarouselTemplateId()}
              reviewUrl={reviewUrl}
              height="280px"
              theme="dark"
            />
          </div>
        ) : (
          <div className="tp-card reveal">
            <p className="tp-card-label">How reviews work</p>
            <h3>See what clients publish about The Wikipedia Studio</h3>
            <ol className="tp-steps">
              <li>
                <b>1</b>
                <span>Open our public Trustpilot profile for the live TrustScore.</span>
              </li>
              <li>
                <b>2</b>
                <span>Read written reviews from completed engagements.</span>
              </li>
              <li>
                <b>3</b>
                <span>Worked with us? Leave your own review.</span>
              </li>
            </ol>
            <div className="tp-actions">
              <a
                className="button button-gold"
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read reviews <Icon name="i-arrow" />
              </a>
              <a
                className="button button-outline"
                href={evaluateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a review
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Compact footer badge — TrustBox when paid widgets are available, else links. */
export function TrustpilotMicroBadge() {
  const reviewUrl = getTrustpilotReviewUrl();
  const evaluateUrl = getTrustpilotEvaluateUrl();

  if (isTrustpilotConfigured()) {
    return (
      <div className="trustpilot-micro">
        <TrustBox
          businessUnitId={getTrustpilotBusinessUnitId()}
          templateId={getTrustpilotMicroTemplateId()}
          reviewUrl={reviewUrl}
          height="24px"
          theme="dark"
        />
      </div>
    );
  }

  return (
    <p className="footer-trustpilot-links">
      <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
        Trustpilot reviews
      </a>
      <span aria-hidden="true">·</span>
      <a href={evaluateUrl} target="_blank" rel="noopener noreferrer">
        Leave a review
      </a>
    </p>
  );
}
