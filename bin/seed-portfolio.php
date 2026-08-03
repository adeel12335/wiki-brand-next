<?php
/**
 * Seed the database with the portfolio entries that ship in includes/data.php.
 *
 *   php bin/seed-portfolio.php
 *
 * Existing rows are matched by slug and left alone, so running this after you
 * have edited items in the admin panel will not overwrite your work.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__);
require dirname(__DIR__) . '/includes/bootstrap.php';

if (!db_ready()) {
    fwrite(STDERR, "The database is not migrated yet. Run: php bin/db-migrate.php\n");
    exit(1);
}

$created = 0;
$skipped = 0;

foreach (portfolio_items() as $position => $item) {
    $slug = portfolio_slugify($item['title']);

    $statement = db()->prepare('SELECT id FROM portfolio_items WHERE slug = :slug LIMIT 1');
    $statement->execute(['slug' => $slug]);

    if ($statement->fetch() !== false) {
        echo "skip    {$slug} (already present)\n";
        $skipped++;
        continue;
    }

    portfolio_save([
        'slug'             => $slug,
        'title'            => $item['title'],
        'category'         => $item['title'],
        'summary'          => $item['copy'],
        'body'             => $item['detail'],
        'image_path'       => $item['image'],
        'image_alt'        => $item['alt'],
        'meta_title'       => $item['title'] . ' Wikipedia Page | Portfolio',
        // Left empty on purpose: the card summary is too short to fill a search
        // result, so portfolio_meta_description() builds a full-length one.
        'meta_description' => '',
        'status'           => 'published',
        'sort_order'       => $position,
    ]);

    echo "created {$slug}\n";
    $created++;
}

echo "\n{$created} created, {$skipped} skipped.\n";
