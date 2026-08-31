// src/layouts/AdminLayout.jsx
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiBox,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiUsers,
  FiBell,
  FiUser,
  FiShield,
  FiChevronDown,
} from "react-icons/fi";
import logo from "../assets/Edunextglogo.png";
import "../admin/Admin.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const notifications = [
    { id: 1, title: "New institution registered", time: "5 min ago", read: false },
    { id: 2, title: "Project completed: ABC School", time: "1 hour ago", read: false },
    { id: 3, title: "System update available", time: "3 hours ago", read: true },
  ];

  const profileMenuItems = [
    { icon: FiUser, label: "My Profile", path: "/admin/profile" },
    { icon: FiShield, label: "Account Settings", path: "/admin/settings" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <Link to="/admin">
            <img src={logo} alt="EduNextG" />
          </Link>
          <button className="admin-close" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav-title">MAIN MENU</p>

          <NavLink to="/admin" end onClick={closeSidebar}>
            <FiGrid /> Dashboard
          </NavLink>

          <NavLink to="/admin/users" onClick={closeSidebar}>
            <FiUsers /> Users
          </NavLink>

          <NavLink to="/admin/services" onClick={closeSidebar}>
            <FiBox /> Services
          </NavLink>

          <NavLink to="/admin/projects" onClick={closeSidebar}>
            <FiFileText /> Projects
          </NavLink>

          <NavLink to="/admin/reports" onClick={closeSidebar}>
            <FiBarChart2 /> Reports
          </NavLink>

          <p className="admin-nav-title">SYSTEM</p>

          <NavLink to="/admin/activity" onClick={closeSidebar}>
            <FiActivity /> Activity
          </NavLink>

          <NavLink to="/admin/settings" onClick={closeSidebar}>
            <FiSettings /> Settings
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" onClick={closeSidebar}>
            <FiLogOut /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button className="admin-menu-button" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="admin-header-title">
            <h1>Administration</h1>
            <p>Manage your EduNextG platform</p>
          </div>

          <div className="admin-header-actions">
            {/* Notification Dropdown */}
            <div className="admin-notification-wrapper" ref={notificationRef}>
              <button
                className="admin-notification"
                onClick={() => setNotificationOpen(!notificationOpen)}
                aria-label="Notifications"
              >
                <FiBell />
                <span className="notification-dot" />
              </button>

              {notificationOpen && (
                <div className="admin-dropdown notification-dropdown">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="dropdown-list">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`dropdown-item ${!notif.read ? "unread" : ""}`}>
                        <div className="dropdown-item-content">
                          <p className="dropdown-item-title">{notif.title}</p>
                          <span className="dropdown-item-time">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <button className="view-all-btn">View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="admin-profile-wrapper" ref={profileRef}>
              <button
                className="admin-profile"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="admin-avatar">A</div>
                <div className="admin-profile-info">
                  <strong>Administrator</strong>
                  <small>Company Admin</small>
                </div>
                <FiChevronDown className="profile-chevron" />
              </button>

              {profileOpen && (
                <div className="admin-dropdown profile-dropdown">
                  <div className="dropdown-profile-header">
                    <div className="dropdown-avatar">A</div>
                    <div className="dropdown-profile-info">
                      <strong>Administrator</strong>
                      <span>admin@edunextg.com</span>
                    </div>
                  </div>
                  <div className="dropdown-list">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="dropdown-item"
                        onClick={() => setProfileOpen(false)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;