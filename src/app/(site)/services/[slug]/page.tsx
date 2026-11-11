import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/module/SectionHeading";
import { FaqPanel } from "@/components/module/Faq";
import { Cta } from "@/components/module/Cta";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { EngagementSteps } from "@/components/sections/services/EngagementSteps";
import { getServiceDetail, serviceDetails, serviceSingleShared as shared, type ServiceDetail } from "@/content/services";
import { serviceSlugs } from "@/lib/data";
import { cn } from "@/lib/cn";
import { buildPageMetadata, faqNode, serviceNode } from "@/lib/seo";
import { EditableHero } from "@/components/hero/EditableHero";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

function buildMeta(service: ServiceDetail) {
  const slug = `services/${service.slug}`;
  return {
    slug,
    title: service.meta.title,
    shortTitle: service.name,
    breadcrumbName: service.name,
    description: service.meta.description,
    keywords: service.meta.keywords,
    ogImage: service.meta.ogImage,
    ogImageAlt: `${service.name}, The Wikipedia Studio`,
    breadcrumbs: [{ label: "Services", slug: "services" }],
    schema: [
      serviceNode(service.slug, { name: service.name, meta_desc: service.meta.description, deliverables: service.includes }),
      faqNode(service.faqs, slug),
    ],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getServiceDetail(slug);
  return found ? buildPageMetadata(buildMeta(found.service)) : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getServiceDetail(slug);
  if (!found) notFound();
  const { service: s, index } = found;
  const pageMeta = buildMeta(s);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <JsonLd page={pageMeta} />

      <EditableHero pageKey={`service-${s.slug}`}>
        <ServiceHero
          icon={s.icon}
          counter={`Service ${pad(index + 1)} of ${pad(serviceDetails.length)}`}
          title={s.hero.title}
          highlight={s.hero.highlight}
          lede={s.hero.lede}
          checks={s.hero.checks}
          actions={shared.heroActions}
          form={{
            eyebrow: shared.form.eyebrow,
            title: shared.form.title,
            copy: shared.form.copy,
            submitLabel: shared.form.submit,
            note: shared.form.note,
            services: serviceDetails.map((d) => d.name),
            defaultService: s.name,
          }}
        />
      </EditableHero>

      {/* Overview */}
      <section className="section bg-white">
        <div className="shell flex flex-col gap-8 md:gap-18">
          <div className="grid gap-6 lg:grid-cols-[620px_1fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              <SectionHeading eyebrow={s.overview.eyebrow} title={s.overview.title} highlight={s.overview.highlight} />
              <p className="text-[17px] leading-relaxed font-semibold text-heading md:text-[19px]" data-aos="fade-up">
                {s.overview.lead}
              </p>
              <p className="text-[17px] leading-relaxed text-body" data-aos="fade-up">
                {s.overview.body}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 self-start rounded-[20px] bg-mist p-6 md:p-9" data-aos="fade-up">
              <p className="text-[11px] font-bold tracking-[0.14em] text-gold-dark uppercase">{shared.whoForLabel}</p>
              <ul>
                {s.overview.whoFor.map((item, i) => (
                  <li key={item} className={cn("flex items-start gap-3.5 py-3.5 text-[15px] text-heading", i > 0 && "border-t border-heading/10")}>
                    <Icon name="check" size={20} className="mt-0.5 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-6" data-aos="fade-up">
              <h3 className="text-xl font-bold text-heading md:text-2xl">{shared.includesHeading.title}</h3>
              <p className="text-[15px] text-body">{shared.includesHeading.aside}</p>
            </div>
            <div className={cn("grid gap-6 md:grid-cols-2", s.includes.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
              {s.includes.map((item, i) => (
                <div
                  key={item.title}
                  className="group flex flex-col gap-3.5 rounded-panel border border-heading/10 bg-white p-8 transition-colors hover:border-gold"
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 70}
                >
                  <span className="mb-1 grid size-12 place-items-center rounded-xl bg-gold/12 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-on-gold">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h4 className="text-lg font-bold text-heading md:text-[19px]">{item.title}</h4>
                  <p className="text-[15px] leading-relaxed text-body">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-16 md:py-30" id="process">
        <div className="shell flex flex-col gap-8 md:gap-16">
          <SectionHeading eyebrow={shared.process.eyebrow} title={shared.process.title} highlight={shared.process.highlight} align="center" tone="dark" />
          <EngagementSteps steps={s.steps} />
        </div>
      </section>

      <FaqPanel
        heading={{
          eyebrow: `${s.shortName} Questions`,
          title: s.shortName,
          highlight: shared.faq.titleSuffix,
          lede: shared.faq.lede,
        }}
        items={s.faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />
      <Cta {...shared.cta} />
    </>
  );
}
