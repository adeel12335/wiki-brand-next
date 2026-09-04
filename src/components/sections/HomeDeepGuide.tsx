import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";

/**
 * Long-form homepage SEO block — answers commercial + educational queries
 * competitors cover with 2k–5k word homepages.
 */
export function HomeDeepGuide() {
  return (
    <section
      className="section-pad home-deep-guide"
      aria-labelledby="home-deep-title"
    >
      <div className="shell">
        <div className="home-deep-intro reveal">
          <p className="micro-label">Wikipedia page creation, explained</p>
          <h2 id="home-deep-title">
            What a professional Wikipedia page creation service actually does
          </h2>
          <p>
            Hiring a Wikipedia page creation service is not the same as hiring a
            copywriter. The encyclopedia only records what{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources"
              target="_blank"
              rel="noopener noreferrer"
            >
              reliable, independent sources
            </a>{" "}
            have already published. Our job is to find that coverage, judge whether it
            meets{" "}
            <a
              href="https://en.wikipedia.org/wiki/Wikipedia:Notability"
              target="_blank"
              rel="noopener noreferrer"
            >
              notability
            </a>
            , draft a neutral article that those sources can support, disclose the paid
            relationship, and handle reviewer feedback without turning the page into a
            brochure.
          </p>
        </div>

        <div className="home-deep-grid reveal">
          <article>
            <h3>1. Notability assessment before any draft</h3>
            <p>
              Most failed pages fail before a sentence is written. If there is no
              significant coverage in independent newspapers, books, journals, or serious
              trade press, no amount of skilled writing will carry a draft through review.
              That is why every engagement starts with a{" "}
              <Link href={url("services/wikipedia-notability-assessment")}>
                notability assessment
              </Link>
              : a written proceed / wait / decline verdict tied to the sources we found,
              not to a sales quota.
            </p>
          </article>
          <article>
            <h3>2. Research, citation mapping, and neutral drafting</h3>
            <p>
              When the sources exist, we map each claim to a citation, write in encyclopedic
              voice, and run a second-editor check so promotional adjectives and unsupported
              milestones never ship. This is the core of{" "}
              <Link href={url("services/wikipedia-page-creation")}>
                Wikipedia page creation
              </Link>{" "}
              and{" "}
              <Link href={url("services/wikipedia-content-writing")}>
                content writing
              </Link>
              . The article reflects what independent outlets published — including
              criticism — not what a marketing brief prefers.
            </p>
          </article>
          <article>
            <h3>3. Disclosed submission and review support</h3>
            <p>
              Paid editing is allowed when it is disclosed under Wikimedia&apos;s Terms of
              Use. We declare the client relationship rather than editing covertly. Volunteer
              reviewers still decide outcomes; nobody can sell a guaranteed approval. After
              filing we respond to feedback on the merits and revise where the guidelines
              and sources allow.
            </p>
          </article>
          <article>
            <h3>4. Editing, monitoring, and entity consistency</h3>
            <p>
              Existing articles need different care: tag cleanup, dead-link repair, and
              talk-page process via{" "}
              <Link href={url("services/wikipedia-page-editing")}>page editing</Link>. Live
              pages need{" "}
              <Link href={url("services/wikipedia-page-monitoring")}>monitoring</Link> so
              vandalism and unsourced edits do not settle. Where search and AI systems
              assemble an entity record, we also work on Wikidata consistency and{" "}
              <Link href={url("services/google-knowledge-panel-creation")}>
                knowledge-panel signals
              </Link>{" "}
              — without fake “guaranteed panel” claims.
            </p>
          </article>
        </div>

        <div className="home-deep-panel reveal">
          <h3>Who this service is for — and who should wait</h3>
          <p>
            Page creation suits executives, authors, academics, companies, and public
            figures who already have sustained independent coverage. It is the wrong product
            for subjects whose only footprint is a website, press releases, sponsored
            features, or social metrics. In those cases we say so early and point to what
            kind of independent reporting would change the picture. Waiting is cheaper than
            a declined draft.
          </p>
          <p>
            Pricing is published because opacity helps nobody. Engagements typically start
            around $700 for straightforward subjects and run higher when sourcing is complex
            or a prior rejection must be unwound — details on our{" "}
            <Link href={url("wikipedia-page-cost")}>Wikipedia page cost</Link> page. The
            free assessment establishes which tier applies before you commit.
          </p>
          <p>
            If you want the policy-level detail first, start with our guides on{" "}
            <Link href={url("blog/wikipedia-notability-requirements-explained")}>
              notability
            </Link>
            ,{" "}
            <Link href={url("blog/reliable-sources-for-wikipedia-articles")}>
              reliable sources
            </Link>
            , and{" "}
            <Link href={url("blog/paid-wikipedia-editing-disclosure-and-coi")}>
              paid-editing disclosure
            </Link>
            , or jump straight to{" "}
            <Link href={url("contact")}>request a free assessment</Link>.
          </p>
        </div>

        <div className="home-deep-compare reveal">
          <h3>How we differ from “guaranteed Wikipedia” agencies</h3>
          <ul className="check-list">
            <li>
              <Icon name="i-check" />
              Assessment-first: we will decline creation when sources are not there
            </li>
            <li>
              <Icon name="i-check" />
              Full paid-contribution disclosure — no sockpuppets, no stealth edits
            </li>
            <li>
              <Icon name="i-check" />
              Dual editorial review against the citations, not against a brand brief
            </li>
            <li>
              <Icon name="i-check" />
              No promises of approval, ranking, or Google knowledge panels
            </li>
            <li>
              <Icon name="i-check" />
              Published pricing and a clear process from research to monitoring
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
