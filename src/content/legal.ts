/**
 * Legal pages (Figma "Privacy Policy (Legal) - Final" 176:1402, shared by Privacy Policy and Terms & Conditions).
 * Full legal wording carried over from the previous site.
 *
 * Inline markup in paragraphs / list items:
 *   **bold**            → <strong>
 *   [label](https://…)  → link (external links open in a new tab)
 *   {email}             → mailto link to the site email
 *   {site}              → site name
 */

export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  key: "privacy" | "terms";
  href: string;
  tabLabel: string;
  title: string;
  /** Word of the title rendered in gold. */
  highlight: string;
  lede: string;
  updated: string;
  readTime: string;
  /** Contact address for this document (defaults to SITE_EMAIL). */
  email?: string;
  summary: string;
  contactTitle: string;
  contactCopy: string;
  /** Optional CTA in the closing contact card (defaults to legalUi.contactCta). */
  contactCta?: { label: string; href: string };
  sections: LegalSection[];
}

export const legalUi = {
  contents: "Contents",
  inShort: "In short",
  contactCta: { label: "Contact Us", href: "/contact/" },
};

/**
 * Privacy Policy copy - source: "Wiki_Studio_Four_Pages_SEO_Content.docx".
 * TODO(content): confirm actual collection, analytics, cookies, processors, retention, applicable rights,
 * the effective date and the privacy email before publishing (publication note in the docx).
 */
export const privacyPolicy: LegalDoc = {
  key: "privacy",
  href: "/privacy-policy/",
  tabLabel: "Privacy Policy",
  title: "Privacy",
  highlight: "Policy",
  lede: "Learn how The Wikipedia Studio handles the information you share with us, how we use it, and the choices available to you.",
  updated: "Last updated: October 2, 2026",
  readTime: "3 min read",
  email: "privacy@thewikipediastudio.com",
  summary: "We collect information needed to respond to enquiries and provide our services. We handle personal data with care and explain how it is used.",
  contactTitle: "Questions About Your Privacy?",
  contactCopy: "Contact us for information about your personal data and our privacy practices.",
  contactCta: { label: "Send an Enquiry", href: "/contact/" },
  sections: [
    {
      id: "what-we-collect",
      title: "What We Collect",
      blocks: [
        {
          type: "p",
          text: "When you contact The Wikipedia Studio, we may collect your name, email address, phone number, company or subject name, and information you provide through our forms. We may also collect basic website usage data, such as browser type, device information, and pages visited.",
        },
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      blocks: [
        {
          type: "p",
          text: "We use your information to respond to enquiries, assess service requests, prepare proposals, communicate about projects, and provide editorial support. Website usage data may help us maintain security and improve the visitor experience.",
        },
      ],
    },
    {
      id: "how-long",
      title: "How Long We Keep Information",
      blocks: [
        {
          type: "p",
          text: "We retain personal information only for as long as needed for the purposes described in this policy, including service delivery, record keeping, and applicable legal obligations. You may contact us to ask about the information we hold.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Who We Share Information With",
      blocks: [
        {
          type: "p",
          text: "We may share relevant information with service providers who help us operate our website and deliver our services. Information may also be disclosed when required by law. Our privacy practices apply to information handled through our business systems.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      blocks: [
        {
          type: "p",
          text: "Depending on your location, you may have the right to request access to your personal information, ask for corrections, request deletion, or object to certain uses. Contact our team to submit a privacy request.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have questions about this policy or how your personal information is handled, please contact our team at {email}.",
        },
      ],
    },
  ],
};

export const termsConditions: LegalDoc = {
  key: "terms",
  href: "/terms-conditions/",
  tabLabel: "Terms & Conditions",
  title: "Terms &",
  highlight: "Conditions",
  lede: "These terms cover use of this website and the basis on which we accept editorial work.",
  updated: "Last updated: October 2, 2026",
  readTime: "7 min read",
  summary: "We sell careful editorial work, never a guaranteed outcome, and we only edit Wikipedia openly and within its rules.",
  contactTitle: "Questions about these terms?",
  contactCopy: "Email {email}. We reply within one business day.",
  sections: [
    {
      id: "about-these-terms",
      title: "About these terms",
      blocks: [
        {
          type: "p",
          text: "By using this website or commissioning services from {site}, you agree to these terms. Individual engagements are also governed by the written scope and proposal we agree with you; where the two differ, the signed engagement document takes precedence.",
        },
      ],
    },
    {
      id: "our-services",
      title: "Our services",
      blocks: [
        {
          type: "p",
          text: "We provide research, writing, editing, and maintenance services relating to Wikipedia and connected knowledge platforms. Scope, deliverables, timelines, and fees are set out in writing before work begins.",
        },
      ],
    },
    {
      id: "what-we-do-not-promise",
      title: "What we do not promise",
      blocks: [
        {
          type: "ul",
          items: [
            "**No guaranteed publication or approval.** Wikipedia is maintained by independent volunteer editors. We do not control their decisions, and no agency can.",
            "**No guaranteed permanence.** Any article can be edited, tagged, merged, or nominated for deletion by the community at any time after publication.",
            "**No ownership of articles.** Content published on Wikipedia is released under the platform's open licence and belongs to the encyclopedia, not to you or to us.",
            "**No control over search results.** Rankings, knowledge panels, and AI-generated summaries are controlled by third parties.",
          ],
        },
      ],
    },
    {
      id: "compliance-disclosure",
      title: "Compliance and disclosure",
      blocks: [
        {
          type: "p",
          text: "We work within Wikipedia's policies, including [disclosure of paid contributions](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use#4._Refraining_from_Certain_Activities) as required by the Wikimedia Foundation Terms of Use. We will not accept instructions to edit covertly, to conceal a client relationship, to remove properly sourced material because it is unflattering, or to add claims that reliable sources do not support.",
        },
      ],
    },
    {
      id: "your-responsibilities",
      title: "Your responsibilities",
      blocks: [
        {
          type: "ul",
          items: [
            "Provide accurate information and be clear about anything disputed or unresolved.",
            "Hold the rights to any material you send us, including images and documents.",
            "Respond to review requests within agreed timeframes so work can progress.",
          ],
        },
      ],
    },
    {
      id: "fees-payment",
      title: "Fees and payment",
      blocks: [
        {
          type: "p",
          text: "Fees, milestones, and payment terms are set out in the engagement document. Our fees are for professional time and editorial work performed, not for a guaranteed outcome, and are payable regardless of the decisions independent Wikipedia reviewers reach.",
        },
      ],
    },
    {
      id: "revisions-cancellation",
      title: "Revisions and cancellation",
      blocks: [
        {
          type: "p",
          text: "Revision rounds included in an engagement are described in its scope. Either party may end an engagement in writing; work completed up to that point remains payable, and we will hand over the drafts and research produced.",
        },
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      blocks: [
        {
          type: "p",
          text: "We keep client engagements confidential. We identify a client or their article publicly, for example in our portfolio or case studies, only with that client's permission, and we will remove it if that permission is withdrawn. Without permission, we never name a client or their article; we may only describe the general category of work in anonymised form.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "The design, text, and images on this website belong to {site} unless stated otherwise. Research dossiers and drafts prepared for you are yours to use once fees are settled, subject to the open licence that applies to anything published on Wikipedia.",
        },
      ],
    },
    {
      id: "liability",
      title: "Liability",
      blocks: [
        {
          type: "p",
          text: "We provide our services with reasonable skill and care. To the extent permitted by law, our liability arising from an engagement is limited to the fees paid for that engagement, and we are not liable for indirect or consequential loss, including loss of profit, reputation, or search visibility.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: [
        {
          type: "p",
          text: "We may update these terms. The version published on this page at the time you commission work is the version that applies to it.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [{ type: "p", text: "Questions about these terms: {email}." }],
    },
  ],
};

export const legalDocs = [privacyPolicy, termsConditions];
