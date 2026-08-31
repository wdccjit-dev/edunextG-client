import {
  FiBarChart2,
  FiBox,
  FiFileText,
  FiUsers,
} from "react-icons/fi";

const actions = [
  {
    icon: FiUsers,
    title: "Manage Users",
    description: "View and manage accounts",
  },
  {
    icon: FiBox,
    title: "Manage Services",
    description: "Update available services",
  },
  {
    icon: FiFileText,
    title: "Manage Projects",
    description: "Review project records",
  },
  {
    icon: FiBarChart2,
    title: "View Reports",
    description: "Analyse platform data",
  },
];

function QuickActions() {
  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h3>Quick Actions</h3>
          <p>Frequently used administration tools</p>
        </div>
      </div>

      <div className="admin-quick-actions">
        {actions.map(({ icon: Icon, title, description }) => (
          <button type="button" key={title}>
            <Icon />

            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;