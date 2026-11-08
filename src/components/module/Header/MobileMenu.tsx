"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/module/Button";
import { MenuItem } from "./MegaMenu";
import { aboutNav, headerActions, primaryNav } from "@/config/navigation";
import { SITE_PHONE, SITE_PHONE_RAW } from "@/lib/config";
import { cn } from "@/lib/cn";

/** Figma: M / Header + M / Menu (Expanded = None / Services / Insights / About). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Every link inside the drawer calls this, so the menu closes on navigation.
  const close = () => {
    setOpen(false);
    setExpanded(null);
  };
  const items = [...primaryNav, aboutNav];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-[38px] place-items-center rounded-lg border border-heading/15 text-heading lg:hidden"
      >
        <Icon name="menu" size={20} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-ink transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <Logo tone="dark" />
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="grid size-[42px] place-items-center rounded-lg border border-white/15 text-gold"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-3" aria-label="Mobile">
          {items.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="border-b border-white/10">
                {item.groups ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className={cn("flex w-full items-center justify-between py-[18px] text-xl font-bold", isOpen ? "text-gold" : "text-on-dark")}
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      size={18}
                      className={cn("transition-transform duration-200", isOpen ? "rotate-180 text-gold" : "text-on-dark-muted")}
                    />
                  </button>
                ) : (
                  <Link href={item.href} onClick={close} className="block py-[18px] text-xl font-bold text-on-dark">
                    {item.label}
                  </Link>
                )}

                {item.groups && isOpen ? (
                  <div className="mb-4 flex flex-col gap-4 rounded-[14px] bg-mist p-3 py-4">
                    {item.groups.map((group) => (
                      <div key={group.label} className="flex flex-col">
                        <p className="px-3 pb-1 text-[11px] font-bold tracking-[0.12em] text-gold-dark uppercase">{group.label}</p>
                        {group.links.map((link) => (
                          <MenuItem key={link.href + link.label} link={link} onNavigate={close} compact />
                        ))}
                      </div>
                    ))}
                    {item.feature ? (
                      <Link href={item.feature.cta.href} onClick={close} className="flex flex-col gap-2 rounded-xl bg-ink p-[18px]">
                        <span className="text-[11px] font-bold tracking-[0.12em] text-gold uppercase">{item.feature.kicker}</span>
                        <span className="text-[17px] font-bold text-on-dark">{item.feature.title}</span>
                        <span className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-gold">
                          {item.feature.cta.label} <Icon name="arrow" size={14} />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 px-5 pt-6 pb-8" onClick={close}>
          <Button href={headerActions.primary.href} variant="gold" className="w-full">
            Request a Free Assessment
          </Button>
          <Button href={headerActions.secondary.href} variant="ghost" className="w-full">
            {headerActions.secondary.label}
          </Button>
          <a href={`tel:${SITE_PHONE_RAW}`} className="flex items-center justify-center gap-2 py-1.5 text-sm text-on-dark">
            <Icon name="phone" size={14} className="text-gold" />
            {SITE_PHONE}
          </a>
        </div>
      </div>
    </>
  );
}
