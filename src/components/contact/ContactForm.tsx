"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/ui/Icon";
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

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      errors?: Record<string, string>;
    };

    setSubmitting(false);

    if (response.ok && data.ok) {
      setSent(true);
      setValues(emptyForm);
      return;
    }

    if (data.errors) {
      setErrors(data.errors);
      return;
    }

    setFailed(true);
  }

  return (
    <div className="contact-form-panel reveal">
      {sent ? (
        <div className="form-note success" role="status">
          <strong>Thank you — your enquiry has been sent.</strong>
          <p>We reply to every enquiry, usually within one business day.</p>
        </div>
      ) : null}

      {failed ? (
        <div className="form-note error" role="alert">
          <strong>We could not send that message.</strong>
          <p>Please try again or email us directly.</p>
        </div>
      ) : null}

      {errors.form ? (
        <div className="form-note error" role="alert">
          <strong>{errors.form}</strong>
        </div>
      ) : null}

      <p className="micro-label">Send An Enquiry</p>
      <h2>
        Start with an <span>assessment.</span>
      </h2>

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
            onChange={(e) => setValues({ ...values, website: e.target.value })}
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
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <small className="field-error" id="name-error">
                {errors.name}
              </small>
            ) : null}
          </div>
          <div className="field">
            <label htmlFor="email">
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <small className="field-error" id="email-error">
                {errors.email}
              </small>
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
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="subject">What do you need?</label>
            <select
              id="subject"
              name="subject"
              value={values.subject}
              onChange={(e) => setValues({ ...values, subject: e.target.value })}
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
            rows={6}
            required
            placeholder="Who or what is the article about, and where has it been covered independently?"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <small className="field-error" id="message-error">
              {errors.message}
            </small>
          ) : null}
        </div>

        <button className="button button-gold" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send Enquiry"} <Icon name="i-arrow" />
        </button>
        <p className="form-legal">
          We treat every enquiry as confidential and never share your details.
        </p>
      </form>
    </div>
  );
}
