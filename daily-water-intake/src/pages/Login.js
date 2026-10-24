
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cleanEmail = email.trim().toLowerCase();

    // Find a user with matching email and password
    const foundUser = users.find(
      (user) =>
        user.email === cleanEmail &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password.");
      return;
    }

    // Save the logged-in user's details
    const currentUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    alert("Login successful!");

    navigate("/dashboard");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto auth-card">
        <div className="card-body p-4">
          <h2 className="text-center text-success mb-4">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-success w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
