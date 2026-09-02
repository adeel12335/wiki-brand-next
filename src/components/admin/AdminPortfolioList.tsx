"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminStat } from "@/components/admin/AdminStat";

interface PortfolioRow {
  _id: string;
  slug: string;
  title: string;
  category: string;
  summary?: string;
  status: "draft" | "published";
  featuredOnHome: boolean;
  externalUrl?: string | null;
  updatedAt: string;
  image?: { url?: string; alt?: string };
}

type StatusFilter = "all" | "published" | "draft";
type FeaturedFilter = "all" | "featured" | "not-featured";

function formatDate(value: string) {
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

export function AdminPortfolioList() {
  const [items, setItems] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [featuredFilter, setFeaturedFilter] = useState<FeaturedFilter>("all");

  const load = useCallback(async () => {
    const res = await fetch("/api/portfolio/");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
      featured: items.filter((i) => i.featuredOnHome).length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (featuredFilter === "featured" && !item.featuredOnHome) return false;
      if (featuredFilter === "not-featured" && item.featuredOnHome) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.summary ?? "").toLowerCase().includes(q) ||
        (item.category ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, query, statusFilter, featuredFilter]);

  async function action(id: string, body: object, successMsg?: string) {
    setBusyId(id);
    await fetch(`/api/portfolio/${id}/`, {
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
    await fetch(`/api/portfolio/${id}/`, { method: "DELETE" });
    await load();
    setBusyId(null);
    setToast("Item deleted");
  }

  const hasFilters =
    query.trim() !== "" || statusFilter !== "all" || featuredFilter !== "all";

  return (
    <>
      {toast ? <div className="admin-toast">{toast}</div> : null}

      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Dashboard</p>
          <h1>Portfolio</h1>
          <p>Manage clients shown on the home page and portfolio page.</p>
        </div>
        <div className="admin-head-actions">
          <Link className="admin-btn" href="/admin/portfolio/new/">
            + Add client
          </Link>
          <a
            className="admin-btn ghost"
            href="/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View live page ↗
          </a>
        </div>
      </div>

      <div className="admin-stats">
        <AdminStat label="Total clients" value={stats.total} />
        <AdminStat label="Published" value={stats.published} hint="Live on site" />
        <AdminStat label="Drafts" value={stats.draft} />
        <AdminStat label="On home page" value={stats.featured} hint="Featured carousel" />
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
            placeholder="Search by name, slug, or description…"
            aria-label="Search portfolio"
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
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value as FeaturedFilter)}
            aria-label="Filter by home feature"
          >
            <option value="all">All items</option>
            <option value="featured">Featured on home</option>
            <option value="not-featured">Not on home</option>
          </select>
          {hasFilters ? (
            <button
              type="button"
              className="admin-btn ghost small"
              onClick={() => {
                setQuery("");
                setStatusFilter("all");
                setFeaturedFilter("all");
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
          <p>Loading portfolio…</p>
        </div>
      ) : items.length === 0 ? (
        <div className="admin-card admin-empty">
          <h2>No portfolio items yet</h2>
          <p>Import from WordPress or add your first client manually.</p>
          <div className="admin-submit">
            <Link className="admin-btn" href="/admin/portfolio/new/">
              Add first client
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
              setFeaturedFilter("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <div className="admin-table-meta">
            Showing {filtered.length} of {items.length} clients
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Status</th>
                <th>Home</th>
                <th>Updated</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isBusy = busyId === item._id;
                const fullIndex = items.findIndex((row) => row._id === item._id);
                return (
                  <tr key={item._id} className={isBusy ? "is-busy" : ""}>
                    <td>
                      <div className="admin-client-cell">
                        {item.image?.url ? (
                          <img
                            className="admin-thumb"
                            src={item.image.url}
                            alt=""
                            width={52}
                            height={52}
                          />
                        ) : (
                          <span className="admin-nothumb">—</span>
                        )}
                        <div>
                          <Link href={`/admin/portfolio/${item._id}/`}>
                            {item.title}
                          </Link>
                          <small>/{item.slug}/</small>
                          {item.summary ? (
                            <small className="admin-client-summary">
                              {item.summary}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`admin-pill ${item.status === "published" ? "live" : "draft"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`admin-feature-btn ${item.featuredOnHome ? "active" : ""}`}
                        disabled={isBusy}
                        onClick={() =>
                          action(
                            item._id,
                            { action: "toggleFeatured" },
                            item.featuredOnHome
                              ? "Removed from home page"
                              : "Added to home page",
                          )
                        }
                      >
                        {item.featuredOnHome ? "★ Featured" : "☆ Not featured"}
                      </button>
                    </td>
                    <td className="admin-muted">{formatDate(item.updatedAt)}</td>
                    <td>
                      <div className="admin-order">
                        <button
                          type="button"
                          className="admin-icon"
                          disabled={isBusy || fullIndex <= 0}
                          onClick={() => action(item._id, { action: "up" })}
                          aria-label="Move up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="admin-icon"
                          disabled={isBusy || fullIndex >= items.length - 1}
                          onClick={() => action(item._id, { action: "down" })}
                          aria-label="Move down"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link
                          className="admin-btn ghost small"
                          href={`/admin/portfolio/${item._id}/`}
                        >
                          Edit
                        </Link>
                        {item.externalUrl ? (
                          <a
                            className="admin-btn ghost small"
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Wiki ↗
                          </a>
                        ) : null}
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
