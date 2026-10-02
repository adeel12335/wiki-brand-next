"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";

type CoverageDepth = "none" | "thin" | "solid" | "strong";

interface FormState {
  subjectType: "person" | "company" | "other";
  independentOutlets: number;
  coverageDepth: CoverageDepth;
  paywalledOk: boolean;
  priorRejection: boolean;
  promotionalOnly: boolean;
}

type Verdict = "unlikely" | "borderline" | "promising";

function scoreForm(state: FormState): { verdict: Verdict; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (state.independentOutlets >= 3) {
    score += 3;
    reasons.push("Three or more independent outlets is a common GNG starting point.");
  } else if (state.independentOutlets === 2) {
    score += 2;
    reasons.push("Two independent outlets can work, but depth and reliability matter more than count.");
  } else if (state.independentOutlets === 1) {
    score += 1;
    reasons.push("A single outlet rarely meets significant coverage on its own.");
  } else {
    reasons.push("Without independent coverage, encyclopedic notability is usually absent.");
  }

  if (state.coverageDepth === "strong") score += 3;
  else if (state.coverageDepth === "solid") score += 2;
  else if (state.coverageDepth === "thin") score += 1;
  else reasons.push("Press releases, directory listings, and interviews you control do not count as independent coverage.");

  if (state.paywalledOk) {
    score += 1;
    reasons.push("Paywalled archives and books can still support notability when they are independent.");
  }

  if (state.priorRejection) {
    score -= 1;
    reasons.push("A prior decline means sourcing or neutrality problems must be fixed before another attempt.");
  }

  if (state.promotionalOnly) {
    score -= 2;
    reasons.push("If the only coverage is promotional or self-published, reviewers will usually decline.");
  }

  let verdict: Verdict = "unlikely";
  if (score >= 6) verdict = "promising";
  else if (score >= 3) verdict = "borderline";

  return { verdict, reasons };
}

const verdictCopy: Record<
  Verdict,
  { title: string; body: string }
> = {
  unlikely: {
    title: "Preliminary view: notability looks unlikely right now",
    body: "Based on what you entered, independent significant coverage appears thin or missing. A free human assessment can confirm whether anything was overlooked — we will say so honestly.",
  },
  borderline: {
    title: "Preliminary view: borderline — needs a source dossier",
    body: "There may be a path, but outcomes usually hinge on outlet quality, independence, and how much secondary analysis exists. A free assessment maps what is usable before you pay for drafting.",
  },
  promising: {
    title: "Preliminary view: promising — still not a guarantee",
    body: "Your answers suggest a workable source base may exist. Publication is still decided by volunteer reviewers. Next step: a free notability assessment and source map before any drafting fee.",
  },
};

export function NotabilityCheckerForm() {
  const [state, setState] = useState<FormState>({
    subjectType: "person",
    independentOutlets: 0,
    coverageDepth: "none",
    paywalledOk: false,
    priorRejection: false,
    promotionalOnly: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => scoreForm(state), [state]);

  return (
    <div className="notability-checker reveal">
      <header className="nc-card-head">
        <span className="nc-card-icon" aria-hidden="true">
          <Icon name="i-search" />
        </span>
        <div>
          <p className="nc-card-kicker">Preliminary screen</p>
          <p className="nc-card-title">Six questions, about a minute</p>
        </div>
      </header>
      <form
        className="notability-checker-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <label className="nc-question">
          <span className="nc-q-label"><b>01</b> Subject type</span>
          <select
            value={state.subjectType}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                subjectType: event.target.value as FormState["subjectType"],
              }))
            }
          >
            <option value="person">Person / biography</option>
            <option value="company">Company / organisation</option>
            <option value="other">Other topic</option>
          </select>
        </label>

        <label className="nc-question">
          <span className="nc-q-label"><b>02</b> How many independent outlets have covered the subject in depth?</span>
          <select
            value={state.independentOutlets}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                independentOutlets: Number(event.target.value),
              }))
            }
          >
            <option value={0}>None that I can find</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3+</option>
          </select>
        </label>

        <label className="nc-question">
          <span className="nc-q-label"><b>03</b> Depth of the best independent coverage</span>
          <select
            value={state.coverageDepth}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                coverageDepth: event.target.value as CoverageDepth,
              }))
            }
          >
            <option value="none">Mostly mentions / directories / press wires</option>
            <option value="thin">Short profiles or passing coverage</option>
            <option value="solid">Multiple substantive articles</option>
            <option value="strong">In-depth features, books, or major investigations</option>
          </select>
        </label>

        <p className="nc-checks-label">Also true? Tick any that apply.</p>

        <label className="notability-check">
          <input
            type="checkbox"
            checked={state.paywalledOk}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                paywalledOk: event.target.checked,
              }))
            }
          />
          <span className="nc-check-text">Coverage may include paywalled archives, books, or journals</span>
        </label>

        <label className="notability-check">
          <input
            type="checkbox"
            checked={state.priorRejection}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                priorRejection: event.target.checked,
              }))
            }
          />
          <span className="nc-check-text">A draft or page was previously declined / deleted</span>
        </label>

        <label className="notability-check">
          <input
            type="checkbox"
            checked={state.promotionalOnly}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                promotionalOnly: event.target.checked,
              }))
            }
          />
          <span className="nc-check-text">Almost all coverage is press releases, sponsored posts, or self-published</span>
        </label>

        <button className="button button-gold nc-submit" type="submit">
          Get Preliminary Verdict <Icon name="i-arrow" />
        </button>
      </form>

      {submitted ? (
        <div
          className={`notability-verdict notability-verdict--${result.verdict}`}
          role="status"
        >
          <div className="nc-meter" aria-hidden="true">
            {(["unlikely", "borderline", "promising"] as const).map((step) => (
              <span
                key={step}
                className={`nc-meter-step${step === result.verdict ? " is-active" : ""}`}
              >
                {step}
              </span>
            ))}
          </div>
          <h3>{verdictCopy[result.verdict].title}</h3>
          <p>{verdictCopy[result.verdict].body}</p>
          <ul>
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <p>
            This tool is a preliminary screen, not a Wikipedia decision and not
            legal advice. For a human source review,{" "}
            <Link href={url("contact")}>request a free notability assessment</Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
