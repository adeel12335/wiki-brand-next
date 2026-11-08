import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PersonaTemplate } from "@/components/sections/persona/PersonaTemplate";
import { personaPageMeta } from "@/components/sections/persona/meta";
import { personaPages } from "@/content/personas";
import { buildPageMetadata } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const page = personaPages.musicians;
const pageMeta = personaPageMeta(page);

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function WikipediaPageForMusicians() {
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="persona-musicians">
        <PersonaTemplate page={page} />
      </EditableHero>
    </>
  );
}
