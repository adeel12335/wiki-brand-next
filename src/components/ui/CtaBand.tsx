import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { url } from "@/lib/config";
import { HtmlHeading } from "@/components/ui/PageHero";

export function CtaBand({
  heading = "Ready to Build Your <span>Wikipedia Presence?</span>",
  copy = "Let our experts help you establish credibility and create a lasting impact on Wikipedia.",
  label = "Get Started Today",
  href,
}: {
  heading?: string;
  copy?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="contact" id="contact">
      <div className="shell contact-panel reveal">
        <Image
          className="contact-art"
          src="/assets/cta-wikipedia-globe.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={341}
        />
        <div className="contact-copy">
          <span className="micro-label">Start with clarity</span>
          <HtmlHeading html={heading} as="h2" />
          <p>{copy}</p>
        </div>
        <Link className="button button-gold magnetic" href={href ?? url("contact")}>
          {label} <Icon name="i-arrow" />
        </Link>
      </div>
    </section>
  );
}
