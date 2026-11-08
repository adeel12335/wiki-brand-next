import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/module/Button";
import type { MenuLink, NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";

/** One icon + title + description row (Figma: NAV / Menu Item). Shared by desktop and mobile menus. */
export function MenuItem({ link, onNavigate, compact = false }: { link: MenuLink; onNavigate?: () => void; compact?: boolean }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={cn("group/item flex items-start gap-3.5 rounded-xl transition-colors", compact ? "p-2.5" : "p-3 hover:bg-mist/70")}
    >
      {link.icon ? (
        <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gold/12 text-gold-dark transition-colors group-hover/item:bg-gold group-hover/item:text-on-gold">
          <Icon name={link.icon} size={18} />
        </span>
      ) : null}
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] font-bold text-heading transition-colors group-hover/item:text-gold-dark">{link.label}</span>
        {link.description ? <span className="text-[13px] leading-snug text-body">{link.description}</span> : null}
      </span>
    </Link>
  );
}

/** Desktop dropdown panel (Figma: NAV / Mega Menu - Services / Insights / About). */
export function MegaMenu({ item, align = "center" }: { item: NavItem; align?: "center" | "right" }) {
  if (!item.groups) return null;
  return (
    <div
      className={cn(
        "invisible absolute top-full z-50 opacity-0 transition-[opacity,visibility,margin] duration-200",
        "mt-2 group-hover:visible group-hover:mt-0 group-hover:opacity-100",
        "group-focus-within:visible group-focus-within:mt-0 group-focus-within:opacity-100",
        align === "center" ? "left-1/2 -translate-x-1/2" : "right-5",
      )}
    >
      <div className="relative flex gap-8 rounded-panel bg-white p-8 shadow-[0_30px_60px_rgb(2_12_22/0.22)] ring-1 ring-heading/5">
        {item.groups.map((group) => (
          <div key={group.label} className="flex w-[300px] flex-col gap-1">
            <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.12em] text-gold-dark uppercase">{group.label}</p>
            {group.links.map((link) => (
              <MenuItem key={link.href + link.label} link={link} />
            ))}
          </div>
        ))}
        {item.feature ? (
          <div className="flex w-[300px] flex-col gap-3.5 rounded-xl bg-ink p-7">
            <span className="grid size-11 place-items-center rounded-[10px] bg-gold text-on-gold">
              <Icon name={item.feature.icon} size={20} />
            </span>
            <p className="text-[11px] font-bold tracking-[0.12em] text-gold-eyebrow uppercase">{item.feature.kicker}</p>
            <p className="text-xl leading-snug font-bold text-white">{item.feature.title}</p>
            <p className="text-sm leading-relaxed text-on-dark-muted">{item.feature.copy}</p>
            <Button href={item.feature.cta.href} variant="gold" size="sm" arrow className="mt-2 self-start">
              {item.feature.cta.label}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
