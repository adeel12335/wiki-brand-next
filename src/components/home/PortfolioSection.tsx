import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";
import { isIndexablePortfolioItem, type PublicPortfolioItem } from "@/lib/portfolio";
import { isGenericAvatar } from "@/lib/portfolio-images";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function PortfolioCard({ item }: { item: PublicPortfolioItem }) {
  const external = !isIndexablePortfolioItem(item) && item.externalUrl;
  const href = external ? (item.externalUrl as string) : `/portfolio/${item.slug}/`;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        {isGenericAvatar(item.imageUrl) ? (
          <div aria-hidden="true" className="flex size-full items-center justify-center bg-accent-soft">
            <span className="inline-flex size-24 items-center justify-center rounded-full bg-white font-heading text-3xl font-extrabold text-primary shadow-card">
              {initials(item.title)}
            </span>
          </div>
        ) : (
          <Image
            src={item.imageUrl as string}
            alt={item.imageAlt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {item.category && item.category !== item.title ? (
          <p className="type-small font-semibold tracking-wide text-accent uppercase">{item.category}</p>
        ) : null}
        <h3 className="mt-2 font-heading text-lg leading-snug font-bold text-ink lg:text-xl">
          {external ? (
            <a href={href} {...linkProps} className="after:absolute after:inset-0">
              {item.title}
            </a>
          ) : (
            <Link href={href} className="after:absolute after:inset-0">
              {item.title}
            </Link>
          )}
        </h3>
        {item.summary ? (
          <p className="mt-3 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{item.summary}</p>
        ) : null}
        <span className="type-small mt-6 inline-flex items-center gap-1.5 font-semibold text-primary" aria-hidden="true">
          {external ? "View on Wikipedia" : "View profile"}
          <Icon name="i-arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function PortfolioSection({ items }: { items: PublicPortfolioItem[] }) {
  if (items.length === 0) return null;
  // Entries with a real photo lead; generic-avatar entries fill in after.
  const ordered = [...items].sort(
    (a, b) => Number(isGenericAvatar(a.imageUrl)) - Number(isGenericAvatar(b.imageUrl)),
  );

  return (
    <Section tone="white" id="work" labelledBy="work-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          id="work-title"
          align="left"
          eyebrow="Our Portfolio"
          title={
            <>
              Recent Wikipedia <span>Publications</span>
            </>
          }
          description="A selection of published articles for authors, executives, and organisations, each built on independent coverage."
        />
        <ArrowLink href={url("portfolio")} className="shrink-0">
          View all work
        </ArrowLink>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ordered.slice(0, 6).map((item, index) => (
          <li key={item.id ?? `${item.slug}-${index}`}>
            <PortfolioCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
