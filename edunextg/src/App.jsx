import { Routes, Route } from "react-router-dom";
import "./App.css";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./layouts/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/admin/Users";
import ServicesAdmin from "./pages/admin/Services";
import Projects from "./pages/admin/Projects";
import Reports from "./pages/admin/Reports";
import Activity from "./pages/admin/Activity";
import Settings from "./pages/admin/Settings";
import ContactMessages from "./pages/admin/ContactMessages";

function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Protected administration */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/activity" element={<Activity />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/contact-messages" element={<ContactMessages />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;