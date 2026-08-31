import { FiBell } from "react-icons/fi";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <h1>Administration</h1>
        <p>Manage your EduNextG platform</p>
      </div>

      <div className="admin-header-actions">
        <button
          type="button"
          className="admin-notification"
          aria-label="Notifications"
        >
          <FiBell />
          <span />
        </button>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div className="admin-profile-info">
            <strong>Administrator</strong>
            <small>Company Admin</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;