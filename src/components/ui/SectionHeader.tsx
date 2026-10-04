import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow + H2 + optional intro, used at the top of every section.
 * `onDark` switches colours for sections on the primary background.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  onDark = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("type-eyebrow mb-3", onDark ? "text-accent-soft" : "text-accent")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={cn("type-h2 heading-highlight", onDark && "text-white")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("type-body mt-4", onDark ? "text-white/80" : "text-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
