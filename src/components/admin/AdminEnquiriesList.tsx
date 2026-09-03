"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminStat } from "@/components/admin/AdminStat";

interface EnquiryRow {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "archived";
  emailSent?: boolean;
  createdAt: string;
}

type StatusFilter = "all" | "new" | "read" | "archived";

async function fetchEnquiries(signal?: AbortSignal): Promise<EnquiryRow[]> {
  const response = await fetch("/api/contact/enquiries/", { signal });
  if (!response.ok) throw new Error("Could not load enquiries");
  const data = await response.json();
  return data.items ?? [];
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export function AdminEnquiriesList() {
  const [items, setItems] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await fetchEnquiries());
    } catch {
      setToast("Could not refresh enquiries");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void fetchEnquiries(controller.signal)
      .then((rows) => {
        setItems(rows);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoading(false);
        setToast("Could not load enquiries");
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
      newCount: items.filter((i) => i.status === "new").length,
      read: items.filter((i) => i.status === "read").length,
      archived: items.filter((i) => i.status === "archived").length,
    }),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.subject ?? "").toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [items, query, statusFilter]);

  async function setStatus(id: string, status: EnquiryRow["status"], msg: string) {
    setBusyId(id);
    await fetch(`/api/contact/enquiries/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    setBusyId(null);
    setToast(msg);
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete enquiry from "${name}"? This cannot be undone.`)) return;
    setBusyId(id);
    await fetch(`/api/contact/enquiries/${id}/`, { method: "DELETE" });
    await load();
    setBusyId(null);
    setToast("Enquiry deleted");
  }

  const hasFilters = query.trim() !== "" || statusFilter !== "all";

  return (
    <>
      {toast ? <div className="admin-toast">{toast}</div> : null}

      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Inbox</p>
          <h1>Contact enquiries</h1>
          <p>Messages submitted through the public contact form.</p>
        </div>
      </div>

      <div className="admin-stats">
        <AdminStat label="Total" value={stats.total} />
        <AdminStat label="New" value={stats.newCount} hint="Unread" />
        <AdminStat label="Read" value={stats.read} />
        <AdminStat label="Archived" value={stats.archived} />
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
            placeholder="Search name, email, subject, or message…"
            aria-label="Search enquiries"
          />
        </div>
        <div className="admin-filters">
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
          </label>
        </div>
      </div>

      <div className="admin-table-meta">
        {loading
          ? "Loading…"
          : hasFilters
            ? `${filtered.length} of ${items.length} enquiries`
            : `${items.length} enquiries`}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Received</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  {items.length === 0
                    ? "No enquiries yet. Submit the contact form to see entries here."
                    : "No enquiries match these filters."}
                </td>
              </tr>
            ) : null}
            {filtered.map((item) => {
              const open = expandedId === item._id;
              return (
                <tr
                  key={item._id}
                  className={busyId === item._id ? "is-busy" : undefined}
                >
                  <td>
                    <a href={`mailto:${item.email}`}>{item.name}</a>
                    <small>{item.email}</small>
                    {item.phone ? <small>{item.phone}</small> : null}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-linkish"
                      onClick={() =>
                        setExpandedId(open ? null : item._id)
                      }
                    >
                      {item.subject || "General"}
                    </button>
                    {open ? (
                      <small className="admin-enquiry-message">
                        {item.message}
                      </small>
                    ) : (
                      <small>
                        {item.message.slice(0, 80)}
                        {item.message.length > 80 ? "…" : ""}
                      </small>
                    )}
                  </td>
                  <td>
                    {formatDate(item.createdAt)}
                    {item.emailSent ? (
                      <small>Email notified</small>
                    ) : (
                      <small>Saved only</small>
                    )}
                  </td>
                  <td>
                    <span
                      className={`admin-pill ${
                        item.status === "new"
                          ? "live"
                          : item.status === "archived"
                            ? "draft"
                            : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      {item.status !== "read" ? (
                        <button
                          type="button"
                          className="admin-btn ghost small"
                          disabled={busyId === item._id}
                          onClick={() =>
                            setStatus(item._id, "read", "Marked as read")
                          }
                        >
                          Mark read
                        </button>
                      ) : null}
                      {item.status !== "archived" ? (
                        <button
                          type="button"
                          className="admin-btn ghost small"
                          disabled={busyId === item._id}
                          onClick={() =>
                            setStatus(item._id, "archived", "Archived")
                          }
                        >
                          Archive
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="admin-btn ghost small"
                          disabled={busyId === item._id}
                          onClick={() =>
                            setStatus(item._id, "new", "Restored as new")
                          }
                        >
                          Restore
                        </button>
                      )}
                      <button
                        type="button"
                        className="admin-btn ghost small danger"
                        disabled={busyId === item._id}
                        onClick={() => remove(item._id, item.name)}
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
    </>
  );
}
