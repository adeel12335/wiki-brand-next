import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HtmlHeading } from "@/components/ui/PageHero";
import { SITE_EMAIL, url } from "@/lib/config";

/** Closing call-to-action banner shown at the end of most pages. */
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
    <section aria-labelledby="cta-title" className="bg-white py-16 md:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-white sm:px-10 md:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-accent/40 blur-3xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="type-eyebrow text-accent-soft">Start with clarity</p>
              <HtmlHeading
                html={heading}
                as="h2"
                id="cta-title"
                className="type-h2 mt-3 text-white [&_span]:text-accent-soft"
              />
              <p className="type-body mt-4 max-w-2xl text-white/80">{copy}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={href ?? url("contact")} variant="light">
                  {label}
                </ButtonLink>
                <ButtonLink href={`mailto:${SITE_EMAIL}`} variant="outlineLight" arrow={false}>
                  {SITE_EMAIL}
                </ButtonLink>
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
              <Image
                src="/assets/about-knowledge-sphere.png"
                alt=""
                width={1303}
                height={1207}
                sizes="320px"
                className="h-auto w-72 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
