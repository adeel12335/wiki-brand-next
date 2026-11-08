import type { PageMeta } from "@/types";
import type { PersonaPage } from "@/content/personas";
import { faqNode } from "@/lib/seo";

/** PageMeta (metadata + JSON-LD) for a persona page - same fields the previous site used. */
export function personaPageMeta(page: PersonaPage): PageMeta {
  return {
    slug: page.slug,
    title: page.meta.title,
    shortTitle: page.meta.shortTitle,
    description: page.meta.description,
    keywords: page.meta.keywords,
    modified: "2026-11-07",
    schema: [
      {
        "@type": "Service",
        name: page.meta.title,
        serviceType: "Wikipedia page creation",
        areaServed: { "@type": "Place", name: "Worldwide" },
        description: page.meta.description,
      },
      faqNode(page.faq.items, page.slug),
    ],
  };
}
