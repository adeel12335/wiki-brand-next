import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/types";
import { url } from "@/lib/config";

export function ServiceCard({
  slug,
  service,
}: {
  slug: string;
  service: Service;
}) {
  return (
    <article className="service-card">
      <Icon name={service.icon} />
      <h3>
        <Link href={url(`services/${slug}`)}>{service.name}</Link>
      </h3>
      <p>{service.card}</p>
      <Link href={url(`services/${slug}`)}>
        Learn More <Icon name="i-arrow" />
      </Link>
    </article>
  );
}
