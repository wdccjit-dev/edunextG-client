// src/pages/admin/Settings.jsx (Simplified version)
import { useState, useEffect } from "react";
import { FiSave, FiCheck, FiAlertCircle, FiX } from "react-icons/fi";

function Settings() {
  const [settings, setSettings] = useState({
    companyName: "EduNextG",
    email: "admin@edunextg.com",
    phone: "+91 98765 43210",
    address: "123 Education Street, New Delhi, India",
    website: "www.edunextg.com",
    systemStatus: "active",
    emailNotifications: "enabled",
    notes: "All systems operational.",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      setLoading(false);
      setNotification({ type: 'success', message: 'Settings saved successfully!' });
      setTimeout(() => setNotification(null), 3000);
    }, 800);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>SYSTEM CONFIGURATION</span>
        <h2>Settings</h2>
        <p>Configure administration and platform settings.</p>
      </div>

      {notification && (
        <div className={`admin-toast ${notification.type}`}>
          <div className={`admin-toast-icon ${notification.type}`}>
            {notification.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
          </div>
          <div className="admin-toast-content">
            <h4>Success</h4>
            <p>{notification.message}</p>
          </div>
          <button className="admin-toast-close" onClick={() => setNotification(null)}>
            <FiX />
          </button>
        </div>
      )}

      <div className="admin-settings-grid">
        <section className="admin-settings-card admin-settings-full">
          <h3>General Settings</h3>

          <div className="admin-settings-grid-inner">
            <div className="admin-form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Administrator Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={settings.website}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group admin-form-full">
              <label>Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <div className="admin-form-group">
              <label>System Status</label>
              <select
                name="systemStatus"
                value={settings.systemStatus}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Email Notifications</label>
              <select
                name="emailNotifications"
                value={settings.emailNotifications}
                onChange={handleChange}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div className="admin-form-group admin-form-full">
              <label>Notes</label>
              <textarea
                name="notes"
                value={settings.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Add system notes..."
              />
            </div>
          </div>

          <div className="admin-form-actions">
            <button className="admin-save-button" onClick={handleSave} disabled={loading}>
              <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;