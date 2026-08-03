# Wikipedia Studio Website

PHP website for The Wikipedia Studio. Every section that used to be an anchor on
one long page is now its own indexable URL with its own title, meta description,
keywords, Open Graph tags, and structured data.

## Requirements

PHP 8.1 or newer. No build step, no Composer dependencies, no database.

## Local preview

```bash
php -S localhost:8000
```

Then open <http://localhost:8000>. The built-in server resolves directory URLs to
`index.php`, so every route works exactly as it does on Apache.

## URL structure

| URL | File |
| --- | --- |
| `/` | `index.php` |
| `/about-us/` | `about-us/index.php` |
| `/services/` | `services/index.php` |
| `/services/wikipedia-page-creation/` | `services/wikipedia-page-creation/index.php` |
| `/services/wikipedia-page-editing/` | `services/wikipedia-page-editing/index.php` |
| `/services/wikipedia-content-writing/` | `services/wikipedia-content-writing/index.php` |
| `/services/wikipedia-page-management/` | `services/wikipedia-page-management/index.php` |
| `/services/wikipedia-reputation-management/` | `services/wikipedia-reputation-management/index.php` |
| `/our-process/` | `our-process/index.php` |
| `/portfolio/` | `portfolio/index.php` |
| `/faq/` | `faq/index.php` |
| `/contact/` | `contact/index.php` |
| `/privacy-policy/` | `privacy-policy/index.php` |
| `/terms-conditions/` | `terms-conditions/index.php` |
| `/sitemap.xml` | `sitemap.php` (via rewrite) |
| `/robots.txt` | `robots.php` (via rewrite) |
| 404 | `404.php` |

Routing needs no rewrite rules: each page is a directory containing `index.php`,
which resolves natively on Apache, nginx, and the PHP built-in server. Slugs are
keyword-led and lower-case with hyphens, and every URL ends in a trailing slash —
`url()` in `includes/config.php` is the only place that formats them.

## Project layout

```
includes/
  bootstrap.php      Loads everything below; the only require a page needs
  config.php         Brand constants, URL/base-path detection, view helpers
  data.php           Services, process, portfolio, testimonials, FAQ, routes
  seo.php            <head> renderer: meta, canonical, OG, Twitter, JSON-LD
  components.php     Reusable partials (page hero, breadcrumbs, cards, CTA)
  header.php         Opening layout and site navigation
  footer.php         Site footer and script tag
  icons.php          Inline SVG symbol library
  service-page.php   Shared template behind all five service detail pages
bin/
  build-seo-files.php  Writes static sitemap.xml + robots.txt for hosts
                       without .htaccess support
assets/              Brand imagery
styles.css           All styling, including the multi-page templates
script.js            Motion, navigation, carousels, FAQ, star field
.htaccess            Canonical redirects, sitemap rewrites, caching, headers
```

Adding a page means creating `<slug>/index.php`, setting its `$page` array, and
adding the slug to `sitemap_routes()` in `includes/data.php`. Adding a service
means one entry in `services()` plus a three-line `index.php` — the nav, cards,
detail page, sitemap, and schema all pick it up automatically.

## SEO

Each page defines a `$page` array that `seo_head()` turns into:

- a unique `<title>` and meta description, written for the Wikipedia editorial /
  reputation-management search space
- page-specific `keywords`, `robots`, and a self-referencing `canonical`
- `hreflang` (`en` plus `x-default`) pointing at the canonical URL
- complete Open Graph tags — `og:title`, `og:description`, `og:url`, `og:type`,
  `og:site_name`, `og:locale`, and `og:image` with real width/height read from
  the file on disk
- Twitter/X `summary_large_image` card tags
- a JSON-LD `@graph` containing `Organization` + `ProfessionalService`,
  `WebSite`, `WebPage`, and `BreadcrumbList`, plus per-page types: `Service` and
  `OfferCatalog` on service pages, `FAQPage` on `/faq/`, `HowTo` on
  `/our-process/`, `ItemList` on `/` `/services/` and `/portfolio/`,
  `AboutPage` on `/about-us/`, and `ContactPage` on `/contact/`

`dateModified` comes from each page file's modification time, and visible
breadcrumbs mirror the `BreadcrumbList` exactly.

Deliberately absent: `aggregateRating`. Review markup without verifiable reviews
behind it is a manual-action risk, so add it only alongside real, published
reviews.

### Content gates

The copy in `includes/data.php` and the page files is written to the content
gates in the [claude-seo](https://github.com/AgriciDaniel/claude-seo) skill, and
`bin/check-seo-gates.php` verifies them:

| Gate | Target |
| --- | --- |
| Word count | Homepage 500+, service page 800+, FAQ 800+, about/category 400+ |
| Title tag | 30–60 characters, unique per page |
| Meta description | 120–160 characters, unique per page |
| H1 | Exactly one, containing the page's primary keyword |
| Primary keyword | Present in the H1 and the first 100 words |
| Keyword density | Under 3% (measured excluding the sitewide footer) |
| Internal links | 3+ per page with descriptive anchor text |
| Image alt text | 10–125 characters, descriptive |

Each service page follows the skill's service-page template: a plain-language
definition, who the service is for, how the engagement runs, how pricing works,
outcomes, why work with us, and five service-specific FAQs written answer-first
at roughly 40–60 words so they stand alone if quoted.

Run the checker against a local server:

```bash
php -S localhost:8000 &
php bin/check-seo-gates.php http://localhost:8000
```

### Known E-E-A-T gap

Google's helpful-content guidance asks *who* created a page. The service pages
carry a visible "Reviewed \<month\> · Written by the editorial team" line and
`/about-us/` documents the two-editor review standard, but there are no named
editors with credentials anywhere on the site, because inventing them would be
fabricating professional qualifications. Adding real bios — names, backgrounds,
and Wikipedia editing experience — is the single biggest remaining content
improvement, and it needs input from the business.

The same applies to the testimonials and the headline metrics (500+ pages, 98%
approval rate, 25+ editors) carried over from the original design: they should
be confirmed as accurate before launch. `aggregateRating` schema is deliberately
absent for the same reason.

### Canonical domain

`SITE_URL` is detected from the request (scheme, `X-Forwarded-Proto`, and `Host`),
so the same code produces correct absolute URLs on staging and production. Two
optional hardening steps for production:

- set a `SITE_URL` environment variable (e.g. `https://www.thewikipediastudio.com`)
  to pin the origin regardless of the `Host` header, or
- list your hostnames in `SITE_ALLOWED_HOSTS` in `includes/config.php`

Sub-directory deployments work too — `BASE_PATH` is derived by comparing the
project directory against the document root.

## Server configuration

`.htaccess` covers Apache: HTTPS and `index.php` redirects, `/sitemap.xml` and
`/robots.txt` rewrites, a 404 handler, compression, cache headers, and security
headers.

On nginx (Kinsta and similar), `.htaccess` is ignored. Routing still works, but
add the equivalents to the server block:

```nginx
error_page 404 /404.php;

location = /sitemap.xml { try_files $uri /sitemap.php; }
location = /robots.txt  { try_files $uri /robots.php; }

location ^~ /includes/ { deny all; }
location ^~ /bin/      { deny all; }
```

Or skip the rewrites entirely and generate static files at deploy time:

```bash
php bin/build-seo-files.php https://www.thewikipediastudio.com
```

That writes `sitemap.xml` and `robots.txt` as plain files. The `.htaccess`
rewrites are conditional on those files being absent, so generating them is safe
on Apache as well.

## Contact form

`/contact/` posts to itself, validates server-side, and sends through PHP's
`mail()` before redirecting to `?sent=1` (POST/redirect/GET, so a refresh cannot
resubmit). It carries a CSRF token in the session and a hidden honeypot field,
and strips newlines from header values. If `mail()` is unavailable the page says
so and shows the direct email address instead of failing silently.

To send through SMTP instead, replace the `mail()` call in
`contact/index.php` with your transport of choice.

## Notes

- `privacy-policy/` and `terms-conditions/` are written to match what the site
  actually does, but they are starting points — have them reviewed before launch.
- Google Fonts loads when a connection is available and falls back to system
  fonts when it is not.
- Portfolio entries are anonymised categories; client work stays confidential.
- All motion and interactivity remain vanilla CSS and JavaScript.
