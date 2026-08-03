<?php
/**
 * Terms & conditions — /terms-conditions/
 *
 * NOTE: A plain-language starting point written to match how the service actually
 * works. Have it reviewed by a qualified adviser before launch.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

$page = [
    'slug'         => 'terms-conditions',
    'title'        => 'Terms & Conditions | ' . SITE_NAME,
    'short_title'  => 'Terms & Conditions',
    'description'  => 'The terms that apply to using this website and commissioning Wikipedia editorial services from The Wikipedia Studio, including what we can and cannot promise.',
    'keywords'     => 'terms and conditions, service terms, wikipedia studio terms',
    'og_image'     => 'assets/og/globe.jpg',
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Legal',
    'h1'          => 'Terms &amp; <span>Conditions</span>',
    'lede'        => 'These terms cover use of this website and the basis on which we accept editorial work.',
    'breadcrumbs' => [],
    'current'     => 'Terms & Conditions',
]);
?>

    <section class="section-pad">
      <div class="shell legal-body reveal">
        <p class="legal-updated">Last updated: <?= e(date('F Y', (int) filemtime(__FILE__))) ?></p>

        <h2>1. About these terms</h2>
        <p>By using this website or commissioning services from <?= e(SITE_NAME) ?>, you agree to these terms. Individual engagements are also governed by the written scope and proposal we agree with you; where the two differ, the signed engagement document takes precedence.</p>

        <h2>2. Our services</h2>
        <p>We provide research, writing, editing, and maintenance services relating to Wikipedia and connected knowledge platforms. Scope, deliverables, timelines, and fees are set out in writing before work begins.</p>

        <h2>3. What we do not promise</h2>
        <ul>
          <li><strong>No guaranteed publication or approval.</strong> Wikipedia is maintained by independent volunteer editors and administrators. We do not control their decisions, and no agency can.</li>
          <li><strong>No guaranteed permanence.</strong> Any article can be edited, tagged, merged, or nominated for deletion by the community at any time after publication.</li>
          <li><strong>No ownership of articles.</strong> Content published on Wikipedia is released under the platform's open licence and belongs to the encyclopedia, not to you or to us.</li>
          <li><strong>No control over search results.</strong> Rankings, knowledge panels, and AI-generated summaries are controlled by third parties.</li>
        </ul>

        <h2>4. Compliance and disclosure</h2>
        <p>We work within Wikipedia's policies, including the terms of use requirements for paid contributions. That means paid editing relationships are disclosed as the platform requires. We will not accept instructions to edit covertly, to conceal a client relationship, to remove properly sourced material because it is unflattering, or to add claims that reliable sources do not support.</p>

        <h2>5. Your responsibilities</h2>
        <ul>
          <li>Provide accurate information and be clear about anything disputed or unresolved.</li>
          <li>Hold the rights to any material you send us, including images and documents.</li>
          <li>Respond to review requests within agreed timeframes so work can progress.</li>
        </ul>

        <h2>6. Fees and payment</h2>
        <p>Fees, milestones, and payment terms are set out in the engagement document. Our fees are for professional time and editorial work performed, not for a guaranteed outcome, and are payable regardless of the decisions independent Wikipedia reviewers reach.</p>

        <h2>7. Revisions and cancellation</h2>
        <p>Revision rounds included in an engagement are described in its scope. Either party may end an engagement in writing; work completed up to that point remains payable, and we will hand over the drafts and research produced.</p>

        <h2>8. Confidentiality</h2>
        <p>We keep client engagements confidential and do not identify clients or their articles publicly. You agree that we may describe the general category of work in anonymised form.</p>

        <h2>9. Intellectual property</h2>
        <p>The design, text, and images on this website belong to <?= e(SITE_NAME) ?> unless stated otherwise. Research dossiers and drafts prepared for you are yours to use once fees are settled, subject to the open licence that applies to anything published on Wikipedia.</p>

        <h2>10. Liability</h2>
        <p>We provide our services with reasonable skill and care. To the extent permitted by law, our liability arising from an engagement is limited to the fees paid for that engagement, and we are not liable for indirect or consequential loss, including loss of profit, reputation, or search visibility.</p>

        <h2>11. Changes</h2>
        <p>We may update these terms. The version published on this page at the time you commission work is the version that applies to it.</p>

        <h2>12. Contact</h2>
        <p>Questions about these terms can go to <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a>.</p>
      </div>
    </section>

    <?php cta_band(); ?>

<?php require APP_ROOT . '/includes/footer.php'; ?>
