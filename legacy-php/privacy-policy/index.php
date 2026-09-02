<?php
/**
 * Privacy policy — /privacy-policy/
 *
 * NOTE: This is a plain-language starting point covering what the site actually
 * does (contact form, Google Fonts, no analytics or cookies of our own). Have it
 * reviewed against the jurisdictions you operate in before launch.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$page = [
    'slug'         => 'privacy-policy',
    'title'        => 'Privacy Policy | ' . SITE_NAME,
    'short_title'  => 'Privacy Policy',
    'description'  => 'How The Wikipedia Studio collects, uses, and protects the information you send through this website, and the choices you have over it.',
    'keywords'     => 'privacy policy, data protection, wikipedia studio privacy',
    'og_image'     => 'assets/og/globe.jpg',
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Legal',
    'h1'          => 'Privacy <span>Policy</span>',
    'lede'        => 'This policy explains what information this website collects, why, and how long it is kept.',
    'breadcrumbs' => [],
    'current'     => 'Privacy Policy',
]);
?>

    <section class="section-pad">
      <div class="shell legal-body reveal">
        <p class="legal-updated">Last updated: <?= e(date('F Y', (int) filemtime(__FILE__))) ?></p>

        <h2>Who we are</h2>
        <p><?= e(SITE_NAME) ?> is an editorial agency providing Wikipedia page creation, editing, research, and management services. You can reach us at <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a>.</p>

        <h2>Information we collect</h2>
        <p>We collect only what you send us:</p>
        <ul>
          <li><strong>Enquiry details.</strong> The name, email address, optional phone number, service interest, and message you submit through our contact form.</li>
          <li><strong>Project material.</strong> Any biographical information, documents, or source links you share with us during an engagement.</li>
          <li><strong>Server logs.</strong> Standard web server records such as IP address, browser user agent, and requested URL, kept by our hosting provider for security and diagnostics.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To answer your enquiry and assess whether we can help.</li>
          <li>To deliver and support the services you commission.</li>
          <li>To keep records required for accounting and for disclosure obligations that apply to paid Wikipedia contributions.</li>
        </ul>
        <p>We do not sell your information, and we do not use it for advertising.</p>

        <h2>Confidentiality</h2>
        <p>Client engagements are confidential. We do not publish client names or identify specific Wikipedia articles as our work. Where Wikipedia's terms of use require disclosure of a paid relationship, that disclosure is made on Wikipedia in the form the platform requires, and we discuss its scope with you first.</p>

        <h2>Cookies and analytics</h2>
        <p>This website sets no advertising or tracking cookies. A session cookie is created only when you use the contact form, purely to protect that form against automated abuse, and it expires when you close your browser.</p>
        <p>Web fonts are loaded from Google Fonts, which means your browser makes a request to Google's servers and Google may log your IP address. If you prefer to avoid that, most browsers allow third-party requests to be blocked.</p>

        <h2>Third parties</h2>
        <p>We use service providers for hosting and email delivery. They process data on our behalf and only for those purposes. We do not transfer your information to anyone else except where the law requires it.</p>

        <h2>How long we keep it</h2>
        <p>Enquiries that do not lead to an engagement are deleted once they are clearly no longer relevant. Records relating to completed engagements are kept as long as needed for our legal, accounting, and disclosure obligations.</p>

        <h2>Your choices</h2>
        <p>You can ask us to confirm what information we hold about you, correct it, or delete it. Write to <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a> and we will respond within a reasonable period. Depending on where you live, you may also have the right to complain to a data protection authority.</p>

        <h2>Security</h2>
        <p>We take reasonable technical and organisational measures to protect the information we hold. No transmission over the internet can be guaranteed completely secure, so please avoid sending highly sensitive material by email unless we have agreed a secure route.</p>

        <h2>Changes to this policy</h2>
        <p>If this policy changes, the revised version will be published on this page with a new date at the top.</p>
      </div>
    </section>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
