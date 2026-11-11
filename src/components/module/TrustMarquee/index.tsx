interface TrustMarqueeProps {
  items: string[];
}

function Group({ items, hidden }: TrustMarqueeProps & { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
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
