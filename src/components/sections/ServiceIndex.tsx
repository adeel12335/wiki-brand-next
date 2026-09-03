import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { services } from "@/lib/data";

export function ServiceIndex({
  showHeading = false,
}: {
  showHeading?: boolean;
}) {
  const entries = Object.entries(services);
  const [featured, ...remaining] = entries;
  const [featuredSlug, featuredService] = featured;

  return (
    <div className="service-index">
      {showHeading ? (
        <div className="service-index-heading reveal">
          <div>
            <p className="micro-label">Our Services</p>
            <h2>Comprehensive Wikipedia Solutions</h2>
          </div>
          <p>
            Five services covering the full editorial lifecycle—from the first
            notability check to long-term page stewardship.
          </p>
        </div>
      ) : null}

      <div className="service-index-layout reveal">
        <Link
          className="service-feature"
          href={url(`services/${featuredSlug}`)}
          aria-label={`Explore ${featuredService.name}`}
        >
          <Image
            className="service-feature-art"
            src="/assets/services-hero-knowledge-archive.webp"
            alt="Editorial knowledge archive illustrating Wikipedia page creation research"
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 48vw"
          />
          <span className="service-feature-shade" aria-hidden="true" />
          <span className="service-number">01</span>
          <div className="service-feature-copy">
            <span className="service-kicker">Featured service</span>
            <span className="service-feature-icon" aria-hidden="true">
              <Icon name={featuredService.icon} />
            </span>
            <h3>{featuredService.name}</h3>
            <p>{featuredService.card}</p>
            <span className="text-link">
              Explore this service <Icon name="i-arrow" />
            </span>
          </div>
        </Link>

        <div className="service-list" role="list">
          {remaining.map(([slug, service], index) => (
            <Link
              className="service-row"
              href={url(`services/${slug}`)}
              key={slug}
              role="listitem"
            >
              <span className="service-number">
                {String(index + 2).padStart(2, "0")}
              </span>
              <span className="service-row-icon" aria-hidden="true">
                <Icon name={service.icon} />
              </span>
              <span className="service-row-copy">
                <strong>{service.name}</strong>
                <small>{service.card}</small>
              </span>
              <Icon name="i-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
