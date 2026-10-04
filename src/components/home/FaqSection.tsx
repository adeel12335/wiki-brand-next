import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE_EMAIL, url } from "@/lib/config";
import type { Faq } from "@/types";

export function FaqSection({ items }: { items: Faq[] }) {
  return (
    <Section tone="surface" id="faq" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="faq-title"
              align="left"
              eyebrow="Frequently Asked Questions"
              title={
                <>
                  Straight Answers, <span>Before You Commit</span>
                </>
              }
              description="The questions we hear most before an engagement starts — on notability, cost, and what a paid editor can and cannot do."
            />
            <ButtonLink href={url("faq")} className="mt-8">
              Read the Full FAQ
            </ButtonLink>
            <p className="type-small mt-6 text-muted">
              Still unsure?{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-primary underline underline-offset-2">
                Email the editorial desk
              </a>
              .
            </p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </Section>
  );
}
