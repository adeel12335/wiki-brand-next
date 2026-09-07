"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminStat } from "@/components/admin/AdminStat";

interface BlogRow {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  status: "draft" | "published";
  publishedAt?: string;
  updatedAt?: string;
}

type StatusFilter = "all" | "published" | "draft";

async function fetchBlogRows(signal?: AbortSignal): Promise<BlogRow[]> {
  const response = await fetch("/api/blog/", { signal });
  if (!response.ok) throw new Error("Could not load blog posts");
  const data = await response.json();
  return data.items ?? [];
}

function formatDate(value?: string) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export function AdminBlogList() {
  const [items, setItems] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const load = useCallback(async () => {
    try {
      setItems(await fetchBlogRows());
    } catch {
      setToast("Could not refresh posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void fetchBlogRows(controller.signal)
      .then((rows) => {
        setItems(rows);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoading(false);
        setToast("Could not load posts");
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(
    () => ({
      total: items.length,
      published: items.filter((i) => i.status === "published").length,
      draft: items.filter((i) => i.status === "draft").length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.excerpt ?? "").toLowerCase().includes(q) ||
        (item.category ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, query, statusFilter]);

  async function action(id: string, body: object, successMsg?: string) {
    setBusyId(id);
    await fetch(`/api/blog/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await load();
    setBusyId(null);
    if (successMsg) setToast(successMsg);
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    await fetch(`/api/blog/${id}/`, { method: "DELETE" });
    await load();
    setBusyId(null);
    setToast("Post deleted");
  }

  const hasFilters = query.trim() !== "" || statusFilter !== "all";

  return (
    <>
      {toast ? <div className="admin-toast">{toast}</div> : null}

      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Dashboard</p>
          <h1>Blog</h1>
          <p>Write and publish SEO guides on the public blog.</p>
        </div>
        <div className="admin-head-actions">
          <Link className="admin-btn" href="/admin/blog/new/">
            + New post
          </Link>
          <a
            className="admin-btn ghost"
            href="/blog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View live blog ↗
          </a>
        </div>
      </div>

      <div className="admin-stats">
        <AdminStat label="Total posts" value={stats.total} />
        <AdminStat label="Published" value={stats.published} hint="Live on site" />
        <AdminStat label="Drafts" value={stats.draft} />
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon" aria-hidden>
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, slug, or category…"
            aria-label="Search blog posts"
          />
        </div>
        <div className="admin-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          {hasFilters ? (
            <button
              type="button"
              className="admin-btn ghost small"
              onClick={() => {
                setQuery("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="admin-card admin-loading">
          <div className="admin-spinner" />
          <p>Loading posts…</p>
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card admin-empty">
          <h2>No blog posts yet</h2>
          <p>Seed existing posts or write your first article.</p>
          <div className="admin-submit">
            <Link className="admin-btn" href="/admin/blog/new/">
              Write first post
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card admin-empty">
          <h2>No matches</h2>
          <p>Try a different search or clear your filters.</p>
          <button
            type="button"
            className="admin-btn ghost"
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-meta">
            Showing {filtered.length} of {items.length} posts
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isBusy = busyId === item._id;
                return (
                  <tr key={item._id} className={isBusy ? "is-busy" : ""}>
                    <td>
                      <div className="admin-client-cell">
                        <div>
                          <Link href={`/admin/blog/${item._id}/`}>
                            {item.title}
                          </Link>
                          <small>/blog/{item.slug}/</small>
                          {item.excerpt ? (
                            <small className="admin-client-summary">
                              {item.excerpt}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td>{item.category || "—"}</td>
                    <td>
                      <span
                        className={`admin-pill ${item.status === "published" ? "live" : "draft"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{formatDate(item.publishedAt)}</td>
                    <td>
                      <div className="admin-actions">
                        <Link
                          className="admin-btn ghost small"
                          href={`/admin/blog/${item._id}/`}
                        >
                          Edit
                        </Link>
                        <a
                          className="admin-btn ghost small"
                          href={`/blog/${item.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          className="admin-btn ghost small"
                          disabled={isBusy}
                          onClick={() =>
                            action(
                              item._id,
                              { action: "toggle" },
                              item.status === "published"
                                ? "Moved to draft"
                                : "Published",
                            )
                          }
                        >
                          {item.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          className="admin-btn ghost small danger"
                          disabled={isBusy}
                          onClick={() => remove(item._id, item.title)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
