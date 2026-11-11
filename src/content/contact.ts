import type { IconName } from "@/components/ui/Icon";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_RAW } from "@/lib/config";

/**
 * Contact page copy (from the Figma "Contact - Final" frame, desktop 119:140 / mobile 197:4210).
 * Replace text here when final content is provided - components read only from this file.
 */
export const contactContent = {
  hero: {
    title: "Tell Us What Exists.",
    highlight: "We Will Tell You the Truth.",
    lede: "Send the coverage that already exists. An editor, not a sales queue, replies with a clear read on whether a Wikipedia article is realistic.",
    replyWindow: "Typical reply window: one business day",
    // TODO(content): placeholder until the client supplies the real hero background image.
    image: { src: "/assets/hero-orbital-globe.jpg", alt: "" },
  },

  channels: [
    { icon: "mail" as IconName, label: "Email the editorial desk", value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
    { icon: "phone" as IconName, label: "Call us", value: SITE_PHONE, href: `tel:${SITE_PHONE_RAW}` },
    { icon: "globe" as IconName, label: "Worldwide editorial work", value: "Remote-first, worldwide" },
  ],

  desk: {
    eyebrow: "Enquiry Desk",
    title: "Send Your Enquiry",
    highlight: "To the Editorial Desk",
    lede: "The more you share up front, the more useful our first reply will be.",
    bring: {
      kicker: "Faster replies",
      title: "Bring These If You Have Them",
      items: [
        "Independent press coverage links",
        "Key dates and verified milestones",
        "Any existing Wikipedia or Wikidata entry",
        "Creation, editing or maintenance need",
      ],
    },
    assurance: {
      title: "Confidential by default",
      copy: "Your enquiry is read only by our editors. We never share it, and we never contact your subject without permission.",
    },
  },

  next: {
    eyebrow: "After You Send It",
    title: "What Happens to",
    highlight: "Your Enquiry Next",
    lede: "Every enquiry is read by an editor. If the coverage looks promising, we propose a notability assessment as the first step, not a promise of publication.",
    situations: [
      {
        icon: "page" as IconName,
        kicker: "No article yet",
        title: "New subject",
        copy: "Start with a source audit. Bring independent coverage and we will tell you whether page creation is realistic.",
        link: { label: "Page creation", href: "/services/wikipedia-page-creation/" },
      },
      {
        icon: "edit" as IconName,
        kicker: "Already on Wikipedia",
        title: "Existing article",
        copy: "Send the live URL. An editing audit maps tags, sourcing gaps and what is actually fixable.",
        link: { label: "Page editing", href: "/services/wikipedia-page-editing/" },
      },
      {
        icon: "manage" as IconName,
        kicker: "A worrying edit",
        title: "Something changed",
        copy: "If an edit concerns you, page monitoring covers assessment and a measured, policy-led response.",
        link: { label: "Page monitoring", href: "/services/wikipedia-page-monitoring/" },
      },
    ],
  },

  notReady: {
    eyebrow: "Next Steps",
    title: "Not Ready to",
    highlight: "Write to Us Yet?",
    aside: "Three free ways to find out where your subject stands before you talk to anyone.",
    cards: [
      {
        icon: "search" as IconName,
        kicker: "Free Tool",
        title: "Check Your",
        highlight: "Notability",
        copy: "Answer a few questions about the coverage you already have and see whether an article is realistic.",
        cta: { label: "Try the Checker", href: "/wikipedia-notability-checker/" },
        tone: "cream" as const,
      },
      {
        icon: "info" as IconName,
        kicker: "FAQ",
        title: "Clear Answers,",
        highlight: "No Fine Print",
        copy: "Timelines, disclosure, approval and what we will never promise.",
        cta: { label: "Read the FAQ", href: "/faq/" },
        tone: "cream" as const,
      },
    ],
  },
};
