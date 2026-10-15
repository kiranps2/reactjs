import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post(
      "https://worksheet-auth.mashupstack.com/register",
      form
    );

    console.log("Registration response:", response.data);

    alert("Registration Successful");
    navigate("/login");
  } catch (err) {
    console.log("Full error:", err);
    console.log("Response data:", err.response?.data);
    console.log("Status code:", err.response?.status);

    setError(
      err.response?.data?.message ||
      err.response?.data?.detail ||
      JSON.stringify(err.response?.data) ||
      err.message
    );
  }
};

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          className="form-control mb-3"
          value={form.user_name}
          onChange={handleChange}
          required
        />

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

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;