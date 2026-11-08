import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroImage } from "@/components/hero/HeroImage";
import { ContactChannels, ContactDesk, ContactNext, ReplyWindowPill } from "@/components/sections/contact/ContactSections";
import { InfoCardsSection } from "@/components/sections/about/InfoCards";
import { contactContent } from "@/content/contact";
import { SITE_NAME, absUrl } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "contact",
  title: "Contact Our Wikipedia Editors",
  shortTitle: "Contact",
  description:
    "Contact The Wikipedia Studio for a notability assessment or help with Wikipedia page creation, editing, research, and ongoing management.",
  keywords:
    "contact wikipedia studio, wikipedia consultation, wikipedia notability assessment, hire wikipedia editor, wikipedia page quote",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "Contact The Wikipedia Studio",
  schema: [
    {
      "@type": "ContactPage",
      "@id": `${absUrl("contact")}#contactpage`,
      url: absUrl("contact"),
      name: `Contact ${SITE_NAME}`,
      about: { "@id": seoId("organization") },
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ContactPage() {
  const h = contactContent.hero;
  const n = contactContent.notReady;
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="contact">
        <HeroImage layout="background" title={h.title} highlight={h.highlight} lede={h.lede} image={h.image}>
          <ReplyWindowPill />
        </HeroImage>
      </EditableHero>
      <ContactChannels />
      <ContactDesk />
      <ContactNext />
      <InfoCardsSection heading={{ eyebrow: n.eyebrow, title: n.title, highlight: n.highlight, aside: n.aside }} cards={n.cards} />
    </>
  );
}
