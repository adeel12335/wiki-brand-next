import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/module/SectionHeading";
import { cn } from "@/lib/cn";

export interface InfoCardItem {
  icon: IconName;
  /** Optional: when omitted the card shows the icon alone above the title. */
  kicker?: string;
  title: string;
  highlight: string;
  copy: string;
  cta: { label: string; href: string };
  tone: "cream" | "mist";
}

/**
 * Figma: "Card / Our Mission" pattern - cream/mist card, icon kicker, 2-line title (2nd gold), copy, ink pill button.
 * Used on About (Mission & Vision), Contact (Not Ready Yet) and Thank You (While You Wait).
 */
export function InfoCard({ item }: { item: InfoCardItem }) {
  return (
    <article className={cn("flex h-full flex-col gap-5 rounded-[28px] p-6 md:px-10 md:py-11", item.tone === "cream" ? "bg-cream" : "bg-mist")}>
      <p className="flex items-center gap-3 text-[17px] font-bold text-body">
        <span className="grid size-10 place-items-center rounded-full bg-white text-gold-dark">
          <Icon name={item.icon} size={18} />
        </span>
        {item.kicker ?? null}
      </p>
      <h3 className="text-[22px] leading-[1.25] font-bold text-heading md:text-[28px]">
        {item.title}
        <br />
        <span className="text-gold-dark">{item.highlight}</span>
      </h3>
      <p className="text-base leading-relaxed text-body">{item.copy}</p>
      <Link
        href={item.cta.href}
        className="group mt-auto inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[15px] font-bold text-white transition-colors hover:bg-gold hover:text-on-gold"
      >
        {item.cta.label}
        <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

/** Heading left + short aside paragraph right (Figma: Mission & Vision / Not Ready Yet / While You Wait header rows). */
export function HeadingRow({
  eyebrow,
  title,
  highlight,
  aside,
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight: string;
  aside?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
}) {
  const hasSide = Boolean(aside) || Boolean(children);
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
      <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} tone={tone} className="lg:max-w-[640px]" />
      {hasSide ? (
        <div className="flex flex-col gap-5 lg:max-w-[454px]" data-aos="fade-up">
          {aside ? <p className={cn("text-base leading-relaxed", tone === "dark" ? "text-on-dark md:text-[17px]" : "text-body")}>{aside}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function InfoCardsSection({
  heading,
  cards,
  className,
}: {
  heading: { eyebrow?: string; title: string; highlight: string; aside?: string };
  cards: InfoCardItem[];
  className?: string;
}) {
  return (
    <section className={cn("section bg-white", className)}>
      <div className="shell flex flex-col gap-8 md:gap-14">
        <HeadingRow {...heading} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div key={card.kicker ?? `${card.title} ${card.highlight}`} data-aos="fade-up" data-aos-delay={i * 80}>
              <InfoCard item={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
