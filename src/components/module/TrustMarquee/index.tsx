import { Icon } from "@/components/ui/Icon";

interface TrustMarqueeProps {
  rating: string;
  reviewsHref: string;
  items: string[];
  /** Filled stars out of 5. */
  stars?: number;
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-[3px]" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`grid size-5 place-items-center ${i < count ? "bg-star" : "bg-[#dbdbdb]"}`}>
          <Icon name="star" size={13} className="text-white" />
        </span>
      ))}
    </span>
  );
}

function Group({ rating, reviewsHref, items, stars, hidden }: TrustMarqueeProps & { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      <a href={reviewsHref} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined} className="flex items-center gap-3">
        <Stars count={stars ?? 4} />
        <span className="text-base font-bold whitespace-nowrap md:text-lg">{rating}</span>
        <span className="text-sm font-semibold whitespace-nowrap underline-offset-2 hover:underline">Read our reviews →</span>
      </a>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="size-3 rotate-45 bg-heading" />
          <span className="text-base font-bold whitespace-nowrap md:text-lg">{item}</span>
        </span>
      ))}
      <span className="size-3 rotate-45 bg-heading" />
    </div>
  );
}

/** Figma: H2 / Trust Marquee - gold strip that scrolls continuously (pauses on hover). */
export function TrustMarquee(props: TrustMarqueeProps) {
  return (
    <div className="group overflow-hidden bg-linear-to-r from-[#e8ba5c] to-[#d9a63b] py-4 text-heading md:py-[22px]">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Group {...props} />
        <Group {...props} hidden />
      </div>
    </div>
  );
}
