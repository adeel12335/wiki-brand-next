<?php
/**
 * Shared template for every /services/<slug>/ detail page.
 *
 * The page file sets $serviceSlug and then requires this file, so all five
 * service pages share one layout and one set of SEO rules. Every section pulls
 * service-specific copy from services() rather than repeating boilerplate, which
 * keeps each page's content unique.
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
      <div class="shell definition-grid">
        <div class="reveal">
          <p class="micro-label">The Short Version</p>
          <h2><?= e($service['what_is_heading']) ?></h2>
          <p class="definition-copy"><?= e($service['what_is']) ?></p>
          <p class="reviewed-note">Reviewed <?= e(last_reviewed()) ?> · Written by the editorial team at <?= e(SITE_NAME) ?></p>
        </div>

        <aside class="who-panel reveal" data-delay="100">
          <h3><?= e($service['who_needs_heading']) ?></h3>
          <ul class="check-list compact">
            <?php foreach ($service['who_needs'] as $item): ?>
              <li><?= icon('i-check') ?><?= e($item) ?></li>
            <?php endforeach; ?>
          </ul>
          <a class="text-link" href="<?= e(url('contact')) ?>">Ask whether your subject qualifies <?= icon('i-arrow') ?></a>
        </aside>
      </div>
    </section>

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

    <section class="section-pad">
      <div class="shell split-grid">
        <div class="reveal">
          <p class="micro-label">How It Works</p>
          <h2><?= e($service['process_heading']) ?></h2>
          <ol class="numbered-steps">
            <?php foreach ($service['process_steps'] as $step): ?>
              <li><?= e($step) ?></li>
            <?php endforeach; ?>
          </ol>
          <a class="text-link" href="<?= e(url('our-process')) ?>">Read our full five-stage editorial process <?= icon('i-arrow') ?></a>
        </div>

        <div class="reveal" data-delay="100">
          <p class="micro-label">Fees</p>
          <h2><?= e($service['pricing_heading']) ?></h2>
          <p class="definition-copy"><?= e($service['pricing']) ?></p>
          <a class="text-link" href="<?= e(url('faq')) ?>">See what else clients ask about cost and timelines <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Results', $service['outcomes_heading']); ?>
        <div class="card-grid reveal">
          <?php foreach ($service['outcomes'] as $outcome): ?>
            <article class="service-card">
              <?= icon('i-check', 'card-icon') ?>
              <h3><?= e($outcome['title']) ?></h3>
              <p><?= e($outcome['copy']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="resources section-pad">
      <div class="shell resource-panel reveal">
        <div class="principles">
          <p class="micro-label">Why Work With Us</p>
          <h2>Guidelines first, <span>always.</span></h2>
          <p>Every engagement is run by editors who work to Wikipedia's own standards rather than around them. You can read more about <a href="<?= e(url('about-us')) ?>">the team and how we work</a>.</p>
          <div class="principle-grid">
            <article><?= icon('i-search') ?><div><strong>Assessment before invoice</strong><span>We tell you if the coverage is not there before you commit.</span></div></article>
            <article><?= icon('i-users') ?><div><strong>Disclosed paid editing</strong><span>Declared on Wikipedia, as its terms of use require.</span></div></article>
            <article><?= icon('i-review') ?><div><strong>Two editors per draft</strong><span>A second editor checks every claim against its source.</span></div></article>
            <article><?= icon('i-shield') ?><div><strong>No guarantees invented</strong><span>Volunteer reviewers decide, and we never pretend otherwise.</span></div></article>
          </div>
        </div>

        <div class="faq">
          <p class="micro-label"><?= e($service['name']) ?> Questions</p>
          <?php faq_list($service['faqs']); ?>
          <a class="text-link" href="<?= e(url('faq')) ?>">Read the full Wikipedia FAQ <?= icon('i-arrow') ?></a>
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
