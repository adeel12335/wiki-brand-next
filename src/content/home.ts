import type { IconName } from "@/components/ui/Icon";

/**
 * Home page copy - source: "Wiki_Studio_Homepage_Content.docx" (SEO and Conversion Draft).
 * FAQ answers come from the previous site's approved FAQ set.
 * Components read only from this file.
 */
export const homeContent = {
  seo: {
    title: "Wikipedia Page Creation Services",
    description:
      "Professional Wikipedia page creation, editing, research, and monitoring services. Start with a free notability assessment at The Wikipedia Studio.",
  },

  hero: {
    eyebrow: "Professional Wikipedia Editorial Services",
    titleLines: ["Wikipedia Page Creation Services Built on"],
    highlight: "Reliable Research",
    lede: "Build an accurate Wikipedia presence with professional research, neutral writing, and clear citations. We help notable people, businesses, and organizations create and improve Wikipedia articles that follow editorial guidelines.",
    links: [
      { label: "Get a Free Notability Assessment", href: "/contact/" },
      { label: "Explore Our Services", href: "/services/", arrow: true },
    ],
    image: { src: "/assets/redesign/hero-art.png", alt: "Wikipedia globe with knowledge sphere" },
    /** Full-bleed hero photo: landscape crop for desktop, portrait crop for phones. */
    photo: {
      desktop: "/assets/redesign/hero/hero-bg-desktop.webp",
      mobile: { src: "/assets/redesign/hero/hero-bg-mobile.webp", width: 1024, height: 1536, artFrom: 0.5, top: "#081324" },
    },
  },

  marquee: {
    rating: "Rated 4.0 on Trustpilot",
    items: ["Independent editorial service", "Free notability assessment", "Every paid contribution disclosed", "Published pricing from $700"],
  },

  about: {
    eyebrow: "About The Wikipedia Studio",
    title: "Wikipedia Experts Who",
    highlight: "Put Accuracy First",
    body: [
      "A strong Wikipedia article starts with reliable sources, not big claims. Our researchers and editors study independent coverage, check facts, and write clear content that follows Wikipedia guidelines.",
      "We help people and organizations understand their eligibility, improve existing articles, and make informed decisions about their Wikipedia presence.",
    ],
    checklist: [
      "Independent Research and Verified Sources",
      "Neutral Writing That Follows Wikipedia Guidelines",
      "Clear Process With Honest Recommendations",
      "Editorial Review Before Submission",
    ],
    // TODO(content): confirm experience and team figures before publishing.
    stats: [
      { label: "Experience", value: "10+", caption: "Years of Editorial Experience" },
      { label: "Team", value: "25+", caption: "Wikipedia Specialists" },
      { label: "Reach", value: "Global", caption: "Client Support" },
    ],
    cta: { label: "Learn About Our Team", href: "/about-us/#team" },
    image: { src: "/assets/redesign/about-sphere.png", alt: "Knowledge sphere illustration" },
  },

  services: {
    eyebrow: "Our Services",
    title: "Professional Wikipedia Services",
    highlight: "for Every Stage",
    lede: "From checking eligibility to improving live articles, our Wikipedia services help you take the right next step.",
    items: [
      { title: "Notability Assessment", description: "Find out if reliable, independent sources support a Wikipedia article about you or your organization.", href: "/services/wikipedia-notability-assessment/", icon: "search" as IconName, linkLabel: "Check Eligibility" },
      { title: "Wikipedia Page Writing", description: "Get clear, neutral Wikipedia content backed by research, verified facts, and reliable citations.", href: "/services/wikipedia-content-writing/", icon: "write" as IconName, linkLabel: "Explore Writing" },
      { title: "Wikipedia Page Editing", description: "Improve existing articles with accurate updates, stronger sources, and balanced content.", href: "/services/wikipedia-page-editing/", icon: "edit" as IconName, linkLabel: "Explore Editing" },
      // TODO(content): confirm "Wikipedia Consultation" is an approved service label.
      { title: "Wikipedia Consultation", description: "Get expert guidance on Wikipedia rules, article eligibility, editorial concerns, and next steps.", href: "/contact/", icon: "chat" as IconName, linkLabel: "Get Guidance" },
    ],
  },

  process: {
    eyebrow: "Our Process",
    title: "A Clear Wikipedia Page",
    highlight: "Creation Process",
    lede: "Four simple steps help you understand your eligibility, review the content, and move forward with confidence.",
    steps: [
      { title: "Get in Touch", copy: "Tell us about your subject, goals, and available sources. We start by understanding what you need.", icon: "chat" as IconName },
      { title: "Free Assessment", copy: "We review independent sources and check whether the subject meets Wikipedia notability guidelines.", icon: "search" as IconName },
      { title: "Expert Review", copy: "Our editors prepare neutral content, verify citations, and check the draft for accuracy and balance.", icon: "review" as IconName },
      { title: "Submission and Support", copy: "We submit eligible drafts with proper disclosure and help address reviewer feedback.", icon: "publish" as IconName },
    ],
  },

  portfolio: {
    eyebrow: "Our Portfolio",
    title: "Recent Wikipedia Articles",
    highlight: "and Editorial Work",
    aside: "Explore published Wikipedia articles featured in our portfolio and see how clear writing and reliable sources support encyclopedic content.",
    viewAll: { label: "Explore Our Portfolio", href: "/portfolio/" },
  },

  why: {
    eyebrow: "Why Choose Us",
    title: "Your Trusted Wikipedia",
    highlight: "Editorial Partner",
    intro: "Wikipedia has strict rules for what belongs in an article. We help you understand those rules, find reliable sources, and make informed decisions before you invest in a draft.",
    reasons: [
      { title: "Research Before Writing", copy: "We check independent coverage before starting an article." },
      { title: "Experienced Editorial Team", copy: "Our specialists focus on accuracy, structure, and neutral language." },
      { title: "Clear Communication", copy: "Understand each stage, from source review to submission." },
      { title: "Transparent Practices", copy: "We disclose paid contributions and follow relevant Wikipedia guidelines." },
      { title: "Continued Support", copy: "We help review article changes, citations, and editorial concerns." },
    ],
    cta: { label: "Discover Why Clients Choose Us", href: "/about-us/" },
    image: { src: "/assets/redesign/why-photo.png", alt: "Laptop showing the Wikipedia globe on an editor’s desk" },
  },

  testimonials: {
    eyebrow: "Client Testimonials",
    title: "Trusted by",
    highlight: "Professionals Worldwide",
    lede: "Hear from clients who have worked with our team on Wikipedia research, writing, editing, and article support.",
    // TODO(content): insert verified client testimonials from the approved carousel.
    items: [
      {
        quote: "“Professional, responsive and highly knowledgeable. They guided us through the process with clarity and delivered a well-researched, policy-compliant page.”",
        name: "David Kim",
        role: "Research Director",
        avatar: "/assets/redesign/avatar-david.png",
      },
    ],
  },

  trustpilot: {
    eyebrow: "Trustpilot Reviews",
    title: "Independent Reviews",
    highlight: "on Trustpilot",
    lede: "See what clients say about their experience with The Wikipedia Studio. Read independent feedback on our research, communication, and editorial services.",
    points: [
      { icon: "users" as IconName, title: "Real Client Feedback", copy: "Read reviews shared by clients about their experience with our team." },
      { icon: "shield" as IconName, title: "Independent Review Platform", copy: "Explore public feedback and ratings directly on Trustpilot." },
      { icon: "search" as IconName, title: "Make an Informed Choice", copy: "Learn from client experiences before choosing a Wikipedia service provider." },
    ],
    readLabel: "Read Reviews on Trustpilot",
  },

  insights: {
    eyebrow: "Our Insights",
    title: "Wikipedia Guides Worth Reading",
    highlight: "Before You Start",
    aside: "Not sure if you qualify for a Wikipedia page? Explore practical guides on notability, article creation, reliable sources, and common mistakes.",
    viewAll: { label: "Explore All Guides", href: "/blog/" },
    // TODO(content): connect these headlines to published articles when they exist.
    questions: {
      title: "Common questions",
      links: [
        { label: "Who Qualifies for a Wikipedia Page?", href: "/wikipedia-notability-checker/" },
        { label: "How Much Does a Wikipedia Page Cost?", href: "/wikipedia-page-cost/" },
        { label: "Why Do Wikipedia Pages Get Rejected?", href: "/faq/" },
      ],
    },
  },

  faq: {
    eyebrow: "Frequently Asked Questions",
    title: "Wikipedia Questions,",
    highlight: "Answered Honestly",
    lede: "Straight answers about eligibility, cost, timelines and what happens after a page goes live.",
    items: [
      {
        q: "What is The Wikipedia Studio (Wiki Studio)?",
        a: "The Wikipedia Studio - often shortened to Wiki Studio - is an independent Wikipedia service provider offering notability assessments, Wikipedia page creation, editing, research, and ongoing page management for individuals, companies, and institutions worldwide. It is not affiliated with Wikipedia or the Wikimedia Foundation, discloses all paid editing, and publishes its packages from $700.",
      },
      {
        q: "How famous do you need to be to get a Wikipedia page?",
        a: "Fame is the wrong measure. Wikipedia looks for significant coverage in multiple reliable sources independent of the subject - newspapers, books, journals, major trade press - not follower counts, revenue, or awards alone. Some quiet academics qualify; some viral celebrities do not. The assessment is about sources, not celebrity.",
      },
      {
        q: "How much does a Wikipedia page cost?",
        a: "Engagements start at $700 for straightforward subjects and run to $1,800 for complex or previously rejected ones, with custom scoping above that. The figure depends on how much independent coverage exists and how much verification it requires, which the free notability assessment establishes before you commit. Full package details are on our pricing page.",
      },
      {
        q: "Can I pay someone to write my Wikipedia page?",
        a: "Yes, paid editing is allowed if it is disclosed. Wikipedia's terms require paid contributors to declare their employer, client, and affiliation. What is not allowed is undisclosed promotional editing or guarantees of approval. Volunteer reviewers still decide whether the article meets notability and sourcing standards.",
      },
      {
        q: "Do you guarantee Wikipedia page approval?",
        a: "No ethical editor can guarantee approval. The encyclopedia is maintained by independent volunteers, and no agency controls their decisions. We concentrate on the factors that genuinely determine outcomes: notability, reliable sourcing, neutral writing, and full compliance with editorial standards.",
      },
      {
        q: "How long does it take to get a Wikipedia page published?",
        a: "Research and drafting typically take three to six weeks. The review queue that follows belongs to volunteer reviewers and can clear in days or run to several months. A notability assessment at the start gives the most reliable estimate, because it establishes how much source material actually exists.",
      },
    ],
  },

  cta: {
    eyebrow: "Start Your Wikipedia Journey",
    title: "Ready to Create or Improve",
    highlight: "Your Wikipedia Page?",
    lede: "Not sure where to begin? Our team can review your eligibility, explain your options, and help you choose the right Wikipedia service.",
    primary: { label: "Get Your Free Assessment", href: "/contact/" },
    secondary: { label: "Talk to an Expert", href: "/contact/" },
    assurances: [
      { icon: "search" as IconName, title: "Eligibility Review Before Writing", copy: "" },
      { icon: "research" as IconName, title: "Research Based Editorial Guidance", copy: "" },
      { icon: "check-circle" as IconName, title: "Clear Next Steps and Support", copy: "" },
    ],
  },
};
