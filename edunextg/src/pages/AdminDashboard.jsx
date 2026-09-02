// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  FiUsers,
  FiFileText,
  FiBox,
  FiActivity,
  FiDownload,
  FiX,
  FiPieChart,
} from "react-icons/fi";

import AdminStatCard from "../admin/AdminStatCard";
import RecentActivity from "../admin/RecentActivity";
import QuickActions from "../admin/QuickActions";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState("institutions");
  const [reportFormat, setReportFormat] = useState("pdf");

  // Dashboard data from MySQL
  const [dashboardData, setDashboardData] = useState({
    stats: {
      institutions: 0,
      projects: 0,
      activeServices: 0,
      systemStatus: "Active",
    },
    activities: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = [
    {
      icon: FiUsers,
      color: "blue",
      title: "Total Institutions",
      value: loading ? "..." : dashboardData.stats.institutions,
      description: "Registered institutions",
    },
    {
      icon: FiFileText,
      color: "green",
      title: "Total Projects",
      value: loading ? "..." : dashboardData.stats.projects,
      description: "Projects delivered",
    },
    {
      icon: FiBox,
      color: "orange",
      title: "Active Services",
      value: loading ? "..." : dashboardData.stats.activeServices,
      description: "Currently available",
    },
    {
      icon: FiActivity,
      color: "purple",
      title: "System Status",
      value: loading ? "..." : dashboardData.stats.systemStatus,
      description: "All systems operational",
    },
  ];

  const reportTypes = [
    {
      value: "institutions",
      label: "Institutions Report",
      icon: FiUsers,
      color: "blue",
    },
    {
      value: "projects",
      label: "Projects Report",
      icon: FiFileText,
      color: "green",
    },
    {
      value: "services",
      label: "Services Report",
      icon: FiBox,
      color: "orange",
    },
    {
      value: "overview",
      label: "Platform Overview",
      icon: FiPieChart,
      color: "purple",
    },
  ];

  const handleGenerateReport = () => {
    console.log(
      `Generating ${reportType} report in ${reportFormat} format`,
    );

    setIsModalOpen(false);

    alert(
      `Report generated successfully! (${reportType} - ${reportFormat})`,
    );
  };

  return (
    <>
      <div className="admin-welcome">
        <div>
          <span>ADMINISTRATION</span>

          <h2>Welcome back, Administrator</h2>

          <p>
            Here's what's happening across your EduNextG platform today.
          </p>
        </div>

        <button
          className="admin-primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <FiDownload /> Generate Report
        </button>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <div className="admin-stat-grid">
        {stats.map((stat, index) => (
          <AdminStatCard key={index} {...stat} />
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <RecentActivity activities={dashboardData.activities} />

        <QuickActions />
      </div>

      {/* Generate Report Modal */}
      {isModalOpen && (
        <div
          className="admin-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>Generate Report</h3>

              <button
                className="admin-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Report Type</label>

                <div
                  className="admin-report-type-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {reportTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`admin-report-type-btn ${
                        reportType === type.value ? "active" : ""
                      }`}
                      onClick={() => setReportType(type.value)}
                      style={{
                        padding: "12px",
                        border: `2px solid ${
                          reportType === type.value
                            ? "#8eae28"
                            : "#e4e8ed"
                        }`,
                        borderRadius: "8px",
                        background:
                          reportType === type.value
                            ? "#f8fcf0"
                            : "#fff",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className={`admin-report-type-icon ${type.color}`}
                      >
                        <type.icon />
                      </div>

                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#172b4d",
                        }}
                      >
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label>Report Format</label>

                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                >
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV File</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Date Range</label>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  <input
                    type="date"
                    defaultValue="2026-01-01"
                  />

                  <input
                    type="date"
                    defaultValue="2026-08-31"
                  />
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                className="admin-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="admin-generate-btn"
                onClick={handleGenerateReport}
              >
                <FiDownload /> Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;