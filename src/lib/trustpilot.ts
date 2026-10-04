import { PRODUCTION_SITE_URL } from "@/lib/config";

/** Official Trustpilot template IDs (shared across all businesses). */
export const TRUSTPILOT_TEMPLATE_MICRO_STAR = "5419b6a8b0d04a076446a9ad";
export const TRUSTPILOT_TEMPLATE_CAROUSEL = "53aa8912dec7e10d38f59f48";
export const TRUSTPILOT_TEMPLATE_MINI = "53aa8807dec7e10d38f59f32";
/** "Review us on Trustpilot" button — the one TrustBox the free plan includes. */
export const TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR = "56278e9abfbbba0bdcd568bc";

/** Public Trustpilot business unit for thewikipediastudio.com (not a secret). */
const DEFAULT_BUSINESS_UNIT_ID = "6a6fa48c2c1b99c763ad84a6";

export function getTrustpilotBusinessUnitId(): string {
  return process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim() || DEFAULT_BUSINESS_UNIT_ID;
}

export interface TrustpilotSummary {
  trustScore: number;
  stars: number;
  total: number;
  label: string;
}

/**
 * Live TrustScore + review count, read from the same public data the Review
 * Collector TrustBox uses. Cached for 12 hours; null when Trustpilot is
 * unreachable so callers fall back to plain links (never a made-up score).
 */
export async function getTrustpilotSummary(): Promise<TrustpilotSummary | null> {
  const endpoint = `https://widget.trustpilot.com/trustbox-data/${TRUSTPILOT_TEMPLATE_REVIEW_COLLECTOR}?businessUnitId=${encodeURIComponent(getTrustpilotBusinessUnitId())}&locale=en-US`;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 43200 }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      businessUnit?: { trustScore?: unknown; stars?: unknown; numberOfReviews?: { total?: unknown } };
      starsString?: unknown;
    };
    const unit = data.businessUnit;
    const trustScore = Number(unit?.trustScore);
    const stars = Number(unit?.stars);
    const total = Number(unit?.numberOfReviews?.total);
    if (![trustScore, stars, total].every(Number.isFinite) || total < 1) return null;
    return {
      trustScore: Math.min(5, Math.max(0, trustScore)),
      stars: Math.min(5, Math.max(0, stars)),
      total: Math.floor(total),
      label: typeof data.starsString === "string" ? data.starsString.slice(0, 24) : "",
    };
  } catch {
    return null;
  }
}

export function getTrustpilotReviewUrl(): string {
  return (
    process.env.NEXT_PUBLIC_TRUSTPILOT_REVIEW_URL?.trim() ||
    `https://www.trustpilot.com/review/${new URL(PRODUCTION_SITE_URL).hostname}`
  );
}

export function getTrustpilotEvaluateUrl(): string {
  return (
    process.env.NEXT_PUBLIC_TRUSTPILOT_EVALUATE_URL?.trim() ||
    `https://www.trustpilot.com/evaluate/${new URL(PRODUCTION_SITE_URL).hostname}`
  );
}

export function getTrustpilotCarouselTemplateId(): string {
  return (
    process.env.NEXT_PUBLIC_TRUSTPILOT_TEMPLATE_ID?.trim() ||
    TRUSTPILOT_TEMPLATE_CAROUSEL
  );
}

export function getTrustpilotMicroTemplateId(): string {
  return (
    process.env.NEXT_PUBLIC_TRUSTPILOT_MICRO_TEMPLATE_ID?.trim() ||
    TRUSTPILOT_TEMPLATE_MICRO_STAR
  );
}

/** Paid TrustBoxes (carousel, micro star) only when the plan is set in env. */
export function isTrustpilotConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim());
}
