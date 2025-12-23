import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import logo from "../../assets/logo.png";
import { MdDashboard, MdLogout, MdLogin } from "react-icons/md";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Requests", path: "/all-request-public" },
  { name: "Search", path: "/search-request" },
  { name: "Donate", path: "/donate" },
  { name: "All Blogs", path: "/blogs" },
];

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderLinks = () =>
    navLinks.map(({ name, path }) => (
      <li key={path}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-white transition-all"
              : "text-white hover:text-gray-200 transition-all"
          }
        >
          {name}
        </NavLink>
      </li>
    ));

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-red-600 to-rose-700 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">

        {/* LEFT: Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <div className="lg:hidden dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-red-700 rounded-box w-52 text-white"
            >
              {renderLinks()}
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="YIM BloodBank Logo"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="font-bold text-xl hidden md:block">YIM BloodBank</span>
          </NavLink>
        </div>

        {/* CENTER: Desktop Links */}
        <ul className="hidden lg:flex gap-6">
          {renderLinks()}
        </ul>

        {/* RIGHT: Auth Buttons */}
        <div className="flex items-center gap-4 ">
          {!user ? (
            <NavLink
              to="/login"
              className="btn btn-outline text-base border-white text-white hover:bg-white hover:text-red-600 transition-all"
            >
              <MdLogin className="mr-1 text-2xl" /> Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              {/* Avatar */}
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-white ring-offset-2">
                  <img
                    src={user?.photoURL || "/avatar.png"}
                    alt="User profile"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>

              {/* Dropdown */}
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-red-700 rounded-box w-48 text-white"
              >
                <li>
                  <NavLink to="/dashboard" className="flex items-center gap-2 hover:bg-red-600 px-2 py-2 rounded">
                    <MdDashboard /> Dashboard
                  </NavLink>
                </li>
                <li className="border-t border-red-600 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full hover:bg-red-600 px-2 py-2 rounded text-white"
                  >
                    <MdLogout className="text-2xl" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
