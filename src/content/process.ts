import type { IconName } from "@/components/ui/Icon";

/**
 * Our Process page copy - source: "Wiki_Studio_Our_Process_SEO_Content.docx".
 * Layout from the Figma "Our Process - Final" frame. Components read only from this file.
 * TODO(content): confirm the 2 to 5 day timeline, the 2/3 research allocation and the workflow metrics before publishing.
 */
export const processContent = {
  seo: {
    title: "Wikipedia Page Creation Process",
    description:
      "Explore our Wikipedia page creation process, from notability research and source verification to expert writing, editorial review, and submission.",
    keywords:
      "wikipedia page creation process, how to create a wikipedia page, wikipedia article writing process, wikipedia notability assessment, wikipedia article submission, wikipedia editorial guidelines",
  },

  hero: {
    title: "Our Wikipedia Page Creation Process,",
    highlight: "From Research to Submission",
    lede: "Every strong Wikipedia article begins with reliable research. Our five step process combines source verification, neutral writing, expert review, and transparent submission to help build an accurate Wikipedia presence.",
    actions: [
      { label: "Get a Free Assessment", href: "/contact/", variant: "gold" as const },
    ],
    image: { src: "/assets/about-knowledge-sphere.png", alt: "" },
    facts: [
      { value: "2/3", label: "Research Before Drafting" },
      { value: "2 Editors", label: "Every Article Reviewed for Accuracy" },
      { value: "100%", label: "Transparent Paid Editing Disclosure" },
      { value: "5 Steps", label: "A Clear Editorial Process" },
    ],
  },

  steps: {
    eyebrow: "Our Proven Process",
    title: "Our Proven 5 Step Wikipedia",
    highlight: "Page Creation Process",
    lede: "From the first source check to final submission, every stage has a clear purpose. Here is how we research, write, and review your Wikipedia article.",
    items: [
      {
        icon: "research" as IconName,
        title: "Research and Notability Assessment",
        copy: "We examine independent news coverage, books, journals, and trusted publications to assess Wikipedia eligibility. Our team identifies useful sources and explains the findings before writing begins.",
      },
      {
        icon: "plan" as IconName,
        title: "Source Planning and Article Outline",
        copy: "We evaluate each source for reliability, independence, and depth. Then we create an article outline and connect important facts to supporting references.",
      },
      {
        icon: "write" as IconName,
        title: "Neutral Wikipedia Article Writing",
        copy: "Our writers turn verified research into clear, balanced content. Every important statement is supported by reliable citations, with a structure that follows Wikipedia editorial guidelines.",
      },
      {
        icon: "review" as IconName,
        title: "Second Editor Review",
        copy: "A second editor checks the draft for factual accuracy, source quality, clear writing, and proper citations. This review helps strengthen the article before submission.",
      },
      {
        icon: "publish" as IconName,
        title: "Wikipedia Submission and Monitoring",
        copy: "We submit the article through the appropriate Wikipedia process with paid editing disclosure. Our team reviews editor feedback and monitors the article during its initial publication period.",
      },
    ],
  },

  timeline: {
    eyebrow: "Realistic Project Timelines",
    title: "How Long Does the Wikipedia Page",
    highlight: "Creation Process Take?",
    lede: "Each stage depends on source availability, research needs, and editorial review. Here is what to expect as your project moves forward.",
    phases: [
      { icon: "clock" as IconName, range: "2 to 5 Days", title: "Notability Assessment", copy: "We review independent sources and prepare a written assessment of Wikipedia eligibility." },
      { icon: "write" as IconName, range: "A Few Weeks", title: "Research and Drafting", copy: "Our editors research the subject, organize citations, and prepare the article for review." },
      { icon: "review" as IconName, range: "Varies", title: "Wikipedia Editorial Review", copy: "Wikipedia volunteers review submitted articles based on their editorial guidelines and available review capacity." },
      { icon: "manage" as IconName, range: "After Publication", title: "Article Monitoring", copy: "We review important changes, check references, and support factual updates during the agreed monitoring period." },
    ],
  },

  bring: {
    eyebrow: "Before You Start",
    title: "What Sources Matter for",
    highlight: "Wikipedia Notability?",
    lede: "The right sources make a difference. Share independent coverage that discusses your work in detail so our researchers can assess your Wikipedia eligibility.",
    good: {
      kicker: "Bring these",
      title: "Sources That Strengthen Your Assessment",
      items: [
        "Independent news articles with detailed coverage",
        "Books, journals, and trusted publications",
        "Major awards covered by reliable sources",
        "Published research and independent analysis",
      ],
    },
    bad: {
      kicker: "Need more support",
      title: "Sources That Need Additional Support",
      items: [
        "Company websites and personal biographies",
        "Press releases and promotional content",
        "Sponsored articles and paid features",
        "Interviews focused mainly on personal claims",
      ],
    },
  },

  cta: {
    eyebrow: "Start With Clarity",
    title: "Start Your Wikipedia Page",
    highlight: "With Reliable Research",
    lede: "Have independent coverage about your work? Let our team review your sources and explain the next steps. Get a clear assessment before moving forward with Wikipedia page creation.",
    primary: { label: "Request a Free Assessment", href: "/contact/" },
    assurances: [
      { icon: "clock" as IconName, title: "2 to 5 Day Assessment", copy: "Receive a written review of your sources and Wikipedia eligibility." },
      { icon: "plan" as IconName, title: "Clear Scope and Pricing", copy: "Understand the proposed work and cost before your project begins." },
      { icon: "shield" as IconName, title: "Transparent Editorial Process", copy: "Every paid contribution is disclosed according to Wikipedia guidelines." },
    ],
  },
};
