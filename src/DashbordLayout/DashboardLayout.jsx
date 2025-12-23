import { Outlet } from "react-router-dom";
import Aside from "../components/Aside/Aside";
import { Menu } from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black/35 backdrop-blur-2xl">

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3
        bg-white  border-b">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost"
        >
          <Menu />
        </button>
        <h1 className="font-semibold">Dashboard</h1>
      </div>

      <div className="flex">
        <Aside isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Content */}
        <main className="flex-1 lg:ml-72 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
