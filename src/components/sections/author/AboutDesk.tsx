import { SectionHeading } from "@/components/module/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { authorContent } from "@/content/author";

/** Figma: Author → About the desk (heading, copy, expertise rows + cream "Editorial standards" card). */
export function AboutDesk() {
  const c = authorContent.about;
  return (
    <section className="section bg-white">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,680px)_440px] lg:justify-between lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} />
          <p className="text-base leading-relaxed text-body md:text-[17px]" data-aos="fade-up">
            {c.copy}
          </p>
          <ul className="flex flex-col border-t border-heading/10" data-aos="fade-up">
            {c.expertise.map((item) => (
              <li key={item.title} className="flex items-center gap-4 border-b border-heading/10 py-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-gold/12 text-gold-dark">
                  <Icon name={item.icon} size={19} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-heading">{item.title}</span>
                  <span className="text-sm text-body">{item.copy}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="self-start rounded-[28px] bg-cream px-6 pt-9 pb-5 md:px-8" data-aos="fade-up" data-aos-delay="100">
          <p className="mb-3.5 text-[11px] font-bold tracking-[0.16em] text-gold-dark uppercase">{c.standards.title}</p>
          <ol>
            {c.standards.items.map((item, i) => (
              <li key={item.title} className={`flex gap-4 py-4.5 ${i < c.standards.items.length - 1 ? "border-b border-heading/10" : ""}`}>
                <span className="text-[15px] font-bold text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-bold text-heading">{item.title}</span>
                  <span className="text-sm leading-relaxed text-body">{item.copy}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
