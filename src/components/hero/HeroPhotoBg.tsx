import Image from "next/image";

export interface HeroPhotoPair {
  /** Landscape photo (md and up), artwork on the right. */
  desktop: string;
  /** Portrait photo for phones: dark space on top for the copy, artwork at the bottom. */
  mobile: { src: string; width: number; height: number; artFrom: number; top: string };
  alt?: string;
}

/**
 * Full-bleed hero photo with separate desktop / mobile crops.
 *
 * Phones: the portrait photo is drawn at full width and pinned to the bottom of the hero, and
 * `<HeroPhotoSpacer>` (placed after the copy) reserves exactly the height of its artwork.
 * So at any phone or small-tablet width the artwork sits below the copy, never behind it.
 * `artFrom` = where the artwork starts (0 to 1 from the top of the photo); `top` = colour of the photo's top edge.
 *
 * The <Image> elements must stay direct children of the <section> so an Admin → Pages background can replace them.
 */
export function heroPhotoVars(p: HeroPhotoPair): React.CSSProperties {
  const ratio = p.mobile.height / p.mobile.width;
  return {
    "--hero-mh": `calc(100vw * ${ratio})`,
    "--hero-art": `calc(100vw * ${ratio * (1 - p.mobile.artFrom)})`,
    "--hero-top": p.mobile.top,
  } as React.CSSProperties;
}

/** Section classes that go with `heroPhotoVars`. */
export const heroPhotoSection = "relative isolate min-h-(--hero-mh) overflow-hidden bg-(--hero-top) md:min-h-0 md:bg-ink";

export function HeroPhotoBg({ photo }: { photo: HeroPhotoPair }) {
  const alt = photo.alt ?? "";
  return (
    <>
      <Image src={photo.desktop} alt={alt} fill priority sizes="100vw" className="-z-10 hidden object-cover object-right md:block" />
      <Image
        src={photo.mobile.src}
        alt={alt}
        width={photo.mobile.width}
        height={photo.mobile.height}
        priority
        sizes="100vw"
        className="absolute inset-x-0 bottom-0 -z-10 h-auto w-full md:hidden"
      />
      {/* Phones: blends the photo's top edge into the section colour when the copy makes the hero taller than the photo */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-[calc(var(--hero-mh)-80px)] -z-10 h-20 bg-linear-to-b from-(--hero-top) to-transparent md:hidden"
      />
      {/* Keeps the copy readable where the photo gets brighter */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block md:bg-linear-to-r md:from-ink/70 md:via-ink/20 md:to-transparent"
      />
    </>
  );
}

/** Phones only: reserves room under the copy for the artwork in the portrait photo. */
export function HeroPhotoSpacer() {
  return <div aria-hidden className="mt-8 h-(--hero-art) md:hidden" />;
}
