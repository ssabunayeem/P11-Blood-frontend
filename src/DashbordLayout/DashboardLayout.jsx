import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex ">
      <Aside />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardLayout;
