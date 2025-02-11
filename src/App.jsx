import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AddBlog from "./dashboard/AddBlog";
import AddService from "./dashboard/AddService";
import AddTeamMember from "./dashboard/AddTeamMember";
import BlogManagement from "./dashboard/BlogManagement";
import Dashboard from "./dashboard/Dashboard";
import ServiceManagement from "./dashboard/ServiceManagement";
import TeamManagement from "./dashboard/TeamManagement";
import UpdateBlog from "./dashboard/UpdateBlog";
import UpdateService from "./dashboard/UpdateService";
import UpdateTeamMember from "./dashboard/UpdateTeamMember";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Services from "./pages/Services";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="team/">
            <Route index element={<TeamManagement />} />
            <Route path="add" element={<AddTeamMember />} />
            <Route path="update/:id" element={<UpdateTeamMember />} />
          </Route>
          <Route path="services/">
            <Route index element={<ServiceManagement />} />
            <Route path="add" element={<AddService />} />
            <Route path="update/:id" element={<UpdateService />} />
          </Route>
          <Route path="blogs/">
            <Route index element={<BlogManagement />} />
            <Route path="add" element={<AddBlog />} />
            <Route path="update/:id" element={<UpdateBlog />} />
          </Route>
        </Route>
        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
