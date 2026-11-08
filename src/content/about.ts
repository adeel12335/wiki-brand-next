import type { IconName } from "@/components/ui/Icon";

/**
 * About page copy (approved client copy, doc "04 | About Us").
 * Layout follows the Figma "About - Final" frame (desktop 111:140 / mobile 197:3321).
 * Components read only from this file. Client rule: no em or en dashes in copy.
 * Publication note from the client: verify figures, timelines, staff roles and testimonials before publishing.
 */
export const aboutContent = {
  hero: {
    title: "Wikipedia Experts First,",
    highlight: "An Agency Second",
    lede: "The Wikipedia Studio brings researchers, writers, and editors together to help people and organizations navigate Wikipedia with confidence. Our work begins with reliable sources and follows a clear editorial process.",
    actions: [
      { label: "Get a Free Assessment", href: "/contact/", variant: "gold" as const },
      { label: "Meet Our Team", href: "#team", variant: "ghost" as const },
    ],
    image: { src: "/assets/redesign/about/hero-articles.png", alt: "Three neutral, cited Wikipedia article drafts", width: 741, height: 702 },
  },

  story: {
    title: "Built Around One",
    highlight: "Simple Observation",
    intro: "A strong Wikipedia article begins long before the first sentence is written. It starts with independent coverage, careful research, and a clear understanding of Wikipedia guidelines.",
    body: "That is why we assess source quality before preparing an article. At The Wikipedia Studio, our approach brings together research, neutral writing, editorial review, and transparent submission to help clients make informed decisions.",
    image: { src: "/assets/redesign/about/story-photo.png", alt: "Editor reviewing sources at his desk" },
    // Optional ink note card over the photo; omitted because the approved copy has none.
    note: undefined as { quote: string; caption: string } | undefined,
  },

  stats: {
    title: "The Wikipedia Editors",
    highlight: "Behind Every Article",
    aside: "Our team combines research, editorial experience, and careful source verification to prepare accurate, well supported Wikipedia content.",
    // Optional link button under the aside; omitted because the approved copy has none.
    link: undefined as { label: string; href: string } | undefined,
    background: "/assets/reference-dark.png",
    // TODO(content): client to verify figures before publishing.
    items: [
      { icon: "clock" as IconName, value: "2 to 5", unit: "Days", label: "Initial Source Assessment" },
      { icon: "users" as IconName, value: "25+", unit: "", label: "Wikipedia Specialists" },
      { icon: "review" as IconName, value: "10+", unit: "Years", label: "Editorial Experience" },
      { icon: "shield" as IconName, value: "100%", unit: "", label: "Transparent Paid Editing Practices" },
    ] as Array<{ icon: IconName; value: string; unit: string; label: string; copy?: string }>,
  },

  engagement: {
    title: "What Every Wikipedia",
    highlight: "Project Includes",
    lede: undefined as string | undefined,
    items: [
      { icon: "search" as IconName, title: "Notability Assessment", copy: "We review independent coverage and assess the relevant Wikipedia eligibility guidelines." },
      { icon: "research" as IconName, title: "Verified Source Research", copy: "Our researchers examine reliable publications and match important claims to supporting references." },
      { icon: "write" as IconName, title: "Neutral Article Writing", copy: "Our writers prepare balanced, encyclopedic content using verified facts and reliable citations." },
      { icon: "review" as IconName, title: "Dual Editorial Review", copy: "A second editor checks the draft for accuracy, clarity, neutrality, and citation quality." },
      { icon: "publish" as IconName, title: "Transparent Submission", copy: "We support the submission process with appropriate paid editing disclosure and editorial communication." },
      { icon: "manage" as IconName, title: "Post Publication Support", copy: "Our team reviews article changes and helps address factual concerns during the agreed support period." },
    ],
  },

  principles: {
    title: "Four Editorial Principles",
    highlight: "That Guide Our Work",
    lede: undefined as string | undefined,
    items: [
      { title: "Verifiability Over Promotion", copy: "We focus on facts supported by reliable sources rather than promotional claims." },
      { title: "Disclosure Over Discretion", copy: "Our paid contributions follow Wikipedia disclosure requirements and transparent editorial practices." },
      { title: "Research Before Writing", copy: "We assess source quality and eligibility before preparing a new article." },
      { title: "Honesty About Outcomes", copy: "We provide clear assessments, realistic timelines, and recommendations based on available evidence." },
    ],
    // Optional editorial-standard quote; omitted because the approved copy has none.
    quote: undefined as { text: string; source: string } | undefined,
  },

  team: {
    title: "Meet the Specialists Behind",
    highlight: "Our Wikipedia Services",
    lede: "Our editorial work brings together researchers, writers, reviewers, and monitoring specialists. Each role contributes to accurate content and a consistent editorial process.",
    // TODO(content): client to confirm actual staff roles before publishing.
    roles: [
      { icon: "review" as IconName, role: "Managing Editor", bio: "Oversees editorial quality, article structure, and final review standards." },
      { icon: "research" as IconName, role: "Senior Research Editor", bio: "Evaluates independent sources, verifies facts, and assesses Wikipedia eligibility." },
      { icon: "write" as IconName, role: "Article Editor", bio: "Develops neutral article drafts with clear citations and encyclopedic structure." },
      { icon: "manage" as IconName, role: "Monitoring Lead", bio: "Reviews article changes, checks source concerns, and supports ongoing maintenance." },
    ] as Array<{ icon: IconName; role: string; bio: string; focus?: string }>,
  },

  testimonials: {
    title: "What Clients Say",
    highlight: "About Working With Us",
    lede: "Explore feedback from clients who have worked with our team on Wikipedia research, writing, editing, and article support.",
    // TODO(content): insert a verified client testimonial from the approved review collection (per client copy doc).
    items: [
      {
        quote: "“Their research-first approach made the entire process clear. Every source was assessed carefully, and the finished page felt balanced and authoritative.”",
        name: "Daniel M.",
        role: "Verified client",
      },
    ],
  },

  mission: {
    title: "What Makes Our Wikipedia",
    highlight: "Editorial Approach Different",
    aside: undefined as string | undefined,
    cards: [
      {
        icon: "search" as IconName,
        title: "Accurate Pages for",
        highlight: "Notable Subjects",
        copy: "We focus on source quality, factual accuracy, and Wikipedia eligibility before article development.",
        cta: { label: "Explore Our Services", href: "/services/" },
        tone: "cream" as const,
      },
      {
        icon: "layers" as IconName,
        title: "A Presence You",
        highlight: "Can Understand",
        copy: "Our clear editorial process helps you understand the research, writing, and submission stages.",
        cta: { label: "See Our Process", href: "/process/" },
        tone: "mist" as const,
      },
      {
        icon: "shield" as IconName,
        title: "Responsible",
        highlight: "Editorial Practices",
        copy: "We follow transparent disclosure standards and provide ongoing support for factual article maintenance.",
        cta: { label: "Review Our Approach", href: "#principles" },
        tone: "cream" as const,
      },
    ],
  },

  contact: {
    title: "Ready to Talk With",
    highlight: "a Wikipedia Editor?",
    lede: "Tell us about your subject and the coverage you have received. Our team will review your enquiry and help you understand the next step.",
    submitLabel: "Send My Enquiry",
  },
};
