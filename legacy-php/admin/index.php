<?php
/**
 * Admin sign-in — /admin/
 *
 * Signed-in users are sent straight to the portfolio list.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';
require APP_ROOT . '/includes/admin/auth.php';
require APP_ROOT . '/includes/admin/layout.php';

admin_session_start();

// A missing schema is the most likely first-run problem, so say so plainly
// rather than showing a database error.
if (!db_ready()) {
    admin_head('Setup required');
    ?>
    <div class="admin-card narrow">
      <h1>Database not ready</h1>
      <p>The portfolio tables do not exist yet. From the project directory, run:</p>
      <pre>php bin/db-migrate.php
php bin/create-admin.php your-username
php bin/seed-portfolio.php</pre>
      <p>The first command creates the schema, the second creates a sign-in, and the third loads the portfolio entries that ship with the site.</p>
    </div>
    <?php
    admin_foot();
    exit;
}

if (admin_user() !== null) {
    admin_redirect('portfolio/');
}

$error = null;

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    admin_require_token();

    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Enter both a username and a password.';
    } else {
        $error = admin_attempt_login($username, $password);

        if ($error === null) {
            admin_redirect('portfolio/');
        }
    }
}

admin_head('Sign in');
?>
    <div class="admin-card narrow">
      <h1>Sign in</h1>

      <?php if (isset($_GET['timeout'])): ?>
        <p class="admin-notice">Your session expired after a period of inactivity.</p>
      <?php endif; ?>

      <?php if ($error !== null): ?>
        <p class="admin-error" role="alert"><?= e($error) ?></p>
      <?php endif; ?>

      <form method="post" action="<?= e(BASE_PATH) ?>/admin/index.php" autocomplete="off">
        <input type="hidden" name="token" value="<?= e(admin_token()) ?>">

        <label for="username">Username</label>
        <input type="text" id="username" name="username" required autofocus
               value="<?= e((string) ($_POST['username'] ?? '')) ?>">

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>

        <button class="admin-btn" type="submit">Sign in</button>
      </form>

      <p class="admin-hint">Lost the password? Reset it from the server with <code>php bin/create-admin.php &lt;username&gt;</code>.</p>
    </div>
<?php
admin_foot();
