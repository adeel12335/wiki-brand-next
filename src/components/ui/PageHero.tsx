import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";

interface HeroAction {
  label: string;
  href: string;
  style?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  h1: string;
  lede?: string;
  breadcrumbs?: Array<{ label: string; slug: string }>;
  current?: string;
  actions?: HeroAction[];
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  visualClass?: string;
}

export function HtmlHeading({
  html,
  id,
  as: Tag = "h1",
  className,
}: {
  html: string;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function PageHero({
  eyebrow,
  h1,
  lede,
  breadcrumbs = [],
  current = "",
  actions,
  image,
  imageWidth = 720,
  imageHeight = 596,
  visualClass,
}: PageHeroProps) {
  const heroImage = image ?? "/assets/globe.png";
  const visualClasses = [
    "page-hero-visual",
    visualClass ?? (image ? "" : "page-hero-visual--globe"),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="shell">
        <Breadcrumbs crumbs={breadcrumbs} current={current} />
        <div className="page-hero-layout">
          <div className="page-hero-copy">
            {eyebrow ? <p className="micro-label">{eyebrow}</p> : null}
            <HtmlHeading html={h1} id="page-title" />
            {lede ? <p className="page-hero-lede">{lede}</p> : null}
            {actions?.length ? (
              <div className="hero-actions">
                {actions.map((action) => (
                  <Link
                    key={action.label}
                    className={`button ${action.style ?? "button-gold"} magnetic`}
                    href={action.href}
                  >
                    {action.label} <Icon name="i-arrow" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className={visualClasses} aria-hidden="true">
            <span className="page-hero-orbit orbit-one" />
            <span className="page-hero-orbit orbit-two" />
            <Image
              src={heroImage.startsWith("/") ? heroImage : `/${heroImage}`}
              alt=""
              width={imageWidth}
              height={imageHeight}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 92vw, 46vw"
            />
            <i className="page-hero-rule" />
          </div>
        </div>
      </div>
    </section>
  );
}
