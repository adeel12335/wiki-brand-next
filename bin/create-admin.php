<?php
/**
 * Create or update an admin user.
 *
 *   php bin/create-admin.php editor
 *
 * Prompts for the password so it never appears in shell history, and stores only
 * a password_hash(). Run it again with the same username to reset a password.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__);
require dirname(__DIR__) . '/includes/bootstrap.php';

$username = trim((string) ($argv[1] ?? ''));

if ($username === '' || !preg_match('/^[A-Za-z0-9._-]{3,80}$/', $username)) {
    fwrite(STDERR, "Usage: php bin/create-admin.php <username>\n");
    fwrite(STDERR, "Usernames may contain letters, numbers, dots, underscores, and hyphens (3-80 characters).\n");
    exit(1);
}

if (!db_ready()) {
    fwrite(STDERR, "The database is not migrated yet. Run: php bin/db-migrate.php\n");
    exit(1);
}

/** Read a password without echoing it, where the terminal allows. */
function prompt_password(string $label): string
{
    echo $label;

    $silent = false;
    if (function_exists('shell_exec') && stripos(PHP_OS_FAMILY, 'win') === false) {
        $silent = @shell_exec('stty -echo 2>/dev/null') !== null || true;
        @shell_exec('stty -echo 2>/dev/null');
    }

    $value = rtrim((string) fgets(STDIN), "\r\n");

    if ($silent) {
        @shell_exec('stty echo 2>/dev/null');
        echo "\n";
    }

    return $value;
}

// Allow non-interactive use in scripted setup: ADMIN_PASSWORD=... php bin/create-admin.php name
$password = (string) (getenv('ADMIN_PASSWORD') ?: '');
$fromEnv  = $password !== '';

if (!$fromEnv) {
    $password = prompt_password('Password: ');
    $confirm  = prompt_password('Confirm password: ');

    if ($password !== $confirm) {
        fwrite(STDERR, "Passwords did not match.\n");
        exit(1);
    }
}

if (strlen($password) < 12) {
    fwrite(STDERR, "Password must be at least 12 characters.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$statement = db()->prepare('SELECT id FROM admin_users WHERE username = :username LIMIT 1');
$statement->execute(['username' => $username]);
$existing = $statement->fetch();

if ($existing !== false) {
    db()->prepare('UPDATE admin_users SET password_hash = :hash WHERE id = :id')
        ->execute(['hash' => $hash, 'id' => $existing['id']]);
    echo "Password updated for '{$username}'.\n";
} else {
    db()->prepare('INSERT INTO admin_users (username, password_hash, created_at) VALUES (:username, :hash, :now)')
        ->execute(['username' => $username, 'hash' => $hash, 'now' => db_now()]);
    echo "Admin user '{$username}' created.\n";
}

echo 'Sign in at ' . SITE_URL . "/admin/\n";
