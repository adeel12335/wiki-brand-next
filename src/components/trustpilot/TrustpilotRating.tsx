import { TrustBox } from "@/components/trustpilot/TrustBox";
import {
  TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR,
  getTrustpilotBusinessUnitId,
  getTrustpilotEvaluateUrl,
  getTrustpilotReviewUrl,
  getTrustpilotSummary,
} from "@/lib/trustpilot";
import { cn } from "@/lib/cn";

const STAR_PATH =
  "M12 3.5l2.47 5.6 6.03.5-4.6 3.97 1.4 5.93L12 16.35l-5.3 3.15 1.4-5.93L3.5 9.6l6.03-.5z";

/** Trustpilot-style star row: green squares, partially filled for half stars. */
export function TrustpilotStars({ stars, size = "md" }: { stars: number; size?: "sm" | "md" | "lg" }) {
  const box = { sm: "size-5", md: "size-6", lg: "size-8" }[size];
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${stars.toFixed(1)} out of 5 on Trustpilot`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, stars - index)) * 100;
        return (
          <span
            key={index}
            className={cn("inline-flex items-center justify-center", box)}
            style={{ background: `linear-gradient(90deg, #00b67a ${fill}%, #dcdce6 ${fill}%)` }}
          >
            <svg viewBox="0 0 24 24" className="size-3/4 fill-white" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        );
      })}
    </span>
  );
}

/** Small Trustpilot wordmark: green star + "Trustpilot". */
export function TrustpilotLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-bold tracking-tight", className)}>
      <svg viewBox="0 0 24 24" className="size-4 fill-[#00b67a]" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
      Trustpilot
    </span>
  );
}

/** Official free "Review us on Trustpilot" TrustBox (plain link until it loads). */
export function TrustpilotReviewButton({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <TrustBox
      businessUnitId={getTrustpilotBusinessUnitId()}
      templateId={TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR}
      reviewUrl={getTrustpilotEvaluateUrl()}
      height="52px"
      theme={theme}
      fallbackLabel="Review us on Trustpilot"
      className="min-h-13"
    />
  );
}

/** Footer badge: live TrustScore (when Trustpilot answers) + review button. */
export async function TrustpilotFooterBadge() {
  const summary = await getTrustpilotSummary();
  const reviewUrl = getTrustpilotReviewUrl();

  return (
    <div className="mt-8 max-w-60 space-y-3">
      {summary ? (
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#00b67a]/60"
        >
          <span className="flex items-center justify-between gap-3">
            <TrustpilotLogo className="text-white" />
            <TrustpilotStars stars={summary.stars} size="sm" />
          </span>
          <span className="type-small mt-2 block text-white/70">
            TrustScore <b className="text-white">{summary.trustScore.toFixed(1)}</b> · {summary.total}{" "}
            review{summary.total === 1 ? "" : "s"}
          </span>
        </a>
      ) : (
        <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="text-accent-soft underline">
          Read our Trustpilot reviews
        </a>
      )}
      <TrustpilotReviewButton theme="dark" />
    </div>
  );
}
