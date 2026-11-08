import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface CheckRowProps {
  children: React.ReactNode;
  /** "dot" = gold filled circle (Figma: O2 / Check Row); "line" = outline check (Check Item). */
  variant?: "dot" | "line";
  tone?: "light" | "dark";
  className?: string;
}

export function CheckRow({ children, variant = "dot", tone = "light", className }: CheckRowProps) {
  return (
    <li className={cn("flex items-start gap-3.5 text-base md:text-[17px]", tone === "light" ? "text-heading" : "text-on-dark", className)}>
      {variant === "dot" ? (
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
          <Icon name="tick" size={14} strokeWidth={2.4} />
        </span>
      ) : (
        <Icon name="check" size={22} className="mt-0.5 shrink-0 text-gold" />
      )}
      <span className={variant === "line" && tone === "light" ? "text-body" : undefined}>{children}</span>
    </li>
  );
}
