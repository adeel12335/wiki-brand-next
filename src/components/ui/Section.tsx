import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const TONES = {
  white: "bg-white",
  surface: "bg-surface",
  tint: "bg-accent-soft",
  primary: "bg-primary text-white",
} as const;

export type SectionTone = keyof typeof TONES;

/**
 * Page section: background tone + consistent vertical rhythm + container.
 * Pass `labelledBy` with the id of the section's heading for accessibility.
 */
export function Section({
  children,
  tone = "white",
  id,
  labelledBy,
  className,
  containerClassName,
}: {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-20 lg:py-24", TONES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
