const express = require("express");

const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");
const logActivity = require("../utils/activityLogger");

const router = express.Router();


// GET SETTINGS
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT setting_key, setting_value
       FROM settings
       ORDER BY setting_key`
    );

    const settings = {};

    rows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
});

router.get("/public", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT setting_key, setting_value
       FROM settings
       WHERE setting_key IN (
         'companyName',
         'email',
         'phone',
         'address',
         'website',
         'mapLocation',
         'mapUrl'
       )
       ORDER BY setting_key`
    );

    const settings = {};

    rows.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get public settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public settings",
    });
  }
});


// SAVE SETTINGS
router.put("/", authenticateAdmin, async (req, res) => {
  try {
    const settings = req.body;

    for (const [key, value] of Object.entries(settings)) {
      const [existing] = await pool.execute(
        `SELECT id
         FROM settings
         WHERE setting_key = ?
         LIMIT 1`,
        [key]
      );

      if (existing.length > 0) {
        await pool.execute(
          `UPDATE settings
           SET setting_value = ?,
               updated_at = CURRENT_TIMESTAMP
           WHERE setting_key = ?`,
          [value, key]
        );
      } else {
        await pool.execute(
          `INSERT INTO settings
           (setting_key, setting_value)
           VALUES (?, ?)`,
          [key, value]
        );
      }
    }

    await logActivity({
      adminId: req.admin.id,
      action: "Settings updated",
      description: "System settings were updated.",
    });

    res.json({
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error("Save settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save settings",
    });
  }
});


module.exports = router;