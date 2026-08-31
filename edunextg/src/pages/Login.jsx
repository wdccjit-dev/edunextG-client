import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/admin");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Admin Login</h1>

        <p>Login to access the administration panel.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="primary-button auth-submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;