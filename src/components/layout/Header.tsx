"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  NAV_ITEMS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_RAW,
  navIsActive,
  url,
} from "@/lib/config";
import { AUDIENCE_LINKS, CASE_STUDIES_LINK } from "@/lib/data/audience-links";

const ALERT_DISMISSED_KEY = "ws-site-alert-dismissed";

/** Below this width the desktop bar collapses into the drawer (matches layout.css). */
const DRAWER_BREAKPOINT = 1100;

/** Home is the logo and Contact is the CTA, so the desktop bar skips both. */
const DESKTOP_NAV = NAV_ITEMS.filter(
  (item) => item.slug !== "" && item.slug !== "contact",
);

const AUDIENCE_META: Record<string, { icon: string; blurb: string }> = {
  "wikipedia-page-for-companies": {
    icon: "i-building",
    blurb: "Brands, startups and established firms",
  },
  "wikipedia-page-for-authors": {
    icon: "i-write",
    blurb: "Novelists and non-fiction writers",
  },
  "wikipedia-page-for-academics": {
    icon: "i-research",
    blurb: "Researchers, professors and scientists",
  },
  "wikipedia-page-for-musicians": {
    icon: "i-users",
    blurb: "Artists, bands and composers",
  },
};

export function Header() {
  const pathname = usePathname();
  const currentSlug = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [megaOpen, setMegaOpen] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const megaRef = useRef<HTMLLIElement>(null);
  const lastPointer = useRef("");

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const audienceActive = AUDIENCE_LINKS.some((item) =>
    navIsActive(item.slug, currentSlug),
  );

  useEffect(() => {
    setMobileReady(true);
    try {
      if (window.localStorage.getItem(ALERT_DISMISSED_KEY) === "1") {
        setAlertOpen(false);
      }
    } catch {
      // Storage blocked (private mode), keep the bar visible.
    }
  }, []);

  // Main content is offset by the bar's height; keep that in sync when the
  // copy wraps (narrow screens, zoom).
  useEffect(() => {
    const node = alertRef.current;
    if (!alertOpen || !node) return;
    const root = document.documentElement;
    const sync = () => {
      // Hidden while the header is in its scrolled state, keep the last height.
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
      // Ignore, dismissal just will not persist.
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
      if (window.innerWidth > DRAWER_BREAKPOINT) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeMenu();
      setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // Close the mega panel on an outside click (touch / keyboard users).
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [megaOpen]);

  const closeMega = () => setMegaOpen(false);

  const headerClass = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    menuOpen ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} id="top">
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

      <div className="hdr-bar">
        <div className="shell hdr-inner">
          <Link className="brand" href={url()} aria-label={`${SITE_NAME} home`}>
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

          <nav className="hdr-nav" aria-label="Primary navigation">
            <ul className="hdr-links">
              {DESKTOP_NAV.map((item) => {
                const active = navIsActive(item.slug, currentSlug);
                return (
                  <li key={item.slug}>
                    <Link
                      href={url(item.slug)}
                      className={active ? "is-active" : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li
                className={`hdr-mega${megaOpen ? " is-open" : ""}`}
                ref={megaRef}
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className={audienceActive ? "is-active" : undefined}
                  aria-expanded={megaOpen}
                  aria-controls="hdr-mega-panel"
                  onPointerDown={(e) => {
                    lastPointer.current = e.pointerType;
                  }}
                  onClick={() => {
                    // Mouse users already opened it on hover; a click there
                    // must not immediately close it again.
                    if (lastPointer.current === "mouse") {
                      lastPointer.current = "";
                      setMegaOpen(true);
                      return;
                    }
                    setMegaOpen((o) => !o);
                  }}
                >
                  Who we help
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="hdr-mega-panel" id="hdr-mega-panel">
                  <div className="hdr-mega-grid">
                    {AUDIENCE_LINKS.map((item) => {
                      const meta = AUDIENCE_META[item.slug];
                      return (
                        <Link
                          key={item.slug}
                          href={url(item.slug)}
                          className="hdr-mega-item"
                          onClick={closeMega}
                          aria-current={
                            navIsActive(item.slug, currentSlug) ? "page" : undefined
                          }
                        >
                          <span className="hdr-mega-icon">
                            <Icon name={meta?.icon ?? "i-users"} />
                          </span>
                          <span className="hdr-mega-text">
                            <b>{item.label}</b>
                            {meta ? <small>{meta.blurb}</small> : null}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    className="hdr-mega-feature"
                    href={url(CASE_STUDIES_LINK.slug)}
                    onClick={closeMega}
                  >
                    <small>Proof of work</small>
                    <b>{CASE_STUDIES_LINK.label}</b>
                    <span>
                      See how pages go from draft to published
                      <Icon name="i-arrow" />
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
          </nav>

          <div className="hdr-actions">
            <a className="hdr-phone" href={`tel:${SITE_PHONE_RAW}`}>
              <span className="hdr-phone-icon">
                <Icon name="i-contact-phone" />
              </span>
              <span className="hdr-phone-text">
                <small>Talk to an editor</small>
                {SITE_PHONE}
              </span>
            </a>
            <Link className="hdr-cta" href={url("contact")}>
              Get Started <Icon name="i-arrow" />
            </Link>
            <button
              className="hdr-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="hdr-drawer"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {mobileReady ? (
        <div
          className={`hdr-drawer${menuOpen ? " is-open" : ""}`}
          id="hdr-drawer"
          hidden={!menuOpen}
        >
          <nav className="hdr-drawer-body" aria-label="Mobile navigation">
            <p className="hdr-drawer-label">Menu</p>
            <ul className="hdr-drawer-links">
              {NAV_ITEMS.map((item) => {
                const active = navIsActive(item.slug, currentSlug);
                return (
                  <li key={item.slug || "home-mobile"}>
                    <Link
                      href={url(item.slug)}
                      className={active ? "is-active" : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                      <Icon name="i-arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="hdr-drawer-label">Who we help</p>
            <div className="hdr-drawer-chips">
              {AUDIENCE_LINKS.map((item) => (
                <Link
                  key={`mobile-${item.slug}`}
                  href={url(item.slug)}
                  className={navIsActive(item.slug, currentSlug) ? "is-active" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <Link href={url(CASE_STUDIES_LINK.slug)} onClick={closeMenu}>
                {CASE_STUDIES_LINK.label}
              </Link>
            </div>

            <div className="hdr-drawer-contact">
              <a href={`mailto:${SITE_EMAIL}`}>
                <Icon name="i-contact-mail" />
                {SITE_EMAIL}
              </a>
              <a href={`tel:${SITE_PHONE_RAW}`}>
                <Icon name="i-contact-phone" />
                {SITE_PHONE}
              </a>
            </div>

            <Link className="hdr-cta hdr-cta--block" href={url("contact")} onClick={closeMenu}>
              Request a free assessment <Icon name="i-arrow" />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
