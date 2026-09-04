import { useEffect, useState } from "react";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    return (
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken")
    );
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch contact messages"
        );
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Contact messages error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/contact/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setMessages((previous) =>
        previous.map((message) =>
          message.id === id
            ? { ...message, status }
            : message
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
      alert(error.message);
    }
  };

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete message"
        );
      }

      setMessages((previous) =>
        previous.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error("Delete message error:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page-header">
          <h1>Contact Messages</h1>
        </div>

        <div className="admin-loading">
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Contact Messages</h1>
          <p>
            Messages received from visitors through the Contact Us
            form.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={fetchMessages}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      <div className="contact-messages-card">
        {messages.length === 0 ? (
          <div className="contact-no-messages">
            <h3>No messages yet</h3>
            <p>
              Messages submitted through the Contact Us form will
              appear here.
            </p>
          </div>
        ) : (
          <div className="contact-messages-table-wrapper">
            <table className="contact-messages-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>

                    <td>
                      <a href={`mailto:${message.email}`}>
                        {message.email}
                      </a>
                    </td>

                    <td>
                      {message.phone || "—"}
                    </td>

                    <td>{message.subject}</td>

                    <td className="contact-message-text">
                      {message.message}
                    </td>

                    <td>
                      <select
                        value={message.status}
                        onChange={(event) =>
                          updateStatus(
                            message.id,
                            event.target.value
                          )
                        }
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">
                          Replied
                        </option>
                      </select>
                    </td>

                    <td>
                      {new Date(
                        message.created_at
                      ).toLocaleString()}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="contact-delete-button"
                        onClick={() =>
                          deleteMessage(message.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMessages;