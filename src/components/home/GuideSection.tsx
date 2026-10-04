import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { url } from "@/lib/config";

const linkClass = "font-medium text-primary underline decoration-accent/40 underline-offset-3 hover:text-accent";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

const STEPS: Array<{ title: string; body: ReactNode }> = [
  {
    title: "Notability assessment before any draft",
    body: (
      <>
        Most failed pages fail before a sentence is written. If there is no significant coverage in
        independent newspapers, books, journals, or serious trade press, no amount of skilled
        writing will carry a draft through review. That is why every engagement starts with a{" "}
        <InlineLink href={url("services/wikipedia-notability-assessment")}>notability assessment</InlineLink>:
        a written proceed / wait / decline verdict tied to the sources we found, not to a sales quota.
      </>
    ),
  },
  {
    title: "Research, citation mapping, and neutral drafting",
    body: (
      <>
        When the sources exist, we map each claim to a citation, write in encyclopedic voice, and
        run a second-editor check so promotional adjectives and unsupported milestones never ship.
        This is the core of{" "}
        <InlineLink href={url("services/wikipedia-page-creation")}>Wikipedia page creation</InlineLink> and{" "}
        <InlineLink href={url("services/wikipedia-content-writing")}>content writing</InlineLink>. The article
        reflects what independent outlets published — including criticism — not what a marketing
        brief prefers.
      </>
    ),
  },
  {
    title: "Disclosed submission and review support",
    body: (
      <>
        Paid editing is allowed when it is disclosed under Wikimedia&apos;s Terms of Use. We declare
        the client relationship rather than editing covertly. Volunteer reviewers still decide
        outcomes; nobody can sell a guaranteed approval. After filing we respond to feedback on the
        merits and revise where the guidelines and sources allow.
      </>
    ),
  },
  {
    title: "Editing, monitoring, and entity consistency",
    body: (
      <>
        Existing articles need different care: tag cleanup, dead-link repair, and talk-page process
        via <InlineLink href={url("services/wikipedia-page-editing")}>page editing</InlineLink>. Live pages need{" "}
        <InlineLink href={url("services/wikipedia-page-monitoring")}>monitoring</InlineLink> so vandalism and
        unsourced edits do not settle. Where search and AI systems assemble an entity record, we
        also work on Wikidata consistency and{" "}
        <InlineLink href={url("services/google-knowledge-panel-creation")}>knowledge-panel signals</InlineLink> —
        without fake “guaranteed panel” claims.
      </>
    ),
  },
];

const DIFFERENCES = [
  "Assessment-first: we will decline creation when sources are not there",
  "Full paid-contribution disclosure — no sockpuppets, no stealth edits",
  "Dual editorial review against the citations, not against a brand brief",
  "No promises of approval, ranking, or Google knowledge panels",
  "Published pricing and a clear process from research to monitoring",
];

/** Long-form explainer: answers the questions buyers research before hiring. */
export function GuideSection() {
  return (
    <Section tone="tint" labelledBy="guide-title">
      <SectionHeader
        id="guide-title"
        eyebrow="Wikipedia page creation, explained"
        title="What a Professional Wikipedia Page Creation Service Actually Does"
        description={
          <>
            Hiring a Wikipedia page creation service is not the same as hiring a copywriter. The
            encyclopedia only records what{" "}
            <InlineLink href="https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources">
              reliable, independent sources
            </InlineLink>{" "}
            have already published. Our job is to find that coverage, judge whether it meets{" "}
            <InlineLink href="https://en.wikipedia.org/wiki/Wikipedia:Notability">notability</InlineLink>,
            draft a neutral article those sources can support, disclose the paid relationship, and
            handle reviewer feedback without turning the page into a brochure.
          </>
        }
      />

      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-5 rounded-2xl bg-white p-6 shadow-card lg:p-8">
            <span className="font-heading text-3xl leading-none font-extrabold text-accent/40 lg:text-4xl" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="type-h4">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted lg:text-base">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-card lg:col-span-7 lg:p-8">
          <h3 className="type-h4">Who this service is for — and who should wait</h3>
          <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted lg:text-base">
            <p>
              Page creation suits executives, authors, academics, companies, and public figures who
              already have sustained independent coverage. It is the wrong product for subjects
              whose only footprint is a website, press releases, sponsored features, or social
              metrics. In those cases we say so early and point to what kind of independent
              reporting would change the picture. Waiting is cheaper than a declined draft.
            </p>
            <p>
              Pricing is published because opacity helps nobody. Engagements typically start
              around $700 for straightforward subjects and run higher when sourcing is complex or a
              prior rejection must be unwound — details on our{" "}
              <InlineLink href={url("wikipedia-page-cost")}>Wikipedia page cost</InlineLink> page. The free
              assessment establishes which tier applies before you commit.
            </p>
            <p>
              Want the policy detail first? Start with our guides on{" "}
              <InlineLink href={url("blog/wikipedia-notability-requirements-explained")}>notability</InlineLink>,{" "}
              <InlineLink href={url("blog/reliable-sources-for-wikipedia-articles")}>reliable sources</InlineLink>, and{" "}
              <InlineLink href={url("blog/paid-wikipedia-editing-disclosure-and-coi")}>
                paid-editing disclosure
              </InlineLink>
              , or <InlineLink href={url("contact")}>request a free assessment</InlineLink>.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-primary p-6 text-white lg:col-span-5 lg:p-8">
          <h3 className="type-h4 text-white">How we differ from “guaranteed Wikipedia” agencies</h3>
          <ul className="mt-6 space-y-4">
            {DIFFERENCES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-white/90 lg:text-base">
                <Icon name="i-check" className="mt-0.5 size-5 text-accent-soft" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
