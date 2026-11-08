import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched public URLs: renders `(site)/not-found.tsx` inside the site layout
 * (header + footer) with a 404 status, instead of Next's bare default 404.
 */
export default function UnmatchedRoute() {
  notFound();
}
