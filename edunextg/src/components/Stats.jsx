import { stats } from "../data/homeData";

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map(({ value, label, icon: Icon }) => (
          <div className="stat-item" key={label}>
            <Icon className="stat-icon" />

            <div>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;