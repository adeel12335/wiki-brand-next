import { TrustBox } from "@/components/trustpilot/TrustBox";
import { TrustpilotRating } from "@/components/trustpilot/TrustpilotRating";
import { Icon } from "@/components/ui/Icon";
import {
  TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR,
  getTrustpilotBusinessUnitId,
  getTrustpilotCarouselTemplateId,
  getTrustpilotEvaluateUrl,
  getTrustpilotMicroTemplateId,
  getTrustpilotReviewUrl,
  getTrustpilotSummary,
  isTrustpilotConfigured,
} from "@/lib/trustpilot";

/** Official free "Review us on Trustpilot" TrustBox (falls back to a plain link). */
function ReviewCollector({ theme, evaluateUrl }: { theme: "dark" | "light"; evaluateUrl: string }) {
  return (
    <TrustBox
      businessUnitId={getTrustpilotBusinessUnitId()}
      templateId={TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR}
      reviewUrl={evaluateUrl}
      height="52px"
      theme={theme}
      fallbackLabel="Review us on Trustpilot"
      className="tp-collector"
    />
  );
}

/** Homepage Trustpilot block — free profile card, or paid TrustBox when configured. */
export async function TrustpilotReviewsSection({
  className,
}: {
  className?: string;
} = {}) {
  const reviewUrl = getTrustpilotReviewUrl();
  const evaluateUrl = getTrustpilotEvaluateUrl();
  const hasTrustBox = isTrustpilotConfigured();
  const summary = await getTrustpilotSummary();

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
            <p className="tp-card-label">Our Trustpilot Rating</p>
            {summary ? (
              <TrustpilotRating summary={summary} reviewUrl={reviewUrl} variant="card" />
            ) : (
              <h3>See what clients publish about The Wikipedia Studio</h3>
            )}
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
            <div className="tp-collector-wrap">
              <p>Worked with us? Share your experience:</p>
              <ReviewCollector theme="dark" evaluateUrl={evaluateUrl} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Footer badge: live TrustScore + official "Review us on Trustpilot" TrustBox. */
export async function TrustpilotMicroBadge() {
  const reviewUrl = getTrustpilotReviewUrl();
  const evaluateUrl = getTrustpilotEvaluateUrl();
  const summary = await getTrustpilotSummary();

  return (
    <div className="footer-trustpilot">
      {isTrustpilotConfigured() ? (
        <div className="trustpilot-micro">
          <TrustBox
            businessUnitId={getTrustpilotBusinessUnitId()}
            templateId={getTrustpilotMicroTemplateId()}
            reviewUrl={reviewUrl}
            height="24px"
            theme="dark"
          />
        </div>
      ) : summary ? (
        <TrustpilotRating summary={summary} reviewUrl={reviewUrl} />
      ) : (
        <a className="footer-trustpilot-link" href={reviewUrl} target="_blank" rel="noopener noreferrer">
          Read our Trustpilot reviews
        </a>
      )}
      <ReviewCollector theme="dark" evaluateUrl={evaluateUrl} />
    </div>
  );
}
