const express = require("express");
const bcrypt = require("bcryptjs");

const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");
const logActivity = require("../utils/activityLogger");

const router = express.Router();

/*
  GET /api/users

  Get all users
*/
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        role,
        status,
        created_at
       FROM users
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

/*
  POST /api/users

  Create a new user
*/
router.post("/", authenticateAdmin, async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users
        (name, email, password, role, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        role || "staff",
        status || "active",
      ]
    );

    await logActivity({
      adminId: req.admin.id,
      action: "User created",
      description: `New user "${name}" was created.`,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: result.insertId,
        name,
        email,
        role: role || "staff",
        status: status || "active",
      },
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
});

/*
  PUT /api/users/:id

  Update a user
*/
router.put("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    if (!name || !email || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "Name, email, role and status are required",
      });
    }

    const [result] = await pool.execute(
      `UPDATE users
       SET name = ?,
           email = ?,
           role = ?,
           status = ?
       WHERE id = ?`,
      [name, email, role, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "User updated",
      description: `User "${name}" was updated.`,
    });

    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
});

/*
  PATCH /api/users/:id/status

  Toggle/update user status
*/
router.patch("/:id/status", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const [result] = await pool.execute(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "User status changed",
      description: `User status was changed to "${status}".`,
    });

    res.json({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    console.error("Update user status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
});

/*
  DELETE /api/users/:id

  Delete a user
*/
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [userRows] = await pool.execute(
      "SELECT name FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    const [result] = await pool.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userName = userRows.length > 0
      ? userRows[0].name
      : `User #${id}`;

    await logActivity({
      adminId: req.admin.id,
      action: "User deleted",
      description: `User "${userName}" was deleted.`,
    });

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

module.exports = router;