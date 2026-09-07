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
  ogImage?: string;
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
    <div className="admin-blog-shell">
      {toast ? <div className="admin-toast">{toast}</div> : null}

      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Content</p>
          <h1>Blog posts</h1>
          <p>Draft, polish SEO, and publish guides that feed the public blog and sitemap.</p>
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

      <div className="admin-stats admin-stats--3">
        <AdminStat label="Total posts" value={stats.total} />
        <AdminStat label="Published" value={stats.published} hint="Indexed when live" />
        <AdminStat label="Drafts" value={stats.draft} hint="Admin only" />
      </div>

      <div className="admin-toolbar admin-blog-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon" aria-hidden>
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, slug, category…"
            aria-label="Search blog posts"
          />
        </div>
        <div className="admin-filters">
          <div className="admin-seg" role="group" aria-label="Filter by status">
            {(
              [
                ["all", "All"],
                ["published", "Published"],
                ["draft", "Drafts"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`admin-seg-btn${statusFilter === value ? " is-active" : ""}`}
                onClick={() => setStatusFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {hasFilters ? (
            <button
              type="button"
              className="admin-btn ghost small"
              onClick={() => {
                setQuery("");
                setStatusFilter("all");
              }}
            >
              Reset
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
          <p>Write your first SEO guide — it will appear on /blog/ when published.</p>
          <div className="admin-submit">
            <Link className="admin-btn" href="/admin/blog/new/">
              Write first post
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card admin-empty">
          <h2>No matches</h2>
          <p>Try another search or reset filters.</p>
          <button
            type="button"
            className="admin-btn ghost"
            onClick={() => {
              setQuery("");
              setStatusFilter("all");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="admin-blog-list">
          <div className="admin-blog-list-meta">
            Showing {filtered.length} of {items.length} posts
          </div>
          <ul className="admin-blog-cards">
            {filtered.map((item) => {
              const isBusy = busyId === item._id;
              return (
                <li
                  key={item._id}
                  className={`admin-blog-card${isBusy ? " is-busy" : ""}`}
                >
                  <div className="admin-blog-card-main">
                    <div className="admin-blog-card-top">
                      {item.category ? (
                        <span className="admin-blog-cat">{item.category}</span>
                      ) : null}
                      <span
                        className={`admin-pill ${item.status === "published" ? "live" : "draft"}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <Link
                      className="admin-blog-card-title"
                      href={`/admin/blog/${item._id}/`}
                    >
                      {item.title}
                    </Link>
                    {item.excerpt ? (
                      <p className="admin-blog-card-excerpt">{item.excerpt}</p>
                    ) : null}
                    <div className="admin-blog-card-meta">
                      <span>/blog/{item.slug}/</span>
                      <span>Published {formatDate(item.publishedAt)}</span>
                      {item.updatedAt ? (
                        <span>Updated {formatDate(item.updatedAt)}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="admin-blog-card-actions">
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
                      Preview ↗
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
                      className="admin-btn danger small"
                      disabled={isBusy}
                      onClick={() => remove(item._id, item.title)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
