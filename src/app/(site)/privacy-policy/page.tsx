import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalTemplate } from "@/components/sections/legal/LegalTemplate";
import { privacyPolicy } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  shortTitle: "Privacy Policy",
  description:
    "Learn how The Wikipedia Studio collects, uses, stores, and protects your personal information when you use our website and editorial services.",
  keywords: "the wikipedia studio privacy policy, privacy policy, data protection, personal information",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "Privacy Policy, The Wikipedia Studio",
  modified: "2026-10-02",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="privacy-policy">
        <LegalTemplate doc={privacyPolicy} />
      </EditableHero>
    </>
  );
}
