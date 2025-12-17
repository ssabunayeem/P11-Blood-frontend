import { createBrowserRouter } from "react-router";



import RootLayout from "../rootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import DashboardLayout from "../DashbordLayout/DashboardLayout";
import MainDashboardLayout from "../pages/MainDashboard/MainDashboardLayout";

import ManageProduct from "../DashbordLayout/ManageProduct/ManageProduct";
import AddRequest from "../DashbordLayout/AddRequest/AddRequest";

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
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <MainDashboardLayout />,
      },
      {
        path: "add-request",
        element: <AddRequest />,
      },
      {
        path: "manage-products",
        element: <ManageProduct />,
      },
    ],
  },
]);

export default router;
