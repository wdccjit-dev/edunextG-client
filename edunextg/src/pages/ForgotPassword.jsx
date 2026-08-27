import { Link } from "react-router-dom";
import logo from "../assets/Edunextglogo.png";

function ForgotPassword() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="EduNextG" />
        </div>

        <h1>Forgot Password?</h1>
        <p>Enter your email address to reset your password.</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <button type="submit" className="primary-button auth-submit">
            Send Reset Link
          </button>
        </form>

        <Link to="/login" className="back-home">
          Back to Login
        </Link>
      </div>
    </section>
  );
}

export default ForgotPassword;