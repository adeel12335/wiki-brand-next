"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import type { EditablePage } from "@/config/page-heroes";
import type { HeroImageValue, HeroStyle, PageHeroSettings } from "@/lib/page-hero";

const STYLES: Array<{ value: HeroStyle; label: string; hint: string }> = [
  { value: "default", label: "Designed", hint: "Keep the page's original hero. You can still add a background image." },
  { value: "split", label: "Side image", hint: "Text on the left, your image on the right." },
  { value: "background", label: "Background image", hint: "Full-width photo behind the text, with a dark overlay." },
  { value: "simple", label: "Text only", hint: "Heading, text and buttons on the dark brand background." },
];

interface FormState {
  style: HeroStyle;
  eyebrow: string;
  title: string;
  highlight: string;
  lede: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  imageAlt: string;
  overlay: number;
}

const empty: FormState = {
  style: "default",
  eyebrow: "",
  title: "",
  highlight: "",
  lede: "",
  primaryLabel: "",
  primaryHref: "",
  secondaryLabel: "",
  secondaryHref: "",
  imageAlt: "",
  overlay: 75,
};

async function upload(file: File): Promise<HeroImageValue> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", "pages");
  const res = await fetch("/api/upload/", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok || !data.image) throw new Error(data.error ?? "Image upload failed");
  return data.image as HeroImageValue;
}

function ImageField({
  title,
  value,
  onChange,
  wide,
}: {
  title: string;
  value: HeroImageValue | null;
  onChange: (v: HeroImageValue | null) => void;
  wide?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <section className="admin-card">
      <h2>{title}</h2>
      {value?.url ? (
        <Image
          className={`admin-preview${wide ? " admin-preview--wide" : ""}`}
          src={value.url}
          alt={value.alt || title}
          width={value.width ?? 1600}
          height={value.height ?? 900}
          sizes="420px"
        />
      ) : (
        <div className="admin-image-placeholder">No image yet</div>
      )}
      <label className="admin-upload">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            setErr(null);
            try {
              onChange(await upload(file));
            } catch (error) {
              setErr(error instanceof Error ? error.message : "Upload failed");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
        <span>{busy ? "Uploading…" : value ? "Replace image (max 5 MB)" : "Choose image (max 5 MB)"}</span>
      </label>
      {err ? <span className="admin-fielderror">{err}</span> : null}
      {value ? (
        <button type="button" className="admin-btn ghost" onClick={() => onChange(null)}>
          Remove image
        </button>
      ) : null}
    </section>
  );
}

export default function AdminPageHeroEdit() {
  const { key } = useParams<{ key: string }>();
  const router = useRouter();
  const [page, setPage] = useState<EditablePage | null>(null);
  const [values, setValues] = useState<FormState>(empty);
  const [image, setImage] = useState<HeroImageValue | null>(null);
  const [bg, setBg] = useState<HeroImageValue | null>(null);
  const [bgMobile, setBgMobile] = useState<HeroImageValue | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/page-heroes/${key}/`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error ?? "Could not load page");
        setPage(data.page);
        const h: PageHeroSettings | null = data.hero;
        setSaved(Boolean(h));
        if (h) {
          setValues({
            style: h.style,
            eyebrow: h.eyebrow,
            title: h.title,
            highlight: h.highlight,
            lede: h.lede,
            primaryLabel: h.primary.label,
            primaryHref: h.primary.href,
            secondaryLabel: h.secondary.label,
            secondaryHref: h.secondary.href,
            imageAlt: h.image?.alt ?? "",
            overlay: h.overlay,
          });
          setImage(h.image);
          setBg(h.backgroundImage);
          setBgMobile(h.backgroundImageMobile);
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load page"))
      .finally(() => setLoading(false));
  }, [key]);

  const set = (patch: Partial<FormState>) => setValues((v) => ({ ...v, ...patch }));
  const fullMode = page?.mode === "full";
  const custom = fullMode && values.style !== "default";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setFlash(null);
    const payload = {
      style: fullMode ? values.style : "default",
      eyebrow: values.eyebrow,
      title: values.title,
      highlight: values.highlight,
      lede: values.lede,
      primary: { label: values.primaryLabel, href: values.primaryHref },
      secondary: { label: values.secondaryLabel, href: values.secondaryHref },
      image: image ? { ...image, alt: values.imageAlt || values.title } : null,
      backgroundImage: bg,
      backgroundImageMobile: bgMobile,
      overlay: values.overlay,
    };
    const res = await fetch(`/api/page-heroes/${key}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Save failed");
      return;
    }
    setSaved(true);
    setFlash("Saved. The live page is updated.");
    router.refresh();
  }

  async function reset() {
    if (!window.confirm("Reset this hero? The page will show its designed hero again.")) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/page-heroes/${key}/`, { method: "DELETE" });
    setSaving(false);
    if (!res.ok) {
      setError("Reset failed");
      return;
    }
    setValues(empty);
    setImage(null);
    setBg(null);
    setBgMobile(null);
    setSaved(false);
    setFlash("Reset. The page shows its designed hero again.");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="admin-card admin-loading">
        <div className="admin-spinner" />
        <p>Loading page…</p>
      </div>
    );
  }

  if (!page) {
    return (
      <>
        <p className="admin-error">{error ?? "Unknown page"}</p>
        <Link className="admin-btn ghost" href="/admin/pages/">
          ← Back to pages
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="admin-eyebrow">Page hero</p>
          <h1>{page.label}</h1>
          <p>
            Live page:{" "}
            <a href={page.path} target="_blank" rel="noopener">
              {page.path}
            </a>
          </p>
        </div>
        <Link className="admin-btn ghost" href="/admin/pages/">
          ← Back to pages
        </Link>
      </div>

      {flash ? <p className="admin-flash">{flash}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      {!fullMode ? (
        <p className="admin-notice">
          This page&apos;s hero contains a form, quiz, tabs or search, so its layout and text stay as designed. You can change its background image.
        </p>
      ) : null}

      <form className="admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-form-main">
          {fullMode ? (
            <section className="admin-card">
              <h2>Hero style</h2>
              <div className="admin-seg" role="radiogroup" aria-label="Hero style">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={values.style === s.value}
                    className={`admin-seg-btn${values.style === s.value ? " is-active" : ""}`}
                    onClick={() => set({ style: s.value })}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <span className="admin-hint" style={{ marginTop: 10 }}>
                {STYLES.find((s) => s.value === values.style)?.hint}
              </span>
            </section>
          ) : null}

          {custom ? (
            <section className="admin-card">
              <h2>Text</h2>
              <label>Eyebrow (small label above the heading, optional)</label>
              <input value={values.eyebrow} onChange={(e) => set({ eyebrow: e.target.value })} maxLength={80} />
              <label>Heading, first line</label>
              <input value={values.title} onChange={(e) => set({ title: e.target.value })} maxLength={120} required />
              <label>Heading, second line (shown in gold, optional)</label>
              <input value={values.highlight} onChange={(e) => set({ highlight: e.target.value })} maxLength={120} />
              <label>Paragraph</label>
              <textarea rows={4} value={values.lede} onChange={(e) => set({ lede: e.target.value })} maxLength={600} />
            </section>
          ) : null}

          {custom ? (
            <section className="admin-card">
              <h2>Buttons (optional)</h2>
              <label>Primary button text</label>
              <input value={values.primaryLabel} onChange={(e) => set({ primaryLabel: e.target.value })} placeholder="Get a Free Assessment" />
              <label>Primary button link</label>
              <input value={values.primaryHref} onChange={(e) => set({ primaryHref: e.target.value })} placeholder="/contact/" />
              <label>Second button text</label>
              <input value={values.secondaryLabel} onChange={(e) => set({ secondaryLabel: e.target.value })} placeholder="See Pricing" />
              <label>Second button link</label>
              <input value={values.secondaryHref} onChange={(e) => set({ secondaryHref: e.target.value })} placeholder="/wikipedia-page-cost/" />
              <span className="admin-hint">Leave a button&apos;s text empty to hide it.</span>
            </section>
          ) : null}
        </div>

        <aside className="admin-form-side">
          <section className="admin-card">
            <h2>Publish</h2>
            <p className="admin-muted">{saved ? "This page has custom hero settings." : "Using the designed hero."}</p>
            <div className="admin-submit-stack">
              <button className="admin-btn" type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save hero"}
              </button>
              {saved ? (
                <button className="admin-btn ghost" type="button" onClick={reset} disabled={saving}>
                  Reset to designed hero
                </button>
              ) : null}
            </div>
          </section>

          {custom && values.style === "split" ? (
            <>
              <ImageField title="Side image" value={image} onChange={setImage} />
              <section className="admin-card">
                <label>Side image alt text</label>
                <input value={values.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} placeholder="Describe the image" />
              </section>
            </>
          ) : null}

          {values.style !== "simple" || !fullMode ? (
            <>
              <ImageField title="Background image (desktop)" value={bg} onChange={setBg} wide />
              <ImageField title="Background image (mobile, optional)" value={bgMobile} onChange={setBgMobile} />
              <section className="admin-card">
                <span className="admin-hint" style={{ marginTop: 0 }}>
                  Desktop: a wide landscape photo (about 1920 x 1080). Mobile: a tall portrait photo (about 1080 x 1600) with empty space at the top for the text. Without a mobile image, phones use the desktop one.
                </span>
              </section>
              {bg ? (
                <section className="admin-card">
                  <label>Dark overlay: {values.overlay}%</label>
                  <input
                    type="range"
                    min={0}
                    max={95}
                    step={5}
                    value={values.overlay}
                    onChange={(e) => set({ overlay: Number(e.target.value) })}
                  />
                  <span className="admin-hint">Higher keeps white text readable on bright photos.</span>
                </section>
              ) : null}
            </>
          ) : null}
        </aside>
      </form>
    </>
  );
}
