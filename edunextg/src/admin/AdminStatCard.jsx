function AdminStatCard({
  icon: Icon,
  color,
  title,
  value,
  description,
}) {
  return (
    <article className="admin-stat-card">
      <div className={`admin-stat-icon ${color}`}>
        <Icon />
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>
    </article>
  );
}

export default AdminStatCard;