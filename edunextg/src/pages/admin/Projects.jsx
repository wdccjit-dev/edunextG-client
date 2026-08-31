import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";

function Projects() {
  const [projects, setProjects] = useState([
    { id: 1, name: "ABC Public School ERP", client: "ABC Public School", type: "ERP", status: "active" },
    { id: 2, name: "XYZ College Website", client: "XYZ College", type: "Website", status: "active" },
    { id: 3, name: "Smart Classroom Setup", client: "Delhi Education Institute", type: "Hardware", status: "pending" },
    { id: 4, name: "CCTV Installation", client: "City School", type: "Hardware", status: "completed" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: "", client: "", type: "ERP", status: "active" });

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const newProject = { id: projects.length + 1, ...formData };
    setProjects([...projects, newProject]);
    setShowAddModal(false);
    setFormData({ name: "", client: "", type: "ERP", status: "active" });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({ name: project.name, client: project.client, type: project.type, status: project.status });
    setShowAddModal(true);
  };

  const handleUpdateProject = () => {
    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id ? { ...project, ...formData } : project
    );
    setProjects(updatedProjects);
    setShowAddModal(false);
    setEditingProject(null);
    setFormData({ name: "", client: "", type: "ERP", status: "active" });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const toggleStatus = (id) => {
    const statusMap = { active: "pending", pending: "completed", completed: "active" };
    setProjects(projects.map((project) =>
      project.id === id
        ? { ...project, status: statusMap[project.status] || "active" }
        : project
    ));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProject(null);
    setFormData({ name: "", client: "", type: "ERP", status: "active" });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>PROJECT MANAGEMENT</span>
        <h2>Projects</h2>
        <p>Manage projects and client implementation records.</p>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <FiSearch className="admin-search-icon" />
          <input
            className="admin-search"
            type="search"
            placeholder="Search projects by name, client, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="admin-search-clear" onClick={() => setSearchTerm("")}>
              <FiX />
            </button>
          )}
        </div>
        <button className="admin-add-button" onClick={() => setShowAddModal(true)}>
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
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#8a96a3" }}>
                    No projects found matching your search
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td><strong>{project.name}</strong></td>
                    <td>{project.client}</td>
                    <td>{project.type}</td>
                    <td>
                      <span
                        className={`admin-status ${project.status}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleStatus(project.id)}
                        title="Click to change status"
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="admin-actions">
                      <button className="admin-edit-btn" onClick={() => handleEditProject(project)}>
                        <FiEdit2 />
                      </button>
                      <button className="admin-delete-btn" onClick={() => handleDeleteProject(project.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-table-footer">
          <span>Showing {filteredProjects.length} of {projects.length} projects</span>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
              <button className="admin-modal-close" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="ERP">ERP</option>
                  <option value="Website">Website</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="admin-generate-btn"
                onClick={editingProject ? handleUpdateProject : handleAddProject}
              >
                {editingProject ? "Update Project" : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;