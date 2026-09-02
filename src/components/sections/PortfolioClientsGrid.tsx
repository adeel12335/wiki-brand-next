import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PublicPortfolioItem } from "@/lib/portfolio";

interface PortfolioClientsGridProps {
  items: PublicPortfolioItem[];
  variant?: "grid" | "carousel";
}

export function PortfolioClientsGrid({
  items,
  variant = "grid",
}: PortfolioClientsGridProps) {
  if (items.length === 0) return null;

  const cards = items.map((item) => (
    <article key={item.slug} className="client-card">
      <div className="client-card-image">
        <PortfolioImage item={item} />
      </div>
      <div className="client-card-body">
        <h3>
          {item.externalUrl ? (
            <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          ) : (
            <Link href={`/portfolio/${item.slug}/`}>{item.title}</Link>
          )}
        </h3>
        {item.summary ? <p>{item.summary}</p> : null}
        {item.externalUrl ? (
          <a
            className="text-link"
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Wikipedia <Icon name="i-arrow" />
          </a>
        ) : (
          <Link className="text-link" href={`/portfolio/${item.slug}/`}>
            View profile <Icon name="i-arrow" />
          </Link>
        )}
      </div>
    </article>
  ));

  if (variant === "carousel") {
    const [featured, ...remaining] = items.slice(0, 5);

    return (
      <div className="portfolio-showcase reveal">
        <article className="portfolio-feature">
          <PortfolioImage item={featured} eager />
          <div className="portfolio-feature-overlay" />
          <div className="portfolio-feature-copy">
            <span className="portfolio-index">01</span>
            <span className="portfolio-label">Featured publication</span>
            <h3>{featured.title}</h3>
            {featured.summary ? <p>{featured.summary}</p> : null}
            <PortfolioLink item={featured} label="View publication" />
          </div>
        </article>

        <div className="portfolio-mini-grid">
          {remaining.map((item, index) => (
            <article key={item.slug} className="portfolio-mini-card">
              <PortfolioImage item={item} />
              <div className="portfolio-mini-shade" />
              <div className="portfolio-mini-copy">
                <span className="portfolio-index">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <PortfolioLink item={item} label="View" />
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return <div className="clients-grid reveal">{cards}</div>;
}

function PortfolioImage({
  item,
  eager = false,
}: {
  item: PublicPortfolioItem;
  eager?: boolean;
}) {
  const currentFallbackPlaceholder = Boolean(
    item.imageUrl?.startsWith("/assets/portfolio/") &&
      item.imageUrl.toLowerCase().endsWith(".png"),
  );

  if (!item.imageUrl || currentFallbackPlaceholder) {
    return (
      <div className="portfolio-image-placeholder" aria-hidden="true">
        <span>W</span>
      </div>
    );
  }

  return (
    <Image
      src={item.imageUrl}
      alt={item.imageAlt}
      width={960}
      height={720}
      sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 34vw"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

function PortfolioLink({
  item,
  label,
}: {
  item: PublicPortfolioItem;
  label: string;
}) {
  if (item.externalUrl) {
    return (
      <a
        className="text-link"
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} <Icon name="i-arrow" />
      </a>
    );
  }

  return (
    <Link className="text-link" href={`/portfolio/${item.slug}/`}>
      {label} <Icon name="i-arrow" />
    </Link>
  );
}
