import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match.");
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        confirmPassword: "",
      }));
      return;
    }
    const { data } = await axiosInstance.post("/auth/register", formData);
    if (data.message) {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast("User created successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-5">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Create an Account</h2>
          <form onSubmit={handleSubmit} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input input-bordered"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Register
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
