// src/pages/admin/Users.jsx
import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSearch, FiX } from "react-icons/fi";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "pending" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "inactive" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User", status: "active" });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({ name: "", email: "", role: "User", status: "active" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowAddModal(true);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, ...formData } : user
    );
    setUsers(updatedUsers);
    setShowAddModal(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "User", status: "active" });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "User", status: "active" });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <span>USER MANAGEMENT</span>
        <h2>Users</h2>
        <p>Manage company and platform users.</p>
      </div>

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
            <button className="admin-search-clear" onClick={() => setSearchTerm("")}>
              <FiX />
            </button>
          )}
        </div>
        <button className="admin-add-button" onClick={() => setShowAddModal(true)}>
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "40px", color: "#8a96a3" }}>
                    No users found matching your search
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className={`admin-status ${user.status}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleStatus(user.id)}
                        title="Click to toggle status"
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="admin-actions">
                      <button
                        className="admin-edit-btn"
                        onClick={() => handleEditUser(user)}
                        title="Edit user"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
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
          <span>Showing {filteredUsers.length} of {users.length} users</span>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <button className="admin-modal-close" onClick={handleCloseModal}>
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
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
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="admin-generate-btn"
                onClick={editingUser ? handleUpdateUser : handleAddUser}
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