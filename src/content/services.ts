import type { IconName } from "@/components/ui/Icon";
import type { ServiceSlug } from "@/lib/data";
import { servicePageCopy } from "./service-pages";

/**
 * Services listing + Service Single copy.
 * Source: Figma "Services - Final" (87:140) and "Service Single - Final" (95:554, the Page Creation service).
 * The other seven services reuse the Service Single template; their copy is adapted from the previous
 * site's service data until final content is supplied. Components read only from this file.
 */

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: ServiceSlug;
  /** Full service name (contact form subject, schema, breadcrumbs). */
  name: string;
  /** Short label used in FAQ headings ("Page Creation Questions"). */
  shortName: string;
  /** Title + copy on the Services listing card. */
  card: { title: string; copy: string };
  icon: IconName;
  meta: { title: string; description: string; keywords: string; ogImage: string };
  hero: { title: string; highlight: string; lede: string; checks: string[] };
  overview: {
    eyebrow: string;
    title: string;
    highlight: string;
    /** Bold first paragraph. */
    lead: string;
    body: string;
    whoFor: string[];
  };
  includes: Array<{ icon: IconName; title: string; copy: string }>;
  steps: Array<{ title: string; copy: string }>;
  fees: Array<{ label: string; value: string; caption: string }>;
  faqs: ServiceFaq[];
}

/** Shared Service Single section copy (same on every service). */
export const serviceSingleShared = {
  heroActions: [
    { label: "See Pricing", href: "/wikipedia-page-cost/" },
    { label: "How We Work", href: "/process/" },
  ],
  form: {
    eyebrow: "FREE ASSESSMENT",
    title: "Find Out What Your Subject Needs",
    copy: "Tell us about your subject and the sources you have. We will review your enquiry and explain the next step.",
    submit: "Request My Free Assessment",
    note: "Confidential. We reply within one business day.",
  },
  whoForLabel: "WHO THIS IS FOR",
  includesHeading: { title: "Everything in One Engagement", aside: "Scope and price fixed in writing before work starts." },
  process: { eyebrow: "How It Works", title: "How the Engagement", highlight: "Runs, Step by Step" },
  feesCta: { label: "See Full Pricing", href: "/wikipedia-page-cost/" },
  faq: { titleSuffix: "Questions, Answered", lede: "Short, straight answers to the questions we hear most often." },
  cta: {
    eyebrow: "Start With Clarity",
    title: "Ready to Take the Right",
    highlight: "Next Step?",
    lede: "Share your subject and current sources. We will explain what is possible, where the gaps are and which service fits your needs.",
    primary: { label: "Request a Free Assessment", href: "/contact/" },
    secondary: { label: "See Pricing", href: "/wikipedia-page-cost/" },
    assurances: [
      { icon: "search" as IconName, title: "Source Review", copy: "Understand the evidence before committing to a project." },
      { icon: "plan" as IconName, title: "Clear Scope", copy: "Know the proposed work and cost before it starts." },
      { icon: "shield" as IconName, title: "Transparent Editing", copy: "Paid contributions are disclosed when Wikipedia rules require it." },
    ],
  },
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "wikipedia-page-creation",
    name: "Wikipedia Page Creation",
    shortName: "Page Creation",
    card: { title: "Wikipedia Page Creation", copy: "Fully referenced, notability-compliant articles, from research to publication." },
    icon: "page",
    meta: {
      title: "Wikipedia Page Creation Services (2026)",
      description:
        "Professional Wikipedia page creation: notability assessment, independent sourcing, neutral writing, and full guideline compliance. Ask for an honest assessment first.",
      keywords:
        "wikipedia page creation, create a wikipedia page, wikipedia page creation services, professional wikipedia writers, wikipedia notability assessment, wikipedia article creation",
      ogImage: "/assets/og/portfolio-business-leader.jpg",
    },
    hero: {
      title: "Wikipedia Page Creation,",
      highlight: "Written From the Sources",
      lede: "We confirm notability first, then build a neutral, fully cited article to the standard volunteer reviewers expect. Every engagement is disclosed on-wiki.",
      checks: ["Written notability verdict before any drafting", "Fixed quote in writing, from $700", "Second-editor fact check on every claim"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Page Creation",
      highlight: "Actually Involves",
      lead: "Page creation is not copywriting. Roughly two thirds of the work happens before a sentence is drafted: finding significant coverage published by sources independent of the subject.",
      body: "Where that coverage exists, the article largely writes itself from the sources. Where it does not, no amount of skilled writing will carry a draft through review, and we will tell you so in writing.",
      whoFor: [
        "Executives and founders with coverage in independent business press",
        "Authors and academics whose work has been reviewed or cited",
        "Companies with documented history, funding or milestones",
        "Public figures covered by outlets they do not control",
        "Anyone declined at review who wants the real reason",
      ],
    },
    includes: [
      { icon: "search", title: "Notability assessment", copy: "Tested against the general and subject-specific guidelines." },
      { icon: "research", title: "Source research", copy: "Independent coverage found, verified and mapped to claims." },
      { icon: "write", title: "Neutral drafting", copy: "Encyclopedic structure with a clear, balanced lead section." },
      { icon: "page", title: "Full referencing", copy: "Formatted citations, archived where links may rot." },
      { icon: "publish", title: "Submission & revisions", copy: "Disclosed submission and reviewer-feedback revisions." },
      { icon: "manage", title: "Post-launch monitoring", copy: "Watched through the first stabilisation period." },
    ],
    steps: [
      { title: "Assess", copy: "A written notability verdict, usually within a few days." },
      { title: "Agree scope", copy: "Structure, source list and fixed price agreed in writing." },
      { title: "Draft & verify", copy: "Drafted by one editor, every claim checked by a second." },
      { title: "Submit & disclose", copy: "Submitted with disclosure; reviewer feedback handled." },
      { title: "Monitor", copy: "Watched after acceptance through stabilisation." },
    ],
    fees: [
      { label: "FROM", value: "$700", caption: "Simplest subjects" },
      { label: "FROM", value: "$1,800", caption: "Complex or previously declined" },
      { label: "FROM", value: "$2,500+", caption: "Custom scoping" },
    ],
    faqs: [
      {
        q: "How long does Wikipedia page creation take?",
        a: "Research and drafting usually take three to six weeks. The review queue that follows is controlled by volunteer reviewers and can clear in days or run to several months. We give you a realistic range after the notability assessment, once we know how much coverage exists.",
      },
      {
        q: "What counts as a reliable source for a new page?",
        a: "Established newspapers, trade publications, books from reputable publishers, and peer-reviewed journals all count. Press releases, sponsored features, company blogs, and most podcast appearances do not, because they are not independent of the subject they describe.",
      },
      {
        q: "Can you create a page if I have already been rejected?",
        a: "Often, yes. Rejections usually come down to thin sourcing or promotional tone rather than the subject being permanently ineligible. We read the reviewer's comments, audit the sources available now, and tell you whether a resubmission is worth attempting.",
      },
      {
        q: "Do you disclose that the work was paid for?",
        a: "Yes. Wikipedia's terms of use require paid contributors to declare their employer, client, and affiliation, and we make that declaration as a matter of course. Undisclosed paid editing puts both the article and the account behind it at risk.",
      },
    ],
  },
  // TODO(content): services 02-08 below are placeholder copy adapted from the previous site.
  {
    slug: "wikipedia-page-editing",
    name: "Page Editing & Expansion",
    shortName: "Page Editing",
    card: { title: "Page Editing & Expansion", copy: "Fix what is verifiably wrong and expand what independent sources support." },
    icon: "edit",
    meta: {
      title: "Wikipedia Page Editing Services (2026)",
      description:
        "Wikipedia page editing and expansion: source audits, maintenance-tag fixes, content updates, neutral rewrites, and cited expansion of thin sections.",
      keywords:
        "wikipedia page editing, wikipedia article expansion, edit wikipedia page, wikipedia page improvement, remove wikipedia maintenance tags, wikipedia citation cleanup",
      ogImage: "/assets/og/portfolio-author.jpg",
    },
    hero: {
      title: "Wikipedia Page Editing,",
      highlight: "Fixed Against the Sources",
      lede: "Existing articles carry outdated facts, thin sourcing, maintenance tags and gaps in coverage. We audit the page, then repair it against independent sources, transparently and on the record.",
      checks: ["Section-by-section audit before any edit", "Fixed quote in writing, from $450", "Every change tied to a guideline and a source"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Page Editing",
      highlight: "Actually Covers",
      lead: "Editing means correcting statements the sources do not support, replacing dead references and expanding sections thinner than the available coverage justifies.",
      body: "It also means resolving the maintenance tags editors leave at the top of an article. Each banner has a specific cause that has to be fixed on its own terms rather than quietly deleted.",
      whoFor: [
        "Subjects whose article carries maintenance tags for tone, sourcing, or citations",
        "Companies whose page still describes a former name, structure, or owner",
        "People whose article omits well-covered work from the last several years",
        "Organisations dealing with an inaccurate claim that keeps being reinstated",
        "Anyone whose page reads as promotional and is attracting editor scrutiny",
      ],
    },
    includes: [
      { icon: "search", title: "Page audit", copy: "What is inaccurate, unsourced, outdated or non-compliant, with severity noted." },
      { icon: "plan", title: "Edit plan", copy: "Prioritised changes, each mapped to the guideline and source that justifies it." },
      { icon: "edit", title: "Implemented edits", copy: "Approved changes made transparently, with edit summaries and talk-page notes." },
      { icon: "page", title: "Source refresh", copy: "Dead links replaced, weak citations upgraded and references archived." },
    ],
    steps: [
      { title: "Audit", copy: "The article is audited section by section and every problem graded by severity." },
      { title: "Plan", copy: "An edit plan ties each proposed change to a guideline and a source." },
      { title: "Approve", copy: "You approve the plan; we flag anything better left alone." },
      { title: "Edit & disclose", copy: "Edits made transparently, with talk-page notes where required." },
      { title: "Watch", copy: "The article is watched in case a change is reverted or challenged." },
    ],
    fees: [
      { label: "FROM", value: "$450", caption: "Quoted from the audit" },
      { label: "AUDIT", value: "Standalone", caption: "Yours to keep, no obligation" },
    ],
    faqs: [
      {
        q: "Can you remove negative information from my page?",
        a: "Only where it is inaccurate, unsourced, or given weight out of proportion to its coverage. Properly sourced criticism belongs in the article, and trying to delete it usually draws more editor attention to the page than leaving it alone would.",
      },
      {
        q: "How do maintenance tags actually come off?",
        a: "By fixing what the tag describes. A citation tag needs sources added, a tone tag needs promotional language rewritten, a notability tag needs independent coverage demonstrated. Once the cause is genuinely resolved, the tag can be removed with an explanation on the talk page.",
      },
      {
        q: "Why do my own edits keep getting reverted?",
        a: "Usually because they read as promotional, carry no citations, or come from an account with an undisclosed connection to the subject. Transparent editing with a declared conflict of interest and solid sourcing behind each change is far more durable.",
      },
      {
        q: "My page is very short. Can you expand it?",
        a: "Yes, as far as the sources allow. Expansion is limited by the independent coverage that exists, not by how much you would like the article to say. We map what the available sources can support before proposing any new sections.",
      },
    ],
  },
  {
    slug: "wikipedia-content-writing",
    name: "Content Writing & Research",
    shortName: "Content Writing",
    card: { title: "Content Writing & Research", copy: "Source-first research and neutral writing to Wikipedia’s standards." },
    icon: "research",
    meta: {
      title: "Wikipedia Content Writing Services (2026)",
      description:
        "Wikipedia content writing and research: independent source discovery, reliability grading, neutral drafting, and citation-complete copy for new or existing articles.",
      keywords:
        "wikipedia content writing, wikipedia research services, wikipedia writers for hire, neutral point of view writing, wikipedia citation research, encyclopedic content writing",
      ogImage: "/assets/og/portfolio-entrepreneur.jpg",
    },
    hero: {
      title: "Wikipedia Content Writing,",
      highlight: "Research Before Prose",
      lede: "We locate and grade the coverage that exists, then write only to what those sources support. No promotional framing, no claims a reader cannot check.",
      checks: ["Every source graded for independence and depth", "Inline citations placed as the copy is written", "Second-editor check against every source"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Content Writing",
      highlight: "Means in Practice",
      lead: "Wikipedia copy follows three core policies: verifiability, neutral point of view and no original research. Every substantive sentence carries an inline citation.",
      body: "The house style is deliberately plain. Adjectives that cannot be sourced come out, marketing language never goes in, and the lead section summarises the article instead of selling the subject.",
      whoFor: [
        "Subjects who need a draft written to guideline standard before submission",
        "Communications teams whose in-house draft was rejected for tone or sourcing",
        "Organisations wanting a source dossier assembled before deciding to proceed",
        "Existing articles that need whole new sections written from scratch",
        "Anyone unsure whether the coverage they have is usable at all",
      ],
    },
    includes: [
      { icon: "research", title: "Research dossier", copy: "Every usable source, graded and annotated with what it can support." },
      { icon: "write", title: "Structured draft", copy: "Copy organised into the sections reviewers expect for the subject type." },
      { icon: "network", title: "Citation map", copy: "A statement-to-source index so any claim can be traced to its reference." },
      { icon: "info", title: "Coverage gap notes", copy: "The claims no reliable source currently supports, recorded plainly." },
    ],
    steps: [
      { title: "Search", copy: "A systematic search across news archives, books, journals and databases." },
      { title: "Grade", copy: "Every source graded for independence, reliability and depth." },
      { title: "Outline", copy: "Graded sources mapped to the sections they can support." },
      { title: "Draft", copy: "Copy drafted with inline citations placed as it is written." },
      { title: "Verify", copy: "A second editor checks the draft line by line against the sources." },
    ],
    fees: [
      { label: "QUOTED", value: "Per scope", caption: "Scaled to the volume of coverage" },
      { label: "IF COVERAGE IS THIN", value: "Research only", caption: "You keep the dossier" },
    ],
    faqs: [
      {
        q: "Can you write about something with no press coverage?",
        a: "Not for Wikipedia. The encyclopedia only records what reliable, independent sources have already published, so a subject with no such coverage cannot be written about verifiably. We tell you this before taking the work rather than after invoicing for it.",
      },
      {
        q: "Do you use AI to write the drafts?",
        a: "Our editors research, write, and review the copy, and a second editor checks every claim against its source before delivery. Wikipedia's reviewers are experienced at spotting unsourced generated text, and it is one of the fastest routes to a rejection.",
      },
      {
        q: "What does neutral point of view actually mean?",
        a: "It is the requirement to represent significant viewpoints fairly and without editorial endorsement, in proportion to their coverage in reliable sources. It does not mean giving equal space to every claim, and it does not mean omitting well-documented criticism.",
      },
      {
        q: "Who owns the writing once it is published?",
        a: "Anything published on Wikipedia is released under the platform's open licence and belongs to the encyclopedia, where other editors may change it. The research dossier and drafts we prepare for you remain yours.",
      },
    ],
  },
  {
    slug: "wikipedia-page-management",
    name: "Ongoing Page Management",
    shortName: "Page Management",
    card: { title: "Ongoing Page Management", copy: "Updates, monitoring and maintenance after publication." },
    icon: "manage",
    meta: {
      title: "Wikipedia Page Management Services (2026)",
      description:
        "Ongoing Wikipedia page management: edit monitoring, vandalism response, milestone updates, dead-link repair, and periodic accuracy reviews to guideline standard.",
      keywords:
        "wikipedia page management, wikipedia page monitoring, wikipedia maintenance services, wikipedia vandalism response, update wikipedia page, wikipedia page updates",
      ogImage: "/assets/og/portfolio-organisation.jpg",
    },
    hero: {
      title: "Wikipedia Page Management,",
      highlight: "Accurate After Launch",
      lede: "Anyone can edit an article, facts go stale and cited links disappear. Management keeps the page current and catches problem edits before they settle into the record.",
      checks: ["Every incoming edit reviewed and classified", "From $250 per month, no long lock-in", "Quarterly plain-language health report"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "Why a Live Article",
      highlight: "Still Needs Attention",
      lead: "A published page is never finished. Anyone can edit it, and most edits arrive from people with no connection to the subject and no obligation to check with anyone.",
      body: "Some edits are genuine improvements. Others introduce errors, unsourced claims or vandalism, and references rot too, inviting the statements above them to be challenged and cut.",
      whoFor: [
        "Subjects whose article has been edited by strangers without anyone noticing",
        "Companies in a period of frequent news, funding, or leadership change",
        "Public figures whose pages attract politically motivated editing",
        "Organisations with older articles full of dead reference links",
        "Anyone who has just had an article published and wants it watched properly",
      ],
    },
    includes: [
      { icon: "clipboard", title: "Monitoring log", copy: "Every edit to the page, who made it, and how it was assessed." },
      { icon: "write", title: "Update cycles", copy: "Agreed refresh windows for new, properly sourced developments." },
      { icon: "info", title: "Issue escalations", copy: "Fast notice when an edit, tag or deletion discussion needs a decision." },
      { icon: "manage", title: "Health reports", copy: "Periodic summaries of sourcing, dead links, tags and condition." },
    ],
    steps: [
      { title: "Baseline", copy: "The article is watchlisted and its current state recorded." },
      { title: "Review edits", copy: "Every incoming edit classified: improvement, error or vandalism." },
      { title: "Respond", copy: "Problem edits handled through the appropriate route, reasons documented." },
      { title: "Update", copy: "Agreed cycles add new, independently sourced developments." },
      { title: "Report", copy: "Periodic reports on edits, sourcing, dead links and tags." },
    ],
    fees: [
      { label: "MONTHLY", value: "$250", caption: "Month to month, no lock-in" },
      { label: "ANNUAL", value: "$2,500", caption: "Billed yearly" },
    ],
    faqs: [
      {
        q: "Can you stop other people editing my page?",
        a: "No. Wikipedia is openly editable by design, and no agency or subject can lock an article. Administrators occasionally apply temporary protection during sustained vandalism, but it is granted on the encyclopedia's terms rather than a client's request.",
      },
      {
        q: "What happens if someone adds something false?",
        a: "We assess the edit against the sources and handle it through the appropriate route: a straightforward revert for clear vandalism, or a documented talk-page discussion where the claim is genuinely contested. Either way you hear from us with what we found.",
      },
      {
        q: "Do you update the page when we have news?",
        a: "Yes, within agreed update cycles and provided the development has been covered by an independent reliable source. A company announcement on its own is not usually enough; a report in a publication that does not answer to you is.",
      },
      {
        q: "Can management be added to a page you did not create?",
        a: "Yes, and it often is. We start with a full audit so the baseline is documented, which tends to surface older problems nobody had noticed: dead references, outdated sections, and errors introduced quietly some time ago.",
      },
    ],
  },
  {
    slug: "wikipedia-reputation-management",
    name: "Reputation & Entity Building",
    shortName: "Entity Building",
    card: { title: "Reputation & Entity Building", copy: "Consistent identity across Wikipedia, Wikidata and knowledge platforms." },
    icon: "network",
    meta: {
      title: "Wikipedia Reputation Management Services (2026)",
      description:
        "Entity and reputation building across Wikipedia and Wikidata: consistent naming, cross-referenced identifiers, and accurate structured data that answer engines read.",
      keywords:
        "wikipedia reputation management, entity building, wikidata services, knowledge panel optimisation, online reputation management, digital footprint wikipedia",
      ogImage: "/assets/og/portfolio-public-figure.jpg",
    },
    hero: {
      title: "Reputation & Entity Building,",
      highlight: "One Consistent Record",
      lede: "Search engines and AI assistants assemble what they know from structured, cross-referenced knowledge sources. We make those records agree, with references behind every fact.",
      checks: ["Entity audit across every structured record", "Wikidata statements with proper references", "Honest notes on what only coverage can fix"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Entity Building",
      highlight: "Actually Is",
      lead: "An entity is the machine-readable version of a subject: a record with a stable identifier, a set of properties and links to other databases describing the same thing.",
      body: "When those records agree, systems resolve the subject confidently. When they disagree about a founding date or a legal name, confidence drops and the subject can be conflated with someone else.",
      whoFor: [
        "Brands whose records show different founding dates or legal names across platforms",
        "People who share a name with another notable subject and are being conflated",
        "Organisations that have rebranded, merged, or changed legal structure",
        "Subjects with a Wikipedia article but an empty or unreferenced Wikidata record",
        "Teams who want to understand their entity footprint before investing further",
      ],
    },
    includes: [
      { icon: "network", title: "Entity map", copy: "Every structured record for the subject, and how they disagree." },
      { icon: "check-circle", title: "Consistency fixes", copy: "Names, dates, roles and descriptions aligned everywhere." },
      { icon: "layers", title: "Wikidata work", copy: "Referenced statements and identifiers linking the entity across databases." },
      { icon: "plan", title: "Coverage roadmap", copy: "What independent coverage is missing, and the realistic path to it." },
    ],
    steps: [
      { title: "Audit", copy: "Every structured record of the subject found and compared." },
      { title: "Map", copy: "An entity map showing the footprint and its contradictions." },
      { title: "Align", copy: "Names, dates, roles and descriptions corrected across platforms." },
      { title: "Reference", copy: "Wikidata statements added or repaired with references and identifiers." },
      { title: "Document", copy: "What remains blocked by missing coverage, and what would unblock it." },
    ],
    fees: [
      { label: "AUDIT", value: "Standalone", caption: "Priced on its own" },
      { label: "REMEDIATION", value: "Quoted", caption: "From what the audit finds" },
    ],
    faqs: [
      {
        q: "Can you get me a Google knowledge panel?",
        a: "Nobody can guarantee one. Google decides when to show a panel and what goes in it, drawing on many sources. Accurate, consistent, well-referenced structured data makes a subject easier to resolve, which helps, but it is not a switch anyone can flip.",
      },
      {
        q: "Is Wikidata worth the effort without a Wikipedia article?",
        a: "Sometimes. Wikidata applies its own inclusion criteria and accepts subjects Wikipedia would not, so an accurate referenced record can exist independently. It is not a substitute for an article, and it will not deliver the same visibility.",
      },
      {
        q: "How is this different from reputation management agencies?",
        a: "We do not attempt to suppress search results or place content on sites that will publish anything for a fee. Our work is limited to making the factual, structured record accurate and consistent on platforms with real editorial or community standards.",
      },
      {
        q: "What does an entity audit actually produce?",
        a: "A map of every structured record we can find for the subject, the contradictions between them, the identifiers that are missing, and a prioritised list of what to fix first. Most clients find at least one error they did not know existed.",
      },
    ],
  },
  {
    slug: "wikipedia-notability-assessment",
    name: "Notability Assessment",
    shortName: "Notability",
    card: { title: "Notability Assessment", copy: "A written verdict on whether the sources support an article." },
    icon: "search",
    meta: {
      title: "Wikipedia Notability Assessment Services (2026)",
      description:
        "Independent Wikipedia notability assessment: we audit reliable sources against GNG and subject guidelines, then deliver a written proceed / wait / decline verdict before drafting.",
      keywords:
        "wikipedia notability assessment, am i notable enough for wikipedia, wikipedia notability check, wikipedia eligibility assessment, free wikipedia notability assessment",
      ogImage: "/assets/og/portfolio-author.jpg",
    },
    hero: {
      title: "Notability Assessment,",
      highlight: "Before Anyone Drafts",
      lede: "A source-first review against Wikipedia’s guidelines. You get a clear written verdict: proceed, wait for stronger coverage, or do not commission a page yet.",
      checks: ["Independent search beyond the links you send", "Initial screen free for prospective clients", "Proceed / wait / decline verdict in writing"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What an Assessment",
      highlight: "Actually Decides",
      lead: "One question: do independent, reliable sources already contain significant coverage of this subject? Wikipedia’s general and subject-specific guidelines set the bar.",
      body: "We search news archives, books, journals and trade press, grade each source and map what it can support. If the coverage is thin, we say so before anyone drafts an article you will only see declined.",
      whoFor: [
        "Anyone considering a new Wikipedia page and unsure whether sources exist",
        "Subjects previously declined at Articles for Creation who want a second opinion",
        "Communications teams asked by leadership to “get a Wikipedia page”",
        "Founders, authors and executives deciding whether creation is worth commissioning",
        "Anyone offered a guaranteed page by another agency and wanting an independent read",
      ],
    },
    includes: [
      { icon: "clipboard", title: "Verdict letter", copy: "A short written recommendation a stakeholder can follow without jargon." },
      { icon: "research", title: "Source dossier", copy: "Usable and unusable sources graded, with what each can support." },
      { icon: "review", title: "Guideline map", copy: "Which notability tests apply and where the subject passes or falls short." },
      { icon: "plan", title: "Next-step plan", copy: "If the answer is wait, what coverage would need to exist first." },
    ],
    steps: [
      { title: "Brief", copy: "You share identity, milestones and any coverage links you know." },
      { title: "Search", copy: "An independent source search beyond the links you supplied." },
      { title: "Grade", copy: "Each source graded for independence, reliability and depth." },
      { title: "Map", copy: "Findings mapped against GNG and subject-specific guidelines." },
      { title: "Verdict", copy: "A written proceed, wait or decline verdict with the source list." },
    ],
    fees: [
      { label: "INITIAL SCREEN", value: "Free", caption: "Usually within a few days" },
      { label: "WRITTEN DOSSIER", value: "Quoted", caption: "Credited if you proceed with us" },
    ],
    faqs: [
      {
        q: "Is the notability assessment free?",
        a: "An initial screen for prospective clients is free. A deeper written dossier for boards or legal review is available as a paid standalone when you need formal documentation. Either way, we will not invent eligibility to sell drafting.",
      },
      {
        q: "How is this different from Wikipedia page creation?",
        a: "Creation is drafting and submission. Assessment stops at the source verdict. Many clients only need the assessment, especially when the honest answer is not yet.",
      },
      {
        q: "What if you say I am not notable yet?",
        a: "We tell you plainly, return the source findings, and outline what independent coverage would change the picture. We do not take a creation fee for a draft that cannot meet the guideline.",
      },
      {
        q: "Do you use my press releases as evidence?",
        a: "Press releases and company blogs help us find dates and spellings. They do not establish notability. Only significant coverage by sources independent of the subject counts toward the guideline.",
      },
    ],
  },
  {
    slug: "google-knowledge-panel-creation",
    name: "Google Knowledge Panel Creation",
    shortName: "Knowledge Panel",
    card: { title: "Knowledge Panel Creation", copy: "Entity consistency that helps Google resolve who you are." },
    icon: "globe",
    meta: {
      title: "Google Knowledge Panel Creation Services (2026)",
      description:
        "Google knowledge panel support through Wikipedia, Wikidata, and entity consistency - accurate structured data, honest eligibility guidance, no guaranteed-panel claims.",
      keywords:
        "google knowledge panel creation, google knowledge panel service, get a google knowledge panel, knowledge panel wikipedia, entity building knowledge panel",
      ogImage: "/assets/og/portfolio-public-figure.jpg",
    },
    hero: {
      title: "Knowledge Panel Work,",
      highlight: "Grounded in Entity Accuracy",
      lede: "Nobody can force a Google knowledge panel. We make your entity consistent and well referenced across Wikipedia, Wikidata and related sources, so Google has a cleaner record to draw from.",
      checks: ["Audit of how Google resolves you today", "Fixes only on platforms with real standards", "No guaranteed-panel promises, ever"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Panel Work",
      highlight: "Can and Cannot Mean",
      lead: "Google assembles a knowledge panel from many public signals: Wikipedia and Wikidata where they exist, official sites, news coverage and other structured databases.",
      body: "Our work focuses on the inputs you can legitimately improve: accurate articles where warranted, referenced Wikidata statements and consistent identifiers. Google still decides what appears.",
      whoFor: [
        "Notable subjects with a Wikipedia article but no panel, or an incomplete one",
        "Brands whose search results show conflicting founding dates or legal names",
        "People conflated with another subject who shares their name",
        "Organisations after a rebrand, merger, or legal-name change",
        "Teams sold a “guaranteed panel” elsewhere who need an honest second opinion",
      ],
    },
    includes: [
      { icon: "search", title: "Entity / panel audit", copy: "What Google shows, which sources it draws on, and where they conflict." },
      { icon: "plan", title: "Remediation plan", copy: "Prioritised fixes on the platforms you can actually influence." },
      { icon: "network", title: "Structured data fixes", copy: "Referenced Wikidata statements and cross-links that strengthen identity." },
      { icon: "info", title: "Coverage notes", copy: "What independent reporting is still missing for a stronger record." },
    ],
    steps: [
      { title: "Audit", copy: "How Google and related sources currently resolve the subject." },
      { title: "Map", copy: "Wikipedia, Wikidata and official records checked for contradictions." },
      { title: "Align", copy: "Article and Wikidata facts aligned to independent sources." },
      { title: "Repair", copy: "Identifiers, descriptions and cross-links pointed at one entity." },
      { title: "Document", copy: "What remains under Google’s control and what coverage is missing." },
    ],
    fees: [
      { label: "AUDIT", value: "Standalone", caption: "Quoted separately" },
      { label: "REMEDIATION", value: "Quoted", caption: "Scoped from the audit" },
    ],
    faqs: [
      {
        q: "Can you guarantee a Google knowledge panel?",
        a: "No. Google decides when to show a panel and what goes in it. Accurate Wikipedia and Wikidata records help entity resolution; they are not a switch anyone can flip.",
      },
      {
        q: "Do I need a Wikipedia page to get a knowledge panel?",
        a: "Not always, because Google uses many sources, but a well-sourced Wikipedia article and Wikidata item are among the strongest public signals for notable subjects. If you are not notable yet, neither a panel pitch nor a Wikipedia draft will fix that.",
      },
      {
        q: "How long before Google updates?",
        a: "There is no fixed timeline. Structured-data corrections can surface in days or take much longer. Anyone promising a date is guessing.",
      },
      {
        q: "What if my panel shows wrong information?",
        a: "We trace which public sources the wrong fact appears in and correct the ones that are editable and sourced. Suggest-an-edit on the panel itself is sometimes available, but Google still moderates those suggestions.",
      },
    ],
  },
  {
    slug: "wikipedia-page-monitoring",
    name: "Wikipedia Page Monitoring",
    shortName: "Monitoring",
    card: { title: "Wikipedia Page Monitoring", copy: "Catch vandalism and risky edits before they settle." },
    icon: "shield",
    meta: {
      title: "Wikipedia Page Monitoring Services (2026)",
      description:
        "Dedicated Wikipedia page monitoring: watchlist coverage, vandalism and error triage, escalation alerts, and edit logs - separate from full managed update retainers.",
      keywords:
        "wikipedia page monitoring, wikipedia monitoring service, monitor wikipedia page, wikipedia vandalism monitoring, wikipedia watchlist service",
      ogImage: "/assets/og/portfolio-organisation.jpg",
    },
    hero: {
      title: "Wikipedia Page Monitoring,",
      highlight: "Problem Edits Caught Early",
      lede: "Once an article is live, anyone can change it. Monitoring watches the page, classifies incoming edits and escalates vandalism, unsourced claims or deletion risk before they settle.",
      checks: ["Baseline snapshot of the live article", "Escalation alerts for high-risk changes", "Running edit log you can check any time"],
    },
    overview: {
      eyebrow: "The Short Version",
      title: "What Page Monitoring",
      highlight: "Actually Covers",
      lead: "Monitoring is the watch-and-triage layer of article care: every incoming edit reviewed and classified as improvement, error or vandalism.",
      body: "It is narrower than full page management. If you also need milestone updates and accuracy reviews, those sit in the management retainer, with monitoring as its detection core.",
      whoFor: [
        "Subjects whose article is edited by strangers without anyone noticing",
        "Public figures and brands whose pages attract politically motivated edits",
        "Teams who want alerts without paying for a full content-update retainer",
        "Newly published articles in their first unstable months",
        "Anyone who discovered a wrong fact months after it was inserted",
      ],
    },
    includes: [
      { icon: "clipboard", title: "Monitoring log", copy: "A running record of edits, assessment and actions taken." },
      { icon: "info", title: "Escalation notices", copy: "Fast notice when an edit needs your decision before we act." },
      { icon: "manage", title: "Activity summary", copy: "Periodic plain-language report on volume, risk and outcomes." },
      { icon: "layers", title: "Baseline snapshot", copy: "The article’s starting state, so later drift is measurable." },
    ],
    steps: [
      { title: "Baseline", copy: "The article is baselined and added to a monitored watchlist." },
      { title: "Review", copy: "Incoming edits reviewed on the cycle agreed with you." },
      { title: "Respond", copy: "Clear vandalism handled through the appropriate Wikipedia route." },
      { title: "Escalate", copy: "Contested changes escalated to you with options and risk notes." },
      { title: "Log", copy: "An edit log so nothing important is invisible." },
    ],
    fees: [
      { label: "RETAINER", value: "Quoted", caption: "Scaled to how active the page is" },
      { label: "UPGRADE", value: "Optional", caption: "Into full page management" },
    ],
    faqs: [
      {
        q: "How is monitoring different from page management?",
        a: "Monitoring is detection and triage. Management adds scheduled content updates, dead-link repair, and fuller accuracy reviews. Many clients start with monitoring and expand only if the article needs regular writing work.",
      },
      {
        q: "How quickly will you notice a change?",
        a: "On the review cycle agreed in the retainer. Urgent categories such as apparent vandalism or a deletion nomination are escalated as soon as they are seen. Nobody watches every page every minute, and agencies that claim otherwise are overselling.",
      },
      {
        q: "Do you monitor pages you did not create?",
        a: "Yes. We start with a baseline audit of the live article, then monitoring begins from that snapshot.",
      },
      {
        q: "What happens if someone adds something false?",
        a: "We assess it against sources and either revert clear vandalism or open a documented discussion where the claim is contested. You are told what we found and what we did.",
      },
    ],
  },
];

/**
 * Apply the approved page copy (src/content/service-pages.ts, from the 8-service docx) over the base data above.
 * Kept from the base: slug, name, card, icon, ogImage and fees (prices need service-specific confirmation).
 */
const INCLUDE_ICONS: IconName[] = ["search", "research", "write", "page", "publish", "manage"];
for (const s of serviceDetails) {
  const copy = servicePageCopy[s.slug];
  if (!copy) continue;
  s.meta = { ...s.meta, ...copy.meta };
  s.hero = copy.hero;
  s.overview = { ...s.overview, ...copy.overview };
  s.includes = copy.includes.map((item, i) => ({ icon: s.includes[i]?.icon ?? INCLUDE_ICONS[i] ?? s.icon, ...item }));
  s.steps = copy.steps;
  s.shortName = copy.faqName;
  s.faqs = copy.faqs;
}

export function getServiceDetail(slug: string) {
  const index = serviceDetails.findIndex((s) => s.slug === slug);
  return index === -1 ? null : { service: serviceDetails[index], index };
}

/** Services listing page copy - source: "Wiki_Studio_Services_Page_SEO_Content.docx". */
export const servicesContent = {
  seo: {
    title: "Wikipedia Services | Creation, Editing and Research",
    description:
      "Explore professional Wikipedia services including page creation, editing, writing, notability assessments, and monitoring. Get a free assessment.",
    keywords:
      "wikipedia services, wikipedia page creation, wikipedia page editing, wikipedia content writing, wikipedia notability assessment, wikipedia page management, wikipedia page monitoring, professional wikipedia services, wikipedia article writing, wikipedia research, google knowledge panel services, wikipedia paid editing",
  },
  hero: {
    eyebrow: "Professional Wikipedia Services",
    title: "Professional Wikipedia Services",
    highlight: "for Every Stage",
    lede: "From Wikipedia page creation and editing to research and monitoring, our experts help you build accurate, well sourced articles that follow Wikipedia guidelines.",
    actions: [
      { label: "Get a Free Assessment", href: "/contact/" },
      { label: "Explore Our Process", href: "/process/" },
    ],
    /** Full-bleed hero photo: landscape crop for desktop, portrait crop for phones. */
    photo: {
      desktop: "/assets/redesign/hero/services-bg-desktop.webp",
      mobile: { src: "/assets/redesign/hero/services-bg-mobile.webp", width: 1024, height: 1536, artFrom: 0.42, top: "#021f3b" },
      alt: "Wikipedia globe, books and magnifying glass on an editor's desk",
    },
  },
  all: {
    eyebrow: "Our Services",
    title: "Choose the Wikipedia Service",
    highlight: "Your Article Needs",
    lede: "Explore eight professional Wikipedia services, from notability research and page creation to editing, monitoring, and ongoing support.",
    /** Card copy per service slug (grid order follows serviceDetails). */
    cards: {
      "wikipedia-page-creation": { title: "Wikipedia Page Creation", copy: "Get a Wikipedia article built on independent research, neutral writing, and reliable sources that meet editorial guidelines.", linkLabel: "Explore Service" },
      "wikipedia-page-editing": { title: "Wikipedia Page Editing", copy: "Improve an existing Wikipedia article with accurate facts, stronger citations, and clear, balanced writing.", linkLabel: "Explore Service" },
      "wikipedia-content-writing": { title: "Wikipedia Content Writing", copy: "Turn verified research into clear, neutral Wikipedia content with reliable sources and properly supported claims.", linkLabel: "Explore Service" },
      "wikipedia-page-management": { title: "Wikipedia Page Management", copy: "Keep your Wikipedia article accurate with ongoing updates, source reviews, and editorial support when needed.", linkLabel: "Explore Service" },
      "wikipedia-reputation-management": { title: "Reputation and Entity Building", copy: "Improve factual consistency across Wikipedia, Wikidata, and other trusted online knowledge sources.", linkLabel: "Explore Service" },
      "wikipedia-notability-assessment": { title: "Wikipedia Notability Assessment", copy: "Find out whether independent, reliable sources provide enough coverage to support a Wikipedia article.", linkLabel: "Check Eligibility" },
      "google-knowledge-panel-creation": { title: "Google Knowledge Panel Services", copy: "Improve your online entity information with accurate records, consistent details, and verified references.", linkLabel: "Explore Service" },
      "wikipedia-page-monitoring": { title: "Wikipedia Page Monitoring", copy: "Track article changes, identify inaccurate edits, and respond to potential issues through proper editorial channels.", linkLabel: "Explore Service" },
    } as Record<string, { title: string; copy: string; linkLabel: string }>,
    audiencesLabel: "Guides by subject:",
    audiences: [
      { label: "Companies", href: "/wikipedia-page-for-companies/" },
      { label: "Authors", href: "/wikipedia-page-for-authors/" },
      { label: "Academics", href: "/wikipedia-page-for-academics/" },
      { label: "Musicians", href: "/wikipedia-page-for-musicians/" },
    ],
  },
  start: {
    eyebrow: "Where to Start",
    title: "Not Sure Which Wikipedia",
    highlight: "Service You Need?",
    lede: "Your next step depends on your article. Find the situation that fits and see which service can help.",
    paths: [
      {
        icon: "page" as IconName,
        title: "You Do Not Have a Wikipedia Page",
        copy: "Not sure if you qualify? We check independent sources before recommending page creation.",
        link: { label: "Check My Eligibility", href: "/services/wikipedia-notability-assessment/" },
      },
      {
        icon: "edit" as IconName,
        title: "Your Wikipedia Page Needs Editing",
        copy: "Outdated facts or weak citations? We review the article and identify what needs improvement.",
        link: { label: "Improve My Page", href: "/services/wikipedia-page-editing/" },
      },
      {
        icon: "shield" as IconName,
        title: "Your Wikipedia Page Needs Monitoring",
        copy: "Concerned about inaccurate edits? We track changes and help address issues through Wikipedia guidelines.",
        link: { label: "Monitor My Page", href: "/services/wikipedia-page-monitoring/" },
      },
    ],
  },
  faq: {
    eyebrow: "Service Questions",
    title: "Wikipedia Services FAQ:",
    highlight: "Answers Before You Enquire",
    lede: "Get clear answers about Wikipedia page creation, eligibility, paid editing, and how our services work.",
    items: [
      {
        q: "How do I get a Wikipedia page for myself?",
        a: "Start with a free Wikipedia notability assessment. We review independent sources to see whether you meet Wikipedia guidelines. If the coverage is sufficient, our team can research, draft, and submit an article with proper disclosure.",
      },
      {
        q: "What does a Wikipedia service provider do?",
        a: "A Wikipedia service provider helps with source research, notability checks, article writing, editing, and monitoring. The goal is to prepare accurate, neutral content that follows Wikipedia policies. No agency can guarantee publication or permanent retention.",
      },
      {
        q: "How famous do you need to be for a Wikipedia page?",
        a: "You do not need to be famous in the traditional sense. Wikipedia generally requires significant coverage in reliable, independent sources. Awards, job titles, and personal achievements alone may not establish notability.",
      },
      {
        q: "Can I pay someone to write my Wikipedia page?",
        a: "Yes, you can hire a professional to research and draft Wikipedia content. However, paid contributions must be disclosed under Wikipedia rules. Payment does not guarantee approval, and Wikipedia editors decide whether an article meets its standards.",
      },
    ],
  },
  cta: {
    eyebrow: "Start With Clarity",
    title: "Not Sure Which Wikipedia",
    highlight: "Service Fits?",
    lede: "Start with a free notability assessment. Our team will review your available sources, explain your options, and recommend the right next step.",
    primary: { label: "Request Free Assessment", href: "/contact/" },
    secondary: { label: "View Pricing", href: "/wikipedia-page-cost/" },
    // TODO(content): verify the 2 to 5 day assessment timeline before publishing.
    assurances: [
      { icon: "clock" as IconName, title: "2 to 5 Day Assessment", copy: "Receive a written review of your sources and Wikipedia eligibility." },
      { icon: "plan" as IconName, title: "Clear Scope and Pricing", copy: "Know the proposed work and estimated cost before you begin." },
      { icon: "shield" as IconName, title: "Transparent Paid Editing", copy: "Paid contributions are disclosed according to Wikipedia rules." },
    ],
  },
};
