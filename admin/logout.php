<?php
/**
 * Sign out — /admin/logout.php
 *
 * POST only, with a CSRF token, so a stray link or image cannot sign an admin
 * out on their behalf.
 */

declare(strict_types=1);

require __DIR__ . '/../includes/bootstrap.php';
require APP_ROOT . '/includes/admin/auth.php';

admin_session_start();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    admin_redirect('portfolio/');
}

admin_require_token();
admin_logout();

header('Location: ' . BASE_PATH . '/admin/index.php', true, 302);
exit;
