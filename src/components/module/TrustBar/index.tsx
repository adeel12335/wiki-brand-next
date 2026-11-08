import { Icon } from "@/components/ui/Icon";
import { trustItems } from "@/config/navigation";

/** Figma: Trust Bar - desktop only (hidden below md, as in the mobile design). */
export function TrustBar() {
  return (
    <div className="hidden bg-ink md:block">
      <ul className="shell flex h-[42px] items-center justify-center gap-10 text-[13px] text-on-dark">
        {trustItems.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Icon name="check" size={14} className="text-gold" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
