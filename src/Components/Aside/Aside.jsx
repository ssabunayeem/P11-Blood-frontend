import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  NotebookPen,
  Home
} from "lucide-react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import logo from "../../assets/logo.png";

const Aside = ({ isOpen, setIsOpen }) => {
  const { role } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  const menuItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
      ? "bg-rose-600 text-white shadow-md"
      : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside
      className={`
        fixed top-0 left-0 w-72 h-screen z-40
        bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header / Brand */}
      <div className="py-6 px-4 mb-4 border-b border-slate-800 flex flex-col items-center">
        <img
          src={logo}
          alt="YIM Blood Donation"
          className="w-20 h-20 rounded-full border-2 border-rose-500 mb-2"
        />
        <h2 className="text-xl font-bold text-white">YIM Blood</h2>
        <p className="text-sm text-slate-400">Donation Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="px-4 space-y-1 text-[15px] font-medium">
        <NavLink
          to="/dashboard"
          end
          onClick={() => setIsOpen(false)}
          className={menuItemClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          onClick={() => setIsOpen(false)}
          className={menuItemClass}
        >
          <Users size={20} />
          Profile
        </NavLink>

        {role === "admin" && (
          <NavLink
            to="/dashboard/all-requests-admin"
            onClick={() => setIsOpen(false)}
            className={menuItemClass}
          >
            <Users size={20} />
            All Donation Requests
          </NavLink>
        )}



        {role === "donor" && (
          <NavLink
            to="/dashboard/add-request"
            onClick={() => setIsOpen(false)}
            className={menuItemClass}
          >
            <MdOutlineAddCircle size={20} />
            Add Donation Request
          </NavLink>
        )}

        <NavLink
          to="/dashboard/my-request"
          onClick={() => setIsOpen(false)}
          className={menuItemClass}
        >
          <NotebookPen size={20} />
          My Donation Requests
        </NavLink>

        {role === "admin" && (
          <NavLink
            to="/dashboard/all-users"
            onClick={() => setIsOpen(false)}
            className={menuItemClass}
          >
            <Users size={20} />
            All Users
          </NavLink>
        )}
      </nav>

      {/* Footer: Home + Logout */}
      <div className="absolute bottom-4 left-0 w-full px-4 flex flex-col gap-2">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 w-full px-4 py-3
          rounded-lg text-slate-300 font-semibold
          border border-slate-700 hover:bg-slate-800 hover:text-white
          transition"
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          to="/login"
          onClick={handleLogOut}
          className="flex items-center gap-3 w-full px-4 py-3
          rounded-lg text-rose-400 font-semibold
          border border-slate-700 hover:bg-rose-600 hover:text-white
          transition"
        >
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
