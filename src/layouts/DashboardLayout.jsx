import {
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Users,
  Zap,
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast("Logged Out!");
    navigate("/");
  };

  return (
    <main className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Outlet />
        <label
          htmlFor="my-drawer"
          className="btn btn-neutral drawer-button lg:hidden fixed top-5 right-5"
        >
          <LayoutDashboard />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-72 py-5 px-8 justify-between">
          {/* Sidebar content here */}
          <div>
            {/* logo */}
            <Link to="/" className="text-3xl font-bold text-primary">
              {"Portify."}
            </Link>
            {/* divider */}
            <div className="divider"></div>
            {/* Navigators */}
            <li>
              <NavLink to="/dashboard" end className="py-3 mb-2">
                <Home className="text-xl" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/team" className="py-3 mb-2">
                <Users className="text-xl" /> Team
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/services" className="py-3 mb-2">
                <Zap className="text-xl" /> Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/blogs" className="py-3 mb-2">
                <FileText className="text-xl" /> Blog
              </NavLink>
            </li>
          </div>
          {/* logout button */}
          <button onClick={handleLogout} className="btn self-center mb-16">
            <LogOut /> Logout
          </button>
        </ul>
      </div>
    </main>
  );
};

export default DashboardLayout;
