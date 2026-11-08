import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}

/** Globe mark + "THE WIKIPEDIA / STUDIO" wordmark (Figma: Logo). */
export function Logo({ tone = "light", size = "md", className }: LogoProps) {
  const lg = size === "lg";
  return (
    <Link href="/" aria-label="The Wikipedia Studio - home" className={cn("inline-flex shrink-0 items-center gap-2 md:gap-2.5", className)}>
      <Image
        src="/assets/globe-small.png"
        alt=""
        width={400}
        height={331}
        priority
        className={cn("h-auto shrink-0", lg ? "w-[68px]" : "w-[38px] md:w-[56px]")}
      />
      <span className="flex flex-col items-center leading-none">
        <span
          className={cn(
            "font-bold tracking-[0.04em] whitespace-nowrap",
            lg ? "text-[22px]" : "text-[13px] md:text-[18px]",
            tone === "light" ? "text-heading" : "text-white",
          )}
        >
          THE WIKIPEDIA
        </span>
        <span className="mt-1.5 flex w-full items-center gap-2">
          <span className="h-px flex-1 bg-gold" />
          <span className={cn("font-bold tracking-[0.3em] text-gold", lg ? "text-[11px]" : "text-[9px]")}>STUDIO</span>
          <span className="h-px flex-1 bg-gold" />
        </span>
      </span>
    </Link>
  );
}
