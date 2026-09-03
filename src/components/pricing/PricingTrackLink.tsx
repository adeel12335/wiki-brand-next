"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function PricingTrackLink({
  href,
  className,
  children,
  event,
  tier,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  event: "pricing_cta_click" | "pricing_tier_click";
  tier?: string;
}) {
  return (
    <Link
      className={className}
      href={href}
      onClick={() => trackEvent(event, tier ? { tier_name: tier } : undefined)}
    >
      {children}
    </Link>
  );
}
