import {
  FiActivity,
  FiFileText,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const activities = [
  {
    icon: FiUsers,
    title: "New institution added",
    description: "Institution registration was completed",
    time: "10 min ago",
  },
  {
    icon: FiFileText,
    title: "Project updated",
    description: "Project information was modified",
    time: "42 min ago",
  },
  {
    icon: FiSettings,
    title: "System settings changed",
    description: "Administration settings were updated",
    time: "2 hrs ago",
  },
  {
    icon: FiActivity,
    title: "System maintenance completed",
    description: "Scheduled maintenance completed successfully",
    time: "Yesterday",
  },
];

function RecentActivity() {
  return (
    <section className="admin-panel admin-activity-panel">
      <div className="admin-panel-header">
        <div>
          <h3>Recent Activity</h3>
          <p>Latest actions across the platform</p>
        </div>

        <button type="button">View All</button>
      </div>

      <div className="admin-activity-list">
        {activities.map(
          ({ icon: Icon, title, description, time }) => (
            <div className="admin-activity" key={`${title}-${time}`}>
              <div className="activity-icon">
                <Icon />
              </div>

              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>

              <time>{time}</time>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default RecentActivity;