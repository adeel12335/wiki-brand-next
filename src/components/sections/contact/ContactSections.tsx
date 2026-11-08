import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/module/ContactForm";
import { SectionHeading } from "@/components/module/SectionHeading";
import { contactContent } from "@/content/contact";

/** Reply-window pill shown under the hero copy. */
export function ReplyWindowPill() {
  return (
    <p className="inline-flex items-center gap-3 self-start rounded-full border border-gold/35 bg-gold/12 py-3.5 pr-5 pl-4.5 text-[15px] font-semibold text-white">
      <Icon name="clock" size={18} className="shrink-0 text-gold" />
      {contactContent.hero.replyWindow}
    </p>
  );
}

/** Figma: Contact → Hero "Direct lines" - three channel cards, placed directly below the hero. */
export function ContactChannels() {
  return (
    <section className="bg-white pt-10 md:pt-16">
      <ul className="shell grid gap-5 lg:grid-cols-3">
        {contactContent.channels.map((ch, i) => {
          const body = (
            <>
              <span className="grid size-[52px] shrink-0 place-items-center rounded-[13px] border border-gold/40 bg-gold/14 text-gold">
                <Icon name={ch.icon} size={22} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[13px] text-on-dark-muted">{ch.label}</span>
                <span className="text-[15px] font-bold break-words text-white">{ch.value}</span>
              </span>
              {ch.href ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold-light/50 text-gold-light transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-on-gold">
                  <Icon name="arrow" size={16} />
                </span>
              ) : (
                <span className="size-2.5 shrink-0 rounded-full bg-[#33c773]" aria-label="Available" />
              )}
            </>
          );
          return (
            <li key={ch.label} data-aos="fade-up" data-aos-delay={i * 80}>
              {ch.href ? (
                <a href={ch.href} className="group flex h-full items-center gap-3.5 rounded-[18px] border border-on-dark/12 bg-ink px-5 py-5.5 transition-colors hover:border-gold/45">
                  {body}
                </a>
              ) : (
                <div className="flex h-full items-center gap-3.5 rounded-[18px] border border-on-dark/12 bg-ink px-5 py-5.5">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Figma: Contact → Enquiry desk - form card + "Bring these" and confidentiality side cards. */
export function ContactDesk() {
  const c = contactContent.desk;
  return (
    <section id="enquiry" className="section scroll-mt-24 bg-white">
      <div className="shell flex flex-col gap-8 md:gap-14">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} />
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          <div className="rounded-3xl border border-heading/10 bg-white p-6 shadow-card md:p-12" data-aos="fade-up">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-col gap-4 rounded-3xl bg-cream px-8 py-6 md:py-9">
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-dark uppercase">{c.bring.kicker}</p>
              <h3 className="text-xl leading-snug font-bold text-heading md:text-2xl">{c.bring.title}</h3>
              <ul className="flex flex-col gap-4">
                {c.bring.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-heading">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
                      <Icon name="tick" size={13} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3.5 rounded-3xl bg-ink p-8">
              <span className="grid size-12 place-items-center rounded-xl border border-gold/40 bg-gold/14 text-gold">
                <Icon name="shield" size={22} />
              </span>
              <h3 className="text-[17px] font-bold text-white md:text-xl">{c.assurance.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">{c.assurance.copy}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** Figma: Contact → After You Send It - three situation cards linking to the matching service. */
export function ContactNext() {
  const c = contactContent.next;
  return (
    <section className="section bg-ink">
      <div className="shell flex flex-col gap-8 md:gap-16">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} lede={c.lede} align="center" tone="dark" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.situations.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4.5 rounded-[20px] border border-gold/22 bg-ink-raised px-8 py-6 md:py-9" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="flex items-center justify-between">
                <span className="grid size-[52px] place-items-center rounded-[13px] border border-gold/40 bg-gold/14 text-gold">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="text-[15px] font-bold text-gold-light">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">{s.kicker}</p>
              <h3 className="text-xl font-bold text-white md:text-2xl">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-dark-muted">{s.copy}</p>
              <Link
                href={s.link.href}
                className="group mt-auto inline-flex items-center gap-2 border-t border-on-dark/12 pt-4.5 text-sm font-semibold text-gold-light transition-colors hover:text-white"
              >
                {s.link.label}
                <Icon name="arrow" size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
