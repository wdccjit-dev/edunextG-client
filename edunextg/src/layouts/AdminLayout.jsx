import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;