"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

interface MetricsRailProps {
  items: MetricItem[];
}

const AUTO_MS = 3800;

export function MetricsRail({ items }: MetricsRailProps) {
  const pairCount = Math.max(1, Math.ceil(items.length / 2));
  const [pair, setPair] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setPair(((next % pairCount) + pairCount) % pairCount);
    },
    [pairCount],
  );

  useEffect(() => {
    if (paused || pairCount <= 1) return;
    const id = window.setInterval(() => {
      setPair((current) => (current + 1) % pairCount);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, pairCount]);

  return (
    <div
      className="shell metrics-rail reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="metrics-rail-desktop">
        {items.map((metric, index) => (
          <article key={metric.label}>
            <span className="metric-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <Icon name={metric.icon} />
            <div className="metric-copy">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="metrics-carousel" aria-roledescription="carousel">
        <div className="metrics-carousel-viewport">
          <div
            className="metrics-carousel-track"
            style={{ transform: `translateX(-${pair * 100}%)` }}
          >
            {Array.from({ length: pairCount }, (_, pairIndex) => {
              const start = pairIndex * 2;
              const pairItems = items.slice(start, start + 2);
              return (
                <div className="metrics-carousel-slide" key={`pair-${pairIndex}`}>
                  {pairItems.map((metric, offset) => {
                    const index = start + offset;
                    return (
                      <article key={metric.label}>
                        <span className="metric-index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Icon name={metric.icon} />
                        <div className="metric-copy">
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="metrics-carousel-controls">
          <button
            type="button"
            className="metrics-carousel-arrow"
            aria-label="Previous metrics"
            onClick={() => goTo(pair - 1)}
          >
            ‹
          </button>
          <div className="metrics-carousel-dots" role="tablist" aria-label="Metric slides">
            {Array.from({ length: pairCount }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === pair}
                aria-label={`Show metrics group ${index + 1}`}
                className={index === pair ? "active" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="metrics-carousel-arrow"
            aria-label="Next metrics"
            onClick={() => goTo(pair + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
