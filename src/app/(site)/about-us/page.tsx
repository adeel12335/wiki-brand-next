import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroImage } from "@/components/hero/HeroImage";
import { Testimonials } from "@/components/module/Testimonials";
import { ContactSection } from "@/components/module/ContactForm";
import { AboutEngagement, AboutPrinciples, AboutStats, AboutStory, AboutTeam } from "@/components/sections/about/AboutSections";
import { InfoCardsSection } from "@/components/sections/about/InfoCards";
import { aboutContent } from "@/content/about";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, seoId } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "about-us",
  title: "About The Wikipedia Studio | Wikipedia Editorial Agency",
  shortTitle: "About Us",
  description:
    "Meet The Wikipedia Studio, a professional Wikipedia editorial agency focused on independent research, accurate writing, source verification, and transparent editing.",
  keywords:
    "wikipedia editorial agency, wikipedia writing agency, wikipedia experts, professional wikipedia editors, wikipedia research team, wikipedia editorial services",
  ogImage: "/assets/og/globe.jpg",
  ogImageAlt: "About The Wikipedia Studio",
  schema: [
    {
      "@type": "AboutPage",
      "@id": `${absUrl("about-us")}#aboutpage`,
      url: absUrl("about-us"),
      name: "About The Wikipedia Studio",
      mainEntity: { "@id": seoId("organization") },
    },
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function AboutPage() {
  const h = aboutContent.hero;
  const t = aboutContent.testimonials;
  const m = aboutContent.mission;

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="about-us">
        <HeroImage
          title={h.title}
          highlight={h.highlight}
          titleClassName="lg:text-[54px]"
          lede={h.lede}
          actions={h.actions}
          image={h.image}
        />
      </EditableHero>
      <AboutStory />
      <AboutStats />
      <AboutEngagement />
      <AboutPrinciples />
      <AboutTeam />
      <Testimonials heading={{ title: t.title, highlight: t.highlight, lede: t.lede }} items={t.items} />
      <InfoCardsSection heading={{ title: m.title, highlight: m.highlight, aside: m.aside }} cards={m.cards} />
      <ContactSection heading={aboutContent.contact} submitLabel={aboutContent.contact.submitLabel} />
    </>
  );
}
