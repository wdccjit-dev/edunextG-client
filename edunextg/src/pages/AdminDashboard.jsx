import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import AdminStatCard from "../admin/AdminStatCard";
import QuickActions from "../admin/QuickActions";
import RecentActivity from "../admin/RecentActivity";
import "../admin/Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader />

        <section className="admin-content">
          <div className="admin-welcome">
            <div>
              <span>ADMINISTRATION</span>
              <h2>Welcome back, Administrator</h2>
              <p>
                Here's what's happening across your EduNextG platform today.
              </p>
            </div>

            <button className="admin-primary-button">
              Generate Report
            </button>
          </div>

          <div className="admin-stat-grid">
            <AdminStatCard
              type="blue"
              icon="users"
              title="Total Institutions"
              value="500+"
              description="Registered institutions"
            />

            <AdminStatCard
              type="green"
              icon="projects"
              title="Total Projects"
              value="1,000+"
              description="Projects delivered"
            />

            <AdminStatCard
              type="orange"
              icon="services"
              title="Active Services"
              value="24"
              description="Currently available"
            />

            <AdminStatCard
              type="purple"
              icon="activity"
              title="System Status"
              value="Active"
              description="All systems operational"
            />
          </div>

          <div className="admin-dashboard-grid">
            <RecentActivity />
            <QuickActions />
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;