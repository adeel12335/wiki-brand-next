<?php
/**
 * Process page — /our-process/
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$steps = process_steps();

$page = [
    'slug'         => 'our-process',
    'title'        => 'Our Wikipedia Process | Research, Writing, Review & Publishing',
    'short_title'  => 'Our Process',
    'description'  => 'How a Wikipedia article gets built: notability research, source planning, neutral drafting, editorial review, and transparent submission.',
    'keywords'     => 'wikipedia process, how to create a wikipedia page, wikipedia notability research, wikipedia editorial review, wikipedia submission process, wikipedia article workflow',
    'og_image'     => 'assets/og/reference-dark.jpg',
    'og_image_alt' => 'The Wikipedia Studio five-step editorial process',
    'schema'       => [
        [
            '@type' => 'HowTo',
            '@id'   => abs_url('our-process') . '#howto',
            'name'  => 'How The Wikipedia Studio builds a Wikipedia article',
            'description' => 'The five-stage editorial process used for every Wikipedia page creation and expansion engagement.',
            'totalTime' => 'P6W',
            'step' => array_map(
                static fn (int $index, array $step): array => [
                    '@type'    => 'HowToStep',
                    'position' => $index + 1,
                    'name'     => $step['title'],
                    'text'     => $step['copy'],
                    'url'      => abs_url('our-process') . '#step-' . ($index + 1),
                ],
                array_keys($steps),
                $steps
            ),
        ],
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Our Process',
    'h1'          => 'A proven <span>5-step process</span> from research to publication.',
    'lede'        => 'The same sequence runs on every engagement. It is deliberately front-loaded: the research stage decides whether an article is viable at all, long before anyone starts writing.',
    'breadcrumbs' => [],
    'current'     => 'Our Process',
    'actions'     => [
        ['label' => 'Start With An Assessment', 'href' => url('contact')],
        ['label' => 'View Services', 'href' => url('services'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="section-pad">
      <div class="shell">
        <div class="process-line reveal">
          <div class="process-connector" aria-hidden="true"></div>
          <?php foreach ($steps as $index => $step): ?>
            <article role="button" tabindex="0" aria-label="View step <?= $index + 1 ?>: <?= e($step['title']) ?>">
              <div class="step-icon"><?= icon($step['icon']) ?></div>
              <b><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></b>
              <h3><?= e($step['title']) ?></h3>
              <p><?= e($step['card']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="process-mobile-nav">
          <button id="processPrev" type="button" aria-label="Previous process step"><?= icon('i-arrow') ?></button>
          <span id="processCount">Step 1 of <?= count($steps) ?></span>
          <button id="processNext" type="button" aria-label="Next process step"><?= icon('i-arrow') ?></button>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell stage-list">
        <?php section_heading('Stage By Stage', 'What actually happens at each step'); ?>
        <?php foreach ($steps as $index => $step): ?>
          <article class="stage-row reveal" id="step-<?= $index + 1 ?>">
            <div class="stage-marker" aria-hidden="true">
              <span><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
              <?= icon($step['icon']) ?>
            </div>
            <div>
              <h3><?= e($step['title']) ?></h3>
              <p><?= e($step['copy']) ?></p>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Timelines', 'What to expect, realistically'); ?>
        <div class="card-grid reveal">
          <article class="service-card">
            <?= icon('i-search', 'card-icon') ?>
            <h3>Assessment</h3>
            <p>A few days. We search for independent coverage and give you a written verdict on notability before anything is commissioned.</p>
          </article>
          <article class="service-card">
            <?= icon('i-write', 'card-icon') ?>
            <h3>Drafting &amp; review</h3>
            <p>Typically a few weeks, depending on how much coverage exists and how complex the subject's history is.</p>
          </article>
          <article class="service-card">
            <?= icon('i-clock', 'card-icon') ?>
            <h3>Wikipedia review queue</h3>
            <p>Outside anyone's control. Volunteer reviewers work through a backlog that can move in days or take months.</p>
          </article>
          <article class="service-card">
            <?= icon('i-manage', 'card-icon') ?>
            <h3>Post-publication</h3>
            <p>Ongoing. Articles attract edits, so monitoring through the first stabilisation period matters as much as launch.</p>
          </article>
        </div>
      </div>
    </section>

    <?php cta_band(
        'Start with the <span>research stage.</span>',
        'The assessment tells you whether an article is viable before you commit to anything else. It is the most useful thing we can give you first.',
        'Request An Assessment'
    ); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
