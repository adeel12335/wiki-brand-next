<?php
/**
 * Home page — https://example.com/
 */

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

$services = services();
$steps    = process_steps();

$page = [
    'slug'        => '',
    'title'       => 'Wikipedia Page Creation Services | ' . SITE_NAME,
    'short_title' => 'Home',
    'description' => 'Professional Wikipedia editorial agency. Guideline-compliant page creation, editing, research, and ongoing management for people and organisations.',
    'keywords'    => 'wikipedia page creation, wikipedia editing services, professional wikipedia writers, wikipedia agency, create a wikipedia page, wikipedia page management, wikipedia consultants',
    'og_image'    => 'assets/og/hero-orbital-globe.jpg',
    'og_image_alt' => 'The Wikipedia Studio — professional Wikipedia editorial services',
    'schema'      => [
        seo_item_list_node('', 'Wikipedia editorial services', array_map(
            static fn (string $slug, array $service): array => [
                'name'        => $service['name'],
                'url'         => abs_url('services/' . $slug),
                'description' => $service['card'],
            ],
            array_keys($services),
            $services
        )),
    ],
];

require __DIR__ . '/includes/header.php';
?>

    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-art" aria-hidden="true"></div>
      <canvas class="hero-particles" id="heroParticles" aria-hidden="true"></canvas>
      <div class="hero-beacon" aria-hidden="true"><i></i><i></i></div>
      <div class="shell hero-grid">
        <div class="hero-copy reveal in-view">
          <p class="micro-label">Professional Wikipedia Editorial Services</p>
          <h1 id="hero-title">We craft Wikipedia pages that build <span>credibility</span> and create lasting <span>impact.</span></h1>
          <p class="hero-lede">The Wikipedia Studio is a professional editorial agency helping individuals, businesses, and organisations establish a credible and authoritative presence on Wikipedia.</p>
          <div class="hero-actions">
            <a class="button button-gold magnetic" href="<?= e(url('contact')) ?>">Get Started Today <?= icon('i-arrow') ?></a>
            <a class="button button-outline magnetic" href="<?= e(url('services')) ?>">Explore Our Services <?= icon('i-arrow') ?></a>
          </div>
          <div class="hero-proof">
            <div class="proof-avatars" aria-hidden="true">
              <img src="<?= e(asset('assets/portfolio-business-leader.jpg')) ?>" alt="" width="960" height="640">
              <img src="<?= e(asset('assets/portfolio-author.jpg')) ?>" alt="" width="960" height="640">
              <img src="<?= e(asset('assets/portfolio-entrepreneur.jpg')) ?>" alt="" width="960" height="640">
              <span>W</span>
            </div>
            <p>Trusted by <strong>500+</strong> clients worldwide <span class="stars" aria-label="5 out of 5 stars">★★★★★</span></p>
          </div>
        </div>
      </div>

      <div class="shell metrics-rail reveal">
        <?php foreach (metrics() as $metric): ?>
          <article><?= icon($metric['icon']) ?><div><strong><?= e($metric['value']) ?></strong><span><?= e($metric['label']) ?></span></div></article>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="about section-pad" id="about">
      <div class="shell about-grid">
        <div class="section-copy reveal">
          <p class="micro-label">About The Wikipedia Studio</p>
          <h2>Where editorial <span>excellence</span> meets global standards.</h2>
          <p>We are a team of Wikipedia specialists, researchers, and content strategists dedicated to creating, improving, and managing articles that meet the platform’s strict guidelines and deliver real-world results.</p>
          <ul class="check-list">
            <li><?= icon('i-check') ?>100% guideline-compliant content</li>
            <li><?= icon('i-check') ?>In-depth research and verified sourcing</li>
            <li><?= icon('i-check') ?>Transparent process and clear communication</li>
            <li><?= icon('i-check') ?>Long-term page monitoring and maintenance</li>
          </ul>
          <a class="button button-gold button-small" href="<?= e(url('about-us')) ?>">Learn More About Us <?= icon('i-arrow') ?></a>
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

    <section class="services section-pad" id="services">
      <div class="shell">
        <?php section_heading('Our Services', 'Comprehensive Wikipedia Solutions'); ?>
        <div class="service-viewport reveal">
          <div class="service-track" id="serviceTrack">
            <?php foreach ($services as $slug => $service) {
                service_card($slug, $service);
            } ?>
          </div>
          <button class="rail-arrow rail-prev" id="servicePrev" type="button" aria-label="Previous service"><?= icon('i-arrow') ?></button>
          <button class="rail-arrow rail-next" id="serviceNext" type="button" aria-label="Next service"><?= icon('i-arrow') ?></button>
        </div>
        <div class="rail-dots" id="serviceDots" aria-label="Service slides"></div>
        <div class="section-actions reveal">
          <a class="button button-outline button-small" href="<?= e(url('services')) ?>">View All Services <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <section class="process section-pad" id="process">
      <div class="shell">
        <?php section_heading('Our Process', 'A Proven 5-Step Process'); ?>
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
        <div class="section-actions reveal">
          <a class="button button-outline button-small" href="<?= e(url('our-process')) ?>">See The Full Process <?= icon('i-arrow') ?></a>
        </div>
      </div>
    </section>

    <section class="work section-pad" id="work">
      <div class="shell">
        <div class="work-head reveal">
          <div><p class="micro-label">Our Portfolio</p><h2>Recent Wikipedia Publications</h2></div>
          <a class="text-link" href="<?= e(url('portfolio')) ?>">View All Work <?= icon('i-arrow') ?></a>
        </div>
        <div class="portfolio-viewport reveal">
          <div class="portfolio-track" id="portfolioTrack">
            <?php foreach (portfolio_items() as $item): ?>
              <article class="portfolio-card">
                <img src="<?= e(asset($item['image'])) ?>" alt="<?= e($item['alt']) ?>" width="960" height="640" loading="lazy">
                <div>
                  <h3><?= e($item['title']) ?></h3>
                  <a href="<?= e(url('portfolio')) ?>">View Work <?= icon('i-arrow') ?></a>
                </div>
              </article>
            <?php endforeach; ?>
          </div>
        </div>
        <div class="rail-dots" id="portfolioDots" aria-label="Portfolio slides"></div>
      </div>
    </section>

    <?php testimonial_section(); ?>

    <section class="resources section-pad" id="resources">
      <div class="shell resource-panel reveal">
        <div class="principles">
          <p class="micro-label">Why Clients Trust Us</p>
          <h2>Built on Trust. Driven by Excellence.</h2>
          <p>We follow strict editorial standards and maintain complete transparency in everything we do.</p>
          <div class="principle-grid">
            <article><?= icon('i-users') ?><div><strong>100% Confidential</strong><span>Your information is always secure with us.</span></div></article>
            <article><?= icon('i-shield') ?><div><strong>Ethical &amp; Compliant</strong><span>We follow the encyclopedia’s policies and guidelines.</span></div></article>
            <article><?= icon('i-check') ?><div><strong>Transparent Process</strong><span>Clear communication at every step.</span></div></article>
          </div>
          <a class="button button-gold button-small" href="<?= e(url('faq')) ?>">Read The Full FAQ <?= icon('i-arrow') ?></a>
        </div>

        <div class="faq">
          <p class="micro-label">Frequently Asked Questions</p>
          <?php faq_list(array_slice(faqs(), 0, 5)); ?>
        </div>
      </div>
    </section>

    <?php cta_band(); ?>

<?php require __DIR__ . '/includes/footer.php'; ?>
