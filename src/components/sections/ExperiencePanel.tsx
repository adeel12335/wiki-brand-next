import Image from "next/image";

export function ExperiencePanel() {
  return (
    <div className="experience-panel reveal" data-delay="100">
      <article className="experience-stat top-left">
        <small>Years</small>
        <strong>10+</strong>
        <span>Of Editorial Excellence</span>
      </article>
      <article className="experience-stat top-right">
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
      <article className="experience-stat bottom-left">
        <small>Editors</small>
        <strong>25+</strong>
        <span>Wikipedia Specialists</span>
      </article>
      <article className="experience-stat bottom-right">
        <small>Clients</small>
        <strong>500+</strong>
        <span>Worldwide Clients</span>
      </article>
    </div>
  );
}
