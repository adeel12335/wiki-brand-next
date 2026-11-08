import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/module/Button";
import { thankYouContent } from "@/content/thank-you";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_RAW } from "@/lib/config";
import { cn } from "@/lib/cn";

/** Figma: Thank You → Hero - globe photo under an ink veil, centred glass confirmation card with a 3-step progress row. */
export function ThankYouHero() {
  const c = thankYouContent.hero;
  const last = c.progress.length - 1;
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image src={c.image.src} alt={c.image.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
      <span className="absolute inset-0 -z-10 bg-ink/86" aria-hidden />
      <div className="shell py-16 lg:py-28">
        <div
          className="mx-auto flex max-w-[880px] flex-col items-center gap-7 rounded-[32px] border border-gold/30 bg-ink-raised/70 p-6 text-center shadow-[0_30px_80px_rgb(0_0_0/0.45)] backdrop-blur-md md:px-16 md:pt-14 md:pb-12"
          data-aos="fade-up"
        >
          <span className="grid size-[76px] place-items-center rounded-full bg-gold text-on-gold ring-[18px] ring-gold/14 md:ring-[18px]">
            <Icon name="check-circle" size={34} />
          </span>
          <p className="rounded-full border border-on-dark/20 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">{c.badge}</p>
          <h1 className="h1 text-white">
            {c.title}
            <br />
            <span className="text-gold-light">{c.highlight}</span>
          </h1>
          <p className="lede max-w-[620px] text-on-dark">{c.lede}</p>

          <ol className="flex w-full max-w-[750px] flex-col gap-1 pt-2 text-left md:flex-row md:gap-0 md:text-center">
            {c.progress.map((p, i) => (
              <li key={p.title} className="flex items-center gap-3.5 py-1.5 md:flex-1 md:flex-col md:gap-3 md:py-0">
                <span className="flex items-center md:w-full">
                  <span className={cn("hidden h-0.5 flex-1 md:block", i === 0 ? "bg-transparent" : "bg-gold/90")} aria-hidden />
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-full",
                      p.state === "done" && "bg-gold text-on-gold",
                      p.state === "current" && "border border-gold bg-gold/16 text-gold",
                      p.state === "next" && "border border-on-dark/25 text-on-dark-muted",
                    )}
                  >
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span className={cn("hidden h-0.5 flex-1 md:block", i === last ? "bg-transparent" : i === 0 ? "bg-gold/90" : "bg-gold/30")} aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5 md:gap-1">
                  <span className={cn("text-base font-bold", p.state === "next" ? "text-on-dark-muted" : "text-white")}>{p.title}</span>
                  <span className={cn("text-[13px]", p.state === "current" ? "text-gold-light" : "text-on-dark-muted")}>{p.note}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="flex w-full max-w-[750px] flex-col gap-5 border-t border-on-dark/12 pt-6 text-left md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-on-dark-muted">{c.direct}</p>
              <p className="flex flex-col gap-3 text-[15px] font-semibold text-white sm:flex-row sm:gap-5">
                <a href={`mailto:${SITE_EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold-light">
                  <Icon name="mail" size={16} className="text-gold" />
                  {SITE_EMAIL}
                </a>
                <a href={`tel:${SITE_PHONE_RAW}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold-light">
                  <Icon name="phone" size={16} className="text-gold" />
                  {SITE_PHONE}
                </a>
              </p>
            </div>
            <Button href={c.back.href} variant="gold" arrow className="self-start md:self-auto">
              {c.back.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
