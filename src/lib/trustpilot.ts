import { PRODUCTION_SITE_URL } from "@/lib/config";

/** Official Trustpilot template IDs (shared across all businesses). */
export const TRUSTPILOT_TEMPLATE_MICRO_STAR = "5419b6a8b0d04a076446a9ad";
export const TRUSTPILOT_TEMPLATE_CAROUSEL = "53aa8912dec7e10d38f59f48";
export const TRUSTPILOT_TEMPLATE_MINI = "53aa8807dec7e10d38f59f32";

export function getTrustpilotBusinessUnitId(): string {
  return process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID?.trim() ?? "";
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

export function isTrustpilotConfigured(): boolean {
  return Boolean(getTrustpilotBusinessUnitId());
}
