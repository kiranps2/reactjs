import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [welcome, setWelcome] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWelcome(false);

    try {
      const response = await axios.post(
        "https://worksheet-auth.mashupstack.com/login",
        form
      );

      console.log("Token:", response.data.token);

      alert("Successfully Logged In");
      setWelcome(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {welcome && (
        <h3 className="mt-4">
          Welcome! You have logged in successfully.
        </h3>
      )}

      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;