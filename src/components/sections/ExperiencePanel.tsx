"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ExperiencePanel() {
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    setActiveIndex(0);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % 4);
    }, 1200);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing]);

  return (
    <div className={`experience-panel reveal${playing ? " playing" : ""}`} data-delay="100">
      <article className={`experience-stat top-left${playing && activeIndex === 0 ? " active" : ""}`}>
        <small>Years</small>
        <strong>10+</strong>
        <span>Of Editorial Excellence</span>
      </article>
      <article className={`experience-stat top-right${playing && activeIndex === 1 ? " active" : ""}`}>
        <small>Success Rate</small>
        <strong>98%</strong>
        <span>Approval Rate</span>
      </article>
      <div className="experience-core">
        <span className="experience-axis" aria-hidden="true" />
        <span className="experience-signal" aria-hidden="true" />
        <button
          className="experience-trigger"
          type="button"
          aria-label="Play studio proof highlights"
          aria-pressed={playing}
          onClick={() => setPlaying((current) => !current)}
        >
          <Image
            src="/assets/about-knowledge-sphere.png"
            alt="Ivory knowledge sphere formed from multilingual encyclopedia puzzle pieces"
            width={1303}
            height={1207}
            sizes="(max-width: 620px) 92vw, (max-width: 900px) 540px, 470px"
          />
        </button>
      </div>
      <article className={`experience-stat bottom-left${playing && activeIndex === 2 ? " active" : ""}`}>
        <small>Editors</small>
        <strong>25+</strong>
        <span>Wikipedia Specialists</span>
      </article>
      <article className={`experience-stat bottom-right${playing && activeIndex === 3 ? " active" : ""}`}>
        <small>Clients</small>
        <strong>500+</strong>
        <span>Worldwide Clients</span>
      </article>
    </div>
  );
}
