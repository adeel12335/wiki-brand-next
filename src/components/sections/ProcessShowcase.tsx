"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { processSteps } from "@/lib/data";

export function ProcessShowcase({ showHeading = true }: { showHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = processSteps[activeIndex];

  return (
    <div className="process-showcase reveal">
      {showHeading ? (
        <div className="process-showcase-heading">
          <p className="micro-label">Our Process</p>
          <h2>A Proven 5-Step Process</h2>
        </div>
      ) : null}

      <div className="process-showcase-layout">
        <article className="process-detail" aria-live="polite">
          <div className="process-detail-index">
            <span>Step</span>
            <b>{String(activeIndex + 1).padStart(2, "0")}</b>
          </div>
          <div className="process-detail-copy">
            <span className="process-detail-icon" aria-hidden="true">
              <Icon name={active.icon} />
            </span>
            <h3>{active.title}</h3>
            <p>{active.copy}</p>
            <Link className="text-link" href={`${url("our-process")}#step-${activeIndex + 1}`}>
              Read this stage <Icon name="i-arrow" />
            </Link>
          </div>
        </article>

        <div className="process-orbit" aria-hidden="true">
          <span className="process-orbit-ring ring-a" />
          <span className="process-orbit-ring ring-b" />
          <span className="process-orbit-core">W</span>
          {processSteps.map((step, index) => (
            <span
              className={`process-orbit-node node-${index + 1}${index === activeIndex ? " is-active" : ""}`}
              key={step.title}
            >
              <Icon name={step.icon} />
            </span>
          ))}
        </div>

        <div className="process-step-list" role="tablist" aria-label="Process stages">
          {processSteps.map((step, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "is-active" : undefined}
              onClick={() => setActiveIndex(index)}
              key={step.title}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <Icon name="i-arrow" />
            </button>
          ))}
        </div>
      </div>

      <div className="process-showcase-action">
        <Link className="button button-outline button-small" href={url("our-process")}>
          See The Full Process <Icon name="i-arrow" />
        </Link>
      </div>
    </div>
  );
}
