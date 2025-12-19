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

const Aside = ({ isOpen, setIsOpen }) => {
    const logout = () => {
        signOut(auth);
    };

    const menuItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-red-600 text-white" : "text-gray-700 hover:bg-blue-100"}`;

    return (
        <aside
            className={`
        fixed top-0 left-0 w-72 h-screen bg-rose-100 border-r border-rose-400 z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
        >
            {/* Header */}
            <div className="pt-5 px-4 mb-5 border-b">
                <p className="text-3xl font-bold text-red-800">Blood Admin</p>
            </div>

            {/* Menu */}
            <nav className="px-4 space-y-1 text-base font-medium">
                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/main" className={menuItemClass}>
                    <FaTachometerAlt /> Dashboard
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/users" className={menuItemClass}>
                    <FaUsers /> Manage Users
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/donations" className={menuItemClass}>
                    <FaHandHoldingHeart /> Donation Requests
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/funding" className={menuItemClass}>
                    <FaMoneyCheckAlt /> Funding
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/roles" className={menuItemClass}>
                    <FaUserShield /> Role Management
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/dashboard/settings" className={menuItemClass}>
                    <FaCog /> Settings
                </NavLink>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-4 left-0 w-full px-4">
                <Link
                    onClick={logout}
                    to="/login"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg bg-red-600 hover:scale-105 transition text-white"
                >
                    <FaSignOutAlt /> Logout
                </Link>
            </div>
        </aside>
    );
};

export default Aside;
