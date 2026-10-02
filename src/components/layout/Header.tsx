"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  NAV_ITEMS,
  SITE_NAME,
  navIsActive,
  url,
} from "@/lib/config";

const ALERT_DISMISSED_KEY = "ws-site-alert-dismissed";

export function Header() {
  const pathname = usePathname();
  const currentSlug = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const alertRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMobileReady(true);
    try {
      if (window.localStorage.getItem(ALERT_DISMISSED_KEY) === "1") {
        setAlertOpen(false);
      }
    } catch {
      // Storage blocked (private mode) — keep the bar visible.
    }
  }, []);

  // Main content is offset by the bar's height; keep that in sync when the
  // copy wraps (narrow screens, zoom).
  useEffect(() => {
    const node = alertRef.current;
    if (!alertOpen || !node) return;
    const root = document.documentElement;
    const sync = () => {
      // Hidden while the header is in its scrolled state — keep the last height.
      if (node.offsetHeight > 0) {
        root.style.setProperty("--site-alert-h", `${node.offsetHeight}px`);
      }
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, [alertOpen]);

  const dismissAlert = () => {
    setAlertOpen(false);
    try {
      window.localStorage.setItem(ALERT_DISMISSED_KEY, "1");
    } catch {
      // Ignore — dismissal just will not persist.
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      id="top"
    >
      {alertOpen ? (
        <div className="site-alert" ref={alertRef} role="note">
          <div className="site-alert-inner">
            <span className="site-alert-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </svg>
            </span>
            <p>
              {SITE_NAME} is an independent editorial service and is not
              affiliated with{" "}
              <a href="https://www.wikipedia.org/" target="_blank" rel="noopener noreferrer">
                Wikipedia
              </a>{" "}
              or the{" "}
              <a
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
              className="site-alert-close"
              aria-label="Dismiss notice"
              onClick={dismissAlert}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
      <div className="shell nav-shell">
        <Link className="brand" href={url()}>
          <Image
            src="/assets/globe-small.png"
            alt=""
            width={66}
            height={55}
            sizes="66px"
            quality={75}
            loading="eager"
          />
          <span className="brand-copy">
            <b>The Wikipedia</b>
            <span>
              <i />
              Studio
              <i />
            </span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = navIsActive(item.slug, currentSlug);
            return (
              <Link
                key={item.slug || "home"}
                href={url(item.slug)}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link className="button button-gold nav-cta" href={url("contact")}>
          Get Started <Icon name="i-arrow" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg className="menu-icon" aria-hidden="true">
            <use href="#i-menu" />
          </svg>
          <svg className="close-icon" aria-hidden="true">
            <use href="#i-close" />
          </svg>
        </button>
      </div>

      {mobileReady ? (
        <nav
          className={`mobile-menu${menuOpen ? " open" : ""}`}
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {NAV_ITEMS.map((item) => {
            const active = navIsActive(item.slug, currentSlug);
            return (
              <Link
                key={item.slug || "home-mobile"}
                href={url(item.slug)}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            className="button button-gold"
            href={url("contact")}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Get Started <Icon name="i-arrow" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
