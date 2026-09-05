// src/pages/admin/ContactMessages.jsx

import { useEffect, useState } from "react";
import styles from "./ContactMessages.module.css";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Reply modal
  const [replyMessage, setReplyMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

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

  /* =========================
     OPEN REPLY MODAL
  ========================= */

  const openReplyModal = (message) => {
    setReplyMessage(message);
    setReplyText("");
  };

  /* =========================
     CLOSE REPLY MODAL
  ========================= */

  const closeReplyModal = () => {
    if (sendingReply) {
      return;
    }

    setReplyMessage(null);
    setReplyText("");
  };

  /* =========================
     SEND REPLY
  ========================= */

  const sendReply = async (event) => {
    event.preventDefault();

    if (!replyMessage) {
      return;
    }

    if (!replyText.trim()) {
      alert("Please enter a reply message.");
      return;
    }

    try {
      setSendingReply(true);

      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/api/contact/${replyMessage.id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: replyText.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send reply"
        );
      }

      alert("Reply sent successfully!");

      // Automatically change status to replied
      setMessages((previous) =>
        previous.map((item) =>
          item.id === replyMessage.id
            ? { ...item, status: "replied" }
            : item
        )
      );

      closeReplyModal();
    } catch (error) {
      console.error("Send reply error:", error);
      alert(error.message);
    } finally {
      setSendingReply(false);
    }
  };

  /* =========================
     UPDATE STATUS
  ========================= */

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

  /* =========================
     DELETE MESSAGE
  ========================= */

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
      <div className={styles.adminPage}>
        <div className={styles.adminPageHeader}>
          <h1>Contact Messages</h1>
        </div>

        <div className={styles.adminLoading}>
          Loading messages...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className={styles.adminPageHeader}>
        <div>
          <h1>Contact Messages</h1>

          <p>
            Messages received from visitors through the Contact Us
            form.
          </p>
        </div>

        <button
          type="button"
          className={styles.adminRefreshButton}
          onClick={fetchMessages}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className={styles.adminError}>
          {error}
        </div>
      )}

      {/* =========================
          MESSAGES TABLE
      ========================= */}

      <div className={styles.contactMessagesCard}>

        {messages.length === 0 ? (
          <div className={styles.contactNoMessages}>
            <h3>No messages yet</h3>

            <p>
              Messages submitted through the Contact Us form will
              appear here.
            </p>
          </div>
        ) : (
          <div className={styles.contactMessagesTableWrapper}>

            <table className={styles.contactMessagesTable}>

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

                    <td>
                      {message.name}
                    </td>

                    <td>
                      <a href={`mailto:${message.email}`}>
                        {message.email}
                      </a>
                    </td>

                    <td>
                      {message.phone || "—"}
                    </td>

                    <td>
                      {message.subject}
                    </td>

                    <td className={styles.contactMessageText}>
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
                        <option value="new">
                          New
                        </option>

                        <option value="read">
                          Read
                        </option>

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

                    {/* ACTIONS */}

                    <td>
                      <div className={styles.contactActions}>

                        <button
                          type="button"
                          className={styles.contactReplyButton}
                          onClick={() =>
                            openReplyModal(message)
                          }
                        >
                          Reply
                        </button>

                        <button
                          type="button"
                          className={styles.contactDeleteButton}
                          onClick={() =>
                            deleteMessage(message.id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* =========================
          REPLY MODAL
      ========================= */}

      {replyMessage && (
        <div
          className={styles.replyModalOverlay}
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !sendingReply
            ) {
              closeReplyModal();
            }
          }}
        >

          <div className={styles.replyModal}>

            {/* HEADER */}

            <div className={styles.replyModalHeader}>

              <div>
                <h2>
                  Reply to {replyMessage.name}
                </h2>

                <p>
                  Send a response directly to the visitor.
                </p>
              </div>

              <button
                type="button"
                className={styles.replyModalClose}
                onClick={closeReplyModal}
                disabled={sendingReply}
              >
                ×
              </button>

            </div>

            {/* RECIPIENT */}

            <div className={styles.replyRecipient}>

              <div>
                <span>To:</span>

                <strong>
                  {replyMessage.name}
                </strong>
              </div>

              <a
                href={`mailto:${replyMessage.email}`}
              >
                {replyMessage.email}
              </a>

            </div>

            {/* ORIGINAL MESSAGE */}

            <div className={styles.replyOriginalMessage}>

              <strong>
                ORIGINAL MESSAGE
              </strong>

              <p>
                <strong>Subject:</strong>{" "}
                {replyMessage.subject}
              </p>

              <p>
                {replyMessage.message}
              </p>

            </div>

            {/* REPLY FORM */}

            <form
              className={styles.replyForm}
              onSubmit={sendReply}
            >

              <label htmlFor="replyMessage">
                Your Reply
              </label>

              <textarea
                id="replyMessage"
                value={replyText}
                onChange={(event) =>
                  setReplyText(event.target.value)
                }
                placeholder="Write your reply here..."
                disabled={sendingReply}
              />

              {/* BUTTONS */}

              <div className={styles.replyModalActions}>

                <button
                  type="button"
                  className={styles.replyCancelButton}
                  onClick={closeReplyModal}
                  disabled={sendingReply}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.replySendButton}
                  disabled={
                    sendingReply ||
                    !replyText.trim()
                  }
                >
                  {sendingReply
                    ? "Sending..."
                    : "Send Reply"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default ContactMessages;