// src/pages/admin/Activity.jsx

import { useEffect, useState } from "react";
import styles from "./Activity.module.css";

function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:5000/api/activity",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch activities"
          );
        }

        setActivities(data.activities || []);
      } catch (error) {
        console.error("Activity fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatTime = (date) => {
    if (!date) return "-";

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
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    if (difference < 172800) {
      return "Yesterday";
    }

    return activityDate.toLocaleDateString();
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminPageHeader}>
        <span>SYSTEM ACTIVITY</span>
        <h2>Activity</h2>
        <p>
          Track important actions performed inside the administration panel.
        </p>
      </div>

      <div className={styles.adminTablePanel}>
        <div className={styles.adminTableWrapper}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Action</th>
                <th>User</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading activity...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3">{error}</td>
                </tr>
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    No activity recorded yet.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <strong>{activity.action}</strong>
                    </td>

                    <td>{activity.user_name}</td>

                    <td>{formatTime(activity.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activity;