import type { Metadata } from "next";
import {
  SEO_DEFAULT_OG_IMAGE,
  SEO_DEFAULT_ROBOTS,
  SITE_LANG,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TWITTER,
  absUrl,
  assetUrl,
  getSiteUrl,
  metaTrim,
} from "@/lib/config";
import type { PageMeta } from "@/types";

export function seoId(fragment: string): string {
  return `${getSiteUrl()}/#${fragment}`;
}

export function buildPageMetadata(page: PageMeta): Metadata {
  const slug = page.slug ?? "";
  const title = page.title;
  const description = metaTrim(page.description, 160);
  const canonical = absUrl(slug);
  const imagePath = page.ogImage ?? SEO_DEFAULT_OG_IMAGE;
  const imageUrl = imagePath.startsWith("http") ? imagePath : assetUrl(imagePath.replace(/^\//, ""));

  return {
    title,
    description,
    keywords: page.keywords?.split(",").map((k) => k.trim()),
    authors: [{ name: SITE_NAME }],
    publisher: SITE_NAME,
    robots: page.robots ?? SEO_DEFAULT_ROBOTS,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: canonical,
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: page.ogImageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      title,
      description,
      images: [imageUrl],
    },
    other: page.keywords ? { keywords: page.keywords } : undefined,
  };
}

export function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": seoId("organization"),
    name: SITE_NAME,
    alternateName: "Wikipedia Studio",
    url: absUrl(),
    description:
      "Professional Wikipedia editorial agency providing page creation, editing, research, and ongoing management for individuals, businesses, and organisations.",
    email: "hello@thewikipediastudio.com",
    telephone: "+18004537801",
    logo: {
      "@type": "ImageObject",
      "@id": seoId("logo"),
      url: assetUrl("assets/globe.png"),
      width: 729,
      height: 603,
      caption: SITE_NAME,
    },
    image: { "@id": seoId("logo") },
    areaServed: { "@type": "Place", name: "Worldwide" },
    knowsAbout: [
      "Wikipedia page creation",
      "Wikipedia editing guidelines",
      "Notability assessment",
      "Neutral point of view writing",
      "Citation and source verification",
      "Wikidata and structured entity data",
      "Online reputation management",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@thewikipediastudio.com",
        telephone: "+18004537801",
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": seoId("website"),
    url: absUrl(),
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { "@id": seoId("organization") },
    inLanguage: SITE_LANG,
  };
}

export function webpageNode(page: PageMeta, imageUrl: string) {
  const url = absUrl(page.slug);
  const node: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: metaTrim(page.description, 160),
    isPartOf: { "@id": seoId("website") },
    about: { "@id": seoId("organization") },
    inLanguage: SITE_LANG,
    primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
  };

  if (page.breadcrumbs?.length) {
    node.breadcrumb = { "@id": `${url}#breadcrumb` };
  }

  if (page.modified) {
    node.dateModified = page.modified;
  }

  return node;
}

export function breadcrumbNode(
  breadcrumbs: Array<{ label: string; slug: string }>,
  currentName: string,
  currentSlug: string,
) {
  const trail = [{ label: "Home", slug: "" }, ...breadcrumbs];
  const items = trail.map((crumb, position) => ({
    "@type": "ListItem",
    position: position + 1,
    name: crumb.label,
    item: absUrl(crumb.slug),
  }));

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: currentName,
    item: absUrl(currentSlug),
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${absUrl(currentSlug)}#breadcrumb`,
    itemListElement: items,
  };
}

export function itemListNode(
  slug: string,
  name: string,
  items: Array<{ name: string; url?: string; description?: string }>,
) {
  return {
    "@type": "ItemList",
    "@id": `${absUrl(slug)}#itemlist`,
    name,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, position) => ({
      "@type": "ListItem",
      position: position + 1,
      name: item.name,
      ...(item.url ? { url: item.url } : {}),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function faqNode(items: Array<{ q: string; a: string }>, slug: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absUrl(slug)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceNode(
  slug: string,
  service: {
    name: string;
    meta_desc: string;
    deliverables: Array<{ title: string; copy: string }>;
  },
) {
  const serviceUrl = absUrl(`services/${slug}`);

  return {
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: service.name,
    url: serviceUrl,
    description: service.meta_desc,
    serviceType: service.name,
    category: "Wikipedia editorial services",
    provider: { "@id": seoId("organization") },
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: {
      "@type": "Audience",
      audienceType: "Individuals, businesses, and organisations",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.copy,
        },
      })),
    },
  };
}

export function buildJsonLd(page: PageMeta): Record<string, unknown> {
  const imagePath = page.ogImage ?? SEO_DEFAULT_OG_IMAGE;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : assetUrl(imagePath.replace(/^\//, ""));

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    webpageNode(page, imageUrl),
  ];

  if (page.breadcrumbs?.length) {
    graph.push(
      breadcrumbNode(
        page.breadcrumbs,
        page.breadcrumbName ?? page.shortTitle ?? page.title,
        page.slug,
      ),
    );
  }

  if (page.schema?.length) {
    graph.push(...page.schema);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
