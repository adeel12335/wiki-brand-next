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
  // Scroll range + timeline length of the pinned card deck (desktop only).
  const pinRangeRef = useRef<{ start: number; end: number; duration: number } | null>(null);
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
          const panel = root.querySelector(".proc-deck");
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
              // Finish the entrance before the desktop pin below takes over.
              end: "top 22%",
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

        // Desktop: pin the stepper + card deck under the header. Scrolling is
        // scrubbed into a timeline where each stage card rises in over the
        // previous one (which settles back into the stack), so the change is
        // tied to the scroll position instead of a sudden swap.
        mm.add(
          "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
          () => {
            const heading = root.querySelector<HTMLElement>(".proc-heading");
            const cards = gsap.utils.toArray<HTMLElement>(".proc-panel", root);
            if (cards.length < 2) return;
            const headerOffset = 96;
            const last = cards.length - 1;
            root.classList.add("is-pinned");

            gsap.set(cards, { transformOrigin: "50% 0%" });
            gsap.set(cards.slice(1), { autoAlpha: 0, y: 160, scale: 1 });
            gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });

            const deck = gsap.timeline({
              defaults: { ease: "power2.inOut", duration: 1 },
              scrollTrigger: {
                trigger: root,
                start: () => `top+=${heading?.offsetHeight ?? 0} ${headerOffset}`,
                end: () => `+=${Math.round(window.innerHeight * 0.7 * cards.length)}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh: (self) => {
                  pinRangeRef.current = { start: self.start, end: self.end, duration: deck.duration() };
                },
                onUpdate: (self) => {
                  // A stage becomes active once its card is half way in.
                  const time = self.progress * deck.duration();
                  const next = Math.min(last, Math.floor(time + 0.5));
                  setActiveIndex((current) => (current === next ? current : next));
                },
              },
            });

            cards.forEach((card, index) => {
              if (index === 0) return;
              const at = index - 1;
              deck
                .to(card, { autoAlpha: 1, y: 0 }, at)
                .to(cards[index - 1], { scale: 0.94, y: -22, autoAlpha: 0.35 }, at);
              // Older cards fade out entirely so only one sits behind the new one.
              if (index > 1) deck.to(cards[index - 2], { autoAlpha: 0 }, at);
            });
            // Short hold on the last stage before the pin releases.
            deck.to({}, { duration: 0.35 });

            return () => {
              root.classList.remove("is-pinned");
              pinRangeRef.current = null;
            };
          },
        );
      },
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // When the desktop pin is active, selecting a stage scrolls to its slice of
  // the pinned range so scroll position and the active step stay in sync.
  const goTo = (index: number) => {
    const range = pinRangeRef.current;
    if (range && window.scrollY >= range.start - 1 && window.scrollY <= range.end + 1) {
      const perStage = (range.end - range.start) / range.duration;
      window.scrollTo({ top: Math.ceil(range.start + perStage * index), behavior: "smooth" });
    }
    setActiveIndex(index);
  };

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
    goTo(next);
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
              aria-controls={`proc-panel-${index + 1}`}
              tabIndex={selected ? 0 : -1}
              className={`proc-step${selected ? " is-active" : ""}${index < activeIndex ? " is-done" : ""}`}
              onClick={() => goTo(index)}
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

      <div className="proc-deck">
        {processSteps.map((step, index) => {
          const selected = index === activeIndex;
          return (
            <div
              key={step.title}
              className={`proc-panel${selected ? " is-active" : ""}`}
              id={`proc-panel-${index + 1}`}
              role="tabpanel"
              aria-labelledby={`proc-tab-${index + 1}`}
              aria-hidden={!selected}
              inert={!selected}
            >
              <div className="proc-panel-index" aria-hidden="true">
                <span>Step</span>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <small>of {String(total).padStart(2, "0")}</small>
              </div>
              <div className="proc-panel-copy">
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <p>{step.detail}</p>
              </div>
              <div className="proc-panel-actions">
                <Link className="text-link" href={`${url("our-process")}#step-${index + 1}`}>
                  Read this stage <Icon name="i-arrow" />
                </Link>
                <Link className="button button-outline button-small" href={url("our-process")}>
                  See The Full Process <Icon name="i-arrow" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
