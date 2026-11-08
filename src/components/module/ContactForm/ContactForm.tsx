"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { useRecaptcha } from "@/lib/captcha/useRecaptcha";

/** Topic chips → sent as `subject` (must match the API's allowed subject list). */
const TOPICS = [
  { label: "Page creation", subject: "Wikipedia Page Creation" },
  { label: "Editing an existing page", subject: "Page Editing & Expansion" },
  { label: "Monitoring", subject: "Wikipedia Page Monitoring" },
  { label: "Not sure yet", subject: "" },
];

type Errors = Partial<Record<"name" | "email" | "phone" | "subject" | "message" | "form" | "captcha", string>>;

const inputClass =
  "h-[52px] w-full rounded-[10px] border border-heading/10 bg-white px-4 text-[15px] text-heading placeholder:text-body/70 transition-colors focus:border-gold focus:outline-none focus:ring-3 focus:ring-gold/15";

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-heading">
        {label}
      </label>
      {children}
      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
    </div>
  );
}

/** Figma: Contact Section → Form. Posts to /api/contact (zod + reCAPTCHA + Mongo + Resend). */
export function ContactForm({ redirectTo = "/thank-you/", submitLabel = "Send Message" }: { redirectTo?: string; submitLabel?: string }) {
  const router = useRouter();
  const [topic, setTopic] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const recaptcha = useRecaptcha("contact");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const company = String(fd.get("company") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: TOPICS[topic].subject,
      message: company ? `Company / subject: ${company}\n\n${message}` : message,
      captchaToken: "",
    };
    setSending(true);
    setErrors({});
    try {
      try {
        payload.captchaToken = await recaptcha.getToken();
      } catch {
        setErrors({ captcha: "The security check could not load. Refresh the page, or email us directly." });
        return;
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push(redirectTo);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { errors?: Errors };
      setErrors(data.errors ?? { form: "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Network error. Please try again or email us directly." });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" htmlFor="cf-name" error={errors.name}>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
        </Field>
        <Field label="Work email" htmlFor="cf-email" error={errors.email}>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputClass} />
        </Field>
        <Field label="Company or subject" htmlFor="cf-company">
          <input id="cf-company" name="company" autoComplete="organization" placeholder="Acme Holdings" className={inputClass} />
        </Field>
        <Field label="Phone (optional)" htmlFor="cf-phone" error={errors.phone}>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className={inputClass} />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[13px] font-semibold text-heading">I need help with</legend>
        <div className="flex flex-wrap gap-2.5">
          {TOPICS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              aria-pressed={topic === i}
              onClick={() => setTopic(i)}
              className={cn(
                "rounded-full border px-4 py-2.5 text-sm transition-colors",
                topic === i ? "border-gold bg-gold/12 font-semibold text-gold-dark" : "border-heading/10 text-heading hover:border-gold",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {errors.subject ? <p className="text-[13px] text-red-600">{errors.subject}</p> : null}
      </fieldset>

      <Field label="Message" htmlFor="cf-message" error={errors.message}>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Links to coverage, prior drafts, or your timeline…"
          className={cn(inputClass, "h-auto min-h-[120px] resize-y py-3.5")}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-2.5 text-[13px] text-body">
          <input type="checkbox" required className="size-[18px] rounded accent-gold" />
          I agree to be contacted about my enquiry.
        </label>
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-gold px-7 text-[15px] font-semibold text-on-gold transition-all hover:bg-gold-light hover:shadow-gold disabled:opacity-60"
        >
          {sending ? "Sending…" : submitLabel}
          <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      {errors.form || errors.captcha ? <p className="text-sm text-red-600">{errors.form ?? errors.captcha}</p> : null}
      {recaptcha.enabled ? (
        <p className="text-xs text-body/80">
          Protected by reCAPTCHA. Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-dark">
            Terms
          </a>{" "}
          apply.
        </p>
      ) : null}
    </form>
  );
}
