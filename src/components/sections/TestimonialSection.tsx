"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/lib/data";

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  const select = (index: number) => {
    const length = testimonials.length;
    setActiveIndex((index + length) % length);
  };

  return (
    <section className="testimonials section-pad" aria-labelledby="testimonial-title">
      <div className="shell">
        <div className="testimonial-heading reveal">
          <p className="micro-label">Client Testimonials</p>
          <h2 id="testimonial-title">What Our Clients Say</h2>
        </div>
        <div className="testimonial-stage reveal">
          <Image
            className="testimonial-orb"
            src="/assets/globe-small.png"
            alt=""
            aria-hidden="true"
            width={520}
            height={430}
            sizes="(max-width: 900px) 70vw, 520px"
          />
          <button
            className="round-arrow previous"
            type="button"
            aria-label="Previous testimonial"
            onClick={() => select(activeIndex - 1)}
          >
            <Icon name="i-arrow" />
          </button>
          <div className="testimonial-window" aria-live="polite">
            <blockquote>&ldquo;{active.quote}&rdquo;</blockquote>
            <div className="testimonial-author">
              <strong>{active.name}</strong>
              <span>{active.role}</span>
            </div>
          </div>
          <button
            className="round-arrow next"
            type="button"
            aria-label="Next testimonial"
            onClick={() => select(activeIndex + 1)}
          >
            <Icon name="i-arrow" />
          </button>
          <div className="testimonial-progress">
            <span aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")}</span>
            <div aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}>
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
            <span aria-hidden="true">{String(testimonials.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
