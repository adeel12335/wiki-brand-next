<?php
/**
 * Opening layout: <head> metadata, background canvases, and the site header.
 *
 * Expects a $page array in scope (see includes/seo.php for the recognised keys).
 */

declare(strict_types=1);

if (!defined("APP_ROOT")) {
    http_response_code(403);
    exit("Direct access is not permitted.");
}

if (!isset($page) || !is_array($page)) {
    $page = ['slug' => '', 'title' => SITE_NAME, 'description' => SITE_TAGLINE];
}

$currentSlug = trim((string) ($page['slug'] ?? ''), '/');
$bodyClass   = 'page-' . ($currentSlug === '' ? 'home' : str_replace('/', '-', $currentSlug));
?>
<!doctype html>
<html lang="<?= e(SITE_LANG) ?>">
<head>
<?php seo_head($page); ?>
</head>
<body class="<?= e($bodyClass) ?>">
  <a class="skip-link" href="#main">Skip to main content</a>

<?php require __DIR__ . '/icons.php'; ?>

  <canvas id="starfield" aria-hidden="true"></canvas>
  <div class="page-noise" aria-hidden="true"></div>

  <header class="site-header" id="top">
    <div class="shell nav-shell">
      <a class="brand" href="<?= e(url()) ?>" aria-label="<?= e(SITE_NAME) ?> home">
        <img src="<?= e(asset('assets/globe-small.png')) ?>" alt="" width="66" height="55">
        <span class="brand-copy"><b>The Wikipedia</b><span><i></i>Studio<i></i></span></span>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <?php foreach (nav_items() as $item):
            $active = nav_is_active($item['slug'], $currentSlug); ?>
          <a<?= $active ? ' class="active" aria-current="page"' : '' ?> href="<?= e(url($item['slug'])) ?>"><?= e($item['label']) ?></a>
        <?php endforeach; ?>
      </nav>

      <a class="button button-gold nav-cta" href="<?= e(url('contact')) ?>">Get Started <?= icon('i-arrow') ?></a>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <svg class="menu-icon" aria-hidden="true"><use href="#i-menu"/></svg><svg class="close-icon" aria-hidden="true"><use href="#i-close"/></svg>
      </button>
    </div>

    <nav class="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">
      <?php foreach (nav_items() as $item):
          $active = nav_is_active($item['slug'], $currentSlug); ?>
        <a<?= $active ? ' class="active" aria-current="page"' : '' ?> href="<?= e(url($item['slug'])) ?>"><?= e($item['label']) ?></a>
      <?php endforeach; ?>
      <a class="button button-gold" href="<?= e(url('contact')) ?>">Get Started <?= icon('i-arrow') ?></a>
    </nav>
  </header>

  <main id="main">
