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
export function TrustpilotReviewsSection() {
  const reviewUrl = getTrustpilotReviewUrl();
  const evaluateUrl = getTrustpilotEvaluateUrl();
  const hasTrustBox = isTrustpilotConfigured();

  return (
    <section
      className="section-pad trustpilot-section"
      aria-labelledby="trustpilot-title"
    >
      <div className="shell">
        <div className="trustpilot-heading reveal">
          <p className="micro-label">Trustpilot</p>
          <h2 id="trustpilot-title">Independent reviews on Trustpilot</h2>
          <p>
            We invite finished clients to leave an honest review on Trustpilot —
            not a private testimonial form we control.
          </p>
        </div>

        {hasTrustBox ? (
          <div className="trustpilot-frame reveal">
            <TrustBox
              businessUnitId={getTrustpilotBusinessUnitId()}
              templateId={getTrustpilotCarouselTemplateId()}
              reviewUrl={reviewUrl}
              height="280px"
              theme="dark"
            />
          </div>
        ) : (
          <div className="trustpilot-free-card reveal">
            <div className="trustpilot-free-copy">
              <p className="trustpilot-free-brand">Trustpilot</p>
              <strong>See what clients publish about The Wikipedia Studio</strong>
              <p>
                Open our public Trustpilot profile for the live TrustScore and
                written reviews. After an engagement, you can leave your own.
              </p>
            </div>
            <div className="trustpilot-free-actions">
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
