import type { IconName } from "@/components/ui/Icon";

/**
 * Thank You page copy (from the Figma "Thank You - Final" frame, desktop 179:3893 / mobile 198:8404).
 * Replace text here when final content is provided - components read only from this file.
 */
export const thankYouContent = {
  hero: {
    badge: "Enquiry received",
    title: "Thank You,",
    highlight: "We Have Your Note.",
    lede: "An editor will review the coverage you shared and reply in writing, usually within one business day.",
    image: { src: "/assets/about-knowledge-sphere.png", alt: "" },
    progress: [
      { icon: "tick" as IconName, title: "Received", note: "Just now", state: "done" as const },
      { icon: "research" as IconName, title: "Editor review", note: "Within hours", state: "current" as const },
      { icon: "mail" as IconName, title: "Written reply", note: "Within 1 business day", state: "next" as const },
    ],
    direct: "Prefer not to wait?",
    back: { label: "Back to Home", href: "/" },
  },

  wait: {
    eyebrow: "While You Wait",
    title: "Make the Most of",
    highlight: "the Next Few Hours",
    aside: "Three quick ways to get ready before your editor replies.",
    cards: [
      {
        icon: "search" as IconName,
        kicker: "Free Tool",
        title: "Check Your",
        highlight: "Notability",
        copy: "Run the two-minute checker so you know what your editor is likely to say.",
        cta: { label: "Try the Checker", href: "/wikipedia-notability-checker/" },
        tone: "cream" as const,
      },
      {
        icon: "research" as IconName,
        kicker: "Guide",
        title: "Gather the",
        highlight: "Right Sources",
        copy: "Independent press links, key dates and exact spellings make the first reply faster.",
        cta: { label: "Read the Guide", href: "/process/" },
        tone: "mist" as const,
      },
    ],
  },
};
