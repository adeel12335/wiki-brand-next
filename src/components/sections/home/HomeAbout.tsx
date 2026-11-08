import Image from "next/image";
import { CheckRow } from "@/components/ui/CheckRow";
import { Button } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";
import { StatsStrip } from "@/components/module/StatsStrip";
import { homeContent } from "@/content/home";

export function HomeAbout() {
  const c = homeContent.about;
  return (
    <section className="section bg-white">
      <div className="shell grid items-center gap-12 lg:grid-cols-[600px_1fr] lg:gap-20">
        <div className="flex flex-col gap-5.5">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} />
          {c.body.map((para) => (
            <p key={para.slice(0, 24)} className="text-base leading-relaxed text-body md:text-[17px]" data-aos="fade-up">
              {para}
            </p>
          ))}
          <ul className="flex flex-col gap-3" data-aos="fade-up">
            {c.checklist.map((item) => (
              <CheckRow key={item} variant="line">
                {item}
              </CheckRow>
            ))}
          </ul>
          <div data-aos="fade-up">
            <StatsStrip stats={c.stats} />
          </div>
          <Button href={c.cta.href} variant="gold" arrow className="self-start">
            {c.cta.label}
          </Button>
        </div>
        <Image src={c.image.src} alt={c.image.alt} width={520} height={481} sizes="(min-width: 1024px) 520px, 90vw" className="mx-auto h-auto w-full max-w-[520px]" data-aos="zoom-in" />
      </div>
    </section>
  );
}
