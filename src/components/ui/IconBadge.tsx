import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Square tinted tile holding a line icon (service cards, feature lists). */
export function IconBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-primary",
        className,
      )}
    >
      <Icon name={name} className="size-6" />
    </span>
  );
}
