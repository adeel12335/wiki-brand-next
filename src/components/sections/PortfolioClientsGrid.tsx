import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  isIndexablePortfolioItem,
  type PublicPortfolioItem,
} from "@/lib/portfolio";

interface PortfolioClientsGridProps {
  items: PublicPortfolioItem[];
  variant?: "grid" | "carousel";
}

const COVER_POOL = [
  "/assets/portfolio-public-figure.jpg",
  "/assets/portfolio-author.jpg",
  "/assets/portfolio-business-leader.jpg",
  "/assets/portfolio-entrepreneur.jpg",
];

function isDummyLocalPng(url: string | null): boolean {
  if (!url) return true;
  const normalized = url.toLowerCase();
  return (
    normalized.includes("default-avatar") ||
    normalized.endsWith("/dummy.png") ||
    normalized.endsWith("/placeholder.png")
  );
}

function hasRealPhoto(item: PublicPortfolioItem): boolean {
  return Boolean(item.imageUrl && !isDummyLocalPng(item.imageUrl));
}

function coverFor(title: string): string {
  const sum = [...title].reduce((total, char) => total + char.charCodeAt(0), 0);
  return COVER_POOL[sum % COVER_POOL.length];
}

export function PortfolioClientsGrid({
  items,
  variant = "grid",
}: PortfolioClientsGridProps) {
  if (items.length === 0) return null;

  const cards = items.map((item, index) => (
    <article key={item.id ?? `${item.slug}-${index}`} className="client-card">
      <div
        className={`client-card-image${hasRealPhoto(item) ? " has-photo" : ""}`}
      >
        <PortfolioImage item={item} />
        {hasRealPhoto(item) ? (
          <span className="portfolio-watermark" aria-hidden="true">
            The Wikipedia Studio
          </span>
        ) : null}
      </div>
      <div className="client-card-body">
        <h3>
          {isIndexablePortfolioItem(item) ? (
            <Link href={`/portfolio/${item.slug}/`}>{item.title}</Link>
          ) : item.externalUrl ? (
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
        <article className={`portfolio-feature${hasRealPhoto(featured) ? " has-photo" : ""}`}>
          <PortfolioImage item={featured} eager />
          {hasRealPhoto(featured) ? (
            <span className="portfolio-watermark portfolio-watermark--feature" aria-hidden="true">
              The Wikipedia Studio
            </span>
          ) : null}
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
            <article
              key={item.id ?? `${item.slug}-${index}`}
              className={`portfolio-mini-card${hasRealPhoto(item) ? " has-photo" : ""}`}
            >
              <PortfolioImage item={item} />
              {hasRealPhoto(item) ? (
                <span className="portfolio-watermark portfolio-watermark--mini" aria-hidden="true">
                  The Wikipedia Studio
                </span>
              ) : null}
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
  const src =
    item.imageUrl && !isDummyLocalPng(item.imageUrl)
      ? item.imageUrl
      : coverFor(item.title);

  return (
    <Image
      className="portfolio-photo"
      src={src}
      alt={item.imageAlt || item.title}
      fill
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
  if (!isIndexablePortfolioItem(item) && item.externalUrl) {
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
