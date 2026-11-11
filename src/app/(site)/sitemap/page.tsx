import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/module/Button";
import { SitemapExplorer } from "@/components/sections/sitemap/SitemapExplorer";
import { sitemapContent, type SitemapGroup } from "@/content/sitemap";
import { getAllBlogPosts } from "@/lib/blog";
import { absUrl } from "@/lib/config";
import { buildPageMetadata, itemListNode } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

export const revalidate = 60;

const c = sitemapContent;

const pageMeta = {
  slug: "sitemap",
  title: "HTML Sitemap",
  shortTitle: "Sitemap",
  description: "Browse every public page on The Wikipedia Studio, services, pricing, process, blog, and resources.",
  ogImage: "/assets/og/hero-orbital-globe.jpg",
};

export const metadata: Metadata = buildPageMetadata(pageMeta);

export default async function HtmlSitemapPage() {
  const posts = await getAllBlogPosts();

  const extraGroups: SitemapGroup[] = [];
  if (posts.length) {
    extraGroups.push({ ...c.blogGroup, links: posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })) });
  }

  const allLinks = [...c.groups, ...extraGroups].flatMap((g) => g.links).filter((l) => !l.href.includes("#"));
  const page = {
    ...pageMeta,
    schema: [itemListNode("sitemap", "Site pages", allLinks.map((l) => ({ name: l.label, url: absUrl(l.href.replace(/^\//, "")) })))],
  };
  const band = c.pricingBand;

  return (
    <>
      <JsonLd page={page} />
      <EditableHero pageKey="sitemap">
        <SitemapExplorer extraGroups={extraGroups} />
      </EditableHero>
      <section className="bg-white pt-6 pb-14 md:pb-28">
        <div className="shell">
          <div
            className="flex flex-col gap-6 rounded-3xl bg-ink p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-12 md:py-11"
            data-aos="fade-up"
          >
            <div className="flex max-w-[720px] flex-col gap-2.5">
              <h2 className="text-[30px] leading-[1.2] font-bold text-white md:text-[40px]">
                {band.title}
                <br />
                <span className="text-gold">{band.highlight}</span>
              </h2>
              <p className="text-base leading-relaxed text-on-dark-muted">{band.copy}</p>
            </div>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              {band.actions.map((a) => (
                <Button key={a.href} href={a.href} variant={a.variant} arrow>
                  {a.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
