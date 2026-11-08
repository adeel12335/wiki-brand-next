import Image from "next/image";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/** Globe mark above a short label (Figma: Eyebrow - Tone × Align). */
export function Eyebrow({ children, tone = "light", align = "left", className }: EyebrowProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Image src="/assets/globe-small.png" alt="" width={400} height={331} className="h-auto w-10" />
      <p className={cn("text-base font-bold md:text-lg", tone === "light" ? "text-heading" : "text-white")}>{children}</p>
    </div>
  );
}
