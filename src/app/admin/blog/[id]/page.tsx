"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface FormValues {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  relatedService: string;
  ogImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  publishedAt: string;
  status: "draft" | "published";
}

const CATEGORIES = [
  "Eligibility",
  "Process",
  "Compliance",
  "Risk",
  "Research",
  "Editing",
  "Buying guide",
  "Pricing",
  "Entity",
  "Maintenance",
];

const SERVICE_OPTIONS = [
  { value: "", label: "None" },
  { value: "wikipedia-page-creation", label: "Page creation" },
  { value: "wikipedia-page-editing", label: "Page editing" },
  { value: "wikipedia-content-writing", label: "Content writing" },
  { value: "wikipedia-page-management", label: "Page management" },
  { value: "wikipedia-notability-assessment", label: "Notability assessment" },
  { value: "wikipedia-reputation-management", label: "Reputation management" },
  { value: "google-knowledge-panel-creation", label: "Knowledge panel" },
  { value: "wikipedia-page-monitoring", label: "Page monitoring" },
];

const empty: FormValues = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "Eligibility",
  relatedService: "",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "draft",
};

export default function AdminBlogEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const [values, setValues] = useState<FormValues>(empty);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/blog/${params.id}/`)
      .then((r) => r.json())
      .then((data) => {
        const item = data.item;
        if (!item) return;
        setValues({
          title: item.title ?? "",
          slug: item.slug ?? "",
          excerpt: item.excerpt ?? "",
          body: item.body ?? "",
          category: item.category ?? "",
          relatedService: item.relatedService ?? "",
          ogImage: item.ogImage ?? "/assets/og/hero-orbital-globe.jpg",
          metaTitle: item.metaTitle ?? "",
          metaDescription: item.metaDescription ?? "",
          keywords: item.keywords ?? "",
          publishedAt: item.publishedAt
            ? String(item.publishedAt).slice(0, 10)
            : empty.publishedAt,
          status: item.status ?? "draft",
        });
      })
      .finally(() => setLoading(false));
  }, [isNew, params.id]);

  async function uploadImage(file: File) {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog");
    const res = await fetch("/api/upload/", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error ?? "Image upload failed");
      return;
    }
    if (data.image?.url) {
      setValues((prev) => ({ ...prev, ogImage: data.image.url }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch(
      isNew ? "/api/blog/" : `/api/blog/${params.id}/`,
      {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      const details = data.details
        ? Object.values(data.details as Record<string, string[]>)
            .flat()
            .join(" ")
        : null;
      setError(
        details ||
          (typeof data.error === "string"
            ? data.error
            : "Save failed — check required fields"),
      );
      return;
    }

    router.push(`/admin/blog/${data.item._id}/`);
    router.refresh();
  }

  if (loading) {
    return (
      <div className="admin-card admin-loading">
        <div className="admin-spinner" />
        <p>Loading post…</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">{isNew ? "New post" : "Edit post"}</p>
          <h1>{isNew ? "Write blog post" : values.title || "Edit post"}</h1>
          {!isNew && values.slug ? (
            <p>
              Public URL:{" "}
              <a href={`/blog/${values.slug}/`} target="_blank" rel="noopener">
                /blog/{values.slug}/
              </a>
            </p>
          ) : null}
        </div>
        <Link className="admin-btn ghost" href="/admin/blog/">
          ← Back to list
        </Link>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <form className="admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-form-main">
          <section className="admin-card">
            <h2>Article</h2>
            <label>Title</label>
            <input
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="Clear, search-friendly headline"
              required
            />

            <label>URL slug</label>
            <input
              value={values.slug}
              onChange={(e) => setValues({ ...values, slug: e.target.value })}
              placeholder="auto-generated from title if empty"
            />

            <label>Excerpt</label>
            <textarea
              rows={3}
              value={values.excerpt}
              onChange={(e) =>
                setValues({ ...values, excerpt: e.target.value })
              }
              placeholder="1–2 sentences for cards and meta fallback"
              required
            />

            <label>Body (HTML)</label>
            <textarea
              rows={18}
              value={values.body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              placeholder="<p>…</p><h2>…</h2>"
              required
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            />
            <p className="admin-hint">
              Use trusted HTML only (&lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;a&gt;,
              etc.). This renders on the public post page.
            </p>
          </section>

          <section className="admin-card">
            <h2>SEO</h2>
            <label>Meta title</label>
            <input
              value={values.metaTitle}
              onChange={(e) =>
                setValues({ ...values, metaTitle: e.target.value })
              }
              placeholder="Defaults to title"
            />
            <label>Meta description</label>
            <textarea
              rows={3}
              value={values.metaDescription}
              onChange={(e) =>
                setValues({ ...values, metaDescription: e.target.value })
              }
              placeholder="Defaults to excerpt"
            />
            <label>Keywords</label>
            <input
              value={values.keywords}
              onChange={(e) =>
                setValues({ ...values, keywords: e.target.value })
              }
              placeholder="comma,separated,keywords"
            />
          </section>
        </div>

        <aside className="admin-form-side">
          <section className="admin-card">
            <h2>Publish</h2>
            <label>Status</label>
            <select
              value={values.status}
              onChange={(e) =>
                setValues({
                  ...values,
                  status: e.target.value as "draft" | "published",
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <label>Publish date</label>
            <input
              type="date"
              value={values.publishedAt}
              onChange={(e) =>
                setValues({ ...values, publishedAt: e.target.value })
              }
            />

            <label>Category</label>
            <input
              list="blog-categories"
              value={values.category}
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            />
            <datalist id="blog-categories">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>

            <label>Related service</label>
            <select
              value={values.relatedService}
              onChange={(e) =>
                setValues({ ...values, relatedService: e.target.value })
              }
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value || "none"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="admin-submit">
              <button className="admin-btn" type="submit" disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create post" : "Save changes"}
              </button>
            </div>
          </section>

          <section className="admin-card">
            <h2>OG image</h2>
            {values.ogImage ? (
              <Image
                className="admin-preview"
                src={values.ogImage}
                alt={values.title || "OG image"}
                width={1200}
                height={630}
                sizes="(max-width: 900px) 100vw, 420px"
                unoptimized={values.ogImage.startsWith("http")}
              />
            ) : (
              <div className="admin-image-placeholder">No image yet</div>
            )}
            <label className="admin-upload">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file);
                }}
              />
              <span>{uploading ? "Uploading…" : "Upload image (max 5 MB)"}</span>
            </label>
            <label>Image URL / path</label>
            <input
              value={values.ogImage}
              onChange={(e) =>
                setValues({ ...values, ogImage: e.target.value })
              }
              placeholder="/assets/og/… or https://…"
            />
          </section>
        </aside>
      </form>
    </>
  );
}
