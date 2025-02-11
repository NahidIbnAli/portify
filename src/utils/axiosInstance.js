import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api", // Change this to your backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request has FormData (file uploads)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json"; // Default for JSON requests
    }

    // If you have authentication, you can add the token here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;