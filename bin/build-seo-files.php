<?php
/**
 * Generate static sitemap.xml and robots.txt.
 *
 * Hosts that do not read .htaccess (nginx, for example) cannot rewrite
 * /sitemap.xml onto sitemap.php. Running this once at deploy time writes plain
 * files that any web server can serve:
 *
 *   php bin/build-seo-files.php https://www.example.com
 *
 * The .htaccess rewrites are conditional on the static files being absent, so
 * generating them here takes precedence on Apache too.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

$origin = $argv[1] ?? '';
if ($origin === '' || !preg_match('#^https?://[^/\s]+$#', $origin)) {
    fwrite(STDERR, "Usage: php bin/build-seo-files.php https://www.example.com\n");
    exit(1);
}

// The helpers derive every URL from SITE_URL, which config.php reads from here.
putenv('SITE_URL=' . rtrim($origin, '/'));
$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__);

require dirname(__DIR__) . '/includes/bootstrap.php';

$root = dirname(__DIR__);

// --- sitemap.xml ----------------------------------------------------------
$xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

foreach (sitemap_routes() as $route) {
    $slug = trim($route['slug'], '/');
    $file = $slug === '' ? $root . '/index.php' : $root . '/' . $slug . '/index.php';
    $lastmod = is_file($file) ? date('Y-m-d', (int) filemtime($file)) : date('Y-m-d');

    $xml[] = '  <url>';
    $xml[] = '    <loc>' . e(abs_url($slug)) . '</loc>';
    $xml[] = '    <lastmod>' . $lastmod . '</lastmod>';
    $xml[] = '    <changefreq>' . $route['changefreq'] . '</changefreq>';
    $xml[] = '    <priority>' . $route['priority'] . '</priority>';
    $xml[] = '  </url>';
}

foreach (portfolio_published() as $item) {
    $lastmod = !empty($item['updated_at'])
        ? date('Y-m-d', (int) strtotime((string) $item['updated_at']))
        : date('Y-m-d');

    $xml[] = '  <url>';
    $xml[] = '    <loc>' . e(abs_url('portfolio/' . $item['slug'])) . '</loc>';
    $xml[] = '    <lastmod>' . $lastmod . '</lastmod>';
    $xml[] = '    <changefreq>monthly</changefreq>';
    $xml[] = '    <priority>0.6</priority>';
    $xml[] = '  </url>';
}

$xml[] = '</urlset>';
file_put_contents($root . '/sitemap.xml', implode("\n", $xml) . "\n");

// --- robots.txt -----------------------------------------------------------
$robots = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Application internals — no indexable content',
    'Disallow: /includes/',
    'Disallow: /bin/',
    'Disallow: /contact/?sent=',
    '',
    'Sitemap: ' . SITE_URL . '/sitemap.xml',
];
file_put_contents($root . '/robots.txt', implode("\n", $robots) . "\n");

$count = count(sitemap_routes());
echo "Wrote sitemap.xml ({$count} URLs) and robots.txt for " . SITE_URL . "\n";
