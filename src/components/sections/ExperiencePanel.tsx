"use client";

import Image from "next/image";
import { SITE_FACTS } from "@/lib/data/facts";

export function ExperiencePanel() {
  return (
    <div className="experience-panel reveal" data-delay="100">
      <article className="experience-stat top-left">
        <small>As of {SITE_FACTS.asOf}</small>
        <strong>{SITE_FACTS.yearsEditorial}</strong>
        <span>Years of editorial work</span>
      </article>
      <article className="experience-stat top-right">
        <small>Approach</small>
        <strong>Source</strong>
        <span>Research before drafting</span>
      </article>
      <div className="experience-core">
        <span className="experience-axis" aria-hidden="true" />
        <span className="experience-signal" aria-hidden="true" />
        <div className="experience-trigger" aria-hidden="true">
          <Image
            src="/assets/about-knowledge-sphere.png"
            alt="Ivory knowledge sphere formed from multilingual encyclopedia puzzle pieces"
            width={1303}
            height={1207}
            sizes="(max-width: 620px) 92vw, (max-width: 900px) 540px, 470px"
          />
        </div>
      </div>
      <article className="experience-stat bottom-left">
        <small>Team</small>
        <strong>{SITE_FACTS.specialists}</strong>
        <span>Wikipedia specialists</span>
      </article>
      <article className="experience-stat bottom-right">
        <small>Reach</small>
        <strong>Global</strong>
        <span>{SITE_FACTS.areaServed} clientele</span>
      </article>
    </div>
  );
}
