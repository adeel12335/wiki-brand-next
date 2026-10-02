"use client";

import Image from "next/image";
import { SITE_FACTS } from "@/lib/data/facts";

/** The four proof points shown beside (or, on the home page, above) the sphere. */
export const EXPERIENCE_STATS = [
  { label: "Experience", value: SITE_FACTS.yearsEditorial, caption: "Years of editorial work" },
  { label: "Approach", value: "Source", caption: "Research before drafting" },
  { label: "Team", value: SITE_FACTS.specialists, caption: "Wikipedia specialists" },
  { label: "Reach", value: "Global", caption: `${SITE_FACTS.areaServed} clientele` },
] as const;

/** Stat row for the home About copy column. */
export function ExperienceStats() {
  // Home shows the three quantified points; "Approach" lives on About Us.
  const stats = EXPERIENCE_STATS.filter((stat) => stat.label !== "Approach");
  return (
    <ul className="about-stats">
      {stats.map((stat) => (
        <li className="about-stat" key={stat.caption}>
          <small>{stat.label}</small>
          <strong>{stat.value}</strong>
          <span>{stat.caption}</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceCore() {
  return (
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
  );
}

export function ExperiencePanel({ statsBeside = true }: { statsBeside?: boolean }) {
  if (!statsBeside) {
    return (
      <div className="experience-panel experience-panel--visual reveal" data-delay="100">
        <ExperienceCore />
      </div>
    );
  }

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
      <ExperienceCore />
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
