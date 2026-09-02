"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  NAV_ITEMS,
  SITE_NAME,
  navIsActive,
  url,
} from "@/lib/config";

export function Header() {
  const pathname = usePathname();
  const currentSlug = pathname === "/" ? "" : pathname.replace(/^\/|\/$/g, "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
      <div className="shell nav-shell">
        <Link className="brand" href={url()} aria-label={`${SITE_NAME} home`}>
          <Image
            src="/assets/globe-small.png"
            alt=""
            width={66}
            height={55}
            sizes="66px"
            quality={60}
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
          aria-label="Open menu"
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

      <nav
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
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
            >
              {item.label}
            </Link>
          );
        })}
        <Link className="button button-gold" href={url("contact")} onClick={closeMenu}>
          Get Started <Icon name="i-arrow" />
        </Link>
      </nav>
    </header>
  );
}
