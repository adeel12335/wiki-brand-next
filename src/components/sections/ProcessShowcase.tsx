"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { processSteps } from "@/lib/data";

export function ProcessShowcase({ showHeading = true }: { showHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = processSteps[activeIndex];
  const total = processSteps.length;
  const progress = total > 1 ? activeIndex / (total - 1) : 0;

  // Scroll-driven entrance: the track draws left → right and each step card
  // lands as the line reaches it, then the detail panel rises in.
  // GSAP is imported on demand so it stays out of the initial JS bundle.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        revert = () => mm.revert();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const heading = root.querySelector(".proc-heading");
          const stepsRow = root.querySelector(".proc-steps");
          const line = root.querySelector(".proc-steps-line");
          const panel = root.querySelector(".proc-panel");
          const steps = gsap.utils.toArray<HTMLElement>(".proc-step", root);
          if (!stepsRow || !line || !panel || !steps.length) return;

          if (heading) {
            gsap.from(heading.children, {
              autoAlpha: 0,
              y: 32,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: { trigger: heading, start: "top 85%", once: true },
            });
          }

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: stepsRow,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.8,
            },
          });

          timeline.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", duration: steps.length - 1 },
            0,
          );

          steps.forEach((step, index) => {
            const at = index * 0.9;
            timeline
              .fromTo(
                step,
                { autoAlpha: 0, y: 70, scale: 0.88 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
                at,
              )
              .fromTo(
                step.querySelector(".proc-step-dot svg"),
                { scale: 0, rotate: -120 },
                { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" },
                at + 0.15,
              )
              .fromTo(
                step.querySelectorAll(".proc-step-num, .proc-step-title, .proc-step-card"),
                { autoAlpha: 0, y: 18 },
                { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
                at + 0.25,
              );
          });

          timeline.fromTo(
            panel,
            { autoAlpha: 0, y: 60 },
            { autoAlpha: 1, y: 0, duration: 1 },
            steps.length * 0.9,
          );
        });
      },
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

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
    <div className="process-showcase" ref={rootRef}>
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
        <span className="proc-steps-line" aria-hidden="true" />
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
