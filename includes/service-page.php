<?php
/**
 * Shared template for every /services/<slug>/ detail page.
 *
 * The page file sets $serviceSlug and then requires this file, so all five
 * service pages share one layout and one set of SEO rules.
 */

declare(strict_types=1);

if (!defined("APP_ROOT")) {
    http_response_code(403);
    exit("Direct access is not permitted.");
}

if (!isset($serviceSlug)) {
    http_response_code(500);
    exit('service-page.php requires $serviceSlug.');
}

$allServices = services();

if (!isset($allServices[$serviceSlug])) {
    http_response_code(404);
    require APP_ROOT . '/404.php';
    exit;
}

$service = $allServices[$serviceSlug];
$slug    = 'services/' . $serviceSlug;

// Sibling services for the cross-link rail at the foot of the page.
$otherServices = array_filter(
    $allServices,
    static fn (string $key): bool => $key !== $serviceSlug,
    ARRAY_FILTER_USE_KEY
);

$page = [
    'slug'         => $slug,
    // No brand suffix here: the service titles are already at the length a
    // search result shows without truncating.
    'title'        => $service['meta_title'],
    'short_title'  => $service['name'],
    'breadcrumb_name' => $service['name'],
    'description'  => $service['meta_desc'],
    'keywords'     => $service['keywords'],
    'og_image'     => $service['og_image'],
    'og_image_alt' => $service['name'] . ' — ' . SITE_NAME,
    'breadcrumbs'  => [['label' => 'Services', 'slug' => 'services']],
    'schema'       => [seo_service_node($serviceSlug, $service)],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => $service['eyebrow'],
    'h1'          => $service['h1'],
    'lede'        => $service['lede'],
    'breadcrumbs' => [['label' => 'Services', 'slug' => 'services']],
    'current'     => $service['name'],
    'actions'     => [
        ['label' => 'Request an Assessment', 'href' => url('contact')],
        ['label' => 'All Services', 'href' => url('services'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell split-grid">
        <div class="section-copy reveal">
          <p class="micro-label">What This Service Covers</p>
          <h2>Everything included as <span>standard.</span></h2>
          <p>Scope is agreed in writing before work starts. Nothing on this list is an upsell — it is what a compliant, durable article needs in order to hold up under review and over time.</p>
          <ul class="check-list">
            <?php foreach ($service['includes'] as $item): ?>
              <li><?= icon('i-check') ?><?= e($item) ?></li>
            <?php endforeach; ?>
          </ul>
          <a class="button button-gold button-small" href="<?= e(url('contact')) ?>">Discuss Your Project <?= icon('i-arrow') ?></a>
        </div>

        <div class="deliverable-stack reveal" data-delay="100">
          <p class="micro-label">What You Receive</p>
          <?php foreach ($service['deliverables'] as $deliverable): ?>
            <article class="deliverable-card">
              <h3><?= e($deliverable['title']) ?></h3>
              <p><?= e($deliverable['copy']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="section-pad process-compact">
      <div class="shell">
        <?php section_heading('How We Work', 'The same five steps, every engagement.'); ?>
        <div class="step-grid reveal">
          <?php foreach (process_steps() as $index => $step): ?>
            <article class="step-card">
              <div class="step-icon"><?= icon($step['icon']) ?></div>
              <b><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></b>
              <h3><?= e($step['title']) ?></h3>
              <p><?= e($step['card']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="section-actions reveal">
          <a class="button button-outline button-small" href="<?= e(url('our-process')) ?>">Read The Full Process <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Related Services', 'Other ways we can help'); ?>
        <div class="card-grid reveal">
          <?php foreach ($otherServices as $otherSlug => $other) {
              service_card((string) $otherSlug, $other);
          } ?>
        </div>
      </div>
    </section>

    <?php cta_band(
        'Not sure if a page is <span>realistic?</span>',
        'Ask for an honest notability assessment first. If the independent coverage is not there yet, we will tell you before any work is commissioned.',
        'Request An Assessment'
    ); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
