"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { useRecaptcha } from "@/lib/captcha/useRecaptcha";

type Errors = Partial<Record<"name" | "email" | "phone" | "subject" | "message" | "form" | "captcha", string>>;

interface AssessmentFormProps {
  eyebrow: string;
  title: string;
  copy: string;
  submitLabel: string;
  note: string;
  /** Service names (must match the contact API's allowed subjects). */
  services: string[];
  defaultService: string;
  redirectTo?: string;
}

const inputClass =
  "h-[50px] w-full rounded-lg border border-heading/10 bg-white px-4 text-[15px] text-heading placeholder:text-body/70 transition-colors focus:border-gold focus:outline-none focus:ring-3 focus:ring-gold/15";

function Field({ label, htmlFor, error, className, children }: { label: string; htmlFor: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-heading">
        {label}
      </label>
      {children}
      {error ? <p className="text-[13px] text-red-600">{error}</p> : null}
    </div>
  );
}

/** Figma: Service Single hero → "Contact form" card (Free Assessment). Posts to /api/contact like the shared ContactForm. */
export function AssessmentForm({ eyebrow, title, copy, submitLabel, note, services, defaultService, redirectTo = "/thank-you/" }: AssessmentFormProps) {
  const router = useRouter();
  const id = useId();
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
      subject: String(fd.get("service") ?? ""),
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
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-[20px] bg-white p-6 shadow-[0_24px_60px_rgb(2_12_22/0.35)] md:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-bold tracking-[0.14em] text-gold-dark uppercase">{eyebrow}</p>
        <p className="text-[21px] leading-tight font-bold text-heading md:text-[26px]">{title}</p>
        <p className="text-[15px] text-body">{copy}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor={`${id}-name`} error={errors.name}>
          <input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Jane Smith" className={inputClass} />
        </Field>
        <Field label="Work email" htmlFor={`${id}-email`} error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={inputClass} />
        </Field>
        <Field label="Company or subject" htmlFor={`${id}-company`}>
          <input id={`${id}-company`} name="company" autoComplete="organization" placeholder="Acme Holdings" className={inputClass} />
        </Field>
        <Field label="Phone (optional)" htmlFor={`${id}-phone`} error={errors.phone}>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className={inputClass} />
        </Field>
      </div>

      <Field label="Service" htmlFor={`${id}-service`} error={errors.subject}>
        <span className="relative">
          <select id={`${id}-service`} name="service" defaultValue={defaultService} className={cn(inputClass, "cursor-pointer appearance-none pr-11")}>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-body" />
        </span>
      </Field>

      <Field label="What should we know?" htmlFor={`${id}-message`} error={errors.message}>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={4}
          placeholder="Links to coverage, prior drafts, or your timeline…"
          className={cn(inputClass, "h-auto min-h-[56px] resize-y py-3.5 md:min-h-[112px]")}
        />
      </Field>

      <label className="flex items-center gap-2.5 text-[13px] text-body">
        <input type="checkbox" required className="size-[18px] rounded accent-gold" />
        I agree to be contacted about my enquiry.
      </label>

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 text-[15px] font-semibold text-on-gold transition-all hover:bg-gold-light hover:shadow-gold disabled:opacity-60"
      >
        {sending ? "Sending…" : submitLabel}
        <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
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

      <p className="flex items-center gap-2 text-[13px] text-body">
        <Icon name="shield" size={16} className="shrink-0 text-gold" />
        {note}
      </p>
    </form>
  );
}
