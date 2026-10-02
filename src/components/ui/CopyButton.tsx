"use client";

import { useState } from "react";

/** Copies `text` to the clipboard and confirms inline for a couple of seconds. */
export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2200);
  };

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {status === "copied" ? "Copied ✓" : status === "failed" ? "Copy failed" : label}
    </button>
  );
}
