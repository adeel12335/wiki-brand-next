<?php
/**
 * Image upload handling for the admin panel.
 *
 * Uploads are the most dangerous surface in an admin panel, so nothing is
 * trusted: the file must be a real image according to getimagesize(), the type
 * must be on a short allowlist, and the image is re-encoded through GD rather
 * than moved into place. Re-encoding discards metadata and anything hidden after
 * the image data, and guarantees the stored file is what it claims to be.
 */

declare(strict_types=1);

if (!defined('APP_ROOT')) {
    http_response_code(403);
    exit('Direct access is not permitted.');
}

const UPLOAD_MAX_BYTES = 6 * 1024 * 1024;
const UPLOAD_DIR       = 'assets/uploads/portfolio';
const UPLOAD_MAX_EDGE  = 1600;

/** Human-readable label for an upload error code. */
function upload_error_message(int $code): string
{
    return match ($code) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'That file is larger than the server allows.',
        UPLOAD_ERR_PARTIAL                        => 'The upload was interrupted. Please try again.',
        UPLOAD_ERR_NO_FILE                        => 'No file was selected.',
        UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE => 'The server could not store the file.',
        UPLOAD_ERR_EXTENSION                      => 'A server extension blocked the upload.',
        default                                   => 'The upload failed.',
    };
}

/**
 * Validate, re-encode, and store an uploaded image.
 *
 * @param array<string, mixed> $file One entry from $_FILES
 * @return array{path: ?string, error: ?string} path is relative to the project root
 */
function upload_portfolio_image(array $file): array
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return ['path' => null, 'error' => null]; // nothing submitted, not an error
    }

    if (($file['error'] ?? 1) !== UPLOAD_ERR_OK) {
        return ['path' => null, 'error' => upload_error_message((int) $file['error'])];
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    if ($tmp === '' || !is_uploaded_file($tmp)) {
        return ['path' => null, 'error' => 'That upload could not be verified.'];
    }

    if ((int) ($file['size'] ?? 0) > UPLOAD_MAX_BYTES) {
        return ['path' => null, 'error' => 'Images must be 6 MB or smaller.'];
    }

    $info = @getimagesize($tmp);
    if ($info === false) {
        return ['path' => null, 'error' => 'That file is not a readable image.'];
    }

    [$width, $height] = $info;
    $type = $info[2];

    $allowed = [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP];
    if (!in_array($type, $allowed, true)) {
        return ['path' => null, 'error' => 'Images must be JPEG, PNG, or WebP.'];
    }

    if ($width < 400 || $height < 260) {
        return ['path' => null, 'error' => 'Images should be at least 400 by 260 pixels.'];
    }

    if (!extension_loaded('gd')) {
        return ['path' => null, 'error' => 'Image processing is unavailable on this server (gd is not installed).'];
    }

    $source = @imagecreatefromstring((string) file_get_contents($tmp));
    if ($source === false) {
        return ['path' => null, 'error' => 'That image could not be decoded.'];
    }

    // Scale down oversized uploads; leave smaller ones at their own size.
    $scale = min(1.0, UPLOAD_MAX_EDGE / max($width, $height));
    $targetWidth  = (int) round($width * $scale);
    $targetHeight = (int) round($height * $scale);

    $canvas = imagecreatetruecolor($targetWidth, $targetHeight);
    // Flatten onto the site background so transparent PNGs do not go black.
    $backdrop = imagecolorallocate($canvas, 0x02, 0x0c, 0x16);
    imagefilledrectangle($canvas, 0, 0, $targetWidth, $targetHeight, $backdrop);
    imagecopyresampled($canvas, $source, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
    imagedestroy($source);

    $directory = APP_ROOT . '/' . UPLOAD_DIR;
    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        imagedestroy($canvas);

        return ['path' => null, 'error' => 'The upload directory could not be created.'];
    }

    // Random name: never reuse anything from the client-supplied filename.
    $name     = bin2hex(random_bytes(12)) . '.jpg';
    $absolute = $directory . '/' . $name;

    if (!imagejpeg($canvas, $absolute, 86)) {
        imagedestroy($canvas);

        return ['path' => null, 'error' => 'The processed image could not be saved.'];
    }

    imagedestroy($canvas);
    @chmod($absolute, 0644);

    return ['path' => UPLOAD_DIR . '/' . $name, 'error' => null];
}

/**
 * Delete a stored upload. Refuses to touch anything outside the upload
 * directory, so a tampered database value cannot be used to remove site files.
 */
function delete_portfolio_image(?string $path): void
{
    if ($path === null || $path === '' || !str_starts_with($path, UPLOAD_DIR . '/')) {
        return;
    }

    $absolute = realpath(APP_ROOT . '/' . $path);
    $base     = realpath(APP_ROOT . '/' . UPLOAD_DIR);

    if ($absolute !== false && $base !== false && str_starts_with($absolute, $base . DIRECTORY_SEPARATOR)) {
        @unlink($absolute);
    }
}
