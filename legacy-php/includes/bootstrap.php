<?php
/**
 * Single entry point for every page: configuration, content, SEO, and partials.
 *
 * db.php and portfolio-repo.php only define functions — no connection is opened
 * until something actually queries the database.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/data.php';
require_once __DIR__ . '/seo.php';
require_once __DIR__ . '/components.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/portfolio-repo.php';
