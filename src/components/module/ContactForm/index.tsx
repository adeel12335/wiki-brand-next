import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading, type SectionHeadingProps } from "@/components/module/SectionHeading";
import { ContactForm } from "./ContactForm";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_RAW } from "@/lib/config";

export { ContactForm };

const DIRECT_LINES: Array<{ icon: IconName; label: string; value: string; href?: string }> = [
  { icon: "mail", label: "Email", value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
  { icon: "phone", label: "Phone", value: SITE_PHONE, href: `tel:${SITE_PHONE_RAW}` },
  { icon: "clock", label: "Reply time", value: "Within one business day" },
];

interface ContactSectionProps {
  heading?: Pick<SectionHeadingProps, "eyebrow" | "title" | "highlight" | "lede">;
  /** Submit button text (default "Send Message"). */
  submitLabel?: string;
}

/** Figma: Contact Section - mist inset, centred heading, ink info panel + form card. Used on 17 pages. */
export function ContactSection({
  submitLabel,
  heading = {
    eyebrow: "Get in Touch",
    title: "Ready to Talk",
    highlight: "With an Editor?",
    lede: "Tell us about the subject and the coverage you have. You will get an honest, written view, whatever the answer.",
  },
}: ContactSectionProps) {
  return (
    <section className="bg-white px-3 pt-6 pb-10 md:px-10" id="contact">
      <div className="flex flex-col items-center gap-10 rounded-[32px] bg-mist px-4 py-14 md:gap-14 md:px-20 md:py-26">
        <SectionHeading {...heading} align="center" />
        <div className="grid w-full max-w-[1200px] overflow-hidden rounded-3xl border border-heading/10 bg-white lg:grid-cols-[400px_1fr]" data-aos="fade-up">
          <aside className="flex flex-col gap-8 bg-ink p-7 md:p-11">
            <div className="flex flex-col gap-3.5">
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">Talk to an editor</p>
              <p className="text-2xl leading-tight font-bold text-white md:text-[28px]">Real editors, not a sales team.</p>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">Every enquiry is read by someone who works on Wikipedia articles every day.</p>
            </div>
            <ul className="flex flex-col gap-5">
              {DIRECT_LINES.map((line) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/45 bg-ink-raised text-gold">
                      <Icon name={line.icon} size={18} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-on-dark-muted">{line.label}</span>
                      <span className="text-[15px] font-bold text-white">{line.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={line.label}>
                    {line.href ? (
                      <a href={line.href} className="flex items-center gap-3.5 transition-opacity hover:opacity-85">
                        {body}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3.5">{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-auto flex items-center gap-2.5 border-t border-on-dark/14 pt-5 text-[13px] font-semibold text-on-dark">
              <Icon name="shield" size={18} className="text-gold" />
              Confidential. Never shared or sold.
            </p>
          </aside>
          <div className="p-6 md:px-14 md:py-12">
            <ContactForm submitLabel={submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
