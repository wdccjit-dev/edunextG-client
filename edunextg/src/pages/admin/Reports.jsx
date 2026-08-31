function Reports() {
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
          <strong>500+</strong>
          <p>Total institutions served</p>
        </article>

        <article className="admin-report-card">
          <h3>Projects</h3>
          <strong>1,000+</strong>
          <p>Total projects delivered</p>
        </article>

        <article className="admin-report-card">
          <h3>Services</h3>
          <strong>24</strong>
          <p>Currently available services</p>
        </article>
      </div>
    </div>
  );
}

export default Reports;