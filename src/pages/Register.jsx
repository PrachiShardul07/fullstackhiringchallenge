import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const countries = ["India", "USA", "UK", "Canada", "Australia"];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    bio: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!countries.includes(form.country)) {
      toast.error("Please select a valid country");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/auth/register", form);
      toast.success("Registered successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h3 className="text-center text-success mb-4">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>

          <select
            className="form-select mb-3"
            required
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <textarea
            className="form-control mb-3"
            placeholder="Short Bio (Optional)"
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
