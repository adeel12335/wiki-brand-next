<?php
/**
 * One-time data export from legacy PHP → JSON for Next.js.
 * Run: php scripts/export-data.php
 */
declare(strict_types=1);

require dirname(__DIR__) . '/legacy-php/includes/bootstrap.php';

$out = dirname(__DIR__) . '/src/lib/data';

file_put_contents("$out/services.json", json_encode(services(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents("$out/faqs.json", json_encode(faqs(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents("$out/testimonials.json", json_encode(testimonials(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents("$out/metrics.json", json_encode(metrics(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents("$out/process-steps.json", json_encode(process_steps(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
file_put_contents("$out/portfolio-fallback.json", json_encode(portfolio_items(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "Exported data to src/lib/data/\n";
