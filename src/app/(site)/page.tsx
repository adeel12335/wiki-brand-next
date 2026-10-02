import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogCard } from "@/components/blog/BlogCard";
import { ExperiencePanel, ExperienceStats } from "@/components/sections/ExperiencePanel";
import { PortfolioClientsGrid } from "@/components/sections/PortfolioClientsGrid";
import { MetricsRail } from "@/components/sections/MetricsRail";
import { ProcessShowcase } from "@/components/sections/ProcessShowcase";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { HomeDeepGuide } from "@/components/sections/HomeDeepGuide";
import { TrustpilotReviewsSection } from "@/components/trustpilot/TrustpilotReviewsSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { Icon } from "@/components/ui/Icon";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_NAME, absUrl, url } from "@/lib/config";
import {
  faqs,
  metrics,
  services,
} from "@/lib/data";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { buildPageMetadata, faqNode, itemListNode } from "@/lib/seo";

const homeFaqs = faqs.slice(0, 5);

const pageMeta = {
  slug: "",
  title: "Wikipedia Page Creation & Editing Services",
  shortTitle: "Home",
  description:
    "Professional Wikipedia page creation and editing. Free notability assessment first — guideline-compliant research, drafting, and disclosed submission.",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: `${SITE_NAME} — professional Wikipedia editorial services`,
  modified: "2026-09-07",
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
    faqNode(homeFaqs, ""),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function HomePage() {
  const featuredPortfolio = await getFeaturedPortfolio();
  const latestPosts = (await getAllBlogPosts()).slice(0, 3);
  return (
    <>
      <JsonLd page={pageMeta} />

      <section className="hero tone-dark" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image
            className="hero-art-image"
            src="/assets/hero-orbital-globe.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
          />
        </div>
        <canvas className="hero-particles" id="heroParticles" aria-hidden="true" />
        <div className="hero-beacon" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="shell hero-grid">
          <div className="hero-copy reveal in-view">
            <p className="micro-label">The Wikipedia Studio</p>
            <h1 id="hero-title">
              Professional Wikipedia Page Creation &amp;{" "}
              <span>Editing Services</span>
            </h1>
            <p className="hero-lede hero-answer">
              Wikipedia page creation is the process of confirming notability from
              independent sources, drafting a neutral cited article, and submitting
              it with paid-contribution disclosure. Roughly two thirds of the work
              happens before drafting begins — in the search for significant coverage.
            </p>
            <p className="hero-lede">
              We help individuals, businesses, and organisations build a credible
              Wikipedia presence without fake guarantees or undisclosed editing.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold magnetic" href={url("contact")}>
                Request a free assessment <Icon name="i-arrow" />
              </Link>
              <Link className="button button-outline magnetic" href={url("services")}>
                Explore Our Services <Icon name="i-arrow" />
              </Link>
            </div>
          </div>
        </div>

        <MetricsRail items={metrics} />
      </section>

      <section className="about section-pad tone-light" id="about">
        <div className="shell about-grid about-grid--split">
          <div className="section-copy reveal">
            <p className="micro-label">About The Wikipedia Studio</p>
            <h2>
              Where Editorial <span>Excellence</span> Meets Global Standards.
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
            <ExperienceStats />
            <Link className="button button-gold button-small" href={url("about-us")}>
              Learn More About Us <Icon name="i-arrow" />
            </Link>
          </div>

          <ExperiencePanel statsBeside={false} />
        </div>
      </section>

      <HomeDeepGuide />

      <section className="services section-pad tone-light" id="services">
        <div className="shell">
          <ServiceIndex showHeading />
          <div className="section-actions reveal">
            <Link className="button button-outline button-small" href={url("services")}>
              View All Services <Icon name="i-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="process section-pad tone-dark" id="process">
        <div className="shell">
          <ProcessShowcase />
        </div>
      </section>

      <section className="work section-pad tone-light" id="work">
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

      <TrustpilotReviewsSection className="tone-light" />

      <section className="section-pad blog-home-section tone-dark">
        <div className="shell">
          <div className="portfolio-heading reveal">
            <div>
              <p className="micro-label">Insights</p>
              <h2>Guides Worth Reading Before You Draft</h2>
            </div>
            <Link className="text-link" href={url("blog")}>
              View All Articles <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="blog-grid blog-grid--home reveal">
            {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
          </div>
        </div>
      </section>

      <section
        className="resources section-pad tone-light home-faq-section"
        id="resources"
        aria-labelledby="home-faq-title"
      >
        <div className="shell faq-library home-faq-library">
          <div className="faq-library-intro reveal">
            <p className="micro-label">Frequently Asked Questions</p>
            <h2 id="home-faq-title">
              Straight Answers, <span>Before You Commit.</span>
            </h2>
            <p>
              The questions we hear most before an engagement starts — on
              notability, cost, and what a paid editor can and cannot do.
            </p>
            <Link className="button button-gold button-small" href={url("faq")}>
              Read The Full FAQ <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="faq-wide reveal">
            <FaqList items={homeFaqs} wide />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Let&apos;s Build Your Wikipedia Presence <span>the Right Way.</span>"
        copy="Request an honest notability assessment. We will tell you what the sources support before any work is commissioned."
      />
    </>
  );
}
