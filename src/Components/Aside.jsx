import { Link, NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaHandHoldingHeart,
    FaMoneyCheckAlt,
    FaUserShield,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import logo from "../assets/logo.png";

const Aside = ({ isOpen, setIsOpen }) => {
    const logout = () => {
        signOut(auth);
    };

    const menuItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-red-600 text-white" : "text-gray-700 hover:bg-rose-300"}`;

    return (
        <aside
            className={`
        fixed top-0 left-0 w-72 h-screen bg-rose-100/75 border-r border-rose-400 z-40
        transform transition-transform duration-300  shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
        >
            {/* Header */}
            <div className="py-5 px-4 mb-5 bg-rose-300 border-rose-400 flex flex-col items-center ">
                <img className="w-1/3 rounded-full" src={logo} alt="" />
                <p className="text-2xl font-bold text-rose-800">Dashboard</p>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-1 text-base font-medium">
                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/main" className={menuItemClass}>
                    <FaTachometerAlt className="text-2xl" /> Dashboard
                </NavLink>


                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/donations" className={menuItemClass}>
                    <FaHandHoldingHeart className="text-2xl" /> Donation Requests
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/users" className={menuItemClass}>
                    <FaUsers className="text-2xl" /> Manage Users
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/roles" className={menuItemClass}>
                    <FaUserShield className="text-2xl" /> Role Management
                </NavLink>


                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/funding" className={menuItemClass}>
                    <FaMoneyCheckAlt className="text-2xl" /> Funding
                </NavLink>


                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/settings" className={menuItemClass}>
                    <FaCog className="text-2xl" /> Settings
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-4 left-0 w-full px-4 ">
                <Link
                    onClick={logout}
                    to="/login"
                    className="btn btn-ghost btn-outline flex items-center gap-3 w-full px-4 py-3 text-base rounded-lg  hover:bg-rose-300 transition text-rose-500 font-bold "
                >
                    <FaSignOutAlt className=" text-xl" /> Logout
                </Link>
            </div>
        </aside>
    );
};

export default Aside;
