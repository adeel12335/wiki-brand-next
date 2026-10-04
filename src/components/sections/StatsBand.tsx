import { Icon } from "@/components/ui/Icon";

interface Stat {
  icon: string;
  value: string;
  label: string;
}

/** Quiet proof strip under the home hero: icon, figure, label — no boxes. */
export function StatsBand({ items }: { items: Stat[] }) {
  return (
    <section className="stats-band" aria-label="The Wikipedia Studio at a glance">
      <div className="shell">
        <dl className="stats-band-grid">
          {items.map((item) => (
            <div key={item.label} className="stats-band-item reveal">
              <dt>
                <span className="stats-band-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                {item.label}
              </dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
