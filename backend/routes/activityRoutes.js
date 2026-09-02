const express = require("express");
const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [activities] = await pool.execute(
      `SELECT
        activity_logs.id,
        activity_logs.action,
        activity_logs.description,
        activity_logs.created_at,
        COALESCE(admins.name, users.name, 'System') AS user_name
       FROM activity_logs
       LEFT JOIN admins
         ON activity_logs.admin_id = admins.id
       LEFT JOIN users
         ON activity_logs.user_id = users.id
       ORDER BY activity_logs.created_at DESC`
    );

    res.json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error("Get activities error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
});

module.exports = router;