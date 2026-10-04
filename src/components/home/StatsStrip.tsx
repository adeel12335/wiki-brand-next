import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { Metric } from "@/types";

/** At-a-glance proof points directly under the hero. */
export function StatsStrip({ items }: { items: Metric[] }) {
  return (
    <section aria-label="The Wikipedia Studio at a glance" className="bg-primary text-white">
      <Container className="py-10 lg:py-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="flex items-start gap-4 last:odd:col-span-2 md:last:odd:col-span-1">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-soft">
                <Icon name={item.icon} className="size-5" />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="type-small mt-1 text-white/75">{item.label}</dt>
                <dd className="font-heading text-2xl font-extrabold lg:text-3xl">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
