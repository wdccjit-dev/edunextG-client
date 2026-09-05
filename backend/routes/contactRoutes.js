const express = require("express");

const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");
const logActivity = require("../utils/activityLogger");
const sendContactNotification = require("../utils/email");

const router = express.Router();

/*
 * =========================================================
 * PUBLIC
 * Submit contact form
 * =========================================================
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required",
      });
    }

    // Clean input values
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone ? phone.trim() : null;
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    /*
     * -------------------------------------------------------
     * 1. Save contact message to database
     * -------------------------------------------------------
     */
    const [result] = await pool.execute(
      `INSERT INTO contact_messages
       (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanSubject,
        cleanMessage,
      ]
    );

    /*
     * -------------------------------------------------------
     * 2. Log activity in admin panel
     * -------------------------------------------------------
     */
    try {
      await logActivity({
        adminId: null,
        userId: null,
        action: "Contact message received",
        description: `New contact message received from ${cleanName} regarding "${cleanSubject}".`,
      });
    } catch (activityError) {
      console.error(
        "Contact activity logging failed:",
        activityError
      );
    }

    /*
     * -------------------------------------------------------
     * 3. Send email notification to admin
     * -------------------------------------------------------
     *
     * Email failure should NOT prevent the message from
     * appearing in the Admin Panel.
     */
    try {
      await sendContactNotification({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
      });

      console.log(
        `Contact notification email sent successfully for message #${result.insertId}`
      );
    } catch (emailError) {
      console.error(
        "Contact notification email failed:",
        emailError
      );
    }

    /*
     * -------------------------------------------------------
     * 4. Send success response
     * -------------------------------------------------------
     */
    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      messageId: result.insertId,
    });

  } catch (error) {
    console.error("Contact submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your message",
    });
  }
});

/*
 * =========================================================
 * ADMIN
 * Get all contact messages
 * =========================================================
 */
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [messages] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        phone,
        subject,
        message,
        status,
        created_at,
        updated_at
       FROM contact_messages
       ORDER BY created_at DESC`
    );

    return res.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
});

/*
 * =========================================================
 * ADMIN
 * Update message status
 * =========================================================
 */
router.patch("/:id/status", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "read",
      "replied",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status",
      });
    }

    const [result] = await pool.execute(
      `UPDATE contact_messages
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    /*
     * Log status update
     */
    try {
      await logActivity({
        adminId: req.admin.id,
        action: "Contact message updated",
        description: `Contact message #${id} status changed to ${status}.`,
      });
    } catch (activityError) {
      console.error(
        "Contact activity logging failed:",
        activityError
      );
    }

    return res.json({
      success: true,
      message: "Message status updated successfully",
    });

  } catch (error) {
    console.error(
      "Update contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update message status",
    });
  }
});

/*
 * =========================================================
 * ADMIN
 * Delete message
 * =========================================================
 */
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM contact_messages WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    /*
     * Log deletion
     */
    try {
      await logActivity({
        adminId: req.admin.id,
        action: "Contact message deleted",
        description: `Contact message #${id} was deleted.`,
      });
    } catch (activityError) {
      console.error(
        "Contact activity logging failed:",
        activityError
      );
    }

    return res.json({
      success: true,
      message: "Contact message deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
});

module.exports = router;