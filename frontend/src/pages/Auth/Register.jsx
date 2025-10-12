import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "shop_owner",
    business_name: "",
    business_license: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", form);
      alert("Registered successfully! Wait for admin verification.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

          {error && (
            <div className="alert alert-error mb-3">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="business_name"
              type="text"
              placeholder="Business Name"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="business_license"
              type="text"
              placeholder="Business License"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="input input-bordered col-span-2"
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary col-span-2">
              Register
            </button>
          </form>

          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
