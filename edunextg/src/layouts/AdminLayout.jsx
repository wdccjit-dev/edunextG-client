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
  FiMail,
} from "react-icons/fi";

import logo from "../assets/Edunextglogo.png";
import "../admin/Admin.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  /*
   * Get admin token
   */
  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  /*
   * Fetch latest contact messages
   */
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);

      const token = getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        /*
         * Convert contact messages into notifications
         *
         * Only show messages that are still "new".
         */
        const newNotifications = data.messages
          .filter((message) => message.status === "new")
          .slice(0, 5)
          .map((message) => ({
            id: message.id,
            title: "New contact message",
            description: `${message.name} sent a new message`,
            subject: message.subject,
            time: formatTime(message.created_at),
          }));

        setNotifications(newNotifications);
      }
    } catch (error) {
      console.error("Notification fetch error:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  /*
   * Format notification time
   */
  const formatTime = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    const now = new Date();

    const difference = Math.floor(
      (now - date) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      return `${Math.floor(difference / 60)} min ago`;
    }

    if (difference < 86400) {
      return `${Math.floor(difference / 3600)} hour ago`;
    }

    if (difference < 172800) {
      return "Yesterday";
    }

    return date.toLocaleDateString();
  };

  /*
   * Fetch notifications when admin layout loads
   */
  useEffect(() => {
    fetchNotifications();

    /*
     * Check for new messages every 30 seconds
     */
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Close dropdowns when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  /*
   * Open contact messages page
   */
  const openContactMessages = () => {
    setNotificationOpen(false);
    navigate("/admin/contact-messages");
  };

  const profileMenuItems = [
    {
      icon: FiUser,
      label: "My Profile",
      path: "/admin/profile",
    },
    {
      icon: FiShield,
      label: "Account Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="admin-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="admin-brand">
          <Link to="/admin">
            <img
              src={logo}
              alt="EduNextG"
            />
          </Link>

          <button
            className="admin-close"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav">

          <p className="admin-nav-title">
            MAIN MENU
          </p>

          <NavLink
            to="/admin"
            end
            onClick={closeSidebar}
          >
            <FiGrid />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={closeSidebar}
          >
            <FiUsers />
            Users
          </NavLink>

          <NavLink
            to="/admin/services"
            onClick={closeSidebar}
          >
            <FiBox />
            Services
          </NavLink>

          <NavLink
            to="/admin/projects"
            onClick={closeSidebar}
          >
            <FiFileText />
            Projects
          </NavLink>

          <NavLink
            to="/admin/reports"
            onClick={closeSidebar}
          >
            <FiBarChart2 />
            Reports
          </NavLink>

          <p className="admin-nav-title">
            SYSTEM
          </p>

          <NavLink
            to="/admin/activity"
            onClick={closeSidebar}
          >
            <FiActivity />
            Activity
          </NavLink>

          <NavLink
            to="/admin/contact-messages"
            onClick={closeSidebar}
          >
            <FiMail />
            Contact Messages
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={closeSidebar}
          >
            <FiSettings />
            Settings
          </NavLink>

        </nav>

        <div className="admin-sidebar-footer">
          <Link
            to="/"
            onClick={closeSidebar}
          >
            <FiLogOut />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="admin-main">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="admin-header">

          <button
            className="admin-menu-button"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <div className="admin-header-title">
            <h1>Administration</h1>

            <p>
              Manage your EduNextG platform
            </p>
          </div>

          <div className="admin-header-actions">

            {/* =============================================
                    NOTIFICATIONS
                ============================================= */}

                <div
                  className="admin-notification-wrapper"
                  ref={notificationRef}
                >
                  <button
                    type="button"
                    className="admin-notification"
                    onClick={() => setNotificationOpen((open) => !open)}
                    aria-label="Notifications"
                  >
                    <FiBell />

                    {notifications.length > 0 && (
                      <span className="notification-dot" />
                    )}
                  </button>

                  {notificationOpen && (
                    <div className="admin-notification-dropdown">

                      {/* Header */}
                      <div className="admin-notification-header">
                        <h4>Notifications</h4>

                        {notifications.length > 0 && (
                          <span>
                            {notifications.length} new
                          </span>
                        )}
                      </div>

                      {/* Notification list */}
                      <div className="admin-notification-list">

                        {loadingNotifications ? (
                          <div className="admin-notification-empty">
                            Loading...
                          </div>
                        ) : notifications.length === 0 ? (
                          <div className="admin-notification-empty">
                            <FiBell />
                            <p>No new notifications</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <button
                              type="button"
                              key={notification.id}
                              className="admin-notification-item"
                              onClick={openContactMessages}
                            >
                              <div className="admin-notification-icon">
                                <FiMail />
                              </div>

                              <div className="admin-notification-content">
                                <strong>
                                  New contact message received
                                </strong>

                                <span>
                                  {notification.time}
                                </span>
                              </div>
                            </button>
                          ))
                        )}

                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          className="admin-notification-footer"
                          onClick={openContactMessages}
                        >
                          View All Contact Messages
                        </button>
                      )}

                    </div>
                  )}
                </div>

            {/* =============================================
                PROFILE
            ============================================= */}

            <div
              className="admin-profile-wrapper"
              ref={profileRef}
            >

              <button
                className="admin-profile"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >

                <div className="admin-avatar">
                  A
                </div>

                <div className="admin-profile-info">

                  <strong>
                    Administrator
                  </strong>

                  <small>
                    Company Admin
                  </small>

                </div>

                <FiChevronDown
                  className="profile-chevron"
                />

              </button>

              {profileOpen && (

                <div className="admin-dropdown profile-dropdown">

                  <div className="dropdown-profile-header">

                    <div className="dropdown-avatar">
                      A
                    </div>

                    <div className="dropdown-profile-info">

                      <strong>
                        Administrator
                      </strong>

                      <span>
                        admin@edunextg.com
                      </span>

                    </div>

                  </div>

                  <div className="dropdown-list">

                    {profileMenuItems.map(
                      (item) => {

                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="dropdown-item"
                            onClick={() =>
                              setProfileOpen(false)
                            }
                          >
                            <Icon />
                            <span>
                              {item.label}
                            </span>
                          </Link>
                        );
                      }
                    )}

                  </div>

                  <div className="dropdown-footer">

                    <button
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      <FiLogOut />
                      Sign Out
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;