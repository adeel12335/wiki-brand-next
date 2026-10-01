"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { processSteps } from "@/lib/data";

export function ProcessShowcase({ showHeading = true }: { showHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = processSteps[activeIndex];
  const total = processSteps.length;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next: number | null = null;
    if (event.key in keys) next = (activeIndex + keys[event.key] + total) % total;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = total - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="process-showcase reveal">
      {showHeading ? (
        <div className="proc-heading">
          <p className="micro-label">Our Process</p>
          <h2>A Proven 5-Step Process</h2>
          <p>
            Every engagement follows the same order — evidence first, writing
            second — so you know exactly where your article stands.
          </p>
        </div>
      ) : null}

      <div
        className="proc-steps"
        role="tablist"
        aria-label="Process stages"
        style={{ "--proc-progress": progress } as CSSProperties}
        onKeyDown={onKeyDown}
      >
        {processSteps.map((step, index) => {
          const selected = index === activeIndex;
          return (
            <button
              type="button"
              role="tab"
              id={`proc-tab-${index + 1}`}
              aria-selected={selected}
              aria-controls="proc-panel"
              tabIndex={selected ? 0 : -1}
              className={`proc-step${selected ? " is-active" : ""}${index < activeIndex ? " is-done" : ""}`}
              onClick={() => setActiveIndex(index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              key={step.title}
            >
              <span className="proc-step-dot" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <span className="proc-step-num">Step {String(index + 1).padStart(2, "0")}</span>
              <strong className="proc-step-title">{step.title}</strong>
              <span className="proc-step-card">{step.card}</span>
            </button>
          );
        })}
      </div>

      <div
        className="proc-panel"
        id="proc-panel"
        role="tabpanel"
        aria-labelledby={`proc-tab-${activeIndex + 1}`}
        aria-live="polite"
      >
        <div className="proc-panel-index" aria-hidden="true">
          <span>Step</span>
          <b>{String(activeIndex + 1).padStart(2, "0")}</b>
          <small>of {String(total).padStart(2, "0")}</small>
        </div>
        <div className="proc-panel-copy">
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
          <p>{active.detail}</p>
        </div>
        <div className="proc-panel-actions">
          <Link className="text-link" href={`${url("our-process")}#step-${activeIndex + 1}`}>
            Read this stage <Icon name="i-arrow" />
          </Link>
          <Link className="button button-outline button-small" href={url("our-process")}>
            See The Full Process <Icon name="i-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
