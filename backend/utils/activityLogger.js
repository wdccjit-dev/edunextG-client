const pool = require("../db");

async function logActivity({
  adminId = null,
  userId = null,
  action,
  description,
}) {
  try {
    await pool.execute(
      `INSERT INTO activity_logs
        (user_id, admin_id, action, description)
       VALUES (?, ?, ?, ?)`,
      [
        userId,
        adminId,
        action,
        description,
      ]
    );
  } catch (error) {
    console.error("Activity log error:", error);
  }
}

module.exports = logActivity;