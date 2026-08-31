function Settings() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>SYSTEM CONFIGURATION</span>
        <h2>Settings</h2>
        <p>Configure administration and platform settings.</p>
      </div>

      <div className="admin-settings-grid">
        <section className="admin-settings-card">
          <h3>Company Information</h3>

          <div className="admin-form-group">
            <label>Company Name</label>
            <input defaultValue="EduNextG" />
          </div>

          <div className="admin-form-group">
            <label>Email</label>
            <input defaultValue="admin@edunextg.com" />
          </div>

          <div className="admin-form-group">
            <label>Phone</label>
            <input defaultValue="+91 XXXXX XXXXX" />
          </div>

          <button className="admin-save-button">Save Changes</button>
        </section>

        <section className="admin-settings-card">
          <h3>System Settings</h3>

          <div className="admin-form-group">
            <label>System Status</label>

            <select defaultValue="active">
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Admin Email Notifications</label>

            <select defaultValue="enabled">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Notes</label>
            <textarea placeholder="Add internal administration notes..." />
          </div>

          <button className="admin-save-button">Save Settings</button>
        </section>
      </div>
    </div>
  );
}

export default Settings;