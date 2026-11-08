import { SectionHeading, type SectionHeadingProps } from "@/components/module/SectionHeading";
import { TextLink } from "@/components/module/Button";
import { FaqList, type FaqEntry } from "./FaqList";

export type { FaqEntry };
export { FaqList };

interface FaqPanelProps {
  heading: Pick<SectionHeadingProps, "eyebrow" | "title" | "highlight" | "lede">;
  items: FaqEntry[];
  /** "See all questions" link; set to null to hide. */
  moreHref?: string | null;
  /** Text of that link (default "See all questions"). */
  moreLabel?: string;
  /** Optional slot rendered under the list (e.g. the CTA band in "FAQ Panel + CTA"). */
  children?: React.ReactNode;
}

/** Figma: FAQ Panel - mist inset, centred heading, divider accordion (840px), "See all questions". */
export function FaqPanel({ heading, items, moreHref = "/faq/", moreLabel = "See all questions", children }: FaqPanelProps) {
  return (
    <section className="bg-white px-3 pt-6 md:px-10">
      <div className="flex flex-col items-center gap-10 rounded-lg bg-mist px-5 py-14 md:gap-12 md:px-20 md:py-24">
        <SectionHeading {...heading} align="center" />
        <FaqList items={items} className="max-w-[840px]" />
        {moreHref ? (
          <TextLink href={moreHref} tone="light" className="text-lg font-bold text-heading">
            {moreLabel}
          </TextLink>
        ) : null}
        {children}
      </div>
    </section>
  );
}
