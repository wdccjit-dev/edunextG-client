import { Link, NavLink } from "react-router-dom";
import {
  FiActivity,
  FiBarChart2,
  FiBox,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUsers,
  FiMail,
} from "react-icons/fi";

import logo from "../assets/Edunextglogo.png";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Link to="/admin">
          <img src={logo} alt="EduNextG" />
        </Link>
      </div>

      <nav className="admin-nav">
        <p className="admin-nav-title">MAIN MENU</p>

        <NavLink to="/admin" end>
          <FiGrid />
          Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          <FiUsers />
          Users
        </NavLink>

        <NavLink to="/admin/services">
          <FiBox />
          Services
        </NavLink>

        <NavLink to="/admin/projects">
          <FiFileText />
          Projects
        </NavLink>

        <NavLink to="/admin/reports">
          <FiBarChart2 />
          Reports
        </NavLink>

        <p className="admin-nav-title">SYSTEM</p>

        <NavLink to="/admin/activity">
          <FiActivity />
          Activity
        </NavLink>

        <NavLink to="/admin/contact-messages">
          <FiMail />
          Contact Messages
        </NavLink>

        <NavLink to="/admin/settings">
          <FiSettings />
          Settings
        </NavLink>
      </nav>

      <div className="admin-sidebar-footer">
        <Link to="/">
          <FiLogOut />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;