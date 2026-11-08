import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";
import { homeContent } from "@/content/home";

interface HomeTrustpilotProps {
  score: number;
  reviews: number;
  label: string;
  reviewUrl: string;
  evaluateUrl: string;
}

export function HomeTrustpilot({ score, reviews, label, reviewUrl, evaluateUrl }: HomeTrustpilotProps) {
  const c = homeContent.trustpilot;
  const filled = Math.round(score);
  return (
    <section className="section bg-mist/25">
      <div className="shell grid items-center gap-12 lg:grid-cols-[640px_1fr] lg:gap-20">
        <div className="flex flex-col gap-7">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} />
          <ul className="flex flex-col gap-5" data-aos="fade-up">
            {c.points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gold/12 text-gold-dark">
                  <Icon name={p.icon} size={18} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-heading">{p.title}</span>
                  <span className="text-[15px] text-body">{p.copy}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 rounded-[18px] border border-gold/35 bg-panel p-6 md:p-8" data-aos="fade-left">
          <p className="text-[11px] font-bold tracking-[0.14em] text-gold-eyebrow uppercase">Our Trustpilot rating</p>
          <div className="flex flex-col gap-2.5 rounded-card border border-white/10 bg-ink p-5.5">
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="text-[26px] font-bold text-white">{label}</span>
              <span className="flex gap-[3px]" aria-label={`${score} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`grid size-[26px] place-items-center ${i < filled ? "bg-star" : "bg-[#dbdbdb]"}`}>
                    <Icon name="star" size={16} className="text-white" />
                  </span>
                ))}
              </span>
            </div>
            <p className="text-[15px] text-on-dark-muted">
              TrustScore <strong className="text-white">{score.toFixed(1)}</strong> · {reviews} reviews
            </p>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <Icon name="star" size={14} className="text-star" /> Trustpilot
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href={reviewUrl} variant="gold">
              {c.readLabel}
            </Button>
            <Button href={evaluateUrl} variant="outline-dark">
              Leave a review
            </Button>
          </div>
          <p className="text-[13px] text-on-dark-muted">Worked with us? Share your experience.</p>
        </div>
      </div>
    </section>
  );
}
