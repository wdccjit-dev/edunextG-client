import { Link } from "react-router-dom";
import logo from "../assets/Edunextglogo.png";

function Login() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="EduNextG" />
        </div>

        <h1>Welcome Back</h1>
        <p>Login to continue to your account.</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="primary-button auth-submit">
            Login
          </button>
        </form>

        <Link to="/" className="back-home">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default Login;