<?php
/**
 * Resources / FAQ page — /faq/
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$items = faqs();

$page = [
    'slug'         => 'faq',
    'title'        => 'Wikipedia FAQ & Resources | Notability, Timelines & Paid Editing',
    'short_title'  => 'Resources',
    'breadcrumb_name' => 'Resources & FAQ',
    'description'  => 'Straight answers on Wikipedia notability, publication timelines, paid-editing disclosure, page approval, and ongoing maintenance.',
    'keywords'     => 'wikipedia faq, wikipedia notability guidelines, wikipedia paid editing disclosure, how long wikipedia page approval, wikipedia page requirements, wikipedia resources',
    'og_image'     => 'assets/og/hero-orbital-globe.jpg',
    'og_image_alt' => 'Wikipedia FAQ and resources from The Wikipedia Studio',
    'schema'       => [seo_faq_node($items, 'faq')],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Resources & FAQ',
    'h1'          => 'Built on trust. Answers without the <span>sales pitch.</span>',
    'lede'        => 'The questions clients ask most, answered the way we would answer them on a call — including the parts that make a commission less likely.',
    'breadcrumbs' => [],
    'current'     => 'Resources & FAQ',
    'actions'     => [
        ['label' => 'Ask Us Something Else', 'href' => url('contact')],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell faq-wide reveal">
        <?php faq_list($items); ?>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Key Concepts', 'Three rules that decide most outcomes'); ?>
        <div class="card-grid reveal">
          <article class="service-card">
            <?= icon('i-search', 'card-icon') ?>
            <h3>Notability</h3>
            <p>A subject qualifies when multiple reliable, independent sources have covered it significantly. Self-published material, press releases, and paid placements do not count toward it.</p>
          </article>
          <article class="service-card">
            <?= icon('i-check', 'card-icon') ?>
            <h3>Verifiability</h3>
            <p>Readers must be able to check every claim against a published source. Wikipedia records what reliable sources say — not what is true but undocumented.</p>
          </article>
          <article class="service-card">
            <?= icon('i-shield', 'card-icon') ?>
            <h3>Neutral point of view</h3>
            <p>Articles describe subjects fairly and without promotion, giving weight to viewpoints in proportion to their coverage in reliable sources.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="resources section-pad">
      <div class="shell resource-panel reveal">
        <div class="principles">
          <p class="micro-label">Why Clients Trust Us</p>
          <h2>Built on Trust. Driven by Excellence.</h2>
          <p>We follow strict editorial standards and maintain complete transparency in everything we do.</p>
          <div class="principle-grid">
            <article><?= icon('i-users') ?><div><strong>100% Confidential</strong><span>Your information is always secure with us.</span></div></article>
            <article><?= icon('i-shield') ?><div><strong>Ethical &amp; Compliant</strong><span>We follow Wikipedia’s policies and guidelines.</span></div></article>
            <article><?= icon('i-check') ?><div><strong>Transparent Process</strong><span>Clear communication at every step.</span></div></article>
          </div>
        </div>

        <div class="faq">
          <p class="micro-label">Useful Reading</p>
          <div class="prose">
            <p>Wikipedia publishes the policies we work to, and they are worth reading before commissioning anyone: the notability guideline, the verifiability policy, the neutral point of view policy, and the terms of use section covering paid contributions.</p>
            <p>If an agency's promises conflict with those documents, the documents win.</p>
          </div>
          <a class="text-link" href="<?= e(url('our-process')) ?>">See how we apply them <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
