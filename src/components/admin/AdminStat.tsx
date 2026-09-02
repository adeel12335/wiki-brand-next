interface AdminStatProps {
  label: string;
  value: number | string;
  hint?: string;
}

export function AdminStat({ label, value, hint }: AdminStatProps) {
  return (
    <div className="admin-stat">
      <span className="admin-stat-label">{label}</span>
      <strong className="admin-stat-value">{value}</strong>
      {hint ? <span className="admin-stat-hint">{hint}</span> : null}
    </div>
  );
}
