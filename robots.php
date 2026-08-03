<?php
/**
 * robots.txt, served at /robots.txt through the .htaccess rewrite.
 *
 * Generated rather than static so the Sitemap directive carries the absolute URL
 * of whichever host the site is running on — staging or production.
 */

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

header('Content-Type: text/plain; charset=UTF-8');

$lines = [
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

echo implode("\n", $lines) . "\n";
