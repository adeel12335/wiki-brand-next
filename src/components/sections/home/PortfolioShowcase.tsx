"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import { Icon } from "@/components/ui/Icon";
import { PortfolioCard } from "@/components/module/PortfolioCard";
import type { PublicPortfolioItem } from "@/lib/portfolio";

/** Home portfolio row: 4-up on desktop, swipeable slider with arrow buttons on mobile. */
export function PortfolioShowcase({ items }: { items: PublicPortfolioItem[] }) {
  return (
    <div className="flex flex-col gap-6" data-aos="fade-up">
      <Swiper
        modules={[Navigation, A11y]}
        navigation={{ prevEl: ".pf-prev", nextEl: ".pf-next" }}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2.2, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 24 } }}
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.slug} className="!h-auto">
            <PortfolioCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center gap-3 lg:hidden">
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            aria-label={dir === "prev" ? "Previous" : "Next"}
            className={`pf-${dir} grid size-12 place-items-center rounded-full border border-gold/35 bg-panel text-gold transition-colors hover:bg-gold hover:text-on-gold disabled:opacity-40`}
          >
            <Icon name={dir === "prev" ? "chevron-left" : "chevron-right"} size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
