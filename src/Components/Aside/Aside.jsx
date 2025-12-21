import { NavLink } from "react-router";
import { LayoutDashboard, Users, LogOut, NotebookPen } from "lucide-react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "./../../firebase/firebase.config";

const Aside = () => {
  const { role } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col">
      {/* Logo / Header */}
      <div className="px-6 py-5 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-400">Control Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {role == "donor" && (
          <NavLink to="/dashboard/add-request" className={linkClass}>
            <MdOutlineAddCircle size={20} />
            Add Request
          </NavLink>
        )}

        {role == "admin" && (
          <NavLink to="/dashboard/all-users" className={linkClass}>
            <Users size={20} />
            All Users
          </NavLink>
        )}

        <NavLink to="/dashboard/my-request" className={linkClass}>
          <NotebookPen size={20} />
          My Request
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;
