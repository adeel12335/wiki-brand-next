<?php
/**
 * Admin authentication, session hardening, and CSRF protection.
 *
 * Passwords are only ever stored as password_hash() output. Failed sign-ins are
 * counted per IP and throttled, and every state-changing admin request must
 * carry a valid CSRF token.
 */

declare(strict_types=1);

if (!defined('APP_ROOT')) {
    http_response_code(403);
    exit('Direct access is not permitted.');
}

const ADMIN_SESSION_NAME     = 'wsadmin';
const ADMIN_IDLE_TIMEOUT     = 3600;   // seconds of inactivity before sign-out
const ADMIN_MAX_ATTEMPTS     = 8;      // failed sign-ins per IP...
const ADMIN_ATTEMPT_WINDOW   = 900;    // ...within this many seconds

/** Start the admin session with hardened cookie settings. */
function admin_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = ($_SERVER['HTTPS'] ?? '') !== '' && strtolower((string) $_SERVER['HTTPS']) !== 'off';
    $secure = $secure || strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';

    session_name(ADMIN_SESSION_NAME);
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => BASE_PATH . '/admin/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();

    // Expire idle sessions rather than leaving an admin logged in indefinitely.
    if (isset($_SESSION['admin_last_seen']) && time() - (int) $_SESSION['admin_last_seen'] > ADMIN_IDLE_TIMEOUT) {
        admin_logout();
        admin_redirect('index.php?timeout=1');
    }

    $_SESSION['admin_last_seen'] = time();
}

/** Redirect to a path relative to /admin/ and stop. */
function admin_redirect(string $path): never
{
    header('Location: ' . BASE_PATH . '/admin/' . ltrim($path, '/'), true, 302);
    exit;
}

/** The signed-in admin's row, or null. */
function admin_user(): ?array
{
    if (empty($_SESSION['admin_id'])) {
        return null;
    }

    static $user = null;
    if ($user !== null) {
        return $user;
    }

    $statement = db()->prepare('SELECT id, username, last_login_at FROM admin_users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => (int) $_SESSION['admin_id']]);
    $row = $statement->fetch();

    $user = $row === false ? null : $row;

    return $user;
}

/** Stop the request unless an admin is signed in. */
function admin_require_login(): array
{
    admin_session_start();
    $user = admin_user();

    if ($user === null) {
        admin_redirect('index.php');
    }

    return $user;
}

/** Client IP as seen by the app, used only for throttling. */
function admin_client_ip(): string
{
    $forwarded = (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
    if ($forwarded !== '') {
        $first = trim(explode(',', $forwarded)[0]);
        if (filter_var($first, FILTER_VALIDATE_IP)) {
            return $first;
        }
    }

    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** How many failed sign-ins this IP has made inside the throttle window. */
function admin_recent_attempts(): int
{
    $since = date('Y-m-d H:i:s', time() - ADMIN_ATTEMPT_WINDOW);
    $statement = db()->prepare('SELECT COUNT(*) AS c FROM admin_login_attempts WHERE ip = :ip AND attempted_at > :since');
    $statement->execute(['ip' => admin_client_ip(), 'since' => $since]);

    return (int) ($statement->fetch()['c'] ?? 0);
}

/** Record a failed sign-in and prune old rows. */
function admin_record_attempt(): void
{
    db()->prepare('INSERT INTO admin_login_attempts (ip, attempted_at) VALUES (:ip, :now)')
        ->execute(['ip' => admin_client_ip(), 'now' => db_now()]);

    db()->prepare('DELETE FROM admin_login_attempts WHERE attempted_at < :cutoff')
        ->execute(['cutoff' => date('Y-m-d H:i:s', time() - 86400)]);
}

/** Clear this IP's failed attempts after a successful sign-in. */
function admin_clear_attempts(): void
{
    db()->prepare('DELETE FROM admin_login_attempts WHERE ip = :ip')->execute(['ip' => admin_client_ip()]);
}

/**
 * Verify credentials and start an authenticated session.
 * Returns an error message, or null on success.
 */
function admin_attempt_login(string $username, string $password): ?string
{
    if (admin_recent_attempts() >= ADMIN_MAX_ATTEMPTS) {
        return 'Too many failed attempts. Try again in fifteen minutes.';
    }

    $statement = db()->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = :username LIMIT 1');
    $statement->execute(['username' => $username]);
    $user = $statement->fetch();

    // Always run a hash comparison so a missing username and a wrong password
    // take a similar amount of time.
    $hash = $user['password_hash'] ?? '$2y$12$' . str_repeat('.', 53);

    if ($user === false || !password_verify($password, $hash)) {
        admin_record_attempt();

        return 'Those credentials were not recognised.';
    }

    // New session id on privilege change, to close off session fixation.
    session_regenerate_id(true);
    $_SESSION['admin_id']        = (int) $user['id'];
    $_SESSION['admin_last_seen'] = time();
    $_SESSION['admin_token']     = bin2hex(random_bytes(32));

    db()->prepare('UPDATE admin_users SET last_login_at = :now WHERE id = :id')
        ->execute(['now' => db_now(), 'id' => (int) $user['id']]);

    admin_clear_attempts();

    return null;
}

/** Destroy the admin session. */
function admin_logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires'  => time() - 42000,
            'path'     => $params['path'],
            'secure'   => $params['secure'],
            'httponly' => true,
            'samesite' => 'Strict',
        ]);
    }
    session_destroy();
}

/** The current CSRF token, creating one if needed. */
function admin_token(): string
{
    if (empty($_SESSION['admin_token'])) {
        $_SESSION['admin_token'] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION['admin_token'];
}

/** Stop the request unless the posted CSRF token matches the session's. */
function admin_require_token(): void
{
    $posted = (string) ($_POST['token'] ?? '');

    if ($posted === '' || !hash_equals(admin_token(), $posted)) {
        http_response_code(419);
        exit('This form expired. Go back, reload the page, and try again.');
    }
}

/** One-shot status message shown after a redirect. */
function admin_flash(?string $message = null): ?string
{
    if ($message !== null) {
        $_SESSION['admin_flash'] = $message;

        return null;
    }

    $flash = $_SESSION['admin_flash'] ?? null;
    unset($_SESSION['admin_flash']);

    return $flash;
}
