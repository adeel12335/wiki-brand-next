<?php
/**
 * About page — /about-us/
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$page = [
    'slug'         => 'about-us',
    'title'        => 'About Us | Wikipedia Editorial Agency & Specialist Editors',
    'short_title'  => 'About Us',
    'description'  => 'An editorial agency of Wikipedia specialists, researchers, and strategists working to the platform\'s own sourcing and neutrality standards.',
    'keywords'     => 'wikipedia agency, wikipedia editorial team, wikipedia specialists, professional wikipedia editors, about the wikipedia studio, wikipedia consultants',
    'og_image'     => 'assets/og/globe.jpg',
    'og_image_alt' => 'About The Wikipedia Studio',
    'schema'       => [
        [
            '@type' => 'AboutPage',
            '@id'   => abs_url('about-us') . '#aboutpage',
            'url'   => abs_url('about-us'),
            'name'  => 'About The Wikipedia Studio',
            'mainEntity' => ['@id' => seo_id('organization')],
        ],
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'About The Wikipedia Studio',
    'h1'          => 'A Wikipedia editorial agency where <span>excellence</span> meets global standards.',
    'lede'        => 'We are a team of Wikipedia specialists, researchers, and content strategists dedicated to creating, improving, and managing articles that meet the platform\'s strict guidelines and deliver real-world credibility.',
    'breadcrumbs' => [],
    'current'     => 'About Us',
    'actions'     => [
        ['label' => 'Talk To Our Team', 'href' => url('contact')],
        ['label' => 'Our Services', 'href' => url('services'), 'style' => 'button-outline'],
    ],
]);
?>

    <section class="about section-pad">
      <div class="shell about-grid">
        <div class="section-copy reveal">
          <p class="micro-label">How We Work</p>
          <h2>Guidelines first, <span>always.</span></h2>
          <p>Wikipedia is not a marketing channel, and treating it like one is the most common reason articles get rejected, tagged, or deleted. Our work starts from the platform's own rules — notability, verifiability, neutral point of view — and everything else follows from them.</p>
          <p>That means we sometimes deliver news a client does not want to hear. We would rather say so in week one than take a commission for an article that cannot survive review.</p>
          <ul class="check-list">
            <li><?= icon('i-check') ?>100% guideline-compliant content</li>
            <li><?= icon('i-check') ?>In-depth research and verified sourcing</li>
            <li><?= icon('i-check') ?>Transparent process and clear communication</li>
            <li><?= icon('i-check') ?>Long-term page monitoring and maintenance</li>
            <li><?= icon('i-check') ?>Disclosed paid contributions, per Wikipedia's terms of use</li>
          </ul>
          <a class="button button-gold button-small" href="<?= e(url('our-process')) ?>">See Our Process <?= icon('i-arrow') ?></a>
        </div>

        <div class="experience-panel reveal" data-delay="100">
          <article class="experience-stat top-left"><small>Years</small><strong>10+</strong><span>Of Editorial Excellence</span></article>
          <article class="experience-stat top-right"><small>Success Rate</small><strong>98%</strong><span>Approval Rate</span></article>
          <div class="experience-core">
            <img src="<?= e(asset('assets/globe-small.png')) ?>" alt="Wikipedia puzzle globe" width="400" height="331">
            <button class="w-emblem" type="button" aria-label="Toggle studio highlights">
              <span class="w-face w-front" aria-hidden="true">W</span>
              <span class="w-face w-back" aria-hidden="true">W</span>
            </button>
          </div>
          <article class="experience-stat bottom-left"><small>Editors</small><strong>25+</strong><span>Wikipedia Specialists</span></article>
          <article class="experience-stat bottom-right"><small>Clients</small><strong>500+</strong><span>Worldwide Clients</span></article>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Our Principles', 'Four commitments we do not trade away'); ?>
        <div class="card-grid reveal">
          <article class="service-card">
            <?= icon('i-shield', 'card-icon') ?>
            <h3>Verifiability over persuasion</h3>
            <p>Every substantive statement is tied to an independent, reliable source. If a claim cannot be verified, it does not appear in the article.</p>
          </article>
          <article class="service-card">
            <?= icon('i-users', 'card-icon') ?>
            <h3>Disclosure over discretion</h3>
            <p>Paid editing is permitted on Wikipedia when it is declared. We declare it, on the record, rather than editing covertly.</p>
          </article>
          <article class="service-card">
            <?= icon('i-search', 'card-icon') ?>
            <h3>Research before writing</h3>
            <p>Source discovery comes first. The available coverage decides what the article can say — not a brief, and not a wish list.</p>
          </article>
          <article class="service-card">
            <?= icon('i-check', 'card-icon') ?>
            <h3>Honesty about outcomes</h3>
            <p>No guarantees of approval, no invented notability. You get a clear assessment of what is achievable before anything is commissioned.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Who We Work With', 'Individuals, businesses, and institutions'); ?>
        <div class="card-grid reveal">
          <article class="service-card">
            <?= icon('i-users', 'card-icon') ?>
            <h3>Individuals</h3>
            <p>Authors, academics, executives, founders, artists, and public figures with a documented record in independent media.</p>
          </article>
          <article class="service-card">
            <?= icon('i-building', 'card-icon') ?>
            <h3>Businesses</h3>
            <p>Companies whose history, products, and milestones have been covered by independent business and trade press.</p>
          </article>
          <article class="service-card">
            <?= icon('i-globe', 'card-icon') ?>
            <h3>Organisations</h3>
            <p>Non-profits, institutions, and associations that need an accurate, neutral public record of what they do.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="shell">
        <?php section_heading('Editorial Standards', 'How our work is checked'); ?>
        <div class="answer-block reveal">
          <p>Every draft passes through two editors. The first researches and writes; the second checks each claim against the source cited for it, with no involvement in the drafting. That separation exists because the most common failure in Wikipedia writing is not fabrication but drift — a sentence that started out supported by its citation and gradually stopped being so through successive edits.</p>
          <p>Sources are graded before anything is written, on independence, reliability, and depth of coverage. A national newspaper profile and a paid listing in the same publication are treated very differently. We record which source supports which statement, so any claim in a draft can be traced back, and so can the ones we removed.</p>
          <p>Paid contributions are disclosed on Wikipedia as its terms of use require. We do not operate undeclared accounts, and we decline instructions to remove properly sourced material simply because a client dislikes it. You can see how those standards apply stage by stage in <a href="<?= e(url('our-process')) ?>">our editorial process</a>.</p>
        </div>
      </div>
    </section>

    <?php testimonial_section(); ?>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
