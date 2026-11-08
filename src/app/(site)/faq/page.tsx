import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/module/ContactForm";
import { FaqLibrary } from "@/components/sections/faq/FaqLibrary";
import { faqContent } from "@/content/faq";
import { buildPageMetadata, faqNode } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "faq",
  title: "Wikipedia Service FAQ",
  shortTitle: "FAQ",
  breadcrumbName: "FAQ",
  description:
    "Straight answers on Wikipedia notability, publication timelines, paid-editing disclosure, page approval, and ongoing maintenance.",
  keywords:
    "wikipedia faq, wikipedia notability guidelines, wikipedia paid editing disclosure, how long wikipedia page approval, wikipedia page requirements, wikipedia resources",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
  ogImageAlt: "Wikipedia FAQ and resources from The Wikipedia Studio",
  schema: [faqNode(faqContent.groups.flatMap((g) => g.items), "faq")],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function FaqPage() {
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="faq">
        <FaqLibrary />
      </EditableHero>
      <ContactSection heading={faqContent.contact} />
    </>
  );
}
