"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Icon } from "@/components/ui/Icon";

export interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

interface MetricsRailProps {
  items: MetricItem[];
}

const AUTO_MS = 5200;
const MOBILE_METRICS_QUERY = "(max-width: 480px)";

function subscribeToMobileMetrics(onChange: () => void) {
  const query = window.matchMedia(MOBILE_METRICS_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMobileMetricsSnapshot() {
  return window.matchMedia(MOBILE_METRICS_QUERY).matches;
}

function getMobileMetricsServerSnapshot() {
  return false;
}

export function MetricsRail({ items }: MetricsRailProps) {
  const isMobile = useSyncExternalStore(
    subscribeToMobileMetrics,
    getMobileMetricsSnapshot,
    getMobileMetricsServerSnapshot,
  );
  const itemsPerSlide = isMobile ? 1 : 2;
  const slideCount = Math.max(1, Math.ceil(items.length / itemsPerSlide));
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = Math.min(slide, slideCount - 1);

  const goTo = useCallback(
    (next: number) => {
      setSlide(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % slideCount);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, slideCount]);

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
            <span className="metric-icon" aria-hidden="true">
              <Icon name={metric.icon} />
            </span>
            <div className="metric-copy">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          </article>
        ))}
      </div>

      <div
        className="metrics-carousel"
        aria-label="Studio proof points"
        aria-roledescription="carousel"
      >
        <div
          className="metrics-carousel-viewport"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
            setPaused(true);
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            const endX = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            setPaused(false);
            if (startX === null || endX === undefined) return;
            const distance = endX - startX;
            if (Math.abs(distance) < 42) return;
            goTo(activeSlide + (distance < 0 ? 1 : -1));
          }}
          onTouchCancel={() => {
            touchStartX.current = null;
            setPaused(false);
          }}
        >
          <div
            className="metrics-carousel-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {Array.from({ length: slideCount }, (_, slideIndex) => {
              const start = slideIndex * itemsPerSlide;
              const slideItems = items.slice(start, start + itemsPerSlide);
              return (
                <div
                  className="metrics-carousel-slide"
                  key={`slide-${slideIndex}`}
                  aria-hidden={slideIndex !== activeSlide}
                >
                  {slideItems.map((metric, offset) => {
                    const index = start + offset;
                    return (
                      <article key={metric.label}>
                        <span className="metric-index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="metric-icon" aria-hidden="true">
                          <Icon name={metric.icon} />
                        </span>
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
            className="metrics-carousel-arrow metrics-carousel-arrow--previous"
            aria-label="Previous metrics"
            onClick={() => goTo(activeSlide - 1)}
          >
            <Icon name="i-arrow" />
          </button>
          <div className="metrics-carousel-dots" role="tablist" aria-label="Metric slides">
            {Array.from({ length: slideCount }, (_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Show metrics group ${index + 1}`}
                className={index === activeSlide ? "active" : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="metrics-carousel-arrow metrics-carousel-arrow--next"
            aria-label="Next metrics"
            onClick={() => goTo(activeSlide + 1)}
          >
            <Icon name="i-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
