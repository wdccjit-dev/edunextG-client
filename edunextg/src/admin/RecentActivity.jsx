import {
  FiActivity,
  FiFileText,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

function RecentActivity({ activities = [] }) {
  const getActivityIcon = (action = "") => {
    const value = action.toLowerCase();

    if (
      value.includes("user") ||
      value.includes("institution") ||
      value.includes("admin")
    ) {
      return FiUsers;
    }

    if (
      value.includes("project") ||
      value.includes("report")
    ) {
      return FiFileText;
    }

    if (
      value.includes("setting") ||
      value.includes("service")
    ) {
      return FiSettings;
    }

    return FiActivity;
  };

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const activityDate = new Date(date);
    const now = new Date();

    const difference = Math.floor(
      (now - activityDate) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} min ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hrs ago`;
    }

    if (difference < 172800) {
      return "Yesterday";
    }

    return activityDate.toLocaleDateString();
  };

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
        {activities.length === 0 ? (
          <div className="admin-activity">
            <div className="activity-icon">
              <FiActivity />
            </div>

            <div>
              <strong>No recent activity</strong>
              <p>No activity has been recorded yet.</p>
            </div>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getActivityIcon(activity.action);

            return (
              <div
                className="admin-activity"
                key={activity.id}
              >
                <div className="activity-icon">
                  <Icon />
                </div>

                <div>
                  <strong>{activity.action}</strong>
                  <p>{activity.description}</p>
                </div>

                <time>
                  {formatTime(activity.created_at)}
                </time>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentActivity;