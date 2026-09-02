import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ExperiencePanel } from "@/components/sections/ExperiencePanel";
import { PortfolioClientsGrid } from "@/components/sections/PortfolioClientsGrid";
import { ProcessShowcase } from "@/components/sections/ProcessShowcase";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { SITE_NAME, absUrl, url } from "@/lib/config";
import {
  faqs,
  metrics,
  services,
} from "@/lib/data";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { buildPageMetadata, itemListNode } from "@/lib/seo";

const pageMeta = {
  slug: "",
  title: `Wikipedia Page Creation Services | ${SITE_NAME}`,
  shortTitle: "Home",
  description:
    "Professional Wikipedia editorial agency. Guideline-compliant page creation, editing, research, and ongoing management for people and organisations.",
  keywords:
    "wikipedia page creation, wikipedia editing services, professional wikipedia writers, wikipedia agency, create a wikipedia page, wikipedia page management, wikipedia consultants",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: `${SITE_NAME} — professional Wikipedia editorial services`,
  schema: [
    itemListNode(
      "",
      "Wikipedia editorial services",
      Object.entries(services).map(([slug, service]) => ({
        name: service.name,
        url: absUrl(`services/${slug}`),
        description: service.card,
      })),
    ),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function HomePage() {
  const featuredPortfolio = await getFeaturedPortfolio();
  return (
    <>
      <JsonLd page={pageMeta} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <canvas className="hero-particles" id="heroParticles" aria-hidden="true" />
        <div className="hero-beacon" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="shell hero-grid">
          <div className="hero-copy reveal in-view">
            <p className="micro-label">Professional Wikipedia Editorial Services</p>
            <h1 id="hero-title">
              We craft Wikipedia pages that build <span>credibility</span> and create
              lasting <span>impact.</span>
            </h1>
            <p className="hero-lede">
              The Wikipedia Studio is a professional editorial agency helping
              individuals, businesses, and organisations establish a credible and
              authoritative presence on Wikipedia.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold magnetic" href={url("contact")}>
                Get Started Today <Icon name="i-arrow" />
              </Link>
              <Link className="button button-outline magnetic" href={url("services")}>
                Explore Our Services <Icon name="i-arrow" />
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <Image src="/assets/portfolio-business-leader.jpg" alt="" width={960} height={640} />
                <Image src="/assets/portfolio-author.jpg" alt="" width={960} height={640} />
                <Image src="/assets/portfolio-entrepreneur.jpg" alt="" width={960} height={640} />
                <span>W</span>
              </div>
              <p>
                Trusted by <strong>500+</strong> clients worldwide{" "}
                <span className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shell metrics-rail reveal">
          {metrics.map((metric, index) => (
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
      </section>

      <section className="about section-pad" id="about">
        <div className="shell about-grid">
          <div className="section-copy reveal">
            <p className="micro-label">About The Wikipedia Studio</p>
            <h2>
              Where editorial <span>excellence</span> meets global standards.
            </h2>
            <p>
              We are a team of Wikipedia specialists, researchers, and content
              strategists dedicated to creating, improving, and managing articles
              that meet the platform&apos;s strict guidelines and deliver real-world
              results.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="i-check" />
                100% guideline-compliant content
              </li>
              <li>
                <Icon name="i-check" />
                In-depth research and verified sourcing
              </li>
              <li>
                <Icon name="i-check" />
                Transparent process and clear communication
              </li>
              <li>
                <Icon name="i-check" />
                Long-term page monitoring and maintenance
              </li>
            </ul>
            <Link className="button button-gold button-small" href={url("about-us")}>
              Learn More About Us <Icon name="i-arrow" />
            </Link>
          </div>

          <ExperiencePanel />
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="shell">
          <ServiceIndex showHeading />
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("services")}>
              View All Services <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="shell">
          <ProcessShowcase />
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="shell">
          <div className="work-head reveal">
            <div>
              <p className="micro-label">Our Portfolio</p>
              <h2>Recent Wikipedia Publications</h2>
            </div>
            <Link className="text-link" href={url("portfolio")}>
              View All Work <Icon name="i-arrow" />
            </Link>
          </div>
          <PortfolioClientsGrid items={featuredPortfolio} variant="carousel" />
        </div>
      </section>

      <TestimonialSection />

      <section className="resources section-pad" id="resources">
        <div className="shell trust-faq reveal">
          <div className="trust-column">
            <p className="micro-label">Why Clients Trust Us</p>
            <h2>Built on Trust. Driven by Excellence.</h2>
            <p>
              We follow strict editorial standards and maintain complete transparency
              in everything we do.
            </p>
            <div className="trust-list">
              <article className="trust-item">
                <Icon name="i-users" />
                <div>
                  <strong>100% Confidential</strong>
                  <span>Your information is always secure with us.</span>
                </div>
              </article>
              <article className="trust-item">
                <Icon name="i-shield" />
                <div>
                  <strong>Ethical &amp; Compliant</strong>
                  <span>We follow the encyclopedia&apos;s policies and guidelines.</span>
                </div>
              </article>
              <article className="trust-item">
                <Icon name="i-check" />
                <div>
                  <strong>Transparent Process</strong>
                  <span>Clear communication at every step.</span>
                </div>
              </article>
            </div>
            <Link className="button button-gold button-small" href={url("faq")}>
              Read The Full FAQ <Icon name="i-arrow" />
            </Link>
          </div>

          <div className="faq-column">
            <p className="micro-label">Frequently Asked Questions</p>
            <h3>Straight answers, before you commit.</h3>
            <FaqList items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Let&apos;s build your Wikipedia presence <span>the right way.</span>"
        copy="Request an honest notability assessment. We will tell you what the sources support before any work is commissioned."
      />
    </>
  );
}
