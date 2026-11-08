"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading, type SectionHeadingProps } from "@/components/module/SectionHeading";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

interface TestimonialsProps {
  heading: Pick<SectionHeadingProps, "eyebrow" | "title" | "highlight" | "lede">;
  items: Testimonial[];
}

function ArrowButton({ dir }: { dir: "prev" | "next" }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`testimonials-${dir} hidden size-12 shrink-0 place-items-center rounded-full border border-gold/35 bg-panel text-gold transition-all hover:border-gold hover:bg-gold hover:text-on-gold hover:shadow-gold md:grid`}
    >
      <Icon name={dir === "prev" ? "chevron-left" : "chevron-right"} size={20} />
    </button>
  );
}

/** Figma: Testimonials (Home) - Swiper carousel with round arrow buttons + dots. */
export function Testimonials({ heading, items }: TestimonialsProps) {
  return (
    <section className="bg-ink pt-14 pb-12 md:pt-22 md:pb-14">
      <div className="shell flex flex-col items-center gap-10 md:gap-11">
        <SectionHeading {...heading} align="center" tone="dark" />
        <div className="flex w-full max-w-[1028px] items-center gap-9" data-aos="fade-up">
          <ArrowButton dir="prev" />
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            navigation={{ prevEl: ".testimonials-prev", nextEl: ".testimonials-next" }}
            pagination={{ clickable: true, el: ".testimonials-dots" }}
            autoplay={{ delay: 7000, disableOnInteraction: true }}
            loop={items.length > 1}
            spaceBetween={24}
            className="min-w-0 flex-1"
          >
            {items.map((t) => (
              <SwiperSlide key={t.name + t.quote.slice(0, 20)}>
                <figure className="flex flex-col gap-5 rounded-[14px] border border-white/10 bg-panel p-6 md:flex-row md:gap-7 md:px-14 md:pt-11 md:pb-10">
                  <Icon name="quote" size={40} className="shrink-0 text-gold" />
                  <div className="flex flex-col gap-6">
                    <blockquote className="text-lg leading-relaxed text-on-dark italic md:text-xl">{t.quote}</blockquote>
                    <figcaption className="flex items-center gap-4">
                      {t.avatar ? (
                        <Image src={t.avatar} alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
                      ) : (
                        <span className="grid size-14 place-items-center rounded-full bg-gold/15 text-lg font-bold text-gold">{t.name.charAt(0)}</span>
                      )}
                      <span className="flex flex-col">
                        <span className="text-lg font-bold text-white">{t.name}</span>
                        <span className="text-[15px] text-on-dark-muted">{t.role}</span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <ArrowButton dir="next" />
        </div>
        <div className="testimonials-dots flex justify-center gap-2 [&_.swiper-pagination-bullet]:size-2.5" />
      </div>
    </section>
  );
}
