interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span>{title}</span>

        {icon && <div className="stat-icon">{icon}</div>}
      </div>

      <div className="stat-value">{value}</div>

      {subtitle && (
        <div className="stat-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}