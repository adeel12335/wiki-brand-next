"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

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

function CharMeter({
  value,
  idealMin,
  idealMax,
}: {
  value: number;
  idealMin: number;
  idealMax: number;
}) {
  const tone =
    value === 0
      ? "muted"
      : value < idealMin
        ? "warn"
        : value > idealMax
          ? "warn"
          : "ok";
  return (
    <span className={`admin-char-meter is-${tone}`}>
      {value}
      <small>
        / {idealMin}–{idealMax}
      </small>
    </span>
  );
}

export default function AdminBlogEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const [values, setValues] = useState<FormValues>(empty);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [preview, setPreview] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

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

  const metaTitleLen = (values.metaTitle || values.title).length;
  const metaDescLen = (values.metaDescription || values.excerpt).length;
  const wordCount = useMemo(() => {
    const text = values.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return text ? text.split(" ").length : 0;
  }, [values.body]);

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

    const res = await fetch(isNew ? "/api/blog/" : `/api/blog/${params.id}/`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

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

    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2200);
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
    <div className="admin-blog-shell">
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">{isNew ? "New post" : "Edit post"}</p>
          <h1>{isNew ? "Write blog post" : values.title || "Edit post"}</h1>
          {!isNew && values.slug ? (
            <p className="admin-blog-url">
              Live URL:{" "}
              <a href={`/blog/${values.slug}/`} target="_blank" rel="noopener">
                /blog/{values.slug}/
              </a>
            </p>
          ) : (
            <p>HTML body + SEO fields publish straight to the public blog.</p>
          )}
        </div>
        <div className="admin-head-actions">
          <Link className="admin-btn ghost" href="/admin/blog/">
            ← All posts
          </Link>
          {!isNew && values.slug ? (
            <a
              className="admin-btn ghost"
              href={`/blog/${values.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview ↗
            </a>
          ) : null}
        </div>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}
      {savedFlash ? <p className="admin-flash">Saved successfully.</p> : null}

      <form className="admin-form-grid admin-blog-form" onSubmit={handleSubmit}>
        <div className="admin-form-main">
          <section className="admin-card">
            <div className="admin-card-head">
              <h2>Article</h2>
              <span className="admin-soft-badge">{wordCount} words</span>
            </div>

            <label htmlFor="blog-title">
              Title <span>required</span>
            </label>
            <input
              id="blog-title"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="Clear, search-friendly headline"
              required
            />

            <label htmlFor="blog-slug">URL slug</label>
            <div className="admin-slug-field">
              <span>/blog/</span>
              <input
                id="blog-slug"
                value={values.slug}
                onChange={(e) => setValues({ ...values, slug: e.target.value })}
                placeholder="auto-from-title"
              />
              <span>/</span>
            </div>

            <label htmlFor="blog-excerpt">
              Excerpt <span>required</span>
            </label>
            <textarea
              id="blog-excerpt"
              rows={3}
              value={values.excerpt}
              onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
              placeholder="1–2 sentences for cards and meta fallback"
              required
            />

            <div className="admin-editor-toolbar">
              <label htmlFor="blog-body" style={{ margin: 0 }}>
                Body (HTML) <span>required</span>
              </label>
              <div className="admin-seg" role="group" aria-label="Editor mode">
                <button
                  type="button"
                  className={`admin-seg-btn${!preview ? " is-active" : ""}`}
                  onClick={() => setPreview(false)}
                >
                  Code
                </button>
                <button
                  type="button"
                  className={`admin-seg-btn${preview ? " is-active" : ""}`}
                  onClick={() => setPreview(true)}
                >
                  Preview
                </button>
              </div>
            </div>

            {preview ? (
              <div
                className="admin-html-preview legal-body"
                dangerouslySetInnerHTML={{ __html: values.body || "<p><em>Nothing to preview yet.</em></p>" }}
              />
            ) : (
              <textarea
                id="blog-body"
                className="admin-code-editor"
                rows={20}
                value={values.body}
                onChange={(e) => setValues({ ...values, body: e.target.value })}
                placeholder={"<p>Opening paragraph…</p>\n<h2>Section</h2>\n<p>…</p>"}
                required
              />
            )}
            <p className="admin-hint">
              Trusted HTML only: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;,
              &lt;strong&gt;, &lt;em&gt;. Links to services help SEO.
            </p>
          </section>

          <section className="admin-card">
            <div className="admin-card-head">
              <h2>SEO</h2>
              <span className="admin-soft-badge">Search snippet</span>
            </div>

            <div className="admin-serp-preview">
              <p className="admin-serp-url">
                thewikipediastudio.com › blog › {values.slug || "post-slug"}
              </p>
              <p className="admin-serp-title">
                {values.metaTitle || values.title || "Meta title preview"}
              </p>
              <p className="admin-serp-desc">
                {values.metaDescription ||
                  values.excerpt ||
                  "Meta description preview appears here as Google might show it."}
              </p>
            </div>

            <div className="admin-label-row">
              <label htmlFor="blog-meta-title">Meta title</label>
              <CharMeter value={metaTitleLen} idealMin={40} idealMax={60} />
            </div>
            <input
              id="blog-meta-title"
              value={values.metaTitle}
              onChange={(e) =>
                setValues({ ...values, metaTitle: e.target.value })
              }
              placeholder="Defaults to title"
            />

            <div className="admin-label-row">
              <label htmlFor="blog-meta-desc">Meta description</label>
              <CharMeter value={metaDescLen} idealMin={120} idealMax={160} />
            </div>
            <textarea
              id="blog-meta-desc"
              rows={3}
              value={values.metaDescription}
              onChange={(e) =>
                setValues({ ...values, metaDescription: e.target.value })
              }
              placeholder="Defaults to excerpt"
            />

            <label htmlFor="blog-keywords">Keywords</label>
            <input
              id="blog-keywords"
              value={values.keywords}
              onChange={(e) =>
                setValues({ ...values, keywords: e.target.value })
              }
              placeholder="comma, separated, keywords"
            />
          </section>
        </div>

        <aside className="admin-form-side admin-blog-side">
          <section className="admin-card admin-sticky-card">
            <h2>Publish</h2>

            <label htmlFor="blog-status">Status</label>
            <select
              id="blog-status"
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

            <label htmlFor="blog-date">Publish date</label>
            <input
              id="blog-date"
              type="date"
              value={values.publishedAt}
              onChange={(e) =>
                setValues({ ...values, publishedAt: e.target.value })
              }
            />

            <label htmlFor="blog-category">Category</label>
            <input
              id="blog-category"
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

            <label htmlFor="blog-service">Related service</label>
            <select
              id="blog-service"
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

            <div className="admin-submit admin-submit-stack">
              <button className="admin-btn" type="submit" disabled={saving}>
                {saving
                  ? "Saving…"
                  : isNew
                    ? "Create post"
                    : values.status === "published"
                      ? "Save & publish"
                      : "Save draft"}
              </button>
              <p className="admin-hint" style={{ margin: 0 }}>
                Published posts update sitemap, feed, and IndexNow.
              </p>
            </div>
          </section>

          <section className="admin-card">
            <h2>Social / OG image</h2>
            {values.ogImage ? (
              <Image
                className="admin-preview admin-preview--wide"
                src={values.ogImage}
                alt={values.title || "OG image"}
                width={1200}
                height={630}
                sizes="(max-width: 900px) 100vw, 360px"
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
            <label htmlFor="blog-og">Image URL / path</label>
            <input
              id="blog-og"
              value={values.ogImage}
              onChange={(e) =>
                setValues({ ...values, ogImage: e.target.value })
              }
              placeholder="/assets/og/… or https://…"
            />
          </section>
        </aside>
      </form>
    </div>
  );
}
