import Image from "next/image";
import { HeroContent, heroBg, type HeroContentProps } from "../HeroContent";
import { cn } from "@/lib/cn";
import { HeroPhotoBg, HeroPhotoSpacer, heroPhotoSection, heroPhotoVars, type HeroPhotoPair } from "../HeroPhotoBg";

interface HeroImageProps extends HeroContentProps {
  /** Split / background photo. Not needed when `photo` is given. */
  image?: { src: string; alt: string; width?: number; height?: number };
  /**
   * split      → copy left, image right (Home, About, Case Studies…)
   * background → full-bleed photo behind the copy with an ink overlay (Contact, Author, Thank You)
   */
  layout?: "split" | "background";
  /** Full-bleed desktop + mobile photo pair (Home-style); takes priority over `image` / `layout`. */
  photo?: HeroPhotoPair;
  /** Floating element over the image in split layout (e.g. trust badge). */
  badge?: React.ReactNode;
}

export function HeroImage({ image, layout = "split", badge, photo, ...content }: HeroImageProps) {
  if (photo) {
    // Desktop/mobile photo pair with the dark area reserved for the copy (Home-style).
    return (
      <section className={heroPhotoSection} style={heroPhotoVars(photo)}>
        <HeroPhotoBg photo={photo} />
        <div className="shell flex flex-col pt-12 md:min-h-[560px] md:justify-center md:py-20 lg:min-h-[620px]">
          <div className="max-w-[640px]">
            <HeroContent {...content} />
          </div>
          <HeroPhotoSpacer />
        </div>
      </section>
    );
  }

  if (!image) return null;

  if (layout === "background") {
    return (
      <section className="relative isolate overflow-hidden bg-ink">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <span className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/40" />
        <div className="shell py-20 md:py-32">
          <HeroContent {...content} />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("overflow-hidden", heroBg)}>
      <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
        <HeroContent {...content} />
        <div className="relative mx-auto w-full max-w-[560px]" data-aos="fade-left">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 640}
            height={image.height ?? 640}
            priority
            sizes="(min-width: 1024px) 560px, 90vw"
            className="h-auto w-full"
          />
          {badge}
        </div>
      </div>
    </section>
  );
}
