<?php
/**
 * Portfolio list — /admin/portfolio/
 *
 * Publish toggles, reordering, and deletion all happen here as POST actions with
 * a CSRF token, then redirect so a refresh cannot repeat them.
 */

declare(strict_types=1);

require __DIR__ . '/../../includes/bootstrap.php';
require APP_ROOT . '/includes/admin/auth.php';
require APP_ROOT . '/includes/admin/layout.php';
require APP_ROOT . '/includes/admin/uploads.php';

$adminUser = admin_require_login();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    admin_require_token();

    $action = (string) ($_POST['action'] ?? '');
    $id     = (int) ($_POST['id'] ?? 0);

    if ($id > 0) {
        switch ($action) {
            case 'toggle':
                $status = portfolio_toggle_status($id);
                admin_flash($status === 'published' ? 'Item published.' : 'Item moved back to draft.');
                break;

            case 'up':
            case 'down':
                portfolio_move($id, $action);
                admin_flash('Order updated.');
                break;

            case 'delete':
                $image = portfolio_delete($id);
                delete_portfolio_image($image);
                admin_flash('Item deleted.');
                break;
        }
    }

    admin_redirect('portfolio/');
}

$items = portfolio_all();

admin_head('Portfolio', $adminUser);
?>
    <div class="admin-head">
      <div>
        <h1>Portfolio</h1>
        <p><?= count($items) ?> item<?= count($items) === 1 ? '' : 's' ?> ·
          <?= count(array_filter($items, static fn (array $i): bool => $i['status'] === 'published')) ?> published</p>
      </div>
      <a class="admin-btn" href="<?= e(BASE_PATH) ?>/admin/portfolio/edit.php">Add item</a>
    </div>

    <?php admin_flash_notice(); ?>

    <?php if ($items === []): ?>
      <div class="admin-card">
        <h2>No items yet</h2>
        <p>Add your first portfolio entry, or load the ones that ship with the site by running <code>php bin/seed-portfolio.php</code> on the server.</p>
        <p>Until at least one item is published here, the public portfolio page falls back to the entries stored in <code>includes/data.php</code>.</p>
      </div>
    <?php else: ?>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Updated</th>
              <th scope="col">Order</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($items as $index => $item): ?>
              <tr>
                <td>
                  <?php $image = portfolio_image_url($item['image_path']); ?>
                  <?php if ($image !== null): ?>
                    <img class="admin-thumb" src="<?= e($image) ?>" alt="">
                  <?php else: ?>
                    <span class="admin-nothumb">—</span>
                  <?php endif; ?>
                </td>
                <td>
                  <a href="<?= e(BASE_PATH) ?>/admin/portfolio/edit.php?id=<?= (int) $item['id'] ?>"><?= e($item['title']) ?></a>
                  <small>/portfolio/<?= e($item['slug']) ?>/</small>
                </td>
                <td><?= e($item['category']) ?></td>
                <td>
                  <span class="admin-pill <?= $item['status'] === 'published' ? 'live' : 'draft' ?>"><?= e($item['status']) ?></span>
                </td>
                <td><small><?= e($item['updated_at'] ? date('j M Y', strtotime((string) $item['updated_at'])) : '—') ?></small></td>
                <td class="admin-order">
                  <form method="post">
                    <input type="hidden" name="token" value="<?= e(admin_token()) ?>">
                    <input type="hidden" name="id" value="<?= (int) $item['id'] ?>">
                    <button class="admin-icon" type="submit" name="action" value="up" title="Move up" <?= $index === 0 ? 'disabled' : '' ?>>↑</button>
                    <button class="admin-icon" type="submit" name="action" value="down" title="Move down" <?= $index === count($items) - 1 ? 'disabled' : '' ?>>↓</button>
                  </form>
                </td>
                <td class="admin-actions">
                  <a class="admin-btn small ghost" href="<?= e(BASE_PATH) ?>/admin/portfolio/edit.php?id=<?= (int) $item['id'] ?>">Edit</a>

                  <form method="post">
                    <input type="hidden" name="token" value="<?= e(admin_token()) ?>">
                    <input type="hidden" name="id" value="<?= (int) $item['id'] ?>">
                    <button class="admin-btn small ghost" type="submit" name="action" value="toggle">
                      <?= $item['status'] === 'published' ? 'Unpublish' : 'Publish' ?>
                    </button>
                  </form>

                  <?php if ($item['status'] === 'published'): ?>
                    <a class="admin-btn small ghost" href="<?= e(url('portfolio/' . $item['slug'])) ?>" target="_blank" rel="noopener">View</a>
                  <?php endif; ?>

                  <form method="post" onsubmit="return confirm('Delete &quot;<?= e(addslashes($item['title'])) ?>&quot;? This cannot be undone.');">
                    <input type="hidden" name="token" value="<?= e(admin_token()) ?>">
                    <input type="hidden" name="id" value="<?= (int) $item['id'] ?>">
                    <button class="admin-btn small danger" type="submit" name="action" value="delete">Delete</button>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
<?php
admin_foot();
