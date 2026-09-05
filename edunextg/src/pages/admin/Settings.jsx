// src/pages/admin/Settings.jsx

import { useState, useEffect } from "react";
import { FiSave, FiCheck, FiAlertCircle, FiX } from "react-icons/fi";
import styles from "./Settings.module.css";

function Settings() {
  const [settings, setSettings] = useState({
    companyName: "EduNextG",
    email: "admin@edunextg.com",
    phone: "+91 98765 43210",
    address: "123 Education Street, Kolkata, India",
    website: "www.edunextg.com",
    systemStatus: "active",
    emailNotifications: "enabled",
    notes: "All systems operational.",

    mapLocation:
      "EDUNEXTG INDIA LLP, AF-333, Rabindra Pally Rd, Talbagan, Prafulla Kanan, Kestopur, Kolkata, West Bengal 700102",

    mapUrl:
      "https://www.google.com/maps?q=EDUNEXTG%20INDIA%20LLP%2C%20AF-333%2C%20Rabindra%20Pally%20Rd%2C%20Talbagan%2C%20Prafulla%20Kanan%2C%20Kestopur%2C%20Kolkata%2C%20West%20Bengal%20700102&output=embed",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("authToken") ||
          localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:5000/api/settings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch settings"
          );
        }

        setSettings((previous) => ({
          ...previous,
          ...data.settings,
        }));
      } catch (error) {
        console.error("Settings fetch error:", error);

        setNotification({
          type: "error",
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/api/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save settings"
        );
      }

      setNotification({
        type: "success",
        message: "Settings saved successfully!",
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error("Settings save error:", error);

      setNotification({
        type: "error",
        message: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminPageHeader}>
        <span>SYSTEM CONFIGURATION</span>
        <h2>Settings</h2>
        <p>Configure administration and platform settings.</p>
      </div>

      {notification && (
        <div className={`${styles.adminToast} ${styles[notification.type]}`}>
          <div className={`${styles.adminToastIcon} ${styles[notification.type]}`}>
            {notification.type === "success" ? (
              <FiCheck />
            ) : (
              <FiAlertCircle />
            )}
          </div>

          <div className={styles.adminToastContent}>
            <h4>
              {notification.type === "success"
                ? "Success"
                : "Error"}
            </h4>

            <p>{notification.message}</p>
          </div>

          <button
            className={styles.adminToastClose}
            onClick={() => setNotification(null)}
          >
            <FiX />
          </button>
        </div>
      )}

      <div className={styles.adminSettingsGrid}>
        <section className={`${styles.adminSettingsCard} ${styles.adminSettingsFull}`}>
          <h3>General Settings</h3>

          <div className={styles.adminSettingsGridInner}>
            <div className={styles.adminFormGroup}>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.adminFormGroup}>
              <label>Administrator Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.adminFormGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={styles.adminFormGroup}>
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={settings.website}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className={`${styles.adminFormGroup} ${styles.adminFormFull}`}>
              <label>Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="2"
                disabled={loading}
              />
            </div>

            <div className={styles.adminFormGroup}>
              <label>System Status</label>
              <select
                name="systemStatus"
                value={settings.systemStatus}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className={styles.adminFormGroup}>
              <label>Email Notifications</label>
              <select
                name="emailNotifications"
                value={settings.emailNotifications}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div className={`${styles.adminFormGroup} ${styles.adminFormFull}`}>
              <label>Notes</label>
              <textarea
                name="notes"
                value={settings.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Add system notes..."
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.adminFormActions}>
            <button
              className={styles.adminSaveButton}
              onClick={handleSave}
              disabled={loading || saving}
            >
              <FiSave /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>
      </div>

      <div className={styles.settingsMapSection}>
        <h3>Google Maps</h3>

        <p className={styles.settingsMapDescription}>
          Manage the location displayed on the Contact Us page.
        </p>

        <div className={styles.settingsMapField}>
          <label htmlFor="mapLocation">
            Google Maps Location
          </label>

          <input
            id="mapLocation"
            type="text"
            value={settings.mapLocation}
            onChange={(e) =>
              setSettings((previous) => ({
                ...previous,
                mapLocation: e.target.value,
              }))
            }
            placeholder="Enter office location"
          />
        </div>

        <div className={styles.settingsMapField}>
          <label htmlFor="mapUrl">
            Google Maps Embed URL
          </label>

          <input
            id="mapUrl"
            type="text"
            className={styles.settingsMapUrlInput}
            value={settings.mapUrl}
            onChange={(e) =>
              setSettings((previous) => ({
                ...previous,
                mapUrl: e.target.value,
              }))
            }
            placeholder="Paste Google Maps embed URL"
          />

          <small>
            This URL controls the map displayed on the Contact Us page.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Settings;