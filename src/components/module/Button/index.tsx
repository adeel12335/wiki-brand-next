import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type ButtonVariant = "gold" | "navy" | "outline-dark" | "ghost" | "outline-light";

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  size?: "md" | "sm";
  className?: string;
}

type ButtonAsLink = BaseProps & { href: string; type?: never; onClick?: never; disabled?: never };
type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const VARIANTS: Record<ButtonVariant, string> = {
  gold: "border border-gold-eyebrow bg-linear-to-b from-gold-light to-gold-dark text-on-gold hover:from-[#f0c770] hover:to-[#d9a63b] hover:shadow-gold",
  navy: "border border-heading bg-heading text-white hover:bg-ink hover:shadow-[0_8px_22px_rgb(2_12_22/0.3)]",
  "outline-dark": "border border-gold/35 bg-ink/40 text-on-dark hover:border-gold hover:bg-gold hover:text-on-gold hover:shadow-gold",
  ghost: "border border-white/70 bg-transparent text-white hover:border-gold hover:bg-gold hover:text-on-gold",
  "outline-light": "border border-heading/15 bg-white text-heading hover:border-gold hover:text-gold-dark",
};

/** Figma: Button - Variant (Gold / Navy / Outline Dark / Ghost) × State (Default / Hover). */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "gold", arrow = false, size = "md", className } = props;
  const classes = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-btn font-semibold whitespace-nowrap transition-all duration-200",
    size === "md" ? "h-12 px-6 text-sm" : "h-10 px-4 text-[13px]",
    VARIANTS[variant],
    "disabled:pointer-events-none disabled:opacity-60",
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" /> : null}
    </>
  );

  if (props.href !== undefined) {
    const external = /^(https?:|mailto:|tel:)/.test(props.href);
    return external ? (
      <a href={props.href} className={classes} {...(props.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
      {content}
    </button>
  );
}

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Small "View all →" style link (gold on dark, gold-dark on light). */
export function TextLink({ href, children, tone = "dark", className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold transition-colors",
        tone === "dark" ? "text-gold-eyebrow hover:text-white" : "text-gold-dark hover:text-heading",
        className,
      )}
    >
      {children}
      <Icon name="arrow" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
