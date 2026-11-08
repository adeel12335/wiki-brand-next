import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { homeContent } from "@/content/home";
import { HeroPhotoBg, HeroPhotoSpacer, heroPhotoSection, heroPhotoVars } from "@/components/hero/HeroPhotoBg";

/**
 * Home-only hero: full-bleed photo background (separate desktop / mobile crops), copy on the dark side,
 * "Reliable Research" highlight box, underlined text links.
 * The <Image> elements are direct children of <section> so an Admin → Pages background can replace them.
 */
export function HomeHero() {
  const c = homeContent.hero;
  return (
    <section className={heroPhotoSection} style={heroPhotoVars(c.photo)}>
      <HeroPhotoBg photo={c.photo} />

      <div className="shell flex flex-col pt-12 md:min-h-[600px] md:justify-center md:py-20 lg:min-h-[680px]">
        <div className="flex max-w-[640px] flex-col gap-6 md:gap-7" data-aos="fade-up">
          <p className="text-xs font-bold tracking-[0.16em] text-gold-eyebrow uppercase md:text-[13px]">{c.eyebrow}</p>
          <h1 className="h1-home text-white">
            {c.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-2 inline-block rounded-[3px] bg-gold pr-4 pb-0.5 pl-3.5 text-heading">{c.highlight}</span>
          </h1>
          <p className="lede max-w-[600px] text-on-dark md:text-xl">{c.lede}</p>
          <div className="flex flex-wrap gap-x-9 gap-y-4 pt-3">
            {c.links.map((link) => (
              <Link key={link.href} href={link.href} className="group inline-flex flex-col gap-2 text-base font-bold text-white md:text-lg">
                <span className="inline-flex items-center gap-2.5">
                  {link.label}
                  {link.arrow ? <Icon name="arrow" size={20} className="text-gold transition-transform group-hover:translate-x-1" /> : null}
                </span>
                {/* underline matches the label width only */}
                <span className="h-[3px] w-full origin-left bg-gold transition-transform duration-300 group-hover:scale-x-110" />
              </Link>
            ))}
          </div>
        </div>
        <HeroPhotoSpacer />
      </div>
    </section>
  );
}
