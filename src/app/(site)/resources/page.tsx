import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSidePanel } from "@/components/hero/HeroSideContent";
import { Button } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";
import { ContactSection } from "@/components/module/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { PillHero } from "@/components/sections/checker/PillHero";
import { GuideCard } from "@/components/sections/resources/GuideCard";
import { CopyButton } from "@/components/sections/resources/CopyButton";
import { resourcesContent } from "@/content/resources";
import { getAllBlogPosts } from "@/lib/blog";
import { SITE_EMAIL, absUrl } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { EditableHero } from "@/components/hero/EditableHero";

export const revalidate = 60;

const c = resourcesContent;

const pageMeta = {
  slug: "resources",
  title: "Wikipedia Resources & Linkable Guides",
  shortTitle: "Resources",
  description:
    "Free Wikipedia policy guides, citeable facts about The Wikipedia Studio, and partner resources for journalists, educators, and web publishers.",
  keywords: "wikipedia resources, wikipedia notability guide, cite the wikipedia studio, wikipedia editorial resources",
  ogImage: "/assets/og/reference-dark.jpg",
  ogImageAlt: "Wikipedia editorial resources from The Wikipedia Studio",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function ResourcesPage() {
  const posts = await getAllBlogPosts();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const picked = c.guides.items.flatMap((g) => {
    const post = bySlug.get(g.slug);
    return post ? [{ post, category: g.category }] : [];
  });
  // Top up with the newest posts if any configured guide is unpublished.
  const guides = [
    ...picked,
    ...posts
      .filter((p) => !picked.some((g) => g.post.slug === p.slug))
      .slice(0, Math.max(0, c.guides.items.length - picked.length))
      .map((post) => ({ post, category: post.category })),
  ];

  const f = c.facts;
  const factText = f.rows.map((r) => `${r.label}: ${r.value}`).join("\n");
  const page = {
    ...pageMeta,
    schema: guides.length
      ? [itemListNode("resources", "Wikipedia policy guides", guides.map(({ post }) => ({ name: post.title, url: absUrl(`blog/${post.slug}`) })))]
      : undefined,
  };

  return (
    <>
      <JsonLd page={page} />
      <EditableHero pageKey="resources">
        <PillHero
          pill={c.hero.pill}
          title={c.hero.title}
          highlight={c.hero.highlight}
          lede={c.hero.lede}
          actions={c.hero.actions}
          titleClassName="text-[30px] lg:text-[50px]"
          side={
            <HeroSidePanel title={c.hero.panel.title} className="bg-ink-raised">
              <ul className="flex flex-col">
                {c.hero.panel.rows.map((row, i) => (
                  <li key={row.label} className={cn(i > 0 && "border-t border-white/8")}>
                    <a href={row.href} className="group flex items-center gap-3.5 py-3.5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gold/14 text-gold">
                        <Icon name={row.icon} size={18} />
                      </span>
                      <span className="flex-1 text-[15px] font-semibold text-white transition-colors group-hover:text-gold-light">{row.label}</span>
                      <span className="text-[15px] font-bold text-gold-light">{row.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </HeroSidePanel>
          }
        />
      </EditableHero>

      {/* Policy guides */}
      {guides.length ? (
        <section id="guides" className="section scroll-mt-24 bg-white">
          <div className="shell flex flex-col gap-10 md:gap-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <SectionHeading eyebrow={c.guides.eyebrow} title={c.guides.title} highlight={c.guides.highlight} className="lg:max-w-[620px]" />
              <p className="max-w-[380px] text-base leading-relaxed text-body" data-aos="fade-up">
                {c.guides.aside[0]} <br className="hidden lg:block" />
                {c.guides.aside[1]}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(({ post, category }, i) => (
                <div key={post.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                  <GuideCard post={post} category={category} readLabel={c.guides.readLabel} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Fact sheet */}
      <section id="fact-sheet" className="section scroll-mt-24 bg-ink">
        <div className="shell grid items-center gap-10 lg:grid-cols-[420px_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={f.eyebrow} title={f.title} highlight={f.highlight} tone="dark" />
            <p className="lede text-on-dark" data-aos="fade-up">
              {f.lede}
            </p>
            <Button href={`mailto:${SITE_EMAIL}`} variant="gold" arrow className="self-start">
              {f.cta}
            </Button>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-ink-raised" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center justify-between gap-4 bg-gold/10 py-[18px] pr-5 pl-7">
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-light uppercase">{f.tableTitle}</p>
              <CopyButton text={factText} label={f.copyLabel} copiedLabel={f.copiedLabel} />
            </div>
            <dl>
              {f.rows.map((row) => (
                <div key={row.label} className="grid gap-2 border-t border-white/8 px-7 py-[18px] md:grid-cols-[140px_1fr] md:gap-6">
                  <dt className="text-sm font-semibold text-on-dark-muted">{row.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section scroll-mt-24 bg-white">
        <div className="shell flex flex-col gap-10 md:gap-14">
          <SectionHeading eyebrow={c.partners.eyebrow} title={c.partners.title} highlight={c.partners.highlight} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.partners.items.map((item, i) => (
              <article
                key={item.title}
                className={cn("flex flex-col gap-4 rounded-3xl px-7 py-8", i % 2 === 0 ? "bg-cream" : "bg-mist")}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="grid size-11 place-items-center rounded-full bg-white text-gold-dark">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="text-xl leading-snug font-bold text-heading">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection heading={c.contact} />
    </>
  );
}
