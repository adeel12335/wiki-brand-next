import type { CSSProperties } from "react";
import type { TrustpilotSummary } from "@/lib/trustpilot";

/** Trustpilot-style star row: green squares, partially filled for half stars. */
export function TrustpilotStars({ stars }: { stars: number }) {
  return (
    <span className="tp-stars" role="img" aria-label={`Rated ${stars.toFixed(1)} out of 5 on Trustpilot`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, stars - index));
        return (
          <span key={index} className="tp-star" style={{ "--tp-fill": `${fill * 100}%` } as CSSProperties}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.5l2.47 5.6 6.03.5-4.6 3.97 1.4 5.93L12 16.35l-5.3 3.15 1.4-5.93L3.5 9.6l6.03-.5z" />
            </svg>
          </span>
        );
      })}
    </span>
  );
}

/** Small Trustpilot wordmark: green star + "Trustpilot". */
export function TrustpilotLogo() {
  return (
    <span className="tp-logo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.5l2.83 6.4 6.92.58-5.27 4.55 1.6 6.8L12 17.2l-6.08 3.63 1.6-6.8L2.25 9.48l6.92-.58z" />
      </svg>
      Trustpilot
    </span>
  );
}

/**
 * Live TrustScore line linked to the public profile. Renders nothing when the
 * score could not be fetched, so the page never shows a stale or invented score.
 */
export function TrustpilotRating({
  summary,
  reviewUrl,
  variant = "inline",
}: {
  summary: TrustpilotSummary | null;
  reviewUrl: string;
  variant?: "inline" | "card";
}) {
  if (!summary) return null;
  const reviews = `${summary.total} review${summary.total === 1 ? "" : "s"}`;

  if (variant === "card") {
    return (
      <a className="tp-score-card" href={reviewUrl} target="_blank" rel="noopener noreferrer">
        <span className="tp-score-top">
          {summary.label ? <strong>{summary.label}</strong> : null}
          <TrustpilotStars stars={summary.stars} />
        </span>
        <span className="tp-score-meta">
          TrustScore <b>{summary.trustScore.toFixed(1)}</b> · {reviews}
        </span>
        <TrustpilotLogo />
      </a>
    );
  }

  return (
    <a className="tp-score-inline" href={reviewUrl} target="_blank" rel="noopener noreferrer">
      <TrustpilotLogo />
      <TrustpilotStars stars={summary.stars} />
      <span className="tp-score-meta">
        TrustScore <b>{summary.trustScore.toFixed(1)}</b> · {reviews}
      </span>
    </a>
  );
}
