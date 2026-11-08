"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { MegaMenu } from "./MegaMenu";
import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";

function isActive(pathname: string, item: NavItem): boolean {
  const paths = item.activePaths ?? [item.href, ...(item.groups?.flatMap((g) => g.links.map((l) => l.href)) ?? [])];
  return paths.some((p) => p !== "/" && !p.startsWith("tel:") && pathname.startsWith(p.split("#")[0]));
}

/** Figma: O2 / Nav Link - gold underline grows on hover; current page stays gold. */
export function NavLink({ item, menuAlign = "center" }: { item: NavItem; menuAlign?: "center" | "right" }) {
  const pathname = usePathname() ?? "/";
  const active = isActive(pathname, item);
  return (
    // Not `relative`: the mega menu positions against the header shell so it stays on-screen.
    // Full header height so the pointer never leaves the hover group on its way to the panel.
    <div className="group flex h-full items-center">
      <Link
        href={item.href}
        aria-haspopup={item.groups ? "true" : undefined}
        className={cn(
          "flex flex-col items-center gap-1 pt-1.5 text-base font-semibold tracking-[0.01em] transition-colors",
          active ? "text-gold-dark" : "text-heading hover:text-gold-dark",
        )}
      >
        <span className="flex items-center gap-1">
          {item.label}
          {item.groups ? (
            <Icon name="chevron-down" size={16} className="transition-transform duration-200 group-hover:rotate-180" />
          ) : null}
        </span>
        <span className={cn("h-0.5 rounded-full bg-gold transition-all duration-200", active ? "w-7" : "w-0 group-hover:w-7")} />
      </Link>
      {item.groups ? <MegaMenu item={item} align={menuAlign} /> : null}
    </div>
  );
}
