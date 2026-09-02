const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../db");

const router = express.Router();

/*
  POST /api/auth/login

  Request:
  {
    "email": "admin@example.com",
    "password": "your-password"
  }
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find administrator
    const [admins] = await pool.execute(
      "SELECT id, name, email, password, role FROM admins WHERE email = ? LIMIT 1",
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = admins[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    // Don't send password back to frontend
    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;