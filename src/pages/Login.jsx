import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const isLoggedIn = await login(formData);
      if (isLoggedIn) {
        toast("Logged In Successfully!");
        setFormData({
          username: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-5">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered"
                value={formData.username}
                onChange={handleChange}
                required
                aria-label="Enter your username"
              />
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
                aria-label="Enter your password"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-primary">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
