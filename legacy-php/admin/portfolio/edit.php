<?php
/**
 * Create or edit a portfolio item — /admin/portfolio/edit.php[?id=N]
 *
 * Validation happens server-side and errors come back with the submitted values
 * intact, so a long write-up is never lost to a typo in another field.
 */

declare(strict_types=1);

require __DIR__ . '/../../includes/bootstrap.php';
require APP_ROOT . '/includes/admin/auth.php';
require APP_ROOT . '/includes/admin/layout.php';
require APP_ROOT . '/includes/admin/uploads.php';

$adminUser = admin_require_login();

$id      = isset($_GET['id']) ? (int) $_GET['id'] : null;
$editing = $id !== null && $id > 0;
$item    = $editing ? portfolio_find($id) : null;

if ($editing && $item === null) {
    http_response_code(404);
    admin_head('Not found', $adminUser);
    echo '<div class="admin-card narrow"><h1>Item not found</h1><p>It may have been deleted. <a href="' . e(BASE_PATH) . '/admin/portfolio/">Back to the list</a>.</p></div>';
    admin_foot();
    exit;
}

$values = [
    'title'            => $item['title'] ?? '',
    'slug'             => $item['slug'] ?? '',
    'category'         => $item['category'] ?? '',
    'summary'          => $item['summary'] ?? '',
    'body'             => $item['body'] ?? '',
    'external_url'     => $item['external_url'] ?? '',
    'image_alt'        => $item['image_alt'] ?? '',
    'meta_title'       => $item['meta_title'] ?? '',
    'meta_description' => $item['meta_description'] ?? '',
    'keywords'         => $item['keywords'] ?? '',
    'status'           => $item['status'] ?? 'draft',
];

$imagePath = $item['image_path'] ?? null;
$errors    = [];

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    admin_require_token();

    foreach (array_keys($values) as $field) {
        $raw = (string) ($_POST[$field] ?? '');
        // Collapse runs of spaces but keep paragraph breaks in the body field.
        $values[$field] = $field === 'body'
            ? trim((string) preg_replace("/[ \t]+/", ' ', $raw))
            : trim((string) preg_replace('/\s+/', ' ', $raw));
    }

    if ($values['title'] === '') {
        $errors['title'] = 'A title is required.';
    } elseif (mb_strlen($values['title']) > 160) {
        $errors['title'] = 'Keep the title under 160 characters.';
    }

    if ($values['summary'] === '') {
        $errors['summary'] = 'A short summary is required — it is the card text and the fallback meta description.';
    } elseif (mb_strlen($values['summary']) > 300) {
        $errors['summary'] = 'Keep the summary under 300 characters.';
    }

    if ($values['external_url'] !== '' && !filter_var($values['external_url'], FILTER_VALIDATE_URL)) {
        $errors['external_url'] = 'Enter a full URL including https://, or leave this empty.';
    }

    if ($values['meta_title'] !== '' && mb_strlen($values['meta_title']) > 60) {
        $errors['meta_title'] = 'Search results cut off after about 60 characters.';
    }

    if ($values['meta_description'] !== '' && (mb_strlen($values['meta_description']) < 120 || mb_strlen($values['meta_description']) > 160)) {
        $errors['meta_description'] = 'Aim for 120-160 characters so the description shows in full.';
    }

    if (!in_array($values['status'], PORTFOLIO_STATUSES, true)) {
        $values['status'] = 'draft';
    }

    // Image: a new upload replaces the old file, and "remove" clears it.
    $newImagePath = null;
    if (!empty($_FILES['image'])) {
        $upload = upload_portfolio_image($_FILES['image']);
        if ($upload['error'] !== null) {
            $errors['image'] = $upload['error'];
        } elseif ($upload['path'] !== null) {
            $newImagePath = $upload['path'];
        }
    }

    if ($errors === []) {
        $previousImage = $imagePath;

        if ($newImagePath !== null) {
            $imagePath = $newImagePath;
        } elseif (!empty($_POST['remove_image'])) {
            $imagePath = null;
        }

        $slugSource = $values['slug'] !== '' ? $values['slug'] : $values['title'];

        $savedId = portfolio_save([
            'slug'             => portfolio_unique_slug($slugSource, $editing ? $id : null),
            'title'            => $values['title'],
            'category'         => $values['category'],
            'summary'          => $values['summary'],
            'body'             => $values['body'],
            'external_url'     => $values['external_url'],
            'image_path'       => $imagePath,
            'image_alt'        => $values['image_alt'] !== '' ? $values['image_alt'] : $values['title'],
            'meta_title'       => $values['meta_title'],
            'meta_description' => $values['meta_description'],
            'keywords'         => $values['keywords'],
            'status'           => $values['status'],
            'sort_order'       => $editing ? (int) $item['sort_order'] : portfolio_next_sort_order(),
        ], $editing ? $id : null);

        // Only bin the old upload once the new row is safely saved.
        if ($previousImage !== null && $previousImage !== $imagePath) {
            delete_portfolio_image($previousImage);
        }

        admin_flash($editing ? 'Changes saved.' : 'Item created.');
        admin_redirect('portfolio/edit.php?id=' . $savedId);
    }
}

admin_head($editing ? 'Edit item' : 'Add item', $adminUser);
?>
    <div class="admin-head">
      <div>
        <h1><?= $editing ? 'Edit item' : 'Add item' ?></h1>
        <?php if ($editing): ?>
          <p><a href="<?= e(url('portfolio/' . $item['slug'])) ?>" target="_blank" rel="noopener">/portfolio/<?= e($item['slug']) ?>/</a></p>
        <?php endif; ?>
      </div>
      <a class="admin-btn ghost" href="<?= e(BASE_PATH) ?>/admin/portfolio/">Back to list</a>
    </div>

    <?php admin_flash_notice(); ?>

    <?php if ($errors !== []): ?>
      <p class="admin-error" role="alert">Nothing was saved. Please correct the fields marked below.</p>
    <?php endif; ?>

    <form class="admin-form" method="post" enctype="multipart/form-data">
      <input type="hidden" name="token" value="<?= e(admin_token()) ?>">

      <div class="admin-card">
        <h2>Content</h2>

        <label for="title">Title <span>required</span></label>
        <input type="text" id="title" name="title" required maxlength="160" value="<?= e($values['title']) ?>">
        <?php if (isset($errors['title'])): ?><small class="admin-fielderror"><?= e($errors['title']) ?></small><?php endif; ?>

        <label for="category">Category</label>
        <input type="text" id="category" name="category" maxlength="80" value="<?= e($values['category']) ?>"
               placeholder="Business Leader, Author, Organisation…">

        <label for="summary">Summary <span>required</span></label>
        <textarea id="summary" name="summary" rows="2" maxlength="300" required><?= e($values['summary']) ?></textarea>
        <small class="admin-hint">Shown on the portfolio card, and used as the meta description if you leave that field empty.</small>
        <?php if (isset($errors['summary'])): ?><small class="admin-fielderror"><?= e($errors['summary']) ?></small><?php endif; ?>

        <label for="body">Engagement notes</label>
        <textarea id="body" name="body" rows="10"><?= e($values['body']) ?></textarea>
        <small class="admin-hint">Blank lines start new paragraphs. Describe what the work involved, including what the sources would not support — that specificity is what makes these pages worth reading.</small>

        <label for="external_url">Link to the published work</label>
        <input type="url" id="external_url" name="external_url" maxlength="500" value="<?= e($values['external_url']) ?>"
               placeholder="https://en.wikipedia.org/wiki/…">
        <small class="admin-hint">Optional. Leave empty for confidential engagements.</small>
        <?php if (isset($errors['external_url'])): ?><small class="admin-fielderror"><?= e($errors['external_url']) ?></small><?php endif; ?>
      </div>

      <div class="admin-card">
        <h2>Image</h2>

        <?php $currentImage = portfolio_image_url($imagePath); ?>
        <?php if ($currentImage !== null): ?>
          <img class="admin-preview" src="<?= e($currentImage) ?>" alt="Current image for <?= e($values['title']) ?>">
          <label class="admin-check">
            <input type="checkbox" name="remove_image" value="1"> Remove this image when saving
          </label>
        <?php endif; ?>

        <label for="image"><?= $currentImage !== null ? 'Replace image' : 'Upload image' ?></label>
        <input type="file" id="image" name="image" accept="image/jpeg,image/png,image/webp">
        <small class="admin-hint">JPEG, PNG, or WebP up to 6 MB. Landscape works best; uploads are re-encoded and scaled to 1600px on the long edge.</small>
        <?php if (isset($errors['image'])): ?><small class="admin-fielderror"><?= e($errors['image']) ?></small><?php endif; ?>

        <label for="image_alt">Image alt text</label>
        <input type="text" id="image_alt" name="image_alt" maxlength="180" value="<?= e($values['image_alt']) ?>"
               placeholder="Describe what the image shows, 10-125 characters">
        <small class="admin-hint">Describe the picture for screen readers and search engines. Defaults to the title if left empty.</small>
      </div>

      <div class="admin-card">
        <h2>Search appearance</h2>

        <label for="slug">URL slug</label>
        <div class="admin-slug">
          <span><?= e(SITE_URL) ?>/portfolio/</span>
          <input type="text" id="slug" name="slug" maxlength="160" value="<?= e($values['slug']) ?>" placeholder="generated from the title">
          <span>/</span>
        </div>
        <small class="admin-hint">Changing this on a live item breaks any existing links to it. Leave empty when creating and it will be generated.</small>

        <label for="meta_title">Meta title</label>
        <input type="text" id="meta_title" name="meta_title" maxlength="120" value="<?= e($values['meta_title']) ?>">
        <small class="admin-hint">Up to 60 characters. Empty falls back to "&lt;Title&gt; Wikipedia Page | Portfolio".</small>
        <?php if (isset($errors['meta_title'])): ?><small class="admin-fielderror"><?= e($errors['meta_title']) ?></small><?php endif; ?>

        <label for="meta_description">Meta description</label>
        <textarea id="meta_description" name="meta_description" rows="2" maxlength="220"><?= e($values['meta_description']) ?></textarea>
        <small class="admin-hint">120-160 characters shows in full in search results. Empty falls back to the summary.</small>
        <?php if (isset($errors['meta_description'])): ?><small class="admin-fielderror"><?= e($errors['meta_description']) ?></small><?php endif; ?>

        <label for="keywords">Keywords</label>
        <input type="text" id="keywords" name="keywords" maxlength="320" value="<?= e($values['keywords']) ?>"
               placeholder="comma, separated, keywords">
      </div>

      <div class="admin-card">
        <h2>Publishing</h2>
        <label for="status">Status</label>
        <select id="status" name="status">
          <option value="draft" <?= $values['status'] === 'draft' ? 'selected' : '' ?>>Draft — visible only in the admin</option>
          <option value="published" <?= $values['status'] === 'published' ? 'selected' : '' ?>>Published — live on the site and in the sitemap</option>
        </select>

        <div class="admin-submit">
          <button class="admin-btn" type="submit"><?= $editing ? 'Save changes' : 'Create item' ?></button>
          <a class="admin-btn ghost" href="<?= e(BASE_PATH) ?>/admin/portfolio/">Cancel</a>
        </div>
      </div>
    </form>
<?php
admin_foot();
