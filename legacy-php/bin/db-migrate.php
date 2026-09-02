<?php
/**
 * Create or update the database schema.
 *
 *   php bin/db-migrate.php
 *
 * Safe to run repeatedly. Reads DB_* environment variables (see includes/db.php);
 * with none set it creates storage/database.sqlite.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__);
require dirname(__DIR__) . '/includes/bootstrap.php';

try {
    foreach (db_migrate() as $line) {
        echo $line . "\n";
    }
} catch (Throwable $e) {
    fwrite(STDERR, "Migration failed: " . $e->getMessage() . "\n");
    exit(1);
}

if (db_driver() === 'sqlite') {
    echo 'SQLite file: ' . db_sqlite_path() . "\n";
}

$count = (int) db()->query('SELECT COUNT(*) AS c FROM portfolio_items')->fetch()['c'];
$admins = (int) db()->query('SELECT COUNT(*) AS c FROM admin_users')->fetch()['c'];

echo "Portfolio items: {$count}\n";
echo "Admin users: {$admins}\n";

if ($admins === 0) {
    echo "\nNo admin user yet. Create one with:\n  php bin/create-admin.php <username>\n";
}
