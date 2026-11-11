import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckRow } from "@/components/ui/CheckRow";
import { Button, TextLink } from "@/components/module/Button";
import { SectionHeading } from "@/components/module/SectionHeading";
import { ServiceCard } from "@/components/module/ServiceCard";
import { StepsTimeline } from "@/components/module/StepsTimeline";
import { Testimonials } from "@/components/module/Testimonials";
import { TrustMarquee } from "@/components/module/TrustMarquee";
import { BlogCard, BlogRow } from "@/components/module/BlogCard";
import { Cta } from "@/components/module/Cta";
import { ContactSection } from "@/components/module/ContactForm";
import { FaqPanel } from "@/components/module/Faq";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeAbout } from "@/components/sections/home/HomeAbout";
import { homeContent } from "@/content/home";
import { getAllBlogPosts } from "@/lib/blog";
import { absUrl, SITE_NAME } from "@/lib/config";
import { buildPageMetadata, faqNode, itemListNode } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

export const revalidate = 60;

const pageMeta = {
  slug: "",
  title: homeContent.seo.title,
  shortTitle: "Home",
  description: homeContent.seo.description,
  keywords:
    "wiki studio, wikipedia studio, wikipedia service provider, wiki services provider, wikipedia page creation service, wikipedia page, wiki page creation, create a wikipedia page, wikipedia editing services",
  ogImageAlt: `${SITE_NAME}, professional Wikipedia editorial services`,
  schema: [
    itemListNode(
      "",
      "Wikipedia editorial services",
      homeContent.services.items.map((s) => ({ name: s.title, url: absUrl(s.href.replace(/^\//, "")), description: s.description })),
    ),
    faqNode(homeContent.faq.items, ""),
  ],
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function HomePage() {
  const posts = await getAllBlogPosts();
  const [leadPost, ...morePosts] = posts.slice(0, 3);

  const s = homeContent.services;
  const p = homeContent.process;
  const why = homeContent.why;
  const t = homeContent.testimonials;
  const ins = homeContent.insights;

  return (
    <>
      <JsonLd page={pageMeta} />
      <EditableHero pageKey="home">
        <HomeHero />
      </EditableHero>
      <TrustMarquee items={homeContent.marquee.items} />
      <HomeAbout />

      {/* Services */}
      <section className="section bg-ink">
        <div className="shell flex flex-col gap-12">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} highlight={s.highlight} lede={s.lede} align="center" tone="dark" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {s.items.map((item, i) => (
              <div key={item.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <ServiceCard {...item} tone="dark" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-12">
          <SectionHeading eyebrow={p.eyebrow} title={p.title} highlight={p.highlight} lede={p.lede} align="center" />
          <StepsTimeline steps={p.steps} />
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white">
        <div className="grid gap-10 pb-14 lg:grid-cols-[minmax(0,45%)_1fr] lg:items-stretch lg:gap-20 lg:pb-0">
          {/* Side image fills the full height of the section */}
          <div
            className="min-h-[300px] rounded-r-[50%_50%] border-r-[5px] border-gold pr-2.5 sm:min-h-[420px] lg:min-h-full"
            data-aos="fade-right"
          >
            <div className="relative h-full min-h-[inherit] overflow-hidden rounded-r-[50%_50%]">
              <Image src={why.image.src} alt={why.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" />
            </div>
          </div>
          <div className="flex flex-col gap-5 px-5 lg:py-14 lg:pr-[max(20px,calc((100vw-1280px)/2))] lg:pl-0">
            <SectionHeading eyebrow={why.eyebrow} title={why.title} highlight={why.highlight} lede={why.intro} />
            <ul className="flex flex-col gap-3.5 py-1.5" data-aos="fade-up">
              {why.reasons.map((r) => (
                <CheckRow key={r.title}>
                  <strong className="font-bold">{r.title}:</strong> <span className="text-body">{r.copy}</span>
                </CheckRow>
              ))}
            </ul>
            <Button href={why.cta.href} variant="navy" arrow className="self-start">
              {why.cta.label}
            </Button>
          </div>
        </div>
      </section>

      <Testimonials heading={{ eyebrow: t.eyebrow, title: t.title, highlight: t.highlight, lede: t.lede }} items={t.items} />

      {/* Insights */}
      {leadPost ? (
        <section className="section bg-ink">
          <div className="shell flex flex-col gap-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <SectionHeading eyebrow={ins.eyebrow} title={ins.title} highlight={ins.highlight} tone="dark" className="lg:max-w-[620px]" />
              <div className="flex max-w-[516px] flex-col gap-3.5" data-aos="fade-up">
                <p className="text-base leading-relaxed text-on-dark-muted md:text-[17px]">{ins.aside}</p>
                <TextLink href={ins.viewAll.href}>{ins.viewAll.label}</TextLink>
              </div>
            </div>
            <div className="grid gap-10 lg:grid-cols-[540px_1fr]">
              <div data-aos="fade-up">
                <BlogCard post={leadPost} />
              </div>
              <div className="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
                <p className="text-[11px] font-bold tracking-[0.14em] text-on-dark-muted uppercase">More guides</p>
                {morePosts.map((post) => (
                  <BlogRow key={post.slug} post={post} />
                ))}
                <div className="flex flex-col gap-3 rounded-[14px] border border-gold/35 bg-gold/12 p-6">
                  <p className="text-lg font-bold text-white">{ins.questions.title}</p>
                  <ul className="flex flex-col gap-2.5">
                    {ins.questions.links.map((l) => (
                      <li key={l.href}>
                        <TextLink href={l.href}>{l.label}</TextLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <FaqPanel
        heading={{ eyebrow: homeContent.faq.eyebrow, title: homeContent.faq.title, highlight: homeContent.faq.highlight, lede: homeContent.faq.lede }}
        items={homeContent.faq.items.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <Cta {...homeContent.cta} />
      <ContactSection />
    </>
  );
}
