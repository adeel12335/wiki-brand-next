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
    <section className="cta-band" id="contact">
      <div className="shell cta-band-inner reveal">
        <div className="cta-band-copy">
          <span className="micro-label">Start with clarity</span>
          <HtmlHeading html={heading} as="h2" />
          <p>{copy}</p>
          <Link className="button button-gold magnetic" href={href ?? url("contact")}>
            {label} <Icon name="i-arrow" />
          </Link>
        </div>
        <div className="cta-band-visual" aria-hidden="true">
          <span className="cta-band-ring cta-band-ring--outer" />
          <span className="cta-band-ring cta-band-ring--inner" />
          <Image
            className="cta-band-globe"
            src="/assets/globe.png"
            alt=""
            width={730}
            height={606}
            sizes="(max-width: 900px) 220px, 340px"
          />
        </div>
      </div>
    </section>
  );
}
