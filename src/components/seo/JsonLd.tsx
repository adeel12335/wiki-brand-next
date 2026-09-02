import type { PageMeta } from "@/types";
import { buildJsonLd } from "@/lib/seo";

export function JsonLd({ page }: { page: PageMeta }) {
  const data = buildJsonLd(page);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
