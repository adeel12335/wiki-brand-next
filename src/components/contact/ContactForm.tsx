"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { RecaptchaField } from "@/components/contact/RecaptchaField";
import { SITE_EMAIL, url } from "@/lib/config";
import { services } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

const subjectOptions = [
  ...Object.values(services).map((s) => s.name),
  "Something else",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
  captchaToken: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
  captchaToken: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateClient(values: FormState, captchaRequired: boolean) {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  else if (values.name.trim().length > 120) {
    errors.name = "Name is too long.";
  }

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  } else if (values.email.trim().length > 180) {
    errors.email = "Email is too long.";
  }

  if (values.phone.trim().length > 40) {
    errors.phone = "Phone number is too long.";
  }

  if (values.subject && !subjectOptions.includes(values.subject)) {
    errors.subject = "Please choose one of the listed options.";
  }

  const message = values.message.trim();
  if (!message) errors.message = "Please tell us about the subject.";
  else if (message.length < 20) {
    errors.message =
      "Please give us at least a sentence or two about the subject.";
  } else if (message.length > 4000) {
    errors.message = "Message is too long.";
  }

  if (captchaRequired && !values.captchaToken.trim()) {
    errors.captcha = "Please complete the captcha check.";
  }

  return errors;
}

export function ContactForm({
  recaptchaSiteKey = "",
}: {
  recaptchaSiteKey?: string;
}) {
  const router = useRouter();
  const captchaRequired = Boolean(recaptchaSiteKey);
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);

  const messageHint = useMemo(() => {
    const len = values.message.trim().length;
    if (len === 0) return null;
    if (len < 20) return `${20 - len} more characters needed`;
    return null;
  }, [values.message]);

  function clearCaptcha() {
    setValues((prev) => ({ ...prev, captchaToken: "" }));
    setCaptchaReset((n) => n + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailed(false);

    const clientErrors = validateClient(values, captchaRequired);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
          website: values.website,
          captchaToken: values.captchaToken,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        setSent(true);
        setValues(emptyForm);
        clearCaptcha();
        trackEvent("form_submit", { form_name: "contact" });
        router.push(url("thank-you"));
        return;
      }

      clearCaptcha();

      if (data.errors) {
        setErrors(data.errors);
        if (data.errors.form) setFailed(true);
        return;
      }

      setFailed(true);
    } catch {
      clearCaptcha();
      setFailed(true);
      setErrors({
        form: `Network error. Please email ${SITE_EMAIL} directly.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setSent(false);
    setFailed(false);
    setErrors({});
    setValues(emptyForm);
    clearCaptcha();
  }

  return (
    <div className="contact-dossier reveal">
      <header className="contact-dossier-head">
        <div>
          <p className="micro-label">Send an enquiry</p>
          <h2>
            Start with an <span>assessment</span>
          </h2>
        </div>
        <p className="contact-dossier-meta">
          <Icon name="i-shield" />
          <span>Confidential · Editor-reviewed</span>
        </p>
      </header>

      {sent ? (
        <div className="contact-success" role="status">
          <div className="contact-success-mark" aria-hidden="true">
            <Icon name="i-check" />
          </div>
          <p className="micro-label">Enquiry received</p>
          <h3>Thank you — we have your note.</h3>
          <p>
            An editor will review the coverage you shared and reply, usually within
            one business day. Prefer not to wait? Email{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> directly.
          </p>
          <button
            className="button button-outline button-small"
            type="button"
            onClick={resetForm}
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <>
          {failed ? (
            <div className="form-note error" role="alert">
              <strong>{errors.form || "We could not send that message."}</strong>
              <p>
                Email us at <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> and we
                will pick it up from there.
              </p>
            </div>
          ) : null}

          {errors.form && !failed ? (
            <div className="form-note error" role="alert">
              <strong>{errors.form}</strong>
            </div>
          ) : null}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-pair" aria-hidden="true" hidden>
              <label htmlFor="website">Leave this field empty</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) =>
                  setValues({ ...values, website: e.target.value })
                }
              />
            </div>

            <div className="field-pair">
              <div className="field">
                <label htmlFor="name">
                  Your name <span aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={120}
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                  <small className="field-error">{errors.name}</small>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="email">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  maxLength={180}
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? (
                  <small className="field-error">{errors.email}</small>
                ) : null}
              </div>
            </div>

            <div className="field-pair">
              <div className="field">
                <label htmlFor="phone">
                  Phone <small>(optional)</small>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  maxLength={40}
                  value={values.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone ? (
                  <small className="field-error">{errors.phone}</small>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="subject">What do you need?</label>
                <select
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={(e) =>
                    setValues({ ...values, subject: e.target.value })
                  }
                  aria-invalid={Boolean(errors.subject)}
                >
                  <option value="">Select an option</option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.subject ? (
                  <small className="field-error">{errors.subject}</small>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">
                Subject name &amp; strongest coverage{" "}
                <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                required
                maxLength={4000}
                placeholder="Subject name, and links to the strongest independent press coverage (with dates if you have them)."
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <small className="field-error">{errors.message}</small>
              ) : messageHint ? (
                <small className="field-hint">{messageHint}</small>
              ) : null}
            </div>

            {captchaRequired ? (
              <div className="field recaptcha-field">
                <label>
                  Security check <span aria-hidden="true">*</span>
                </label>
                <RecaptchaField
                  siteKey={recaptchaSiteKey}
                  resetSignal={captchaReset}
                  onToken={(token) => {
                    setValues((prev) => ({ ...prev, captchaToken: token }));
                    setErrors((prev) => {
                      if (!prev.captcha) return prev;
                      const next = { ...prev };
                      delete next.captcha;
                      return next;
                    });
                  }}
                  onExpire={() =>
                    setValues((prev) => ({ ...prev, captchaToken: "" }))
                  }
                  onError={() => {
                    setValues((prev) => ({ ...prev, captchaToken: "" }));
                    setErrors((prev) => ({
                      ...prev,
                      captcha:
                        "Captcha failed to load. Please refresh and try again.",
                    }));
                  }}
                />
                {errors.captcha ? (
                  <small className="field-error">{errors.captcha}</small>
                ) : null}
              </div>
            ) : null}

            <div className="contact-form-actions">
              <button
                className="button button-gold"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Request free assessment"}{" "}
                <Icon name="i-arrow" />
              </button>
              <p className="form-legal">
                By sending this form you agree to our{" "}
                <a href={url("privacy-policy")}>privacy policy</a>. Prefer email?{" "}
                <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
