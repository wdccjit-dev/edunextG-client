const express = require("express");

const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");
const logActivity = require("../utils/activityLogger");

const router = express.Router();

/*
  GET /api/services

  Get all services
*/
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [services] = await pool.execute(
      `SELECT
        id,
        name,
        category,
        description,
        status,
        created_at,
        updated_at
       FROM services
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
});

/*
  POST /api/services

  Create a new service
*/
router.post("/", authenticateAdmin, async (req, res) => {
  try {
    const { name, category, description, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required",
      });
    }

    const serviceCategory = category || "Software";
    const serviceStatus = status || "active";

    const [result] = await pool.execute(
      `INSERT INTO services
        (name, category, description, status)
       VALUES (?, ?, ?, ?)`,
      [
        name,
        serviceCategory,
        description || null,
        serviceStatus,
      ]
    );

    await logActivity({
      adminId: req.admin.id,
      action: "Service created",
      description: `Service "${name}" was created.`,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service: {
        id: result.insertId,
        name,
        category: serviceCategory,
        description: description || null,
        status: serviceStatus,
      },
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
});

/*
  PUT /api/services/:id

  Update a service
*/
router.put("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, status } = req.body;

    if (!name || !category || !status) {
      return res.status(400).json({
        success: false,
        message: "Name, category and status are required",
      });
    }

    const [result] = await pool.execute(
      `UPDATE services
       SET name = ?,
           category = ?,
           description = ?,
           status = ?
       WHERE id = ?`,
      [
        name,
        category,
        description || null,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "Service updated",
      description: `Service "${name}" was updated.`,
    });

    res.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
});

/*
  PATCH /api/services/:id/status

  Update service status
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
      "UPDATE services SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "Service status changed",
      description: `Service status was changed to "${status}".`,
    });

    res.json({
      success: true,
      message: "Service status updated successfully",
    });
  } catch (error) {
    console.error("Update service status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service status",
    });
  }
});

/*
  DELETE /api/services/:id

  Delete a service
*/
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [serviceRows] = await pool.execute(
      "SELECT name FROM services WHERE id = ? LIMIT 1",
      [id]
    );

    const [result] = await pool.execute(
      "DELETE FROM services WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const serviceName = serviceRows.length > 0
      ? serviceRows[0].name
      : `Service #${id}`;

    await logActivity({
      adminId: req.admin.id,
      action: "Service deleted",
      description: `Service "${serviceName}" was deleted.`,
    });

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
});

module.exports = router;