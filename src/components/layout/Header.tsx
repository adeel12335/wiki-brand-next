"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { NAV_ITEMS, SITE_NAME, navIsActive, url } from "@/lib/config";
import { cn } from "@/lib/cn";

const NOTICE_KEY = "ws-site-alert-dismissed";
const noticeListeners = new Set<() => void>();

function readNoticeDismissed(): boolean {
  try {
    return window.localStorage.getItem(NOTICE_KEY) === "1";
  } catch {
    return false; // storage blocked: keep the notice visible
  }
}

function subscribeNotice(listener: () => void) {
  noticeListeners.add(listener);
  return () => {
    noticeListeners.delete(listener);
  };
}

function dismissNotice() {
  try {
    window.localStorage.setItem(NOTICE_KEY, "1");
  } catch {
    // ignore — the dismissal just will not persist
  }
  noticeListeners.forEach((listener) => listener());
}

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href={url()} className="flex shrink-0 items-center gap-3" aria-label={`${SITE_NAME} home`}>
      <Image src="/assets/globe-small.png" alt="" width={44} height={37} sizes="44px" priority />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-base font-extrabold tracking-tight lg:text-lg",
            inverted ? "text-white" : "text-ink",
          )}
        >
          The Wikipedia
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6875rem] font-semibold tracking-[0.32em] uppercase",
            inverted ? "text-accent-soft" : "text-accent",
          )}
        >
          Studio
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const currentSlug = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const [menuOpen, setMenuOpen] = useState(false);
  const noticeDismissed = useSyncExternalStore(subscribeNotice, readNoticeDismissed, () => false);

  // While the mobile menu is open: lock page scroll, close on Escape or desktop width.
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onDesktop = () => {
      if (desktop.matches) close();
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {noticeDismissed ? null : (
        <div className="bg-primary-dark text-white/85" role="note">
          <Container className="flex items-center gap-3 py-2">
            <p className="type-small flex-1 text-center">
              {SITE_NAME} is an independent editorial service and is not affiliated with{" "}
              <a
                className="font-semibold text-white underline underline-offset-2"
                href="https://www.wikipedia.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia
              </a>{" "}
              or the{" "}
              <a
                className="font-semibold text-white underline underline-offset-2"
                href="https://wikimediafoundation.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikimedia Foundation
              </a>
              .
            </p>
            <button
              type="button"
              onClick={dismissNotice}
              aria-label="Dismiss notice"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-white/10"
            >
              <Icon name="i-close" className="size-4" />
            </button>
          </Container>
        </div>
      )}

      <div className="border-b border-line bg-white/95 backdrop-blur">
        <Container className="flex h-18 items-center justify-between gap-6">
          <Brand />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const active = navIsActive(item.slug, currentSlug);
                return (
                  <li key={item.slug || "home"}>
                    <Link
                      href={url(item.slug)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-2.5 py-2 text-[0.9375rem] font-medium transition-colors xl:px-3",
                        active
                          ? "bg-accent-soft text-primary"
                          : "text-ink/80 hover:bg-surface hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href={url("contact")} className="min-h-11 px-5">
                Get Started
              </ButtonLink>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? "i-close" : "i-menu"} className="size-5" />
            </button>
          </div>
        </Container>

        <nav
          id="mobile-menu"
          aria-label="Mobile"
          hidden={!menuOpen}
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <Container className="py-4">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const active = navIsActive(item.slug, currentSlug);
                return (
                  <li key={item.slug || "home-mobile"}>
                    <Link
                      href={url(item.slug)}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-line/70 py-3.5 text-base font-medium",
                        active ? "text-primary" : "text-ink",
                      )}
                    >
                      {item.label}
                      <Icon name="i-arrow" className="size-4 text-accent" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href={url("contact")} className="mt-5 w-full">
              Get Started
            </ButtonLink>
          </Container>
        </nav>
      </div>
    </header>
  );
}
