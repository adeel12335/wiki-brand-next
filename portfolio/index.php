<?php
/**
 * Portfolio index — /portfolio/
 *
 * Reads published items from the database. If the database is not set up yet, or
 * becomes unreachable, portfolio_published() falls back to the entries in
 * includes/data.php so this page never renders empty.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$items = portfolio_published();

$page = [
    'slug'         => 'portfolio',
    'title'        => 'Portfolio | Wikipedia Pages For Leaders & Organisations',
    'short_title'  => 'Portfolio',
    'description'  => 'Categories of Wikipedia work we deliver: business leaders, authors, entrepreneurs, public figures, and organisations. Clients stay confidential.',
    'keywords'     => 'wikipedia portfolio, wikipedia page examples, wikipedia case studies, wikipedia pages for executives, wikipedia pages for authors, wikipedia pages for companies',
    'og_image'     => 'assets/og/portfolio-public-figure.jpg',
    'og_image_alt' => 'Wikipedia editorial work by The Wikipedia Studio',
    'schema'       => [
        seo_item_list_node('portfolio', 'Wikipedia editorial work', array_map(
            static fn (array $item): array => [
                'name'        => $item['title'],
                'description' => $item['summary'],
                'url'         => abs_url('portfolio/' . $item['slug']),
            ],
            $items
        )),
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Our Portfolio',
    'h1'          => 'Recent Wikipedia <span>publications</span> and expansions.',
    'lede'        => 'Client work on Wikipedia is confidential, so these are categories rather than named articles. Each one reflects the kind of engagement we take on and the sourcing it required.',
    'breadcrumbs' => [],
    'current'     => 'Portfolio',
    'actions'     => [
        ['label' => 'Discuss Your Project', 'href' => url('contact')],
        ['label' => 'Our Services', 'href' => url('services'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell">
        <div class="portfolio-grid reveal">
          <?php foreach ($items as $item): ?>
            <article class="portfolio-card static">
              <a href="<?= e(url('portfolio/' . $item['slug'])) ?>" aria-label="<?= e($item['title']) ?> — read the engagement notes">
                <?php $image = portfolio_image_url($item['image_path']); ?>
                <?php if ($image !== null): ?>
                  <img src="<?= e($image) ?>" alt="<?= e($item['image_alt'] ?? $item['title']) ?>" width="960" height="640" loading="lazy">
                <?php endif; ?>
                <div>
                  <h3><?= e($item['title']) ?></h3>
                  <p><?= e($item['summary']) ?></p>
                  <span class="text-link">Engagement notes <?= icon('i-arrow') ?></span>
                </div>
              </a>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Engagement Notes', 'What each of these actually involved'); ?>
        <div class="detail-list reveal">
          <?php foreach ($items as $item): ?>
            <article class="detail-item">
              <h3><a href="<?= e(url('portfolio/' . $item['slug'])) ?>"><?= e($item['title']) ?></a></h3>
              <div>
                <p><?= e($item['body'] ?? $item['summary']) ?></p>
                <a class="text-link" href="<?= e(url('portfolio/' . $item['slug'])) ?>">Read the full <?= e(strtolower($item['title'])) ?> notes <?= icon('i-arrow') ?></a>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Confidentiality', 'Why we do not name clients'); ?>
        <div class="prose reveal">
          <p>Wikipedia articles belong to the encyclopedia, not to the subject or to the editor who drafted them. Publicly attaching an agency's name to a specific article invites scrutiny of that article rather than of the agency, and it can create problems for the client long after the work is done.</p>
          <p>We are happy to talk through comparable engagements in a private conversation, including the ones that did not proceed and why. What we will not do is publish a client list that turns their page into a target.</p>
          <p>The pattern across all of these is the same: the sourcing decided the article, not the brief. Where you can see it most clearly is in what got left out. If you want to know whether your own coverage would support a page, that is what the <a href="<?= e(url('services/wikipedia-page-creation')) ?>">notability assessment</a> is for.</p>
        </div>
      </div>
    </section>

    <?php testimonial_section(); ?>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
