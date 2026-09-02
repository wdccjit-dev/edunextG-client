const express = require("express");
const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// DASHBOARD
// ===============================

router.get("/dashboard", authenticateAdmin, async (req, res) => {
  try {
    const [institutionRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM institutions"
    );

    const [projectRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM projects"
    );

    const [serviceRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM services WHERE status = 'active'"
    );

    const [activityRows] = await pool.execute(`
      SELECT
        activity_logs.id,
        activity_logs.user_id,
        activity_logs.admin_id,
        activity_logs.action,
        activity_logs.description,
        activity_logs.created_at,
        COALESCE(admins.name, users.name, 'System') AS user_name
      FROM activity_logs
      LEFT JOIN admins
        ON activity_logs.admin_id = admins.id
      LEFT JOIN users
        ON activity_logs.user_id = users.id
      ORDER BY activity_logs.created_at DESC
      LIMIT 5
    `);

    res.json({
      success: true,
      stats: {
        institutions: institutionRows[0].total,
        projects: projectRows[0].total,
        activeServices: serviceRows[0].total,
        systemStatus: "Active",
      },
      activities: activityRows,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard data",
    });
  }
});


// ===============================
// REPORTS
// ===============================

router.get("/reports", authenticateAdmin, async (req, res) => {
  try {
    const [institutionRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM institutions"
    );

    const [projectRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM projects"
    );

    const [serviceRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM services"
    );

    const [activeUserRows] = await pool.execute(
      "SELECT COUNT(*) AS total FROM users WHERE status = 'active'"
    );

    res.json({
      success: true,
      reports: {
        institutions: institutionRows[0].total,
        projects: projectRows[0].total,
        services: serviceRows[0].total,
        activeUsers: activeUserRows[0].total,
      },
    });
  } catch (error) {
    console.error("Reports error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load report data",
    });
  }
});


module.exports = router;