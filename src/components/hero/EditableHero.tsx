import Image from "next/image";
import { HeroContent, heroBg, type HeroAction } from "./HeroContent";
import { getPageHero, type PageHeroSettings } from "@/lib/page-hero";
import { safeImageSrc } from "@/lib/image";
import { cn } from "@/lib/cn";

/**
 * Wraps a page's designed hero and applies the overrides saved in Admin → Pages.
 *
 * - Nothing saved                      → the designed hero (children) as-is.
 * - style "default" + background image → designed hero, with the uploaded photo behind it.
 * - style "split" / "background" / "simple" → a hero built from the saved text, buttons and images.
 */
export async function EditableHero({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const s = await getPageHero(pageKey);
  if (!s) return <>{children}</>;

  if (s.style === "default") {
    const desk = s.backgroundImage?.url ?? s.backgroundImageMobile?.url;
    if (!desk) return <>{children}</>;
    const mob = s.backgroundImageMobile?.url ?? desk;
    const a = s.overlay / 100;
    const layer = (url: string) => `linear-gradient(rgb(2 12 22 / ${a}), rgb(2 12 22 / ${a})), url("${safeImageSrc(url)}")`;
    return (
      <div
        className="hero-bg-override"
        style={
          {
            "--hero-bg": layer(desk),
            "--hero-bg-mobile": layer(mob),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    );
  }

  return <CustomHero s={s} />;
}

function actionsOf(s: PageHeroSettings): HeroAction[] {
  const out: HeroAction[] = [];
  if (s.primary.label && s.primary.href) out.push({ label: s.primary.label, href: s.primary.href, variant: "gold" });
  if (s.secondary.label && s.secondary.href) out.push({ label: s.secondary.label, href: s.secondary.href, variant: "ghost" });
  return out;
}

function CustomHero({ s }: { s: PageHeroSettings }) {
  const content = {
    eyebrow: s.eyebrow || undefined,
    title: s.title,
    highlight: s.highlight || undefined,
    lede: s.lede || undefined,
    actions: actionsOf(s),
  };
  const deskSrc = s.backgroundImage?.url ?? s.backgroundImageMobile?.url;
  const bgUrl = deskSrc ? safeImageSrc(deskSrc) : null;
  const bgMobileUrl = s.backgroundImageMobile?.url ? safeImageSrc(s.backgroundImageMobile.url) : bgUrl;
  /** Landscape photo from md up, portrait photo on phones. */
  const bgImages = bgUrl ? (
    <>
      <Image src={bgUrl} alt="" fill priority sizes="100vw" className="-z-10 hidden object-cover md:block" />
      <Image src={bgMobileUrl ?? bgUrl} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-bottom md:hidden" />
    </>
  ) : null;
  const overlay = (
    <span
      aria-hidden
      className="absolute inset-0 -z-10"
      style={{ background: `linear-gradient(90deg, rgb(2 12 22 / ${Math.min(1, s.overlay / 100 + 0.1)}), rgb(2 12 22 / ${s.overlay / 100}))` }}
    />
  );

  if (s.style === "background" && bgUrl) {
    return (
      <section className="relative isolate overflow-hidden bg-ink">
        {bgImages}
        {overlay}
        <div className="shell flex min-h-[460px] items-center py-20 md:min-h-[560px] md:py-28">
          <HeroContent {...content} />
        </div>
      </section>
    );
  }

  if (s.style === "split" && s.image?.url) {
    return (
      <section className={cn("relative isolate overflow-hidden", bgUrl ? "bg-ink" : heroBg)}>
        {bgUrl ? (
          <>
            {bgImages}
            {overlay}
          </>
        ) : null}
        <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
          <HeroContent {...content} />
          <div className="relative mx-auto w-full max-w-[560px]" data-aos="fade-left">
            <Image
              src={safeImageSrc(s.image.url)}
              alt={s.image.alt || s.title}
              width={s.image.width ?? 1200}
              height={s.image.height ?? 900}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="h-auto w-full rounded-panel object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // "simple" (or a style whose image is missing): text on the brand background.
  return (
    <section className={cn("relative overflow-hidden", heroBg)}>
      <span className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(217_166_59/0.16),transparent_65%)]" />
      <div className="shell relative py-14 md:py-24">
        <HeroContent {...content} />
      </div>
    </section>
  );
}
