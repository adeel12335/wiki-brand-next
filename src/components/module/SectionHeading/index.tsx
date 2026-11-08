import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  /** Small label + globe mark above the heading. Omit to show the heading alone. */
  eyebrow?: string;
  /** First heading line. */
  title: React.ReactNode;
  /** Second line, rendered in gold. */
  highlight?: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}

/** Figma: Section Heading - Eyebrow + 2-line heading (2nd line gold) + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  lede,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-col gap-4", center ? "mx-auto items-center text-center" : "items-start", "measure", className)} data-aos="fade-up">
      {eyebrow ? (
        <Eyebrow tone={tone} align={align}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag className={cn(Tag === "h1" ? "h1" : "h2", tone === "dark" && "text-white")}>
        {title}
        {highlight ? (
          <>
            <br />
            <span className="text-gold">{highlight}</span>
          </>
        ) : null}
      </Tag>
      {lede ? <p className={cn("lede max-w-[640px]", tone === "dark" ? "text-on-dark-muted" : "text-body")}>{lede}</p> : null}
    </div>
  );
}
