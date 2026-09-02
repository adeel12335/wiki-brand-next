<?php
/**
 * Generate 1200x630 social share cards into assets/og/.
 *
 * Facebook, LinkedIn, and X all want an og:image around 1200x630 (1.91:1). The
 * brand assets are 1.5:1 photographs and a 1.2:1 logo, so sharing them directly
 * means arbitrary cropping — and the logo is below the minimum width entirely.
 *
 * Run after changing anything in assets/:
 *
 *   php bin/build-og-images.php
 *
 * Committing the output is intentional: these files are content, and generating
 * them at request time would be wasteful.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

if (!extension_loaded('gd')) {
    fwrite(STDERR, "The gd extension is required.\n");
    exit(1);
}

const OG_WIDTH  = 1200;
const OG_HEIGHT = 630;

/** Brand background, used behind logos and any letterboxed area. */
const OG_BACKDROP = [0x02, 0x0c, 0x16];

/**
 * cover   — fill the frame and crop the overflow (photographs)
 * contain — fit inside the frame on the brand backdrop (logos)
 */
$sources = [
    'assets/hero-orbital-globe.jpg'        => 'cover',
    'assets/reference-dark.png'            => 'cover',
    'assets/portfolio-business-leader.jpg' => 'cover',
    'assets/portfolio-author.jpg'          => 'cover',
    'assets/portfolio-entrepreneur.jpg'    => 'cover',
    'assets/portfolio-organisation.jpg'    => 'cover',
    'assets/portfolio-public-figure.jpg'   => 'cover',
    'assets/globe.png'                     => 'contain',
];

$root   = dirname(__DIR__);
$outDir = $root . '/assets/og';

if (!is_dir($outDir) && !mkdir($outDir, 0755, true)) {
    fwrite(STDERR, "Could not create {$outDir}\n");
    exit(1);
}

foreach ($sources as $relative => $mode) {
    $path = $root . '/' . $relative;
    if (!is_file($path)) {
        fwrite(STDERR, "Skipping missing source: {$relative}\n");
        continue;
    }

    $source = @imagecreatefromstring((string) file_get_contents($path));
    if ($source === false) {
        fwrite(STDERR, "Could not read image: {$relative}\n");
        continue;
    }

    $sourceWidth  = imagesx($source);
    $sourceHeight = imagesy($source);

    $canvas = imagecreatetruecolor(OG_WIDTH, OG_HEIGHT);
    $backdrop = imagecolorallocate($canvas, OG_BACKDROP[0], OG_BACKDROP[1], OG_BACKDROP[2]);
    imagefilledrectangle($canvas, 0, 0, OG_WIDTH, OG_HEIGHT, $backdrop);

    $scale = $mode === 'cover'
        ? max(OG_WIDTH / $sourceWidth, OG_HEIGHT / $sourceHeight)
        : min(OG_WIDTH / $sourceWidth, OG_HEIGHT / $sourceHeight) * 0.72;

    $targetWidth  = (int) round($sourceWidth * $scale);
    $targetHeight = (int) round($sourceHeight * $scale);
    $offsetX = (int) round((OG_WIDTH - $targetWidth) / 2);
    $offsetY = (int) round((OG_HEIGHT - $targetHeight) / 2);

    imagecopyresampled($canvas, $source, $offsetX, $offsetY, 0, 0, $targetWidth, $targetHeight, $sourceWidth, $sourceHeight);

    // A subtle bottom-to-top darkening keeps overlaid platform UI legible and
    // matches the site's own gradient treatment.
    for ($y = 0; $y < OG_HEIGHT; $y++) {
        $strength = ($y / OG_HEIGHT) ** 2 * 0.42;
        if ($strength <= 0.002) {
            continue;
        }
        $shade = imagecolorallocatealpha(
            $canvas,
            OG_BACKDROP[0],
            OG_BACKDROP[1],
            OG_BACKDROP[2],
            (int) round(127 * (1 - $strength))
        );
        imageline($canvas, 0, $y, OG_WIDTH, $y, $shade);
    }

    $name = pathinfo($relative, PATHINFO_FILENAME);
    $out  = $outDir . '/' . $name . '.jpg';
    imagejpeg($canvas, $out, 84);
    imagedestroy($canvas);
    imagedestroy($source);

    printf("%-34s -> assets/og/%s.jpg (%d KB)\n", $relative, $name, (int) round(filesize($out) / 1024));
}

echo "Done.\n";
