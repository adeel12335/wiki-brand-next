import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const VARIANTS = {
  primary: "bg-primary text-white shadow-sm hover:bg-primary-dark",
  secondary: "border border-line bg-white text-primary hover:border-accent hover:bg-accent-soft",
  light: "bg-white text-primary shadow-sm hover:bg-accent-soft",
  outlineLight: "border border-white/40 text-white hover:border-white hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

const BASE =
  "type-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 transition-colors duration-200";

/** Link styled as a button. External / mailto / tel hrefs render a plain <a>. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  const classes = cn(BASE, VARIANTS[variant], "group", className);
  const content = (
    <>
      {children}
      {arrow ? (
        <Icon name="i-arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}

/** Inline text link with an arrow, for "View all" style actions. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "type-button group inline-flex items-center gap-2 text-primary hover:text-accent",
        className,
      )}
    >
      {children}
      <Icon name="i-arrow" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
