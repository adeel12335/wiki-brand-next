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
        <div className="svc-heading reveal">
          <div>
            <p className="micro-label">Our Services</p>
            <h2>Comprehensive Wikipedia Solutions</h2>
          </div>
          <p>
            Services covering the full editorial lifecycle — from notability
            assessment and knowledge-panel entity work to creation, editing,
            monitoring, and long-term stewardship.
          </p>
        </div>
      ) : null}

      <div className="svc-grid reveal">
        <Link
          className="svc-card svc-card--featured"
          href={url(`services/${featuredSlug}`)}
        >
          <Image
            className="svc-card-art"
            src="/assets/services-hero-knowledge-archive.webp"
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
          <span className="svc-card-shade" aria-hidden="true" />
          <div className="svc-card-body">
            <span className="svc-card-top">
              <span className="svc-card-icon" aria-hidden="true">
                <Icon name={featuredService.icon} />
              </span>
              <span className="svc-card-num">01</span>
            </span>
            <span className="svc-card-kicker">Featured service</span>
            <h3 className="svc-card-title">{featuredService.name}</h3>
            <p className="svc-card-text">{featuredService.card}</p>
            <span className="svc-card-link">
              Explore this service <Icon name="i-arrow" />
            </span>
          </div>
        </Link>

        {remaining.map(([slug, service], index) => (
          <Link className="svc-card" href={url(`services/${slug}`)} key={slug}>
            <span className="svc-card-top">
              <span className="svc-card-icon" aria-hidden="true">
                <Icon name={service.icon} />
              </span>
              <span className="svc-card-num">
                {String(index + 2).padStart(2, "0")}
              </span>
            </span>
            <h3 className="svc-card-title">{service.name}</h3>
            <p className="svc-card-text">{service.card}</p>
            <span className="svc-card-link">
              Learn more <Icon name="i-arrow" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
