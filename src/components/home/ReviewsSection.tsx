import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  TrustpilotLogo,
  TrustpilotReviewButton,
  TrustpilotStars,
} from "@/components/trustpilot/TrustpilotRating";
import { testimonials } from "@/lib/data";
import { getTrustpilotReviewUrl, getTrustpilotSummary } from "@/lib/trustpilot";

/** Client testimonials plus the live Trustpilot rating and review button. */
export async function ReviewsSection() {
  const summary = await getTrustpilotSummary();
  const reviewUrl = getTrustpilotReviewUrl();

  return (
    <Section tone="surface" id="reviews" labelledBy="reviews-title">
      <SectionHeader
        id="reviews-title"
        eyebrow="Client Reviews"
        title={
          <>
            What Our Clients <span>Say</span>
          </>
        }
        description="Finished clients are invited to review us publicly on Trustpilot — not on a private testimonial form we control."
      />

      <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
        {testimonials.map((item) => (
          <li key={item.name}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card lg:p-8">
              <svg viewBox="0 0 32 32" className="size-9 fill-accent/25" aria-hidden="true">
                <path d="M13 8H7a3 3 0 00-3 3v6a3 3 0 003 3h4v1a4 4 0 01-4 4v3a7 7 0 007-7V8zm15 0h-6a3 3 0 00-3 3v6a3 3 0 003 3h4v1a4 4 0 01-4 4v3a7 7 0 007-7V8z" />
              </svg>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink lg:text-lg">
                <p>“{item.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-6">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary font-heading font-bold text-white" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{item.name}</span>
                  <span className="type-small block text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-white p-6 shadow-card md:flex-row lg:px-10">
        {summary ? (
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-5 sm:text-left"
          >
            <span className="font-heading text-2xl font-extrabold text-ink">{summary.label || "Rated"}</span>
            <TrustpilotStars stars={summary.stars} size="lg" />
            <span className="text-[0.9375rem] text-muted">
              TrustScore <b className="text-ink">{summary.trustScore.toFixed(1)}</b> · {summary.total} review
              {summary.total === 1 ? "" : "s"} on <TrustpilotLogo className="text-ink" />
            </span>
          </a>
        ) : (
          <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">
            Read our reviews on Trustpilot
          </a>
        )}
        <div className="w-full max-w-60">
          <TrustpilotReviewButton />
        </div>
      </div>
    </Section>
  );
}
