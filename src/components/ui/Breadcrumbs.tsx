import Link from "next/link";
import { url } from "@/lib/config";

export function Breadcrumbs({
  crumbs,
  current,
}: {
  crumbs: Array<{ label: string; slug: string }>;
  current: string;
}) {
  if (crumbs.length === 0 && !current) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href={url()}>Home</Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.slug}>
            <Link href={url(crumb.slug)}>{crumb.label}</Link>
          </li>
        ))}
        <li>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
