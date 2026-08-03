<?php
/**
 * Check every page against the content gates documented in README.md.
 *
 * Start a server, then point this at it:
 *
 *   php -S localhost:8000 &
 *   php bin/check-seo-gates.php http://localhost:8000
 *
 * Exits non-zero if any gate fails, so it can be wired into CI.
 */

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("This script is for command-line use only.\n");
}

$base = rtrim($argv[1] ?? 'http://localhost:8000', '/');

$_SERVER['DOCUMENT_ROOT'] = dirname(__DIR__);
require dirname(__DIR__) . '/includes/bootstrap.php';

/** Word-count floor and primary keyword per route. */
$expectations = [
    ''                                          => [500, 'wikipedia'],
    'about-us'                                  => [400, 'wikipedia'],
    'services'                                  => [400, 'wikipedia'],
    'our-process'                               => [600, 'wikipedia process'],
    'portfolio'                                 => [400, 'wikipedia'],
    'faq'                                       => [800, 'wikipedia'],
    'contact'                                   => [400, 'wikipedia'],
    'services/wikipedia-page-creation'          => [800, 'wikipedia page creation'],
    'services/wikipedia-page-editing'           => [800, 'wikipedia page editing'],
    'services/wikipedia-content-writing'        => [800, 'wikipedia content writing'],
    'services/wikipedia-page-management'        => [800, 'wikipedia page management'],
    'services/wikipedia-reputation-management'  => [800, 'wikipedia reputation'],
    'privacy-policy'                            => [300, 'privacy'],
    'terms-conditions'                          => [300, 'terms'],
];

/** Strip the parts of a document that are not body copy. */
function gate_body(string $html, bool $dropFooter = true): string
{
    $patterns = ['#<head>.*?</head>#s', '#<script.*?</script>#s', '#<svg.*?</svg>#s'];
    if ($dropFooter) {
        $patterns[] = '#<footer.*?</footer>#s';
    }

    return (string) preg_replace($patterns, '', $html);
}

/** @return array<int, string> */
function gate_words(string $html): array
{
    $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    return preg_split('/\s+/', trim((string) preg_replace('/\s+/', ' ', $text)), -1, PREG_SPLIT_NO_EMPTY) ?: [];
}

$failures = [];
$context = stream_context_create(['http' => ['ignore_errors' => true, 'timeout' => 15]]);

printf("%-44s %-11s %-6s %-6s %-8s %-6s %s\n", 'PAGE', 'WORDS/MIN', 'TITLE', 'DESC', 'DENSITY', 'LINKS', 'STATUS');

foreach ($expectations as $slug => [$minWords, $keyword]) {
    $path = '/' . ($slug === '' ? '' : $slug . '/');
    $html = @file_get_contents($base . $path, false, $context);

    if ($html === false || $html === '') {
        $failures[] = "{$path}: could not be fetched";
        printf("%-44s %s\n", $path, 'FETCH FAILED');
        continue;
    }

    preg_match('#<title>(.*?)</title>#s', $html, $titleMatch);
    preg_match('#<meta name="description" content="(.*?)">#s', $html, $descMatch);
    preg_match_all('#<h1[^>]*>(.*?)</h1>#s', $html, $h1Match);
    preg_match('#<link rel="canonical" href="(.*?)">#s', $html, $canonicalMatch);
    preg_match('#<script type="application/ld\+json">(.*?)</script>#s', $html, $jsonLdMatch);

    $title = html_entity_decode($titleMatch[1] ?? '', ENT_QUOTES, 'UTF-8');
    $desc  = html_entity_decode($descMatch[1] ?? '', ENT_QUOTES, 'UTF-8');
    $h1    = strtolower(trim(html_entity_decode(strip_tags($h1Match[1][0] ?? ''), ENT_QUOTES, 'UTF-8')));

    $body   = gate_body($html);
    $words  = gate_words($body);
    $count  = count($words);
    $lower  = array_map('strtolower', $words);
    $hits   = count(array_filter($lower, static fn (string $w): bool => str_contains($w, 'wikipedia')));
    $density = $count > 0 ? round($hits / $count * 100, 2) : 0.0;
    $first100 = implode(' ', array_slice($lower, 0, 100));

    preg_match_all('~href="(/[^"]*)"~', $body, $linkMatch);
    $links = count(array_unique($linkMatch[1]));

    // --- gates ----------------------------------------------------------
    if ($count < $minWords) {
        $failures[] = "{$path}: {$count} words, below the {$minWords} floor";
    }
    $titleLength = mb_strlen($title);
    if ($titleLength < 30 || $titleLength > 60) {
        $failures[] = "{$path}: title is {$titleLength} characters (want 30-60)";
    }
    $descLength = mb_strlen($desc);
    if ($descLength < 120 || $descLength > 160) {
        $failures[] = "{$path}: meta description is {$descLength} characters (want 120-160)";
    }
    if (count($h1Match[0]) !== 1) {
        $failures[] = "{$path}: found " . count($h1Match[0]) . ' H1 elements (want exactly 1)';
    }
    if (!str_contains($h1, $keyword)) {
        $failures[] = "{$path}: H1 does not contain \"{$keyword}\"";
    }
    if (!str_contains($first100, $keyword)) {
        $failures[] = "{$path}: \"{$keyword}\" missing from the first 100 words";
    }
    if ($density > 3.0) {
        $failures[] = "{$path}: keyword density {$density}% (want under 3%)";
    }
    if ($links < 3) {
        $failures[] = "{$path}: only {$links} internal links (want 3+)";
    }
    if (($canonicalMatch[1] ?? '') === '') {
        $failures[] = "{$path}: no canonical tag";
    }
    if (json_decode(str_replace('<\\/', '</', $jsonLdMatch[1] ?? ''), true) === null) {
        $failures[] = "{$path}: JSON-LD is missing or does not parse";
    }

    preg_match_all('#<img[^>]*alt="([^"]*)"#', $html, $altMatch);
    foreach ($altMatch[1] as $alt) {
        $altLength = mb_strlen($alt);
        // Empty alt is correct for decorative images.
        if ($altLength > 0 && ($altLength < 10 || $altLength > 125)) {
            $failures[] = "{$path}: alt text is {$altLength} characters (\"" . mb_substr($alt, 0, 30) . '")';
        }
    }

    $pageFailures = count(array_filter($failures, static fn (string $f): bool => str_starts_with($f, $path . ':')));

    printf(
        "%-44s %4d/%-6d %-6d %-6d %-8s %-6d %s\n",
        $path,
        $count,
        $minWords,
        $titleLength,
        $descLength,
        $density . '%',
        $links,
        $pageFailures === 0 ? 'pass' : $pageFailures . ' issue' . ($pageFailures === 1 ? '' : 's')
    );
}

echo "\n";

if ($failures === []) {
    echo "All content gates pass.\n";
    exit(0);
}

echo count($failures) . " gate failure(s):\n";
foreach ($failures as $failure) {
    echo '  - ' . $failure . "\n";
}
exit(1);
