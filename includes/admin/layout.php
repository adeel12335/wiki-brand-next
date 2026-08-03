<?php
/**
 * Admin layout. Deliberately does not load the marketing site's CSS or JS — the
 * admin panel needs a fast, plain interface, not a star field.
 *
 * Expects $adminTitle, and $adminUser where a user is signed in.
 */

declare(strict_types=1);

if (!defined('APP_ROOT')) {
    http_response_code(403);
    exit('Direct access is not permitted.');
}

/** Open the admin document. */
function admin_head(string $title, ?array $user = null): void
{
    header('X-Robots-Tag: noindex, nofollow');
    header('Referrer-Policy: same-origin');
    header('X-Frame-Options: DENY');
    ?>
<!doctype html>
<html lang="<?= e(SITE_LANG) ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= e($title) ?> · <?= e(SITE_NAME) ?> admin</title>
  <link rel="icon" type="image/png" href="<?= e(asset('assets/globe-small.png')) ?>">
  <link rel="stylesheet" href="<?= e(asset('admin.css', true)) ?>">
</head>
<body>
  <header class="admin-bar">
    <a class="admin-brand" href="<?= e(BASE_PATH) ?>/admin/">
      <img src="<?= e(asset('assets/globe-small.png')) ?>" alt="" width="30" height="25">
      <span><?= e(SITE_NAME) ?> <b>admin</b></span>
    </a>
    <?php if ($user !== null): ?>
      <nav class="admin-nav">
        <a href="<?= e(BASE_PATH) ?>/admin/portfolio/">Portfolio</a>
        <a href="<?= e(url('portfolio')) ?>" target="_blank" rel="noopener">View site</a>
        <span class="admin-user">Signed in as <?= e($user['username']) ?></span>
        <form method="post" action="<?= e(BASE_PATH) ?>/admin/logout.php">
          <input type="hidden" name="token" value="<?= e(admin_token()) ?>">
          <button class="admin-btn ghost" type="submit">Sign out</button>
        </form>
      </nav>
    <?php endif; ?>
  </header>
  <main class="admin-main">
    <?php
}

/** Close the admin document. */
function admin_foot(): void
{
    ?>
  </main>
  <footer class="admin-foot">
    <p>Content changes go live immediately on published items. Drafts are visible only here.</p>
  </footer>
</body>
</html>
    <?php
}

/** Render a flash message if one is waiting. */
function admin_flash_notice(): void
{
    $flash = admin_flash();
    if ($flash === null) {
        return;
    }
    ?>
    <p class="admin-flash" role="status"><?= e($flash) ?></p>
    <?php
}
