<?php
/**
 * Portfolio detail page — /portfolio/<slug>/
 *
 * Reached through the .htaccess rewrite (see also the nginx block in README.md).
 * Also answers /portfolio/item.php?slug=… directly, so the page still works on a
 * server with no rewrite support.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$slug = portfolio_slugify((string) ($_GET['slug'] ?? ''));
$work = $slug !== '' ? portfolio_find_published($slug) : null;

// Before the database is seeded, resolve against the file-based entries so the
// links on /portfolio/ do not 404 during setup.
if ($work === null) {
    foreach (portfolio_fallback_items() as $candidate) {
        if ($candidate['slug'] === $slug) {
            $work = $candidate;
            break;
        }
    }
}

if ($work === null) {
    http_response_code(404);
    require APP_ROOT . '/404.php';
    exit;
}

$image     = portfolio_image_url($work['image_path']);
$ogImage   = $work['image_path'] ?? 'assets/og/portfolio-public-figure.jpg';
$updatedAt = $work['updated_at'] ?? null;

$page = [
    'slug'            => 'portfolio/' . $work['slug'],
    'title'           => $work['meta_title'] ?: $work['title'] . ' Wikipedia Page | Portfolio',
    'short_title'     => $work['title'],
    'breadcrumb_name' => $work['title'],
    'description'     => portfolio_meta_description($work),
    'keywords'        => $work['keywords'] ?: 'wikipedia portfolio, ' . strtolower($work['title']) . ' wikipedia page',
    'og_image'        => $ogImage,
    'og_image_alt'    => $work['image_alt'] ?: $work['title'],
    'og_type'         => 'article',
    'breadcrumbs'     => [['label' => 'Portfolio', 'slug' => 'portfolio']],
    'modified'        => $updatedAt !== null ? date('c', strtotime((string) $updatedAt)) : null,
    'schema'          => [
        [
            '@type'       => 'CreativeWork',
            '@id'         => abs_url('portfolio/' . $work['slug']) . '#work',
            'name'        => $work['title'],
            'url'         => abs_url('portfolio/' . $work['slug']),
            'description' => $work['summary'],
            'creator'     => ['@id' => seo_id('organization')],
            'about'       => $work['category'] !== '' ? $work['category'] : $work['title'],
            'isPartOf'    => ['@id' => abs_url('portfolio') . '#itemlist'],
        ],
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Portfolio' . ($work['category'] !== '' ? ' · ' . $work['category'] : ''),
    'h1'          => portfolio_heading($work),
    'lede'        => $work['summary'],
    'breadcrumbs' => [['label' => 'Portfolio', 'slug' => 'portfolio']],
    'current'     => $work['title'],
    'actions'     => [
        ['label' => 'Discuss A Similar Project', 'href' => url('contact')],
        ['label' => 'All Portfolio Work', 'href' => url('portfolio'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell work-detail">
        <?php if ($image !== null): ?>
          <figure class="work-figure reveal">
            <img src="<?= e($image) ?>" alt="<?= e($work['image_alt'] ?: $work['title']) ?>" width="960" height="640">
          </figure>
        <?php endif; ?>

        <div class="work-body reveal" data-delay="100">
          <p class="micro-label">Engagement Notes</p>
          <?php foreach (preg_split('/\R{2,}/', trim((string) ($work['body'] ?? ''))) ?: [] as $paragraph): ?>
            <?php if (trim($paragraph) !== ''): ?>
              <p><?= e(trim($paragraph)) ?></p>
            <?php endif; ?>
          <?php endforeach; ?>

          <?php if (!empty($work['external_url'])): ?>
            <p>
              <a class="text-link" href="<?= e($work['external_url']) ?>" target="_blank" rel="noopener">
                View the published work <?= icon('i-arrow') ?>
              </a>
            </p>
          <?php endif; ?>

          <?php if ($updatedAt !== null): ?>
            <p class="reviewed-note">Last updated <?= e(date('F Y', strtotime((string) $updatedAt))) ?></p>
          <?php endif; ?>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('How Work Like This Runs', 'The same standards on every engagement'); ?>
        <div class="card-grid reveal">
          <article class="service-card">
            <?= icon('i-search', 'card-icon') ?>
            <h3>Sourcing decides the article</h3>
            <p>What went in, and what was left out, followed the independent coverage rather than the brief. That is the part clients find most surprising.</p>
          </article>
          <article class="service-card">
            <?= icon('i-review', 'card-icon') ?>
            <h3>Two editors on every draft</h3>
            <p>One researches and writes, a second checks each claim against the source cited for it. You can read more in <a href="<?= e(url('about-us')) ?>">our editorial standards</a>.</p>
          </article>
          <article class="service-card">
            <?= icon('i-users', 'card-icon') ?>
            <h3>Disclosed, not covert</h3>
            <p>Paid contributions are declared on Wikipedia as its terms of use require, on this engagement and every other one.</p>
          </article>
        </div>
      </div>
    </section>

    <?php
    $others = array_values(array_filter(
        portfolio_published(),
        static fn (array $row): bool => $row['slug'] !== $work['slug']
    ));
    ?>
    <?php if ($others !== []): ?>
      <section class="section-pad">
        <div class="shell">
          <?php section_heading('More Work', 'Other engagements'); ?>
          <div class="portfolio-grid reveal">
            <?php foreach (array_slice($others, 0, 3) as $other): ?>
              <article class="portfolio-card static">
                <a href="<?= e(url('portfolio/' . $other['slug'])) ?>">
                  <?php $otherImage = portfolio_image_url($other['image_path']); ?>
                  <?php if ($otherImage !== null): ?>
                    <img src="<?= e($otherImage) ?>" alt="<?= e($other['image_alt'] ?? $other['title']) ?>" width="960" height="640" loading="lazy">
                  <?php endif; ?>
                  <div>
                    <h3><?= e($other['title']) ?></h3>
                    <p><?= e($other['summary']) ?></p>
                  </div>
                </a>
              </article>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <?php cta_band(
        'Wondering whether your own coverage is <span>enough?</span>',
        'Every engagement here started with a notability assessment. It is the cheapest way to find out whether an article is realistic before committing to anything.',
        'Request An Assessment'
    ); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
