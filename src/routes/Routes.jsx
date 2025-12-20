import { createBrowserRouter } from "react-router";
import RootLayout from "../rootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import DonateRequests from "../Pages/Dashboard/DonateRequests";
import ManageUsers from "../Pages/Dashboard/ManageUsers";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Register></Register>
      },

    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/main",
        element: <MainDashboard></MainDashboard>
      },
      {
        path: "/dashboard/donations",
        element: <DonateRequests></DonateRequests>
      },
      {
        path: "/dashboard/users",
        element: <ManageUsers></ManageUsers>
      }
    ],
  }
]);

export default router;
