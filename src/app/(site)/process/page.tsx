import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Cta } from "@/components/module/Cta";
import { ProcessBring, ProcessHero, ProcessSteps, ProcessTimeline } from "@/components/sections/process/ProcessSections";
import { processContent } from "@/content/process";
import { absUrl } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const steps = processContent.steps.items;

const pageMeta = {
  slug: "process",
  title: processContent.seo.title,
  shortTitle: "Our Process",
  description: processContent.seo.description,
  keywords: processContent.seo.keywords,
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "The Wikipedia Studio five-step editorial process",
  schema: [
    {
      "@type": "ItemList",
      "@id": `${absUrl("process")}#process`,
      name: "The Wikipedia Studio editorial process",
      description: "The five-stage editorial process used for every Wikipedia page creation and expansion engagement.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: steps.length,
      itemListElement: steps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.title,
        description: step.copy,
        url: `${absUrl("process")}#step-${index + 1}`,
      })),
    },
    {
      "@type": "HowTo",
      "@id": `${absUrl("process")}#howto`,
      name: "How The Wikipedia Studio creates a Wikipedia page",
      description: "Five editorial stages from notability research through disclosed submission and monitoring.",
      step: steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.copy,
        url: `${absUrl("process")}#step-${index + 1}`,
      })),
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function OurProcessPage() {
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="our-process">
        <ProcessHero />
      </EditableHero>
      <ProcessSteps />
      <ProcessTimeline />
      <ProcessBring />
      <Cta {...processContent.cta} />
    </>
  );
}
