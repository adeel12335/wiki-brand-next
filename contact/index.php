<?php
/**
 * Contact page — /contact/
 *
 * Handles its own form submission before any output is sent, so a successful
 * post can redirect (POST/redirect/GET) instead of leaving a resubmittable page.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/** Collapse whitespace and strip control characters from a submitted field. */
function clean_field(string $value, int $maxLength = 500): string
{
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = trim(preg_replace('/[ \t]+/', ' ', $value) ?? '');

    return mb_substr($value, 0, $maxLength);
}

$errors  = [];
$values  = ['name' => '', 'email' => '', 'phone' => '', 'subject' => '', 'message' => ''];
$sent    = isset($_GET['sent']);
$failed  = false;

if (empty($_SESSION['contact_token'])) {
    $_SESSION['contact_token'] = bin2hex(random_bytes(32));
}
$token = (string) $_SESSION['contact_token'];

$serviceOptions = array_map(
    static fn (array $service): string => $service['name'],
    services()
);
$subjectOptions = array_values($serviceOptions);
$subjectOptions[] = 'Notability assessment';
$subjectOptions[] = 'Something else';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    $values['name']    = clean_field((string) ($_POST['name'] ?? ''), 120);
    $values['email']   = clean_field((string) ($_POST['email'] ?? ''), 180);
    $values['phone']   = clean_field((string) ($_POST['phone'] ?? ''), 40);
    $values['subject'] = clean_field((string) ($_POST['subject'] ?? ''), 120);
    $values['message'] = mb_substr(trim((string) ($_POST['message'] ?? '')), 0, 4000);

    $postedToken = (string) ($_POST['token'] ?? '');
    if ($postedToken === '' || !hash_equals($token, $postedToken)) {
        $errors['form'] = 'Your session expired before the form was sent. Please try again.';
    }

    // Bots fill hidden fields; humans never see this one.
    if (trim((string) ($_POST['website'] ?? '')) !== '') {
        $errors['form'] = 'This submission looked automated. Please email us directly instead.';
    }

    if ($values['name'] === '') {
        $errors['name'] = 'Please tell us your name.';
    }
    if ($values['email'] === '' || !filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Please enter a valid email address.';
    }
    if ($values['subject'] !== '' && !in_array($values['subject'], $subjectOptions, true)) {
        $errors['subject'] = 'Please choose one of the listed options.';
    }
    if (mb_strlen($values['message']) < 20) {
        $errors['message'] = 'Please give us at least a sentence or two about the subject.';
    }

    if ($errors === []) {
        $body = "New enquiry from " . SITE_NAME . "\n\n"
            . "Name:    {$values['name']}\n"
            . "Email:   {$values['email']}\n"
            . "Phone:   " . ($values['phone'] !== '' ? $values['phone'] : '—') . "\n"
            . "Subject: " . ($values['subject'] !== '' ? $values['subject'] : '—') . "\n\n"
            . "Message:\n{$values['message']}\n";

        // Header values must never contain newlines, or a submission could inject
        // extra headers. The email is already validated; belt and braces here.
        $replyTo = str_replace(["\r", "\n"], '', $values['email']);
        $headers = [
            'From'         => SITE_NAME . ' <' . SITE_EMAIL . '>',
            'Reply-To'     => $replyTo,
            'Content-Type' => 'text/plain; charset=UTF-8',
        ];

        $subjectLine = 'Website enquiry: ' . ($values['subject'] !== '' ? $values['subject'] : 'General');

        if (function_exists('mail') && @mail(CONTACT_TO, $subjectLine, $body, $headers)) {
            unset($_SESSION['contact_token']);
            header('Location: ' . url('contact') . '?sent=1', true, 303);
            exit;
        }

        $failed = true;
    }
}

$page = [
    'slug'         => 'contact',
    'title'        => 'Contact Us | Request A Wikipedia Notability Assessment',
    'short_title'  => 'Contact',
    'description'  => 'Contact The Wikipedia Studio for a Wikipedia notability assessment, page creation, editing, or ongoing management. Worldwide service, Monday to Friday.',
    'keywords'     => 'contact wikipedia studio, wikipedia consultation, wikipedia notability assessment, hire wikipedia editor, wikipedia page quote',
    'og_image'     => 'assets/og/globe.jpg',
    'og_image_alt' => 'Contact The Wikipedia Studio',
    'schema'       => [
        [
            '@type' => 'ContactPage',
            '@id'   => abs_url('contact') . '#contactpage',
            'url'   => abs_url('contact'),
            'name'  => 'Contact ' . SITE_NAME,
            'about' => ['@id' => seo_id('organization')],
        ],
    ],
];

require APP_ROOT . '/includes/header.php';

page_hero([
    'eyebrow'     => 'Contact Us',
    'h1'          => 'Ready to build your <span>Wikipedia presence?</span>',
    'lede'        => 'Tell us about the subject and the coverage that already exists. We will come back with an honest read on whether a Wikipedia article is realistic, and what it would take.',
    'breadcrumbs' => [],
    'current'     => 'Contact',
]);
?>

    <section class="section-pad">
      <div class="shell contact-grid">
        <div class="contact-form-panel reveal">
          <?php if ($sent): ?>
            <div class="form-note success" role="status">
              <strong>Thank you — your enquiry has been sent.</strong>
              <p>We reply to every enquiry, usually within one business day. If your matter is urgent, email <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a> directly.</p>
            </div>
          <?php endif; ?>

          <?php if ($failed): ?>
            <div class="form-note error" role="alert">
              <strong>We could not send that message.</strong>
              <p>Mail delivery is unavailable on this server right now. Please email <a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a> and we will pick it up from there.</p>
            </div>
          <?php endif; ?>

          <?php if (!empty($errors['form'])): ?>
            <div class="form-note error" role="alert"><strong><?= e($errors['form']) ?></strong></div>
          <?php endif; ?>

          <p class="micro-label">Send An Enquiry</p>
          <h2>Start with an <span>assessment.</span></h2>

          <form class="contact-form" method="post" action="<?= e(url('contact')) ?>" novalidate>
            <input type="hidden" name="token" value="<?= e($token) ?>">
            <div class="field-pair" aria-hidden="true" hidden>
              <label for="website">Leave this field empty</label>
              <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
            </div>

            <div class="field-pair">
              <div class="field">
                <label for="name">Your name <span aria-hidden="true">*</span></label>
                <input type="text" id="name" name="name" required autocomplete="name"
                       value="<?= e($values['name']) ?>"
                       <?= isset($errors['name']) ? 'aria-invalid="true" aria-describedby="name-error"' : '' ?>>
                <?php if (isset($errors['name'])): ?><small class="field-error" id="name-error"><?= e($errors['name']) ?></small><?php endif; ?>
              </div>
              <div class="field">
                <label for="email">Email address <span aria-hidden="true">*</span></label>
                <input type="email" id="email" name="email" required autocomplete="email"
                       value="<?= e($values['email']) ?>"
                       <?= isset($errors['email']) ? 'aria-invalid="true" aria-describedby="email-error"' : '' ?>>
                <?php if (isset($errors['email'])): ?><small class="field-error" id="email-error"><?= e($errors['email']) ?></small><?php endif; ?>
              </div>
            </div>

            <div class="field-pair">
              <div class="field">
                <label for="phone">Phone <small>(optional)</small></label>
                <input type="tel" id="phone" name="phone" autocomplete="tel" value="<?= e($values['phone']) ?>">
              </div>
              <div class="field">
                <label for="subject">What do you need?</label>
                <select id="subject" name="subject" <?= isset($errors['subject']) ? 'aria-invalid="true"' : '' ?>>
                  <option value="">Select an option</option>
                  <?php foreach ($subjectOptions as $option): ?>
                    <option value="<?= e($option) ?>" <?= $values['subject'] === $option ? 'selected' : '' ?>><?= e($option) ?></option>
                  <?php endforeach; ?>
                </select>
                <?php if (isset($errors['subject'])): ?><small class="field-error"><?= e($errors['subject']) ?></small><?php endif; ?>
              </div>
            </div>

            <div class="field">
              <label for="message">About the subject <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" rows="6" required
                        placeholder="Who or what is the article about, and where has it been covered independently? Links to press coverage help most."
                        <?= isset($errors['message']) ? 'aria-invalid="true" aria-describedby="message-error"' : '' ?>><?= e($values['message']) ?></textarea>
              <?php if (isset($errors['message'])): ?><small class="field-error" id="message-error"><?= e($errors['message']) ?></small><?php endif; ?>
            </div>

            <button class="button button-gold" type="submit">Send Enquiry <?= icon('i-arrow') ?></button>
            <p class="form-legal">We treat every enquiry as confidential and never share your details. Sending an enquiry does not commit you to anything.</p>
          </form>
        </div>

        <aside class="contact-aside reveal" data-delay="100">
          <p class="micro-label">Direct Contact</p>
          <ul class="contact-list">
            <li>
              <?= icon('i-mail') ?>
              <div><strong>Email</strong><a href="mailto:<?= e(SITE_EMAIL) ?>"><?= e(SITE_EMAIL) ?></a></div>
            </li>
            <li>
              <?= icon('i-phone') ?>
              <div><strong>Phone</strong><a href="tel:<?= e(SITE_PHONE_RAW) ?>"><?= e(SITE_PHONE) ?></a></div>
            </li>
            <li>
              <?= icon('i-globe') ?>
              <div><strong>Coverage</strong><span>Worldwide services</span></div>
            </li>
            <li>
              <?= icon('i-clock') ?>
              <div><strong>Hours</strong><span>Mon–Fri, 9:00 AM–6:00 PM</span></div>
            </li>
          </ul>

          <div class="aside-note">
            <h3>What helps us answer fast</h3>
            <ul class="check-list compact">
              <li><?= icon('i-check') ?>Links to independent press coverage</li>
              <li><?= icon('i-check') ?>Key dates and verified milestones</li>
              <li><?= icon('i-check') ?>Any existing Wikipedia or Wikidata entry</li>
              <li><?= icon('i-check') ?>Whether you need creation, editing, or maintenance</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

<?php require APP_ROOT . '/includes/footer.php'; ?>
