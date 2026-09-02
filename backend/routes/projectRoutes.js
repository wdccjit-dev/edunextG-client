const express = require("express");

const pool = require("../db");
const authenticateAdmin = require("../middleware/authMiddleware");
const logActivity = require("../utils/activityLogger");

const router = express.Router();

/*
  GET /api/projects

  Get all projects
*/
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [projects] = await pool.execute(
      `SELECT
        id,
        name,
        client_name,
        type,
        description,
        status,
        start_date,
        end_date,
        created_at,
        updated_at
       FROM projects
       ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});

/*
  POST /api/projects

  Create a new project
*/
router.post("/", authenticateAdmin, async (req, res) => {
  try {
    const {
      name,
      client_name,
      type,
      description,
      status,
      start_date,
      end_date,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const projectType = type || "ERP";
    const projectStatus = status || "planning";

    const [result] = await pool.execute(
      `INSERT INTO projects
        (name, client_name, type, description, status, start_date, end_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        client_name || null,
        projectType,
        description || null,
        projectStatus,
        start_date || null,
        end_date || null,
      ]
    );

    await logActivity({
      adminId: req.admin.id,
      action: "Project created",
      description: `Project "${name}" was created.`,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: {
        id: result.insertId,
        name,
        client_name: client_name || null,
        type: projectType,
        description: description || null,
        status: projectStatus,
        start_date: start_date || null,
        end_date: end_date || null,
      },
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
});

/*
  PUT /api/projects/:id

  Update a project
*/
router.put("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      client_name,
      type,
      description,
      status,
      start_date,
      end_date,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const projectType = type || "ERP";
    const projectStatus = status || "planning";

    const [result] = await pool.execute(
      `UPDATE projects
       SET name = ?,
           client_name = ?,
           type = ?,
           description = ?,
           status = ?,
           start_date = ?,
           end_date = ?
       WHERE id = ?`,
      [
        name,
        client_name || null,
        projectType,
        description || null,
        projectStatus,
        start_date || null,
        end_date || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "Project updated",
      description: `Project "${name}" was updated.`,
    });

    res.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
});

/*
  PATCH /api/projects/:id/status

  Update project status
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
      "UPDATE projects SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await logActivity({
      adminId: req.admin.id,
      action: "Project status changed",
      description: `Project status was changed to "${status}".`,
    });

    res.json({
      success: true,
      message: "Project status updated successfully",
    });
  } catch (error) {
    console.error("Update project status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update project status",
    });
  }
});

/*
  DELETE /api/projects/:id

  Delete a project
*/
router.delete("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [projectRows] = await pool.execute(
      "SELECT name FROM projects WHERE id = ? LIMIT 1",
      [id]
    );

    const [result] = await pool.execute(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const projectName = projectRows.length > 0
      ? projectRows[0].name
      : `Project #${id}`;

    await logActivity({
      adminId: req.admin.id,
      action: "Project deleted",
      description: `Project "${projectName}" was deleted.`,
    });

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
});

module.exports = router;