import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";

function Users() {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "active",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert database role to the role displayed by your UI
  const displayRole = (role) => {
    if (role === "admin") return "Admin";
    return "User";
  };

  // Convert UI role to the value expected by MySQL
  const databaseRole = (role) => {
    if (role === "Admin") return "admin";
    return "staff";
  };

  // Load users from MySQL
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:5000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        const formattedUsers = data.users.map((user) => ({
          ...user,
          role: displayRole(user.role),
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Load users error:", error);
        setError("Unable to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "active",
      password: "",
    });
  };

  const handleAddUser = async () => {
    try {
      setError("");

      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {
        setError("Name, email and password are required.");
        return;
      }

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: databaseRole(formData.role),
            status: formData.status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      const newUser = {
        ...data.user,
        role: displayRole(data.user.role),
      };

      setUsers((currentUsers) => [
        newUser,
        ...currentUsers,
      ]);

      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error("Add user error:", error);
      setError(error.message || "Unable to create user.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: "",
    });

    setShowAddModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: databaseRole(formData.role),
            status: formData.status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
              }
            : user,
        ),
      );

      setShowAddModal(false);
      setEditingUser(null);
      resetForm();
    } catch (error) {
      console.error("Update user error:", error);
      setError(error.message || "Unable to update user.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== id),
      );
    } catch (error) {
      console.error("Delete user error:", error);
      setError(error.message || "Unable to delete user.");
    }
  };

  const toggleStatus = async (id) => {
    const user = users.find((item) => item.id === id);

    if (!user) {
      return;
    }

    const newStatus =
      user.status === "active" ? "inactive" : "active";

    try {
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/users/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user status",
        );
      }

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item,
        ),
      );
    } catch (error) {
      console.error("Status update error:", error);
      setError(
        error.message || "Unable to update user status.",
      );
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    resetForm();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>USER MANAGEMENT</span>
        <h2>Users</h2>
        <p>Manage company and platform users.</p>
      </div>

        {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <FiSearch className="admin-search-icon" />

          <input
            className="admin-search"
            type="search"
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className="admin-search-clear"
              onClick={() => setSearchTerm("")}
            >
              <FiX />
            </button>
          )}
        </div>

        <button
          className="admin-add-button"
          onClick={() => {
            setEditingUser(null);
            resetForm();
            setShowAddModal(true);
          }}
        >
          <FiPlus /> Add User
        </button>
      </div>

      <div className="admin-table-panel">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
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
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#8a96a3",
                    }}
                  >
                    No users found matching your search
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name}</strong>
                    </td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>

                    <td>
                      <span
                        className={`admin-status ${user.status}`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                        title="Click to toggle status"
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="admin-actions">
                      <button
                        className="admin-edit-btn"
                        onClick={() =>
                          handleEditUser(user)
                        }
                        title="Edit user"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="admin-delete-btn"
                        onClick={() =>
                          handleDeleteUser(user.id)
                        }
                        title="Delete user"
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

        <div className="admin-table-footer">
          <span>
            Showing {filteredUsers.length} of {users.length} users
          </span>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div
          className="admin-modal-overlay"
          onClick={handleCloseModal}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3>
                {editingUser ? "Edit User" : "Add New User"}
              </h3>

              <button
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                <FiX />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {!editingUser && (
                <div className="admin-form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div className="admin-form-group">
                <label>Role</label>

                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="admin-form-group">
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

            <div className="admin-modal-footer">
              <button
                className="admin-cancel-btn"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                className="admin-generate-btn"
                onClick={
                  editingUser
                    ? handleUpdateUser
                    : handleAddUser
                }
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;