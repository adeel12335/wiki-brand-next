<?php
/**
 * SEO head rendering: title, meta, canonical, Open Graph, Twitter cards, and a
 * JSON-LD @graph.
 *
 * Pages build a $page array and pass it to seo_head(). Recognised keys:
 *
 *   slug        string   Route without slashes, '' for the home page (required)
 *   title       string   <title> and og:title (required)
 *   description string   meta description and og:description (required)
 *   keywords    string   Comma-separated industry keywords
 *   og_image    string   Project-relative image path, defaults to the hero art
 *   og_type     string   'website' by default
 *   robots      string   Overrides the default index/follow directives
 *   breadcrumbs array    [['label' => 'Services', 'slug' => 'services'], ...]
 *   schema      array    Extra JSON-LD nodes appended to the @graph
 *   modified    string   ISO-8601 date for dateModified
 */

declare(strict_types=1);

const SEO_DEFAULT_OG_IMAGE = 'assets/og/hero-orbital-globe.jpg';
const SEO_DEFAULT_ROBOTS   = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/** Stable @id references so the graph nodes can point at each other. */
function seo_id(string $fragment): string
{
    return SITE_URL . '/#' . $fragment;
}

/** The organisation behind every page — referenced by publisher and provider. */
function seo_organization_node(): array
{
    return [
        '@type'       => ['Organization', 'ProfessionalService'],
        '@id'         => seo_id('organization'),
        'name'        => SITE_NAME,
        'alternateName' => 'Wikipedia Studio',
        'url'         => abs_url(),
        'description' => 'Professional Wikipedia editorial agency providing page creation, editing, research, and ongoing management for individuals, businesses, and organisations.',
        'email'       => SITE_EMAIL,
        'telephone'   => SITE_PHONE_RAW,
        'logo'        => [
            '@type'  => 'ImageObject',
            '@id'    => seo_id('logo'),
            'url'    => asset_url('assets/globe.png'),
            'width'  => 729,
            'height' => 603,
            'caption' => SITE_NAME,
        ],
        'image'       => ['@id' => seo_id('logo')],
        'areaServed'  => ['@type' => 'Place', 'name' => 'Worldwide'],
        'knowsAbout'  => [
            'Wikipedia page creation',
            'Wikipedia editing guidelines',
            'Notability assessment',
            'Neutral point of view writing',
            'Citation and source verification',
            'Wikidata and structured entity data',
            'Online reputation management',
        ],
        'contactPoint' => [
            [
                '@type'             => 'ContactPoint',
                'contactType'       => 'customer service',
                'email'             => SITE_EMAIL,
                'telephone'         => SITE_PHONE_RAW,
                'availableLanguage' => ['English'],
                'areaServed'        => 'Worldwide',
            ],
        ],
        'openingHoursSpecification' => [
            [
                '@type'     => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens'     => '09:00',
                'closes'    => '18:00',
            ],
        ],
    ];
}

/** The site itself, so search engines can attach every page to one property. */
function seo_website_node(): array
{
    return [
        '@type'      => 'WebSite',
        '@id'        => seo_id('website'),
        'url'        => abs_url(),
        'name'       => SITE_NAME,
        'description' => SITE_TAGLINE,
        'publisher'  => ['@id' => seo_id('organization')],
        'inLanguage' => SITE_LANG,
    ];
}

/** BreadcrumbList built from the page's own breadcrumb trail. */
function seo_breadcrumb_node(array $breadcrumbs, string $currentName, string $currentSlug): ?array
{
    if ($breadcrumbs === []) {
        return null;
    }

    $trail = array_merge(
        [['label' => 'Home', 'slug' => '']],
        $breadcrumbs
    );

    $items = [];
    foreach ($trail as $position => $crumb) {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $position + 1,
            'name'     => $crumb['label'],
            'item'     => abs_url((string) $crumb['slug']),
        ];
    }

    // The current page closes the trail without a link, per Google's guidance.
    $items[] = [
        '@type'    => 'ListItem',
        'position' => count($items) + 1,
        'name'     => $currentName,
        'item'     => abs_url($currentSlug),
    ];

    return [
        '@type'           => 'BreadcrumbList',
        '@id'             => abs_url($currentSlug) . '#breadcrumb',
        'itemListElement' => $items,
    ];
}

/** The WebPage node for the current URL. */
function seo_webpage_node(array $page, string $imageUrl): array
{
    $url = abs_url($page['slug']);

    $node = [
        '@type'              => 'WebPage',
        '@id'                => $url . '#webpage',
        'url'                => $url,
        'name'               => $page['title'],
        'description'        => $page['description'],
        'isPartOf'           => ['@id' => seo_id('website')],
        'about'              => ['@id' => seo_id('organization')],
        'inLanguage'         => SITE_LANG,
        'primaryImageOfPage' => ['@type' => 'ImageObject', 'url' => $imageUrl],
    ];

    if (!empty($page['breadcrumbs'])) {
        $node['breadcrumb'] = ['@id' => $url . '#breadcrumb'];
    }

    if (!empty($page['modified'])) {
        $node['dateModified'] = $page['modified'];
    }

    return $node;
}

/** Last-modified timestamp of the page file, used as a truthful dateModified. */
function seo_modified(array $page): ?string
{
    if (!empty($page['modified'])) {
        return (string) $page['modified'];
    }

    $script = (string) ($_SERVER['SCRIPT_FILENAME'] ?? '');

    return is_file($script) ? date('c', (int) filemtime($script)) : null;
}

/**
 * Print the entire <head> metadata block for a page.
 */
function seo_head(array $page): void
{
    $slug        = (string) ($page['slug'] ?? '');
    $title       = (string) ($page['title'] ?? SITE_NAME . ' | ' . SITE_TAGLINE);
    $description = meta_trim((string) ($page['description'] ?? SITE_TAGLINE), 160);
    $keywords    = (string) ($page['keywords'] ?? '');
    $canonical   = abs_url($slug);
    $robots      = (string) ($page['robots'] ?? SEO_DEFAULT_ROBOTS);
    $ogType      = (string) ($page['og_type'] ?? 'website');
    $imagePath   = (string) ($page['og_image'] ?? SEO_DEFAULT_OG_IMAGE);
    $imageUrl    = asset_url($imagePath);
    $page['modified'] = seo_modified($page);

    $dimensions = @getimagesize(APP_ROOT . '/' . ltrim($imagePath, '/'));
    $imageWidth  = $dimensions[0] ?? null;
    $imageHeight = $dimensions[1] ?? null;

    // --- Core meta ---------------------------------------------------------
    echo '  <meta charset="utf-8">' . "\n";
    echo '  <meta name="viewport" content="width=device-width, initial-scale=1">' . "\n";
    echo '  <meta name="theme-color" content="#020c16">' . "\n";
    echo '  <title>' . e($title) . '</title>' . "\n";
    echo '  <meta name="description" content="' . e($description) . '">' . "\n";
    if ($keywords !== '') {
        echo '  <meta name="keywords" content="' . e($keywords) . '">' . "\n";
    }
    echo '  <meta name="robots" content="' . e($robots) . '">' . "\n";
    echo '  <meta name="author" content="' . e(SITE_NAME) . '">' . "\n";
    echo '  <meta name="publisher" content="' . e(SITE_NAME) . '">' . "\n";
    echo '  <link rel="canonical" href="' . e($canonical) . '">' . "\n";
    echo '  <link rel="alternate" hreflang="en" href="' . e($canonical) . '">' . "\n";
    echo '  <link rel="alternate" hreflang="x-default" href="' . e($canonical) . '">' . "\n";

    // --- Open Graph -------------------------------------------------------
    echo "\n";
    echo '  <meta property="og:site_name" content="' . e(SITE_NAME) . '">' . "\n";
    echo '  <meta property="og:type" content="' . e($ogType) . '">' . "\n";
    echo '  <meta property="og:locale" content="' . e(SITE_LOCALE) . '">' . "\n";
    echo '  <meta property="og:url" content="' . e($canonical) . '">' . "\n";
    echo '  <meta property="og:title" content="' . e($title) . '">' . "\n";
    echo '  <meta property="og:description" content="' . e($description) . '">' . "\n";
    echo '  <meta property="og:image" content="' . e($imageUrl) . '">' . "\n";
    echo '  <meta property="og:image:secure_url" content="' . e($imageUrl) . '">' . "\n";
    if ($imageWidth && $imageHeight) {
        echo '  <meta property="og:image:width" content="' . (int) $imageWidth . '">' . "\n";
        echo '  <meta property="og:image:height" content="' . (int) $imageHeight . '">' . "\n";
    }
    echo '  <meta property="og:image:alt" content="' . e($page['og_image_alt'] ?? $title) . '">' . "\n";

    // --- Twitter / X ------------------------------------------------------
    echo "\n";
    echo '  <meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '  <meta name="twitter:site" content="' . e(SITE_TWITTER) . '">' . "\n";
    echo '  <meta name="twitter:creator" content="' . e(SITE_TWITTER) . '">' . "\n";
    echo '  <meta name="twitter:title" content="' . e($title) . '">' . "\n";
    echo '  <meta name="twitter:description" content="' . e($description) . '">' . "\n";
    echo '  <meta name="twitter:image" content="' . e($imageUrl) . '">' . "\n";
    echo '  <meta name="twitter:image:alt" content="' . e($page['og_image_alt'] ?? $title) . '">' . "\n";

    // --- Assets -----------------------------------------------------------
    echo "\n";
    echo '  <link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">' . "\n";
    echo '  <link rel="icon" type="image/png" href="' . e(asset('assets/globe-small.png')) . '">' . "\n";
    echo '  <link rel="apple-touch-icon" href="' . e(asset('assets/globe-small.png')) . '">' . "\n";
    echo '  <link rel="stylesheet" href="' . e(asset('styles.css', true)) . '">' . "\n";
    echo '  <link rel="sitemap" type="application/xml" href="' . e(BASE_PATH . '/sitemap.xml') . '">' . "\n";

    // --- JSON-LD ----------------------------------------------------------
    $graph = [
        seo_organization_node(),
        seo_website_node(),
        seo_webpage_node($page, $imageUrl),
    ];

    $breadcrumb = seo_breadcrumb_node(
        (array) ($page['breadcrumbs'] ?? []),
        (string) ($page['breadcrumb_name'] ?? $page['short_title'] ?? $title),
        $slug
    );
    if ($breadcrumb !== null) {
        $graph[] = $breadcrumb;
    }

    foreach ((array) ($page['schema'] ?? []) as $node) {
        $graph[] = $node;
    }

    $jsonLd = json_encode(
        ['@context' => 'https://schema.org', '@graph' => $graph],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

    echo "\n";
    echo '  <script type="application/ld+json">' . "\n";
    // JSON-LD lives in a script element, so "</" is the only sequence that can
    // break out of it.
    echo str_replace('</', '<\/', (string) $jsonLd) . "\n";
    echo '  </script>' . "\n";
}

/**
 * A Service node for a service detail page.
 */
function seo_service_node(string $slug, array $service): array
{
    $url = abs_url('services/' . $slug);

    return [
        '@type'       => 'Service',
        '@id'         => $url . '#service',
        'name'        => $service['name'],
        'url'         => $url,
        'description' => $service['meta_desc'],
        'serviceType' => $service['name'],
        'category'    => 'Wikipedia editorial services',
        'provider'    => ['@id' => seo_id('organization')],
        'areaServed'  => ['@type' => 'Place', 'name' => 'Worldwide'],
        'audience'    => [
            '@type' => 'Audience',
            'audienceType' => 'Individuals, businesses, and organisations',
        ],
        'hasOfferCatalog' => [
            '@type' => 'OfferCatalog',
            'name'  => $service['name'] . ' deliverables',
            'itemListElement' => array_map(
                static fn (array $item): array => [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type'       => 'Service',
                        'name'        => $item['title'],
                        'description' => $item['copy'],
                    ],
                ],
                $service['deliverables']
            ),
        ],
    ];
}

/**
 * A FAQPage node built from the shared FAQ array.
 */
function seo_faq_node(array $items, string $slug): array
{
    return [
        '@type' => 'FAQPage',
        '@id'   => abs_url($slug) . '#faq',
        'mainEntity' => array_map(
            static fn (array $item): array => [
                '@type' => 'Question',
                'name'  => $item['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['a']],
            ],
            $items
        ),
    ];
}

/**
 * An ItemList node — used for the services and portfolio index pages.
 */
function seo_item_list_node(string $slug, string $name, array $items): array
{
    $elements = [];
    foreach ($items as $position => $item) {
        $element = [
            '@type'    => 'ListItem',
            'position' => $position + 1,
            'name'     => $item['name'],
        ];
        if (!empty($item['url'])) {
            $element['url'] = $item['url'];
        }
        if (!empty($item['description'])) {
            $element['description'] = $item['description'];
        }
        $elements[] = $element;
    }

    return [
        '@type'           => 'ItemList',
        '@id'             => abs_url($slug) . '#itemlist',
        'name'            => $name,
        'itemListOrder'   => 'https://schema.org/ItemListOrderAscending',
        'numberOfItems'   => count($items),
        'itemListElement' => $elements,
    ];
}
