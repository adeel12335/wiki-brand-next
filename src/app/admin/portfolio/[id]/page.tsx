"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface FormValues {
  title: string;
  slug: string;
  category: string;
  summary: string;
  body: string;
  externalUrl: string;
  featuredOnHome: boolean;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  status: "draft" | "published";
}

const empty: FormValues = {
  title: "",
  slug: "",
  category: "",
  summary: "",
  body: "",
  externalUrl: "",
  featuredOnHome: false,
  imageAlt: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  status: "draft",
};

export default function AdminPortfolioEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const [values, setValues] = useState<FormValues>(empty);
  const [image, setImage] = useState<{
    cloudinaryId: string;
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/portfolio/${params.id}/`)
      .then((r) => r.json())
      .then((data) => {
        const item = data.item;
        if (!item) return;
        setValues({
          title: item.title ?? "",
          slug: item.slug ?? "",
          category: item.category ?? "",
          summary: item.summary ?? "",
          body: item.body ?? "",
          externalUrl: item.externalUrl ?? "",
          featuredOnHome: Boolean(item.featuredOnHome),
          imageAlt: item.image?.alt ?? "",
          metaTitle: item.seo?.metaTitle ?? "",
          metaDescription: item.seo?.metaDescription ?? "",
          keywords: item.seo?.keywords ?? "",
          status: item.status ?? "draft",
        });
        setImage(item.image ?? null);
      })
      .finally(() => setLoading(false));
  }, [isNew, params.id]);

  async function uploadImage(file: File) {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error ?? "Image upload failed");
      return;
    }
    if (data.image) setImage(data.image);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...values,
      image: image
        ? { ...image, alt: values.imageAlt || values.title }
        : null,
      seo: {
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        keywords: values.keywords,
      },
    };

    const res = await fetch(
      isNew ? "/api/portfolio/" : `/api/portfolio/${params.id}/`,
      {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(
        typeof data.error === "string"
          ? data.error
          : "Save failed — check required fields",
      );
      return;
    }

    router.push(`/admin/portfolio/${data.item._id}/`);
    router.refresh();
  }

  if (loading) {
    return (
      <div className="admin-card admin-loading">
        <div className="admin-spinner" />
        <p>Loading item…</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">{isNew ? "New client" : "Edit client"}</p>
          <h1>{isNew ? "Add portfolio item" : values.title || "Edit item"}</h1>
          {!isNew && values.slug ? (
            <p>
              Public URL:{" "}
              <a href={`/portfolio/${values.slug}/`} target="_blank" rel="noopener">
                /portfolio/{values.slug}/
              </a>
            </p>
          ) : null}
        </div>
        <Link className="admin-btn ghost" href="/admin/portfolio/">
          ← Back to list
        </Link>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <form className="admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-form-main">
          <section className="admin-card">
            <h2>Client details</h2>
            <label>Name</label>
            <input
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="e.g. David Bianchi"
              required
            />

            <label>URL slug</label>
            <input
              value={values.slug}
              onChange={(e) => setValues({ ...values, slug: e.target.value })}
              placeholder="auto-generated from name if empty"
            />

            <label>Short description</label>
            <textarea
              rows={3}
              value={values.summary}
              onChange={(e) => setValues({ ...values, summary: e.target.value })}
              placeholder="Shown on portfolio cards"
              required
            />

            <label>Full description</label>
            <textarea
              rows={6}
              value={values.body}
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              placeholder="Optional longer text"
            />

            <label>Wikipedia / external link</label>
            <input
              type="url"
              value={values.externalUrl}
              onChange={(e) =>
                setValues({ ...values, externalUrl: e.target.value })
              }
              placeholder="https://en.wikipedia.org/wiki/..."
            />
          </section>

          <section className="admin-card">
            <h2>SEO (optional)</h2>
            <label>Meta title</label>
            <input
              value={values.metaTitle}
              onChange={(e) =>
                setValues({ ...values, metaTitle: e.target.value })
              }
            />
            <label>Meta description</label>
            <textarea
              rows={3}
              value={values.metaDescription}
              onChange={(e) =>
                setValues({ ...values, metaDescription: e.target.value })
              }
            />
            <label>Keywords</label>
            <input
              value={values.keywords}
              onChange={(e) =>
                setValues({ ...values, keywords: e.target.value })
              }
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

            <label className="admin-check">
              <input
                type="checkbox"
                checked={values.featuredOnHome}
                onChange={(e) =>
                  setValues({ ...values, featuredOnHome: e.target.checked })
                }
              />
              Show on home page carousel
            </label>

            <div className="admin-submit">
              <button className="admin-btn" type="submit" disabled={saving}>
                {saving ? "Saving…" : isNew ? "Create client" : "Save changes"}
              </button>
            </div>
          </section>

          <section className="admin-card">
            <h2>Photo</h2>
            {image?.url ? (
              <img
                className="admin-preview"
                src={image.url}
                alt={values.imageAlt || values.title}
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
              <span>{uploading ? "Uploading…" : "Choose image (max 5 MB)"}</span>
            </label>
            <label>Image alt text</label>
            <input
              value={values.imageAlt}
              onChange={(e) =>
                setValues({ ...values, imageAlt: e.target.value })
              }
              placeholder={values.title || "Describe the photo"}
            />
          </section>
        </aside>
      </form>
    </>
  );
}
