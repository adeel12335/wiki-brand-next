import { Fragment } from "react";
import { SITE_EMAIL, SITE_NAME } from "@/lib/config";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\{email\}|\{site\})/g;

/** Renders the small inline markup used in src/content/legal.ts (bold, links, {email}, {site}). */
export function LegalText({ text, email = SITE_EMAIL }: { text: string; email?: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "{email}") {
          return (
            <a key={i} href={`mailto:${email}`} className="font-semibold text-gold-dark underline-offset-2 hover:underline">
              {email}
            </a>
          );
        }
        if (part === "{site}") return <Fragment key={i}>{SITE_NAME}</Fragment>;
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-heading">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const external = /^https?:/.test(link[2]);
          return (
            <a
              key={i}
              href={link[2]}
              className="font-semibold text-gold-dark underline-offset-2 hover:underline"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
