"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { processSteps } from "@/lib/data";

/**
 * Our Process "stage by stage": a sticky stepper above every stage's full
 * write-up. As each stage scrolls past the middle of the screen the stepper's
 * active dot and progress line follow it; clicking a dot scrolls to that
 * stage. All stage copy stays in the HTML (SEO) and keeps the #step-N anchors
 * used by the home page "Read this stage" links.
 */
export function ProcessScrollStepper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const total = processSteps.length;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!panels.length || !("IntersectionObserver" in window)) return;

    // A thin band across the middle of the viewport decides the active stage.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ps-stepper">
      <div className="ps-rail">
        <ol
          className="ps-steps"
          aria-label="Process stages"
          style={{ "--ps-progress": progress } as CSSProperties}
        >
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                className={`ps-step${index === activeIndex ? " is-active" : ""}${index < activeIndex ? " is-done" : ""}`}
                aria-current={index === activeIndex ? "step" : undefined}
                onClick={() => goTo(index)}
              >
                <span className="ps-step-dot" aria-hidden="true">
                  <Icon name={step.icon} />
                </span>
                <span className="ps-step-num">Step {String(index + 1).padStart(2, "0")}</span>
                <span className="ps-step-title">{step.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="ps-panels">
        {processSteps.map((step, index) => (
          <article
            key={step.title}
            id={`step-${index + 1}`}
            data-index={index}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            className={`ps-panel${index === activeIndex ? " is-active" : ""}`}
          >
            <div className="ps-panel-index" aria-hidden="true">
              <span>Step</span>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <small>of {String(total).padStart(2, "0")}</small>
            </div>
            <div className="ps-panel-copy">
              <header>
                <span className="ps-panel-icon" aria-hidden="true">
                  <Icon name={step.icon} />
                </span>
                <h3>{step.title}</h3>
              </header>
              <p className="ps-panel-card">{step.card}</p>
              <p>{step.copy}</p>
              <p className="ps-panel-detail">{step.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
