"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/lib/data";

const AUTOPLAY_MS = 5000;

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Slides crossfade only (motion CSS respects reduced-motion), so autoplay
    // stays on everywhere; hover/focus still pauses it.
    if (paused || testimonials.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, activeIndex]);

  const select = (index: number) => {
    const length = testimonials.length;
    setActiveIndex((index + length) % length);
  };

  return (
    <section
      className="testimonials section-pad tone-dark"
      aria-labelledby="testimonial-title"
    >
      <div className="shell">
        <div className="testimonial-heading reveal">
          <p className="micro-label">Client Testimonials</p>
          <h2 id="testimonial-title">What Our Clients Say</h2>
        </div>

        <figure
          className="testimonial-card reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={(event) => {
            // Keyboard focus pauses; a mouse click on an arrow should not.
            if ((event.target as HTMLElement).matches(":focus-visible")) setPaused(true);
          }}
          onBlurCapture={() => setPaused(false)}
        >
          <svg
            className="testimonial-mark"
            viewBox="0 0 48 36"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0 36V21.6C0 9.9 6.2 2.7 18.6 0l2.2 4.6C14.4 6.6 11 10.4 10.5 16H19v20H0Zm29 0V21.6C29 9.9 35.2 2.7 47.6 0l2.2 4.6C43.4 6.6 40 10.4 39.5 16H48v20H29Z" />
          </svg>

          {/* Sliding track: every testimonial is rendered side by side and the
              track translates to the active one. */}
          <div className="testimonial-viewport" aria-live={paused ? "polite" : "off"}>
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div
                  key={item.name}
                  className="testimonial-slide"
                  aria-hidden={index !== activeIndex}
                  inert={index !== activeIndex}
                >
                  <blockquote className="testimonial-quote">
                    <p>{item.quote}</p>
                  </blockquote>
                  <p className="testimonial-person">
                    <span className="testimonial-avatar" aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-controls">
            <button
              className="testimonial-nav testimonial-nav--prev"
              type="button"
              aria-label="Previous testimonial"
              onClick={() => select(activeIndex - 1)}
            >
              <Icon name="i-arrow" />
            </button>
            <div
              className="testimonial-pager"
              aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
            >
              {testimonials.map((item, index) => (
                <button
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => select(index)}
                  key={item.name}
                />
              ))}
            </div>
            <button
              className="testimonial-nav"
              type="button"
              aria-label="Next testimonial"
              onClick={() => select(activeIndex + 1)}
            >
              <Icon name="i-arrow" />
            </button>
          </div>
        </figure>
      </div>
    </section>
  );
}
