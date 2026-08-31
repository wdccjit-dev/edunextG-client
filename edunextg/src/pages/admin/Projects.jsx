import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

const projects = [
  {
    name: "ABC Public School ERP",
    client: "ABC Public School",
    type: "ERP",
    status: "active",
  },
  {
    name: "XYZ College Website",
    client: "XYZ College",
    type: "Website",
    status: "active",
  },
  {
    name: "Smart Classroom Setup",
    client: "Delhi Education Institute",
    type: "Hardware",
    status: "pending",
  },
];

function Projects() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>PROJECT MANAGEMENT</span>
        <h2>Projects</h2>
        <p>Manage projects and client implementation records.</p>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          placeholder="Search projects..."
        />

        <button className="admin-add-button">
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="admin-table-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.name}>
                  <td>
                    <strong>{project.name}</strong>
                  </td>
                  <td>{project.client}</td>
                  <td>{project.type}</td>
                  <td>
                    <span className={`admin-status ${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <button>
                      <FiEdit2 />
                    </button>

                    <button>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;