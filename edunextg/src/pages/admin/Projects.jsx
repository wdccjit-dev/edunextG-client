// src/pages/admin/Projects.jsx

import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    type: "ERP",
    status: "active",
  });

  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/projects";

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  const getHeaders = (includeJson = false) => {
    const token = getToken();

    return {
      ...(includeJson && {
        "Content-Type": "application/json",
      }),
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  };

  // Convert database status to the status used by the existing UI
  const convertStatusFromBackend = (status) => {
    const statusMap = {
      planning: "pending",
      in_progress: "active",
      completed: "completed",
      cancelled: "inactive",
    };

    return statusMap[status] || "pending";
  };

  // Convert existing UI status to database status
  const convertStatusToBackend = (status) => {
    const statusMap = {
      active: "in_progress",
      pending: "planning",
      completed: "completed",
      inactive: "cancelled",
    };

    return statusMap[status] || "planning";
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load projects");
      }

      const formattedProjects = (data.projects || []).map((project) => ({
        id: project.id,
        name: project.name,
        client: project.client_name || "",
        type: project.type || "ERP",
        status: convertStatusFromBackend(project.status),
        description: project.description || "",
        start_date: project.start_date,
        end_date: project.end_date,
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Load projects error:", error);
      alert(error.message || "Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = async () => {
    if (!formData.name.trim() || !formData.client.trim()) {
      alert("Project name and client name are required");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify({
          name: formData.name,
          client_name: formData.client,
          status: convertStatusToBackend(formData.status),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      const newProject = {
        ...data.project,
        client: data.project.client_name || formData.client,
        type: formData.type,
        status: convertStatusFromBackend(data.project.status),
      };

      setProjects((currentProjects) => [
        newProject,
        ...currentProjects,
      ]);

      setShowAddModal(false);

      setFormData({
        name: "",
        client: "",
        type: "ERP",
        status: "active",
      });
    } catch (error) {
      console.error("Create project error:", error);
      alert(error.message || "Unable to create project");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name,
      client: project.client,
      type: project.type || "ERP",
      status: project.status,
    });

    setShowAddModal(true);
  };

  const handleUpdateProject = async () => {
    if (!formData.name.trim() || !formData.client.trim()) {
      alert("Project name and client name are required");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${editingProject.id}`,
        {
          method: "PUT",
          headers: getHeaders(true),
          body: JSON.stringify({
            name: formData.name,
            client_name: formData.client,
            status: convertStatusToBackend(formData.status),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                name: formData.name,
                client: formData.client,
                type: formData.type,
                status: formData.status,
              }
            : project
        )
      );

      setShowAddModal(false);
      setEditingProject(null);

      setFormData({
        name: "",
        client: "",
        type: "ERP",
        status: "active",
      });
    } catch (error) {
      console.error("Update project error:", error);
      alert(error.message || "Unable to update project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Delete project error:", error);
      alert(error.message || "Unable to delete project");
    }
  };

  const toggleStatus = async (id) => {
    const project = projects.find((item) => item.id === id);

    if (!project) return;

    const statusMap = {
      active: "pending",
      pending: "completed",
      completed: "active",
    };

    const newStatus =
      statusMap[project.status] || "active";

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify({
          status: convertStatusToBackend(newStatus),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update project status"
        );
      }

      setProjects((currentProjects) =>
        currentProjects.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Update project status error:", error);
      alert(error.message || "Unable to update project status");
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProject(null);

    setFormData({
      name: "",
      client: "",
      type: "ERP",
      status: "active",
    });
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminPageHeader}>
        <span>PROJECT MANAGEMENT</span>
        <h2>Projects</h2>
        <p>Manage projects and client implementation records.</p>
      </div>

      <div className={styles.adminToolbar}>
        <div className={styles.adminSearchWrapper}>
          <FiSearch className={styles.adminSearchIcon} />

          <input
            className={styles.adminSearch}
            type="search"
            placeholder="Search projects by name, client, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className={styles.adminSearchClear}
              onClick={() => setSearchTerm("")}
            >
              <FiX />
            </button>
          )}
        </div>

        <button
          className={styles.adminAddButton}
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus /> Add Project
        </button>
      </div>

      <div className={styles.adminTablePanel}>
        <div className={styles.adminTableWrapper}>
          <table className={styles.adminTable}>
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
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#8a96a3",
                    }}
                  >
                    Loading projects...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#8a96a3",
                    }}
                  >
                    No projects found matching your search
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <strong>{project.name}</strong>
                    </td>

                    <td>{project.client}</td>

                    <td>{project.type}</td>

                    <td>
                      <span
                        className={`${styles.adminStatus} ${styles[project.status]}`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          toggleStatus(project.id)
                        }
                        title="Click to change status"
                      >
                        {project.status}
                      </span>
                    </td>

                    <td className={styles.adminActions}>
                      <button
                        className={styles.adminEditBtn}
                        onClick={() =>
                          handleEditProject(project)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className={styles.adminDeleteBtn}
                        onClick={() =>
                          handleDeleteProject(project.id)
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.adminTableFooter}>
          <span>
            Showing {filteredProjects.length} of{" "}
            {projects.length} projects
          </span>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <div
          className={styles.adminModalOverlay}
          onClick={handleCloseModal}
        >
          <div
            className={styles.adminModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.adminModalHeader}>
              <h3>
                {editingProject
                  ? "Edit Project"
                  : "Add New Project"}
              </h3>

              <button
                className={styles.adminModalClose}
                onClick={handleCloseModal}
              >
                <FiX />
              </button>
            </div>

            <div className={styles.adminModalBody}>
              <div className={styles.adminFormGroup}>
                <label>Project Name</label>

                <input
                  type="text"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.adminFormGroup}>
                <label>Client Name</label>

                <input
                  type="text"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      client: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.adminFormGroup}>
                <label>Type</label>

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="ERP">ERP</option>
                  <option value="Website">Website</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Consulting">
                    Consulting
                  </option>
                </select>
              </div>

              <div className={styles.adminFormGroup}>
                <label>Status</label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className={styles.adminModalFooter}>
              <button
                className={styles.adminCancelBtn}
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className={styles.adminGenerateBtn}
                onClick={
                  editingProject
                    ? handleUpdateProject
                    : handleAddProject
                }
              >
                {editingProject
                  ? "Update Project"
                  : "Add Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;