<?php
/**
 * Services index — /services/
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$allServices = services();

$page = [
    'slug'         => 'services',
    'title'        => 'Wikipedia Services | Page Creation, Editing & Management',
    'short_title'  => 'Services',
    'description'  => 'Wikipedia services for people and organisations: page creation, editing, content research, ongoing management, and entity building.',
    'keywords'     => 'wikipedia services, wikipedia page creation, wikipedia editing services, wikipedia content writing, wikipedia page management, wikipedia entity building, wikipedia agency services',
    'og_image'     => 'assets/og/hero-orbital-globe.jpg',
    'og_image_alt' => 'Wikipedia editorial services from The Wikipedia Studio',
    'breadcrumbs'  => [],
    'schema'       => [
        seo_item_list_node('services', 'Wikipedia editorial services', array_map(
            static fn (string $slug, array $service): array => [
                'name'        => $service['name'],
                'url'         => abs_url('services/' . $slug),
                'description' => $service['card'],
            ],
            array_keys($allServices),
            $allServices
        )),
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Our Services',
    'h1'          => 'Comprehensive Wikipedia solutions, delivered to <span>guideline standard.</span>',
    'lede'        => 'Five services covering the full lifecycle of an article — from the first notability assessment through to long-term monitoring. Each one is scoped in writing and delivered by editors who work to Wikipedia\'s own standards, not around them.',
    'breadcrumbs' => [],
    'current'     => 'Services',
    'actions'     => [
        ['label' => 'Request an Assessment', 'href' => url('contact')],
        ['label' => 'How We Work', 'href' => url('our-process'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell">
        <div class="card-grid reveal">
          <?php foreach ($allServices as $slug => $service) {
              service_card((string) $slug, $service);
          } ?>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell service-detail-list">
        <?php section_heading('Service Detail', 'What each engagement involves'); ?>
        <?php foreach ($allServices as $slug => $service): ?>
          <article class="detail-row reveal">
            <div class="detail-row-head">
              <?= icon($service['icon'], 'card-icon') ?>
              <div>
                <h3><a href="<?= e(url('services/' . $slug)) ?>"><?= e($service['name']) ?></a></h3>
                <p><?= e($service['lede']) ?></p>
              </div>
            </div>
            <ul class="check-list compact">
              <?php foreach (array_slice($service['includes'], 0, 4) as $item): ?>
                <li><?= icon('i-check') ?><?= e($item) ?></li>
              <?php endforeach; ?>
            </ul>
            <a class="text-link" href="<?= e(url('services/' . $slug)) ?>">Full <?= e($service['name']) ?> details <?= icon('i-arrow') ?></a>
          </article>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="resources section-pad">
      <div class="shell resource-panel reveal">
        <div class="principles">
          <p class="micro-label">What We Will Not Do</p>
          <h2>Honest limits, stated <span>up front.</span></h2>
          <p>Some things are simply not available from an ethical Wikipedia editor, and any agency promising them is misleading you.</p>
          <div class="principle-grid">
            <article><?= icon('i-shield') ?><div><strong>No guaranteed approval</strong><span>Volunteer reviewers decide, and no agency controls them.</span></div></article>
            <article><?= icon('i-users') ?><div><strong>No undisclosed paid editing</strong><span>Wikipedia's terms of use require disclosure, and we comply.</span></div></article>
            <article><?= icon('i-check') ?><div><strong>No unsourced claims</strong><span>If independent coverage does not support it, it does not go in.</span></div></article>
          </div>
        </div>

        <div class="faq">
          <p class="micro-label">Service Questions</p>
          <?php faq_list(array_slice(faqs(), 0, 4)); ?>
          <a class="text-link" href="<?= e(url('faq')) ?>">See all questions <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
