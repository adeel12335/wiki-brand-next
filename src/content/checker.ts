/**
 * Notability Checker copy (approved client copy, "02 | Free Wikipedia Notability Checker").
 *
 * Scoring: each scored question adds its option position (first option 0, last option 3).
 * Questions 1 to 7 are scored (0 to 21). Question 8 (current Wikipedia status) is context only
 * and is shown alongside the result. The checker is preliminary: a real eligibility verdict
 * requires a review of the actual sources.
 */

export type Stage = "building" | "possible" | "strong";

export interface CheckerQuestion {
  id: string;
  question: string;
  /** Options in order, weakest first. A scored question adds the option index (0 to 3). */
  options: string[];
  /** Whether this question adds to the score (Q8, current status, does not). */
  scored: boolean;
}

export interface StageContent {
  kicker: string;
  title: string;
  copy: string;
  /** Lowest total score (questions 1 to 7, max 21) that reaches this stage. */
  min: number;
}

export const checkerContent = {
  hero: {
    title: "Free Wikipedia",
    highlight: "Notability Checker",
    lede: "Does your subject have enough independent coverage for a Wikipedia article? Answer a few simple questions to understand your current source strength and discover the next step.",
    actions: [
      { label: "Check My Eligibility", href: "#checker", variant: "gold" as const },
      { label: "Request Expert Assessment", href: "#contact", variant: "ghost" as const },
    ],
  },

  tool: {
    questionLabel: "Question",
    of: "of",
    back: "Back",
    next: "Next Question",
    finish: "See My Result",
    restart: "Start Again",
    resultKicker: "Your result",
    statusLabel: "Current Wikipedia status",
    liveKicker: "Your result so far",
    notScored: { title: "Not scored yet", copy: "Answer the questions and your result updates as you go." },
    cta: { label: "Request Expert Assessment", href: "#contact" },
    disclaimer: "This checker is preliminary. A real eligibility verdict requires a review of your actual sources.",
    questions: [
      {
        id: "outlets",
        question: "How many independent publications have written about the subject in depth?",
        scored: true,
        options: ["None that I know of", "One or two", "Three to five", "Six or more"],
      },
      {
        id: "types",
        question: "What type of publications cover the subject?",
        scored: true,
        options: [
          "Personal or company websites",
          "Press releases or sponsored articles",
          "Independent news or trade publications",
          "Books, journals, or major news outlets",
        ],
      },
      {
        id: "detail",
        question: "How detailed is the coverage?",
        scored: true,
        options: [
          "Brief mentions only",
          "Short profiles or announcements",
          "Detailed articles about the subject",
          "Several independent in depth features",
        ],
      },
      {
        id: "authors",
        question: "Who created most of the coverage?",
        scored: true,
        options: [
          "The subject or their company",
          "Paid promotional partners",
          "Independent journalists or researchers",
          "A mix of independent sources",
        ],
      },
      {
        id: "editorial",
        question: "Are the publications recognized for editorial review?",
        scored: true,
        options: ["Not sure", "Mostly personal blogs", "Some established publications", "Several established independent publications"],
      },
      {
        id: "focus",
        question: "Is the coverage about the subject directly?",
        scored: true,
        options: [
          "Mostly passing mentions",
          "A few direct mentions",
          "One or two substantial articles",
          "Several articles focused on the subject",
        ],
      },
      {
        id: "verification",
        question: "Is the coverage available for verification?",
        scored: true,
        options: [
          "I cannot find the sources",
          "Some links are unavailable",
          "Most sources can be accessed",
          "Sources are accessible or archived",
        ],
      },
      {
        id: "status",
        question: "What best describes your current Wikipedia status?",
        scored: false,
        options: ["No article exists", "I have a draft", "An earlier submission was declined", "An existing article needs review"],
      },
    ] satisfies CheckerQuestion[],
  },

  stages: {
    building: {
      kicker: "Stage 01",
      title: "Building Coverage",
      copy: "Your subject may need more detailed independent sources. Start by identifying existing coverage and reviewing its quality.",
      min: 0,
    },
    possible: {
      kicker: "Stage 02",
      title: "Possible Eligibility",
      copy: "Your subject has some promising coverage. A professional source review can help assess reliability, depth, and independence.",
      min: 9,
    },
    strong: {
      kicker: "Stage 03",
      title: "Strong Source Potential",
      copy: "Your answers suggest useful independent coverage. The next step is to verify the sources against Wikipedia notability guidelines.",
      min: 15,
    },
  } satisfies Record<Stage, StageContent>,

  results: {
    title: "What Your Wikipedia",
    highlight: "Notability Score Means",
    lede: "Your result reflects the independent coverage you report. Here is how to understand your current position and what to do next.",
  },

  counts: {
    title: "What Counts as Independent",
    highlight: "Coverage for Wikipedia?",
    lede: "Wikipedia eligibility depends on the quality, independence, and depth of published coverage.",
    strong: {
      title: "Strong Evidence",
      items: [
        "Detailed reporting in independent newspapers and magazines",
        "Books and academic publications discussing the subject",
        "Independent editorial features",
        "Accessible archived coverage from reliable sources",
      ],
    },
    weak: {
      title: "Sources That Need More Support",
      items: [
        "Company websites and personal biographies",
        "Press releases and promotional announcements",
        "Sponsored articles and paid features",
        "Directory listings and brief passing mentions",
      ],
    },
  },

  faq: {
    heading: {
      title: "Questions About",
      highlight: "Wikipedia Notability",
    },
    moreLabel: "See All Questions",
    items: [
      {
        q: "How does the Wikipedia notability checker work?",
        a: "The checker asks about the number, quality, and independence of sources covering your subject. Your answers provide an initial indication of source strength.",
      },
      {
        q: "What counts as independent coverage?",
        a: "Independent coverage comes from sources with editorial control separate from the subject. Detailed reporting in established publications can be especially useful.",
      },
      {
        q: "What happens after a promising result?",
        a: "Our researchers can review the actual sources, assess relevant Wikipedia guidelines, and provide a written recommendation about the next step.",
      },
    ],
  },

  contact: {
    heading: {
      title: "Want Wikipedia Editors to",
      highlight: "Review Your Sources?",
      lede: "Share your subject details and published coverage. Our team will examine the sources and explain the next step.",
    },
    submitLabel: "Send My Sources",
  },
};
