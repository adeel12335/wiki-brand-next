THE WIKIPEDIA STUDIO WEBSITE (PHP)

Requirements
  PHP 8.1 or newer. No build step, no Composer, no database.

How to preview
  php -S localhost:8000
  Then open http://localhost:8000

Pages (each is a directory containing index.php)
  /                                            index.php
  /about-us/                                   about-us/
  /services/                                   services/
  /services/wikipedia-page-creation/           services/wikipedia-page-creation/
  /services/wikipedia-page-editing/            services/wikipedia-page-editing/
  /services/wikipedia-content-writing/         services/wikipedia-content-writing/
  /services/wikipedia-page-management/         services/wikipedia-page-management/
  /services/wikipedia-reputation-management/   services/wikipedia-reputation-management/
  /our-process/                                our-process/
  /portfolio/                                  portfolio/
  /faq/                                        faq/
  /contact/                                    contact/
  /privacy-policy/                             privacy-policy/
  /terms-conditions/                           terms-conditions/
  /sitemap.xml                                 sitemap.php (via rewrite)
  /robots.txt                                  robots.php (via rewrite)
  404                                          404.php

Shared code
  includes/bootstrap.php     Loads config, data, SEO, and components
  includes/config.php        Constants, URL detection, view helpers
  includes/data.php          Services, process, portfolio, FAQ, sitemap routes
  includes/seo.php           Meta, canonical, Open Graph, Twitter, JSON-LD
  includes/components.php    Page hero, breadcrumbs, cards, CTA band
  includes/header.php        Head output and navigation
  includes/footer.php        Footer and script tag
  includes/icons.php         Inline SVG symbols
  includes/service-page.php  Template shared by all five service pages
  bin/build-seo-files.php    Static sitemap.xml + robots.txt generator

Deployment notes
  Apache: .htaccess handles HTTPS, canonical redirects, sitemap rewrites,
  caching, and security headers.
  nginx: .htaccess is ignored; routing still works. Either add the location
  blocks documented in README.md, or run
    php bin/build-seo-files.php https://www.example.com
  to write static sitemap.xml and robots.txt files.

Notes
  Canonical and Open Graph URLs auto-detect the current host. Pin them in
  production with a SITE_URL environment variable if preferred.
  Google Fonts loads when a connection is available and falls back to system
  fonts if not.
  All effects and interactions remain vanilla CSS and JavaScript.
  See README.md for the full SEO and configuration reference.
