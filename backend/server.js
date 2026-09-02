const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const activityRoutes = require("./routes/activityRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const authenticateAdmin = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/settings", settingsRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "EduNextG API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "EduNextG backend is working",
  });
});

app.get("/api/admin/test", authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Admin authentication is working",
    admin: req.admin,
  });
});

app.listen(PORT, () => {
  console.log(`EduNextG backend running on http://localhost:${PORT}`);
});