"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** "Copy all" pill on the fact sheet. */
export function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-gold/45 px-3.5 py-2 text-[13px] font-semibold text-gold-light transition-colors hover:border-gold hover:bg-gold hover:text-on-gold"
    >
      <Icon name={copied ? "tick" : "clipboard"} size={14} />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
