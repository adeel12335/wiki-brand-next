<?php
/**
 * 404 page. Wired up through .htaccess (ErrorDocument) and also included
 * directly by templates that detect an unknown slug.
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

if (!headers_sent()) {
    http_response_code(404);
}

$page = [
    'slug'        => '404',
    'title'       => 'Page Not Found | ' . SITE_NAME,
    'short_title' => 'Page not found',
    'description' => 'The page you were looking for could not be found. Browse our Wikipedia services, process, and resources instead.',
    'robots'      => 'noindex, follow',
];

require __DIR__ . '/includes/header.php';
?>

    <section class="page-hero error-hero" aria-labelledby="page-title">
      <div class="page-hero-glow" aria-hidden="true"></div>
      <div class="shell">
        <div class="page-hero-copy">
          <p class="micro-label">Error 404</p>
          <h1 id="page-title">That page could not be <span>found.</span></h1>
          <p class="page-hero-lede">The link may be outdated, or the address may have been mistyped. Everything on the site is reachable from the links below.</p>
          <div class="hero-actions">
            <a class="button button-gold magnetic" href="<?= e(url()) ?>">Back To Home <?= icon('i-arrow') ?></a>
            <a class="button button-outline magnetic" href="<?= e(url('services')) ?>">Browse Services <?= icon('i-arrow') ?></a>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Site Directory', 'Where would you like to go?'); ?>
        <div class="card-grid reveal">
          <?php foreach (services() as $slug => $service) {
              service_card((string) $slug, $service);
          } ?>
        </div>
        <div class="section-actions reveal">
          <a class="button button-outline button-small" href="<?= e(url('contact')) ?>">Contact Us <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

<?php require __DIR__ . '/includes/footer.php'; ?>
