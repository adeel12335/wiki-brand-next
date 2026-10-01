# Home page — CSS map and class inventory

## Where the styles live

`src/app/(site)/globals.css` loads the stylesheets in this order. Later files win.

| File | What it owns |
| --- | --- |
| `site.css` | Legacy styles ported from the PHP site (~7,300 lines, many layered overrides) |
| `brand.css` | Global type system, section tones, utilities. Applies to every page |
| `layout.css` | Header, mobile menu, closing CTA band, footer. Applies to every page |
| `home.css` | Home page sections, grouped top → bottom |

The new files scope every rule with `body:not(#_)`. That selector matches every page but carries ID weight, so these rules beat the legacy class chains in `site.css` without `!important`. The admin panel (`.admin-body`) and the header are excluded from the base type rules.

## Brand type system (`brand.css`)

| Element | Rule |
| --- | --- |
| `p`, `ul li`, `li p` | 17px (`--type-p`), line-height 1.65 |
| Eyebrow (`.micro-label`, `.service-kicker`, `.portfolio-label`) | `#efc871`, `.6875rem` (darker `#9c6f1f` on white sections for contrast) |
| Section heading `h2` | Segoe UI, 36px (scales down to 28px on phones) |
| Hero heading `h1` | 60px (scales down to 36px on phones) |
| Links | No underline at rest, underline on hover and keyboard focus |
| Text on dark sections | Pure white |

### Utilities

| Class | Use |
| --- | --- |
| `.tone-dark` / `.tone-light` | Section background and palette (dark navy / white) |
| `.u-eyebrow` | Eyebrow label |
| `.u-heading` | Section heading |
| `.u-text` | Body paragraph |
| `.u-list` | Bulleted list with gold dots |
| `.u-card` | Card; dark by default, turns white inside `.tone-light` |

## Section rhythm

Hero (dark) → stats (gold) → about (white) → deep guide (dark) → services (white) → process (dark) → portfolio (white) → testimonials (dark) → Trustpilot (white) → insights (dark) → FAQ (white) → CTA (dark) → footer.

## Classes used on the home page, by section

`reveal` / `in-view` (scroll animation) and `shell` (page-width container) appear in most sections.

**Header** — `active`, `brand`, `brand-copy`, `button`, `button-gold`, `close-icon`, `desktop-nav`, `menu-icon`, `menu-toggle`, `mobile-menu`, `nav-cta`, `nav-shell`, `site-header`

**1–2. Hero + stats** — `hero`, `tone-dark`, `hero-actions`, `hero-answer`, `hero-art`, `hero-art-image`, `hero-beacon`, `hero-copy`, `hero-grid`, `hero-lede`, `hero-particles`, `hero-pricing-link`, `hero-proof`, `proof-avatars`, `button-outline`, `magnetic`, `micro-label`, `text-link`, `metrics-rail`, `metrics-rail-desktop`, `metric-copy`, `metric-icon`, `metric-index`, `metrics-carousel`, `metrics-carousel-arrow`, `metrics-carousel-arrow--next`, `metrics-carousel-arrow--previous`, `metrics-carousel-controls`, `metrics-carousel-dots`, `metrics-carousel-slide`, `metrics-carousel-track`, `metrics-carousel-viewport`

**3. About** — `about`, `about-grid`, `tone-light`, `section-pad`, `section-copy`, `check-list`, `button-small`, `experience-panel`, `experience-axis`, `experience-core`, `experience-signal`, `experience-stat`, `experience-trigger`, `top-left`, `top-right`, `bottom-left`, `bottom-right`

**4. Deep guide** — `home-deep-guide`, `tone-dark`, `home-deep-intro`, `process-timeline`, `timeline-item`, `timeline-marker`, `timeline-side`, `timeline-num`, `timeline-content`, `timeline-step`, `home-deep-cards`, `home-deep-panel`, `home-deep-compare`, `check-list`

**5. Services** — `services`, `tone-light`, `service-index`, `svc-heading`, `svc-grid`, `svc-card`, `svc-card--featured`, `svc-card-art`, `svc-card-shade`, `svc-card-body`, `svc-card-top`, `svc-card-icon`, `svc-card-num`, `svc-card-kicker`, `svc-card-title`, `svc-card-text`, `svc-card-link`, `section-actions`

**6. Process** — `process`, `tone-dark`, `process-showcase`, `proc-heading`, `proc-steps`, `proc-step`, `proc-step-dot`, `proc-step-num`, `proc-step-title`, `proc-step-card`, `is-active`, `is-done`, `proc-panel`, `proc-panel-index`, `proc-panel-copy`, `proc-panel-actions`

**7. Portfolio** — `work`, `tone-light`, `work-head`, `portfolio-showcase`, `portfolio-feature`, `portfolio-feature-copy`, `portfolio-feature-overlay`, `portfolio-index`, `portfolio-label`, `portfolio-mini-grid`, `portfolio-mini-card`, `portfolio-mini-copy`, `portfolio-mini-shade`, `portfolio-photo`, `portfolio-watermark`, `portfolio-watermark--feature`, `portfolio-watermark--mini`, `has-photo`

**8. Testimonials** — `testimonials`, `tone-dark`, `testimonial-heading`, `testimonial-card`, `testimonial-mark`, `testimonial-quote`, `testimonial-person`, `testimonial-avatar`, `testimonial-controls`, `testimonial-nav`, `testimonial-nav--prev`, `testimonial-pager`, `testimonial-slide`

**9. Trustpilot** — `trustpilot-section`, `tone-light`, `tp-layout`, `tp-intro`, `tp-points`, `tp-point-icon`, `tp-card`, `tp-card-label`, `tp-steps`, `tp-actions`

**10. Insights (blog)** — `blog-home-section`, `tone-dark`, `portfolio-heading`, `blog-grid`, `blog-grid--home`, `blog-card`, `blog-card-media`, `blog-card-image`, `blog-card-media-shade`, `blog-card-body`, `blog-card-meta`, `blog-card-category`, `blog-card-footer`

**11. FAQ** — `resources`, `tone-light`, `home-faq`, `home-faq-head`, `home-faq-actions`, `faq-item`, `is-open`, `faq-heading`, `faq-question`, `faq-toggle`, `faq-panel`, `faq-panel-inner`, `faq-answer`

**CTA band** — `cta-band`, `cta-band-inner`, `cta-band-copy`, `cta-band-visual`, `cta-band-ring`, `cta-band-ring--outer`, `cta-band-ring--inner`, `cta-band-globe`

**Footer** — `site-footer`, `footer-grid`, `footer-brand`, `footer-principles`, `footer-trustpilot-links`, `footer-column`, `footer-links`, `footer-services`, `footer-contact`, `footer-disclaimer`, `footer-bottom`
