// src/pages/admin/Services.jsx

import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import styles from "./Services.module.css";

function Services() {
  const [services, setServices] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Software",
    status: "active",
  });

  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/services";

  // Get the JWT saved by the login page
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

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load services");
      }

      setServices(data.services || []);
    } catch (error) {
      console.error("Load services error:", error);
      alert(error.message || "Unable to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (service.category || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleAddService = async () => {
    if (!formData.name.trim()) {
      alert("Service name is required");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(true),
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create service");
      }

      setServices((currentServices) => [
        data.service,
        ...currentServices,
      ]);

      setShowAddModal(false);

      setFormData({
        name: "",
        category: "Software",
        status: "active",
      });
    } catch (error) {
      console.error("Create service error:", error);
      alert(error.message || "Unable to create service");
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);

    setFormData({
      name: service.name,
      category: service.category || "Software",
      status: service.status,
    });

    setShowAddModal(true);
  };

  const handleUpdateService = async () => {
    if (!formData.name.trim()) {
      alert("Service name is required");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/${editingService.id}`,
        {
          method: "PUT",
          headers: getHeaders(true),
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update service");
      }

      setServices((currentServices) =>
        currentServices.map((service) =>
          service.id === editingService.id
            ? { ...service, ...formData }
            : service
        )
      );

      setShowAddModal(false);
      setEditingService(null);

      setFormData({
        name: "",
        category: "Software",
        status: "active",
      });
    } catch (error) {
      console.error("Update service error:", error);
      alert(error.message || "Unable to update service");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete service");
      }

      setServices((currentServices) =>
        currentServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      console.error("Delete service error:", error);
      alert(error.message || "Unable to delete service");
    }
  };

  const toggleStatus = async (id) => {
    const service = services.find((item) => item.id === id);

    if (!service) return;

    const newStatus =
      service.status === "active" ? "inactive" : "active";

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(true),
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setServices((currentServices) =>
        currentServices.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Update service status error:", error);
      alert(error.message || "Unable to update service status");
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingService(null);

    setFormData({
      name: "",
      category: "Software",
      status: "active",
    });
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.adminPageHeader}>
        <span>SERVICE MANAGEMENT</span>
        <h2>Services</h2>
        <p>Manage EduNextG services and offerings.</p>
      </div>

      <div className={styles.adminToolbar}>
        <div className={styles.adminSearchWrapper}>
          <FiSearch className={styles.adminSearchIcon} />

          <input
            className={styles.adminSearch}
            type="search"
            placeholder="Search services by name or category..."
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
          <FiPlus /> Add Service
        </button>
      </div>

      <div className={styles.adminTablePanel}>
        <div className={styles.adminTableWrapper}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#8a96a3",
                    }}
                  >
                    Loading services...
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#8a96a3",
                    }}
                  >
                    No services found matching your search
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <strong>{service.name}</strong>
                    </td>

                    <td>{service.category}</td>

                    <td>
                      <span
                        className={`${styles.adminStatus} ${styles[service.status]}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleStatus(service.id)}
                        title="Click to toggle status"
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className={styles.adminActions}>
                      <button
                        className={styles.adminEditBtn}
                        onClick={() => handleEditService(service)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className={styles.adminDeleteBtn}
                        onClick={() =>
                          handleDeleteService(service.id)
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
            Showing {filteredServices.length} of {services.length} services
          </span>
        </div>
      </div>

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
                {editingService
                  ? "Edit Service"
                  : "Add New Service"}
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
                <label>Service Name</label>

                <input
                  type="text"
                  placeholder="Enter service name"
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
                <label>Category</label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Support">Support</option>
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
                  <option value="inactive">Inactive</option>
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
                  editingService
                    ? handleUpdateService
                    : handleAddService
                }
              >
                {editingService
                  ? "Update Service"
                  : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;