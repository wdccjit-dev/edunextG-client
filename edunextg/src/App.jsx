import { Routes, Route } from "react-router-dom";
import "./App.css";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";

import Users from "./pages/admin/Users";
import Services from "./pages/admin/Services";
import Projects from "./pages/admin/Projects";
import Reports from "./pages/admin/Reports";
import Activity from "./pages/admin/Activity";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
      </Route>


      {/* ADMIN PANEL */}
      <Route path="/admin" element={<AdminLayout />}>

        {/* /admin */}
        <Route index element={<AdminDashboard />} />

        {/* /admin/users */}
        <Route path="users" element={<Users />} />

        {/* /admin/services */}
        <Route path="services" element={<Services />} />

        {/* /admin/projects */}
        <Route path="projects" element={<Projects />} />

        {/* /admin/reports */}
        <Route path="reports" element={<Reports />} />

        {/* /admin/activity */}
        <Route path="activity" element={<Activity />} />

        {/* /admin/settings */}
        <Route path="settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default App;