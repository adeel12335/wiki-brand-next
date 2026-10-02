"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gold bar fixed to the top of the viewport that fills as the reader
 * moves through the element matched by `target`. Writes the width straight to
 * the DOM on animation frames — no React state, so scrolling never re-renders.
 */
export function ReadingProgress({ target }: { target: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const article = document.querySelector<HTMLElement>(target);
    if (!bar || !article) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress-bar" ref={barRef} />
    </div>
  );
}
