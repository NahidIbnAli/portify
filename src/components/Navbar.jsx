import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="container flex justify-between items-center px-4">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          {"Portify."}
        </NavLink>

        {/* Navigation NavLinks (Desktop) */}
        <div className="hidden lg:flex space-x-2">
          <NavLink to="/" className="btn btn-ghost font-normal text-[16px]">
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="btn btn-ghost font-normal text-[16px]"
          >
            About
          </NavLink>
          <NavLink to="/blog" className="btn btn-ghost font-normal text-[16px]">
            Blog
          </NavLink>
          <NavLink
            to="/services"
            className="btn btn-ghost font-normal text-[16px]"
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="btn btn-ghost font-normal text-[16px]"
          >
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu (Hamburger) */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52 z-50"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
