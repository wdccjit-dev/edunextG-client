import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import logo from "../assets/Edunextglogo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="EduNextG" />
        </Link>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About Us
          </Link>

          <Link to="/clients" onClick={closeMenu}>
            Clients
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact Us
          </Link>

          <Link
            to="/login"
            className="login-button mobile-login"
            onClick={closeMenu}
          >
            <FiUser className="login-icon" />
            Login
          </Link>
        </nav>

        <Link to="/login" className="login-button desktop-login">
          <FiUser className="login-icon" />
          Login
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <FiX className="menu-icon" />
          ) : (
            <FiMenu className="menu-icon" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;