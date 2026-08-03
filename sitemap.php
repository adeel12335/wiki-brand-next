<?php
/**
 * XML sitemap, served at /sitemap.xml through the .htaccess rewrite (and always
 * available directly at /sitemap.php).
 *
 * URLs and last-modified dates are derived from the route table and the page
 * files themselves, so the sitemap never falls out of step with the site.
 */

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

/** Filesystem path of the PHP file that renders a slug. */
function sitemap_file_for_slug(string $slug): string
{
    $slug = trim($slug, '/');

    return $slug === ''
        ? APP_ROOT . '/index.php'
        : APP_ROOT . '/' . $slug . '/index.php';
}

header('Content-Type: application/xml; charset=UTF-8');
header('X-Robots-Tag: noindex');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach (sitemap_routes() as $route) {
    $file    = sitemap_file_for_slug($route['slug']);
    $lastmod = is_file($file) ? date('Y-m-d', (int) filemtime($file)) : date('Y-m-d');

    echo "  <url>\n";
    echo '    <loc>' . e(abs_url($route['slug'])) . "</loc>\n";
    echo '    <lastmod>' . e($lastmod) . "</lastmod>\n";
    echo '    <changefreq>' . e($route['changefreq']) . "</changefreq>\n";
    echo '    <priority>' . e($route['priority']) . "</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>' . "\n";
