import { SectionHeading } from "@/components/module/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { portfolioContent } from "@/content/portfolio";

/** Figma: Portfolio Listing → Confidential clients (ink, centred heading, three commitments in a gold-tint strip). */
export function ConfidentialClients() {
  const c = portfolioContent.confidential;
  return (
    <section className="section bg-ink">
      <div className="shell flex flex-col gap-10 md:gap-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} align="center" tone="dark" className="max-w-[720px]" />
        <ul className="grid rounded-[20px] border border-gold/20 bg-gold/6 px-2 py-4 md:grid-cols-3 md:py-8" data-aos="fade-up">
          {c.points.map((point, i) => (
            <li
              key={point.title}
              className={`flex gap-4 px-5 py-4 md:px-8 md:py-0 ${i > 0 ? "border-t border-white/10 md:border-t-0 md:border-l" : ""}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold/14 text-gold">
                <Icon name={point.icon} size={20} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[17px] font-bold text-white">{point.title}</span>
                <span className="text-sm leading-relaxed text-on-dark-muted">{point.copy}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
