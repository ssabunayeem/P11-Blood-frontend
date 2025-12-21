import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import { MdDashboard, MdLogout, MdLogin } from "react-icons/md";



const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Request", path: "/all-request" },
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
            isActive ? styles.active : undefined
          }
        >
          {name}
        </NavLink>
      </li>
    ));

  return (
    <div className="navbar bg-rose-200 shadow-sm  font-semibold px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow"
          >
            {renderLinks()}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 btn btn-ghost ">
          <img
            src={logo}
            alt="YIM BloodBank Logo"
            className="w-10 h-10 rounded-full border-2 border-rose-500"
          />
          <span className="hidden md:block text-rose-500 font-bold text-xl">
            YIM BloodBank
          </span>
        </NavLink>
      </div>

      {/* CENTER (Desktop) */}
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal gap-2">
          {renderLinks()}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">
        {/* Dashboard – Primary Action */}
        <NavLink
          to="/dashboard"
          className="btn btn-outline border-2 border-rose-500 text-rose-500 font-bold
               hover:bg-rose-500 hover:text-white 
               transition-all duration-200 ease-in-out
               hover:scale-105"
        >
          <MdDashboard className="text-lg" />

          Dashboard
        </NavLink>

        {/* Auth Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline border-2 border-rose-500 text-rose-500 font-bold
               hover:bg-rose-500 hover:text-white 
               transition-all duration-200 ease-in-out
               hover:scale-105"
          >
            <MdLogout className='text-2xl' />
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-outline border-2 border-rose-500 text-rose-500 
               hover:bg-rose-500 hover:text-white 
               transition-all duration-200 ease-in-out
               hover:scale-105"
          >
            <MdLogin className='text-2xl' />
            Login
          </NavLink>
        )}
      </div>

    </div>
  );
};

export default Navbar;
