import { createContext, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Function to log in user
  const login = async (formData) => {
    const { data } = await axiosInstance.post("/auth/login", formData);
    localStorage.setItem("token", data.token);
    return data.message;
  };

  // Function to log out user
  const logout = () => localStorage.removeItem("token");

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
