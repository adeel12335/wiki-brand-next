import type { IconName } from "@/components/ui/Icon";

/** Hire a Wikipedia Writer copy (approved client copy, docx "03 | Hire a Wikipedia Writer"). */
export const hireContent = {
  hero: {
    title: "Hire a Wikipedia Writer",
    highlight: "Who Puts Research First",
    lede: "Work with professional Wikipedia writers who understand notability, reliable sources, and neutral writing. From research to editorial review and submission, we help you take the right steps toward an accurate Wikipedia article.",
    actions: [
      { label: "Get a Free Assessment", href: "/contact/", variant: "gold" as const },
      { label: "View Writing Packages", href: "#pricing", variant: "ghost" as const },
    ],
    panel: {
      title: "Every Writing Engagement",
      rows: [
        { label: "Notability Check", note: "Before drafting begins" },
        { label: "Paid Editing Disclosure", note: "Following Wikipedia guidelines" },
        { label: "Editorial Review", note: "Independent source verification" },
        { label: "Clear Pricing", note: "Agreed before work begins" },
        { label: "Continued Support", note: "During the agreed monitoring period" },
      ],
    },
  },

  writers: {
    title: "What a Professional Wikipedia Writer",
    highlight: "Actually Does",
    lede: "A Wikipedia writer does more than write a biography. Our team checks eligibility, researches independent sources, verifies facts, and prepares balanced content that follows Wikipedia editorial guidelines.",
    items: [
      {
        icon: "search" as IconName,
        title: "Notability Before Drafting",
        copy: "We assess independent coverage and relevant Wikipedia guidelines before recommending a new article.",
      },
      {
        icon: "write" as IconName,
        title: "Neutral Article Writing",
        copy: "Our writers turn verified facts into clear, balanced content supported by reliable citations.",
      },
      {
        icon: "review" as IconName,
        title: "Independent Editorial Review",
        copy: "A second editor checks factual accuracy, source quality, article structure, and neutrality before submission.",
      },
      {
        icon: "shield" as IconName,
        title: "Transparent Submission",
        copy: "We support article submission with proper paid contribution disclosure and respond to relevant editorial feedback.",
      },
    ],
  },

  pricing: {
    id: "pricing",
    title: "How Much Does It Cost to",
    highlight: "Hire a Wikipedia Writer?",
    lede: "The cost depends on source availability, research needs, article complexity, and editorial work. We review your subject before recommending a package.",
    tiers: [
      { id: "essential", name: "Essential", kicker: "Essential", price: "From $700", amount: 700, from: true, note: "Straightforward subjects with sufficient independent coverage" },
      { id: "standard", name: "Standard", kicker: "Standard", price: "$1,100", amount: 1100, from: false, note: "Additional research and editorial development", featured: true },
      { id: "complex", name: "Complex", kicker: "Complex", price: "From $1,800", amount: 1800, from: true, note: "Detailed research or earlier submissions" },
      { id: "custom", name: "Custom", kicker: "Custom", price: "$2,500+", amount: 2500, from: true, note: "Specialized research and editorial requirements" },
    ],
    cta: { label: "Compare Writing Packages", href: "/wikipedia-page-cost/" },
  },

  faq: {
    heading: {
      title: "Questions to Ask Before",
      highlight: "Hiring a Wikipedia Writer",
    },
    items: [
      {
        q: "Can I hire someone to write my Wikipedia page?",
        a: "Yes. A professional writer can research and prepare a Wikipedia article. Paid contributions must be disclosed, and the article must meet Wikipedia editorial and notability standards.",
      },
      {
        q: "How much does it cost to hire a Wikipedia writer?",
        a: "Pricing depends on the research required, source quality, and article complexity. Our page creation packages start at $700, subject to assessment and confirmed project scope.",
      },
      {
        q: "Is it allowed to pay a Wikipedia editor?",
        a: "Paid editing is permitted when the required disclosures are made and Wikipedia policies are followed. The content must remain neutral and supported by reliable sources.",
      },
      {
        q: "How does a professional writer prepare an article?",
        a: "A professional writer reviews eligibility, researches independent sources, creates a neutral draft, adds citations, and prepares the article for editorial review.",
      },
      {
        q: "How long does Wikipedia article writing take?",
        a: "Writing time depends on the available sources and project complexity. Research and drafting may take several weeks, while Wikipedia volunteer review follows its own schedule.",
      },
    ],
  },

  contact: {
    title: "Ready to Hire a Professional",
    highlight: "Wikipedia Writer?",
    lede: "Tell us about your subject and the independent coverage available. Our editors will review your enquiry and recommend a suitable next step.",
  },
};
