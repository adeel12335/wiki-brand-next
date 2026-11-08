import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalTemplate } from "@/components/sections/legal/LegalTemplate";
import { termsConditions } from "@/content/legal";
import { buildPageMetadata } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "terms-conditions",
  title: "Terms & Conditions",
  shortTitle: "Terms & Conditions",
  description:
    "Read the terms for using this website and commissioning Wikipedia editorial research, writing, editing, and management services.",
  keywords: "terms and conditions, service terms, wikipedia studio terms",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "Terms & Conditions, The Wikipedia Studio",
  modified: "2026-10-02",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function TermsPage() {
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="terms-conditions">
        <LegalTemplate doc={termsConditions} />
      </EditableHero>
    </>
  );
}
