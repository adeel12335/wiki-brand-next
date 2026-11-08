"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { HeroContent, type HeroContentProps } from "../HeroContent";

export interface HeroSlide extends HeroContentProps {
  image: { src: string; alt: string };
}

/** New (not in Figma): full-bleed background image slider with fade + autoplay, ink overlay, hero copy per slide. */
export function HeroBgSlider({ slides, interval = 6000 }: { slides: HeroSlide[]; interval?: number }) {
  return (
    <section className="relative bg-ink">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: interval, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        loop={slides.length > 1}
        className="[&_.swiper-pagination]:!bottom-6"
      >
        {slides.map(({ image, ...content }, i) => (
          <SwiperSlide key={image.src + i}>
            <div className="relative isolate flex min-h-[560px] items-center md:min-h-[680px]">
              <Image src={image.src} alt={image.alt} fill priority={i === 0} sizes="100vw" className="-z-10 object-cover" />
              <span className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/80 to-ink/30" />
              <div className="shell py-20">
                <HeroContent {...content} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
