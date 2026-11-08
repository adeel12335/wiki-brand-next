import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThankYouHero } from "@/components/sections/thank-you/ThankYouHero";
import { InfoCardsSection } from "@/components/sections/about/InfoCards";
import { thankYouContent } from "@/content/thank-you";
import { buildPageMetadata } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

const pageMeta = {
  slug: "thank-you",
  title: "Thank You",
  shortTitle: "Thank You",
  description: "Your enquiry was received. An editor will review your coverage and reply shortly.",
  robots: "noindex, follow",
  ogImage: "/assets/og/globe.jpg",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default function ThankYouPage() {
  const w = thankYouContent.wait;
  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="thank-you">
        <ThankYouHero />
      </EditableHero>
      <InfoCardsSection heading={{ eyebrow: w.eyebrow, title: w.title, highlight: w.highlight, aside: w.aside }} cards={w.cards} />
    </>
  );
}
