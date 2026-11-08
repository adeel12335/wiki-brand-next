import { Icon, type IconName } from "@/components/ui/Icon";

/** White card with a tinted icon tile, a gold index number, title and copy (Hire "What your writer does", Choose "Checklist"). */
export function NumberedCard({ icon, index, title, copy }: { icon: IconName; index: number; title: string; copy: string }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[20px] border border-heading/10 bg-white px-8 py-9 transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between">
        <span className="grid size-[52px] place-items-center rounded-[13px] bg-gold/12 text-gold-dark">
          <Icon name={icon} size={23} />
        </span>
        <span className="text-[15px] font-bold text-gold-dark">{String(index).padStart(2, "0")}</span>
      </div>
      <h3 className="text-[21px] leading-snug font-bold text-heading">{title}</h3>
      <p className="text-[15px] leading-relaxed text-body">{copy}</p>
    </article>
  );
}
