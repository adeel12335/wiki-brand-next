import type { Metadata } from "next";
import {
  PersonaPageView,
  buildPersonaMetadata,
  personaPages,
} from "@/lib/data/persona-pages";

const page = personaPages[3];

export const metadata: Metadata = buildPersonaMetadata(page);

export default function Page() {
  return <PersonaPageView page={page} />;
}
