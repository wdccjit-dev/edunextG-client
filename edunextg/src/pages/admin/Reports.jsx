import { useEffect, useState } from "react";

function Reports() {
  const [reports, setReports] = useState({
    institutions: 0,
    projects: 0,
    services: 0,
    activeUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:5000/api/admin/reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch reports"
          );
        }

        setReports(data.reports);
      } catch (error) {
        console.error("Reports fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>REPORTING</span>
        <h2>Reports</h2>
        <p>Overview of important platform statistics.</p>
      </div>

      <div className="admin-report-grid">
        <article className="admin-report-card">
          <h3>Institutions</h3>
          <strong>
            {loading ? "..." : error ? "-" : reports.institutions}
          </strong>
          <p>Total institutions served</p>
        </article>

        <article className="admin-report-card">
          <h3>Projects</h3>
          <strong>
            {loading ? "..." : error ? "-" : reports.projects}
          </strong>
          <p>Total projects delivered</p>
        </article>

        <article className="admin-report-card">
          <h3>Services</h3>
          <strong>
            {loading ? "..." : error ? "-" : reports.services}
          </strong>
          <p>Currently available services</p>
        </article>

        <article className="admin-report-card">
          <h3>Active Users</h3>
          <strong>
            {loading ? "..." : error ? "-" : reports.activeUsers}
          </strong>
          <p>Active platform users</p>
        </article>
      </div>
    </div>
  );
}

export default Reports;