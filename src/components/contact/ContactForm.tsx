"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SITE_EMAIL } from "@/lib/config";
import { services } from "@/lib/data";

const subjectOptions = [
  ...Object.values(services).map((s) => s.name),
  "Notability assessment",
  "Something else",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFailed(false);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        setSent(true);
        setValues(emptyForm);
        return;
      }

      if (data.errors) {
        setErrors(data.errors);
        if (data.errors.form) setFailed(true);
        return;
      }

      setFailed(true);
    } catch {
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
                  value={values.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                />
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
                About the subject <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                required
                placeholder="Who or what is the article about, and where has it been covered independently?"
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <small className="field-error">{errors.message}</small>
              ) : null}
            </div>

            <div className="contact-form-actions">
              <button
                className="button button-gold"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Enquiry"}{" "}
                <Icon name="i-arrow" />
              </button>
              <p className="form-legal">
                Prefer email? <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
