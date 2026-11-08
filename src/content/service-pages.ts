/**
 * Copy for the 8 service pages - source: "Wikipedia_Studio_All_8_Service_Pages_SEO.docx".
 * Generated from the docx; edit here when copy changes. Merged over the base data in ./services.ts.
 * Prices are NOT in this file: the docx asks to confirm service-specific rates before publishing.
 */

export interface ServicePageCopy {
  meta: { title: string; description: string; keywords: string };
  hero: { title: string; highlight: string; lede: string; checks: string[] };
  overview: { title: string; highlight: string; lead: string; body: string; whoFor: string[] };
  includes: Array<{ title: string; copy: string }>;
  steps: Array<{ title: string; copy: string }>;
  /** Name used in the FAQ heading ("<name> Questions, Answered"). */
  faqName: string;
  faqs: Array<{ q: string; a: string }>;
}

export const servicePageCopy: Record<string, ServicePageCopy> = {
  "wikipedia-page-creation": {
    "meta": {
      "title": "Wikipedia Page Creation Services",
      "description": "Explore Wikipedia page creation services built on independent research, neutral writing and reliable sources. Request a free notability assessment.",
      "keywords": "wikipedia page creation services, wikipedia page writers, create a wikipedia page, wikipedia page creation cost, wikipedia notability"
    },
    "hero": {
      "title": "Wikipedia Page Creation Services",
      "highlight": "Built on Reliable Sources",
      "lede": "We research, write and prepare Wikipedia articles for subjects with meaningful independent coverage. Start with an eligibility review before investing in a draft.",
      "checks": [
        "Check eligibility before drafting",
        "Neutral content supported by citations",
        "Disclosed submission and review support"
      ]
    },
    "overview": {
      "title": "What Wikipedia Page Creation",
      "highlight": "Actually Involves",
      "lead": "A Wikipedia article is not an advertisement or a personal profile you can control.",
      "body": "It must summarize what reliable, independent sources have published about a subject. We start by checking the evidence, then build a balanced draft when the sources support one. Wikipedia volunteers make the final decision about publication.",
      "whoFor": [
        "Executives and founders covered in independent reporting",
        "Authors and academics with substantial third party coverage",
        "Organizations with in depth reporting beyond their own announcements",
        "Artists and public figures covered by independent outlets"
      ]
    },
    "includes": [
      {
        "title": "Notability assessment",
        "copy": "Review significant independent coverage and relevant guidelines."
      },
      {
        "title": "Source research",
        "copy": "Find reliable reporting, books and other suitable references."
      },
      {
        "title": "Neutral drafting",
        "copy": "Write a clear article based on what the sources actually say."
      },
      {
        "title": "Citation review",
        "copy": "Connect each important statement to a suitable reference."
      },
      {
        "title": "Submission support",
        "copy": "Disclose paid involvement and respond to editorial feedback."
      },
      {
        "title": "Early monitoring",
        "copy": "Watch for reviewer questions and initial article changes."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Wikipedia Page Creation",
    "faqs": [
      {
        "q": "Can you guarantee that my Wikipedia page will be published?",
        "a": "No. Wikipedia editors decide whether a draft meets the rules. Our work focuses on research, accuracy and a transparent submission process."
      },
      {
        "q": "What sources do I need for a Wikipedia article?",
        "a": "Significant coverage in reliable sources that are independent of the subject is usually central. Your own website and press releases are generally not enough."
      },
      {
        "q": "How long does Wikipedia page creation take?",
        "a": "Research and drafting timelines depend on source quality and project scope. Wikipedia review time is outside our control."
      },
      {
        "q": "Can I approve every word before publication?",
        "a": "You can check factual accuracy and provide source material, but the final text must remain neutral and comply with Wikipedia policies."
      }
    ]
  },
  "wikipedia-page-editing": {
    "meta": {
      "title": "Wikipedia Page Editing Services",
      "description": "Improve an existing Wikipedia article with stronger sources, factual corrections and neutral writing. Explore professional Wikipedia page editing services.",
      "keywords": "wikipedia page editing services, edit wikipedia page, wikipedia article correction, wikipedia page expansion, wikipedia citations"
    },
    "hero": {
      "title": "Wikipedia Page Editing Services",
      "highlight": "for Accurate Articles",
      "lede": "Is your article outdated, too short or missing important sources? We review what can be improved and propose changes that follow Wikipedia rules.",
      "checks": [
        "Source based corrections",
        "Balanced article expansion",
        "Transparent editorial requests"
      ]
    },
    "overview": {
      "title": "What Professional Wikipedia Page Editing",
      "highlight": "Includes",
      "lead": "Wikipedia articles can become outdated or develop weak sourcing over time.",
      "body": "Editing is not about removing every critical fact or making an article sound more positive. We identify verifiable errors, gaps and unclear passages, then prepare specific improvements backed by reliable references.",
      "whoFor": [
        "Articles with outdated career or company facts",
        "Pages carrying citation or neutrality tags",
        "Short articles missing significant sourced developments",
        "Biographies needing careful factual corrections"
      ]
    },
    "includes": [
      {
        "title": "Article audit",
        "copy": "Review structure, citations, tone and maintenance notices."
      },
      {
        "title": "Fact checking",
        "copy": "Compare disputed or outdated statements with strong sources."
      },
      {
        "title": "Source upgrades",
        "copy": "Replace weak references where better evidence is available."
      },
      {
        "title": "Balanced expansion",
        "copy": "Add important developments without promotional language."
      },
      {
        "title": "Edit requests",
        "copy": "Use appropriate disclosed editing or discussion channels."
      },
      {
        "title": "Follow through",
        "copy": "Review editor feedback and refine proposed changes."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Wikipedia Page Editing and Expansion",
    "faqs": [
      {
        "q": "Can you remove negative information from Wikipedia?",
        "a": "Not simply because it is negative. We can challenge inaccurate or poorly sourced claims through the proper editorial process."
      },
      {
        "q": "Can a business edit its own Wikipedia page?",
        "a": "Editors with a conflict of interest should disclose their relationship and use appropriate requests or discussion channels."
      },
      {
        "q": "What if my Wikipedia page has a warning tag?",
        "a": "We assess the underlying issue, such as poor sourcing or promotional tone, and recommend specific corrections."
      },
      {
        "q": "Will edits appear immediately?",
        "a": "Not always. Other editors may review, revise or decline changes, especially on sensitive or protected pages."
      }
    ]
  },
  "wikipedia-content-writing": {
    "meta": {
      "title": "Wikipedia Content Writing Services",
      "description": "Research led Wikipedia content writing with neutral language, verified claims and reliable citations. Get a clear editorial scope before drafting.",
      "keywords": "wikipedia content writing services, wikipedia article writing, wikipedia research services, encyclopedic writing, wikipedia source research"
    },
    "hero": {
      "title": "Wikipedia Content Writing Services",
      "highlight": "Grounded in Evidence",
      "lede": "Turn complex source material into clear encyclopedic content. Our team researches the subject, checks each claim and writes for readers rather than promotion.",
      "checks": [
        "Independent source discovery",
        "Clear and neutral writing",
        "Claim by claim citation checks"
      ]
    },
    "overview": {
      "title": "What Wikipedia Content Writing",
      "highlight": "Really Requires",
      "lead": "A strong Wikipedia draft is built from published evidence.",
      "body": "It should explain the subject in plain language, give the right context and avoid claims that sources do not support. Our researchers organize the material before writing, so every section has a reason to exist.",
      "whoFor": [
        "Academics with complex research histories",
        "Authors with independently reviewed work",
        "Companies with substantial third party reporting",
        "Existing articles needing researched new sections"
      ]
    },
    "includes": [
      {
        "title": "Research brief",
        "copy": "Define the topic and identify questions readers need answered."
      },
      {
        "title": "Source grading",
        "copy": "Check independence, reliability and depth of coverage."
      },
      {
        "title": "Article outline",
        "copy": "Organize important facts in a standard encyclopedic structure."
      },
      {
        "title": "Neutral writing",
        "copy": "Explain facts without sales claims or exaggerated language."
      },
      {
        "title": "Reference mapping",
        "copy": "Attach citations to statements that need verification."
      },
      {
        "title": "Editorial review",
        "copy": "Check accuracy, tone and close paraphrasing risks."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Wikipedia Content Writing and Research",
    "faqs": [
      {
        "q": "Is Wikipedia content writing the same as SEO copywriting?",
        "a": "No. Wikipedia articles are encyclopedic and cannot be written as advertising or to control search rankings."
      },
      {
        "q": "Can you write from my biography or company website?",
        "a": "Those materials can help identify facts, but independent reliable sources are needed for many important claims and notability."
      },
      {
        "q": "Do you provide the source list?",
        "a": "Our stated editorial process includes source research and a graded source dossier as part of scoped engagements."
      },
      {
        "q": "Does a finished draft guarantee a live article?",
        "a": "No. A draft still needs to meet Wikipedia rules and may be reviewed or changed by volunteer editors."
      }
    ]
  },
  "wikipedia-page-management": {
    "meta": {
      "title": "Wikipedia Page Management Services",
      "description": "Keep a live Wikipedia article accurate with source reviews, factual updates and disclosed editorial support. Explore Wikipedia page management services.",
      "keywords": "wikipedia page management services, wikipedia page maintenance, manage wikipedia article, wikipedia updates, wikipedia editorial support"
    },
    "hero": {
      "title": "Wikipedia Page Management Services",
      "highlight": "for Live Articles",
      "lede": "A published Wikipedia page can change at any time. We help you track meaningful changes, review new sources and request accurate updates through the right channels.",
      "checks": [
        "Ongoing source and article reviews",
        "Careful factual update requests",
        "Support with editorial issues"
      ]
    },
    "overview": {
      "title": "What Ongoing Wikipedia Management",
      "highlight": "Means",
      "lead": "No agency owns a Wikipedia article.",
      "body": "Other contributors can edit it, and some changes may be valid even when the subject disagrees. Our role is to help identify errors, monitor new developments and propose sourced updates while respecting community decisions.",
      "whoFor": [
        "Public figures with changing roles or appointments",
        "Organizations with important independently reported milestones",
        "Articles with recurring sourcing issues",
        "Teams needing a consistent review process"
      ]
    },
    "includes": [
      {
        "title": "Baseline audit",
        "copy": "Document the current article and known editorial concerns."
      },
      {
        "title": "Watchlist setup",
        "copy": "Track meaningful changes and new discussion activity."
      },
      {
        "title": "Source review",
        "copy": "Assess newly published independent coverage."
      },
      {
        "title": "Update planning",
        "copy": "Prioritize changes that improve factual accuracy."
      },
      {
        "title": "Disclosed requests",
        "copy": "Propose edits through suitable Wikipedia channels."
      },
      {
        "title": "Periodic reporting",
        "copy": "Summarize activity, issues and next steps."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Ongoing Wikipedia Page Management",
    "faqs": [
      {
        "q": "Can you stop other people from editing my page?",
        "a": "No. Wikipedia is a collaborative encyclopedia and articles are not controlled by the subject or an agency."
      },
      {
        "q": "What updates can be added?",
        "a": "Relevant facts supported by reliable sources may be suitable. Routine promotions and unsourced announcements often are not."
      },
      {
        "q": "How is page management different from monitoring?",
        "a": "Management includes planning and requesting updates. Monitoring focuses more narrowly on detecting changes and alerting you to issues."
      },
      {
        "q": "Can you guarantee that changes will stay live?",
        "a": "No. Wikipedia editors can revise or remove material under the site policies."
      }
    ]
  },
  "wikipedia-reputation-management": {
    "meta": {
      "title": "Reputation and Entity Building",
      "description": "Improve factual consistency across Wikipedia, Wikidata and other knowledge sources with referenced entity research and careful editorial guidance.",
      "keywords": "reputation and entity building services, wikidata entity management, online entity consistency, knowledge graph information, reputation research"
    },
    "hero": {
      "title": "Reputation and Entity Building",
      "highlight": "Based on Verified Facts",
      "lede": "Make it easier for people and knowledge platforms to find consistent information about your subject. We review names, identifiers and public records for accuracy.",
      "checks": [
        "Entity and identifier audits",
        "Referenced data consistency",
        "Policy aware recommendations"
      ]
    },
    "overview": {
      "title": "What Entity Building",
      "highlight": "Can and Cannot Do",
      "lead": "Online knowledge systems draw from many sources.",
      "body": "Conflicting names, dates and identifiers can create confusion. We assess public information and recommend factual corrections where platforms allow them. This is not a promise to change search results or suppress accurate criticism.",
      "whoFor": [
        "Authors with multiple name variations",
        "Organizations with inconsistent public identifiers",
        "Academics with fragmented public records",
        "Public figures with conflicting biographical details"
      ]
    },
    "includes": [
      {
        "title": "Entity audit",
        "copy": "Review key facts across relevant public knowledge sources."
      },
      {
        "title": "Identity mapping",
        "copy": "Check names, official identifiers and source relationships."
      },
      {
        "title": "Evidence review",
        "copy": "Find reliable references for proposed corrections."
      },
      {
        "title": "Wikidata review",
        "copy": "Assess statements and references where applicable."
      },
      {
        "title": "Correction plan",
        "copy": "Recommend platform appropriate factual updates."
      },
      {
        "title": "Consistency check",
        "copy": "Revisit the public record for remaining contradictions."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Reputation and Entity Building",
    "faqs": [
      {
        "q": "Is entity building the same as reputation management?",
        "a": "It focuses on accurate, consistent public facts rather than controlling opinions or removing legitimate reporting."
      },
      {
        "q": "Can you create a Wikidata item for anyone?",
        "a": "Wikidata has its own notability and sourcing expectations. Not every person or organization qualifies."
      },
      {
        "q": "Will this make a Google Knowledge Panel appear?",
        "a": "No. Google determines whether and when a Knowledge Panel appears."
      },
      {
        "q": "Can you correct conflicting dates or names online?",
        "a": "We can investigate the evidence and recommend corrections through channels supported by each platform."
      }
    ]
  },
  "wikipedia-notability-assessment": {
    "meta": {
      "title": "Wikipedia Notability Assessment",
      "description": "Find out whether independent coverage supports a Wikipedia article. Get a research led Wikipedia notability assessment before paying for drafting.",
      "keywords": "wikipedia notability assessment, wikipedia eligibility check, qualify for wikipedia page, wikipedia notability guidelines, wikipedia source audit"
    },
    "hero": {
      "title": "Wikipedia Notability Assessment",
      "highlight": "Before You Write",
      "lede": "Wondering whether you qualify for Wikipedia? We check independent coverage, explain the evidence and help you decide whether an article is realistic.",
      "checks": [
        "Independent coverage review",
        "Clear eligibility findings",
        "Practical next step recommendations"
      ]
    },
    "overview": {
      "title": "What a Wikipedia Notability Assessment",
      "highlight": "Reveals",
      "lead": "Having a strong career or a popular brand does not automatically qualify someone for Wikipedia.",
      "body": "The key question is whether reliable independent sources have covered the subject in enough depth. We review the available evidence and explain where it is strong or missing.",
      "whoFor": [
        "Founders considering a first article",
        "Academics with awards and published research",
        "Authors with book reviews and media coverage",
        "Organizations deciding whether to commission a draft"
      ]
    },
    "includes": [
      {
        "title": "Subject review",
        "copy": "Identify the applicable general or subject specific guidelines."
      },
      {
        "title": "Independent search",
        "copy": "Look beyond links supplied by the subject."
      },
      {
        "title": "Source grading",
        "copy": "Assess reliability, independence and depth."
      },
      {
        "title": "Coverage mapping",
        "copy": "Compare source evidence with notability requirements."
      },
      {
        "title": "Written findings",
        "copy": "Explain strengths, gaps and material risks."
      },
      {
        "title": "Next step advice",
        "copy": "Recommend proceeding, waiting or not commissioning yet."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Wikipedia Notability Assessment",
    "faqs": [
      {
        "q": "How do I know if I qualify for Wikipedia?",
        "a": "Look for significant coverage in reliable independent sources. An assessment can help organize and evaluate that evidence."
      },
      {
        "q": "Are awards or a senior job title enough?",
        "a": "Not always. Some subject specific guidelines consider certain achievements, but a title alone does not establish eligibility."
      },
      {
        "q": "Do press releases count as independent coverage?",
        "a": "Press releases and material written by or for the subject generally do not establish independent coverage."
      },
      {
        "q": "What if I do not qualify yet?",
        "a": "We explain the gaps and recommend waiting rather than commissioning an unsupported article."
      }
    ]
  },
  "google-knowledge-panel-creation": {
    "meta": {
      "title": "Google Knowledge Panel Services",
      "description": "Review entity facts, identifiers and source consistency with Google Knowledge Panel services. No panel appearance or timing is guaranteed.",
      "keywords": "google knowledge panel services, google knowledge panel support, google entity information, wikidata consistency, knowledge panel audit"
    },
    "hero": {
      "title": "Google Knowledge Panel Services",
      "highlight": "Focused on Accurate Data",
      "lede": "A Knowledge Panel can help people understand a subject at a glance. We review the public facts and identifiers that knowledge systems may use.",
      "checks": [
        "Public entity data audit",
        "Consistent names and identifiers",
        "Evidence based correction guidance"
      ]
    },
    "overview": {
      "title": "What Google Knowledge Panel Support",
      "highlight": "Involves",
      "lead": "Google creates Knowledge Panels automatically from information it finds across the web.",
      "body": "A consultant cannot order or guarantee one. Our work focuses on finding contradictions, reviewing reliable sources and improving eligible public records where changes are allowed.",
      "whoFor": [
        "Organizations with inconsistent public profiles",
        "Authors with name or identity confusion",
        "Public figures with outdated factual details",
        "Institutions reviewing their online knowledge records"
      ]
    },
    "includes": [
      {
        "title": "Search review",
        "copy": "Check current public search and entity information."
      },
      {
        "title": "Source verification",
        "copy": "Confirm key facts against reliable public references."
      },
      {
        "title": "Identifier audit",
        "copy": "Review names, links and recognized identifiers."
      },
      {
        "title": "Knowledge record review",
        "copy": "Check relevant Wikipedia and Wikidata data."
      },
      {
        "title": "Correction guidance",
        "copy": "Recommend permitted changes to inconsistent records."
      },
      {
        "title": "Follow up review",
        "copy": "Check whether factual inconsistencies remain."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Google Knowledge Panel Services",
    "faqs": [
      {
        "q": "Can you guarantee a Google Knowledge Panel?",
        "a": "No. Google decides when a Knowledge Panel appears and what information it displays."
      },
      {
        "q": "Do I need a Wikipedia page first?",
        "a": "Not necessarily. Google uses multiple sources and does not require every subject to have a Wikipedia article."
      },
      {
        "q": "Can you fix incorrect facts in a panel?",
        "a": "We can investigate sources and suggest appropriate correction or feedback routes, but Google controls the final display."
      },
      {
        "q": "How long does a Knowledge Panel take to appear?",
        "a": "There is no reliable guaranteed timeline because Google controls its systems and updates."
      }
    ]
  },
  "wikipedia-page-monitoring": {
    "meta": {
      "title": "Wikipedia Page Monitoring Services",
      "description": "Track Wikipedia article changes, detect possible vandalism and review sourcing concerns with professional Wikipedia page monitoring services.",
      "keywords": "wikipedia page monitoring services, monitor wikipedia page, wikipedia vandalism monitoring, wikipedia edit alerts, wikipedia article watchlist"
    },
    "hero": {
      "title": "Wikipedia Page Monitoring Services",
      "highlight": "That Track Changes",
      "lede": "Know when important edits happen to a live Wikipedia article. We review changes, flag possible errors and help you respond through proper editorial channels.",
      "checks": [
        "Article change tracking",
        "Vandalism and sourcing review",
        "Clear alerts and issue summaries"
      ]
    },
    "overview": {
      "title": "What Wikipedia Page Monitoring",
      "highlight": "Covers",
      "lead": "Wikipedia articles are open to community editing.",
      "body": "Some changes improve the article; others may introduce errors or vandalism. Monitoring helps distinguish routine edits from changes that deserve closer review, without treating every unwanted edit as a problem.",
      "whoFor": [
        "Biographies with frequent edits",
        "Organizations with high public visibility",
        "Articles that have experienced vandalism",
        "Teams that need timely awareness of changes"
      ]
    },
    "includes": [
      {
        "title": "Article baseline",
        "copy": "Record the current page and areas that need attention."
      },
      {
        "title": "Change tracking",
        "copy": "Review new edits and relevant discussion activity."
      },
      {
        "title": "Issue classification",
        "copy": "Separate normal edits from possible vandalism or errors."
      },
      {
        "title": "Evidence check",
        "copy": "Compare concerning changes with reliable sources."
      },
      {
        "title": "Response guidance",
        "copy": "Flag clear issues or recommend appropriate edit requests."
      },
      {
        "title": "Status summaries",
        "copy": "Report meaningful activity and unresolved concerns."
      }
    ],
    "steps": [
      {
        "title": "Assess",
        "copy": "Review your goals, available sources and relevant policy requirements."
      },
      {
        "title": "Agree Scope",
        "copy": "Confirm the deliverables, responsibilities and price before work begins."
      },
      {
        "title": "Research and Verify",
        "copy": "Check evidence, prepare the work and complete an editorial review."
      },
      {
        "title": "Request or Submit",
        "copy": "Use suitable disclosed channels and address relevant feedback."
      },
      {
        "title": "Monitor",
        "copy": "Review outcomes and provide support within the agreed scope."
      }
    ],
    "faqName": "Wikipedia Page Monitoring",
    "faqs": [
      {
        "q": "What is Wikipedia page monitoring?",
        "a": "It is the ongoing review of article changes to identify vandalism, factual errors and important editorial developments."
      },
      {
        "q": "Can you remove every edit I dislike?",
        "a": "No. Good faith edits supported by reliable sources may remain even if the subject disagrees."
      },
      {
        "q": "Is monitoring different from page management?",
        "a": "Yes. Monitoring primarily detects and reviews changes. Management may also involve planned sourced updates."
      },
      {
        "q": "Can monitoring prevent vandalism completely?",
        "a": "No. It can help identify issues and support an appropriate response, but it cannot prevent all edits."
      }
    ]
  }
};
