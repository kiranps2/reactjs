
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cleanEmail = email.trim().toLowerCase();

    const userExists = users.some(
      (user) => user.email === cleanEmail
    );

    if (userExists) {
      alert("This email is already registered.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");

    navigate("/login");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto auth-card">
        <div className="card-body p-4">
          <h2 className="text-center text-success mb-4">
            Register
          </h2>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                minLength={6}
                required
              />
            </div>

            <button className="btn btn-success w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
