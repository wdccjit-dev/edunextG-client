const activities = [
  {
    action: "New institution added",
    user: "Administrator",
    time: "10 minutes ago",
  },
  {
    action: "Project information updated",
    user: "Administrator",
    time: "42 minutes ago",
  },
  {
    action: "Service configuration changed",
    user: "Administrator",
    time: "2 hours ago",
  },
  {
    action: "System maintenance completed",
    user: "System",
    time: "Yesterday",
  },
];

function Activity() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>SYSTEM ACTIVITY</span>
        <h2>Activity</h2>
        <p>Track important actions performed inside the administration panel.</p>
      </div>

      <div className="admin-table-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>User</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={`${activity.action}-${activity.time}`}>
                  <td>
                    <strong>{activity.action}</strong>
                  </td>
                  <td>{activity.user}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activity;