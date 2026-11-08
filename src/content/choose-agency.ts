import type { IconName } from "@/components/ui/Icon";

/** How to Choose a Wikipedia Agency copy (Figma "How to Choose an Agency - Final" 179:2565). */
export const chooseAgencyContent = {
  hero: {
    pill: { icon: "shield" as IconName, label: "Buyer’s guide  ·  6 checks  ·  Applies to us too" },
    title: "How to Choose a Wikipedia",
    highlight: "Agency Without Getting Scammed",
    lede: "This niche attracts operators who sell guarantees and hide paid editing. Use this checklist to evaluate any desk, including ours, before you pay for a draft.",
    actions: [
      { label: "Run the Free Checker", href: "/wikipedia-notability-checker/", variant: "gold" as const },
      { label: "Request a Human Assessment", href: "/contact/", variant: "ghost" as const },
    ],
  },

  checklist: {
    eyebrow: "The Checklist",
    title: "Six Things an Honest",
    highlight: "Agency Will Show You",
    items: [
      {
        icon: "search" as IconName,
        title: "Notability Before Drafting Fees",
        copy: "An honest desk screens independent sources first and tells you when coverage is missing.",
      },
      {
        icon: "shield" as IconName,
        title: "Paid-Contribution Disclosure",
        copy: "Wikimedia’s Terms of Use require disclosure. Hidden relationships create deletion risk for you.",
      },
      {
        icon: "close" as IconName,
        title: "No Approval Guarantees",
        copy: "Volunteer reviewers decide. “100% approval” claims are marketing, not how Wikipedia works.",
      },
      {
        icon: "layers" as IconName,
        title: "Published Pricing and Exclusions",
        copy: "Ask what is not included: PR placement, removing criticism, locking pages or inventing coverage.",
      },
      {
        icon: "users" as IconName,
        title: "Named Process, Not Anonymous Writers",
        copy: "You should know how research, drafting and review are separated, and how conflicts are handled.",
      },
      {
        icon: "manage" as IconName,
        title: "Realistic Aftercare",
        copy: "Monitoring and talk-page engagement matter. Nobody can “lock” a page against community edits.",
      },
    ],
  },

  options: {
    eyebrow: "Your Options",
    title: "Four Ways to Get",
    highlight: "a Wikipedia Page",
    items: [
      { icon: "edit" as IconName, kicker: "Option 1", title: "Do it yourself", copy: "Slow, and easy to mishandle without a source plan." },
      { icon: "users" as IconName, kicker: "Option 2", title: "Freelance marketplaces", copy: "Often uneven on disclosure and source standards." },
      { icon: "building" as IconName, kicker: "Option 3", title: "Typical agencies", copy: "Wide range; ask what the fee actually covers." },
      {
        icon: "trophy" as IconName,
        kicker: "Recommended",
        title: "The Wikipedia Studio",
        copy: "Published tiers, after a free notability assessment.",
        recommended: true,
      },
    ],
  },

  faq: {
    heading: {
      eyebrow: "Red Flags",
      title: "Questions to Ask",
      highlight: "Before You Pay",
      lede: "Price alone is a weak signal. These answers separate editorial desks from scam operators.",
    },
    items: [
      {
        q: "Should I choose the cheapest Wikipedia agency?",
        a: "Price alone is a weak signal. Ask what happens if sources are thin, whether paid editing is disclosed, and whether approval is “guaranteed”.",
      },
      {
        q: "How do I spot a scam Wikipedia service?",
        a: "Red flags include guaranteed publication, undisclosed paid editing, fake reviewer accounts, refusal to show sample sourcing standards, and pressure to pay before a notability screen.",
      },
      {
        q: "What should an honest agency publish?",
        a: "Clear pricing bands, what is not included, disclosure practices, and a willingness to decline weak subjects. Our packages start at $700 after a free assessment.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in Touch",
    title: "Start With Sources,",
    highlight: "Not a Sales Call",
    lede: "Tell us about the subject and the coverage you have. An editor will reply in writing with an honest view.",
  },
};
