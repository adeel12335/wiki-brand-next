import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";

interface CtaProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  assurances?: Array<{ icon: IconName; title: string; copy: string }>;
}

const DEFAULTS: Required<Omit<CtaProps, "secondary">> & Pick<CtaProps, "secondary"> = {
  eyebrow: "Start With Clarity",
  title: "Ready to Build Your",
  highlight: "Wikipedia Presence?",
  lede: "Bring the strongest independent coverage you have. Within 2-5 days we will tell you, in writing, what the sources support and which package applies, before you pay anything.",
  primary: { label: "Request a Free Assessment", href: "/contact/" },
  assurances: [
    { icon: "clock", title: "2-5 day assessment", copy: "A written verdict on your notability, free." },
    { icon: "plan", title: "Quote fixed in writing", copy: "Scope and price agreed before work starts." },
    { icon: "shield", title: "Disclosed on-wiki", copy: "Every paid contribution declared, always." },
  ],
};

/** Figma: CTA Band - ink gradient banner, gold glow + triangle, copy + actions, assurance list. */
export function Cta(props: CtaProps) {
  const c = { ...DEFAULTS, ...props };
  return (
    <section className="bg-white px-3 py-12 md:px-10 md:py-24">
      <div
        className="relative mx-auto grid max-w-[1200px] gap-10 overflow-hidden rounded-3xl bg-linear-to-br from-ink-raised to-ink p-6 py-10 md:p-16 lg:grid-cols-[1fr_400px] lg:gap-16"
        data-aos="fade-up"
      >
        <span className="pointer-events-none absolute -top-60 right-[-120px] size-[700px] rounded-full bg-[radial-gradient(circle,rgb(217_166_59/0.28),rgb(217_166_59/0.04)_55%,transparent_70%)]" />
        <span className="pointer-events-none absolute top-0 left-6 h-[110px] w-[130px] bg-gold/90 [clip-path:polygon(0_0,100%_0,50%_100%)] opacity-20 md:left-16 md:h-[220px] md:w-[260px]" />
        <div className="relative flex flex-col gap-5">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} highlight={c.highlight} tone="dark" />
          <p className="lede text-on-dark">{c.lede}</p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button href={c.primary.href} variant="gold" arrow>
              {c.primary.label}
            </Button>
            {c.secondary ? (
              <Button href={c.secondary.href} variant="ghost" arrow>
                {c.secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
        <ul className="relative flex flex-col self-center rounded-panel border border-gold/35 bg-[#091926]/80 px-5 py-2 md:px-7">
          {c.assurances.map((a, i) => (
            <li key={a.title} className={`flex gap-4 py-5 ${i < c.assurances.length - 1 ? "border-b border-white/10" : ""}`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-gold/12 text-gold">
                <Icon name={a.icon} size={20} />
              </span>
              <span className="flex flex-col justify-center gap-0.5">
                <span className="text-base font-bold text-white md:text-lg">{a.title}</span>
                {a.copy ? <span className="text-[15px] text-on-dark-muted">{a.copy}</span> : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
