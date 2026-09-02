import { HtmlHeading } from "@/components/ui/PageHero";

export function SectionHeading({
  eyebrow,
  heading,
  copy,
  center = true,
}: {
  eyebrow: string;
  heading: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading${center ? " center" : ""} reveal`}>
      <p className="micro-label">{eyebrow}</p>
      <HtmlHeading html={heading} as="h2" />
      {copy ? <p className="section-heading-copy">{copy}</p> : null}
    </div>
  );
}
