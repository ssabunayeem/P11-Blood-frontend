import { createBrowserRouter } from "react-router";
import RootLayout from "../rootLayout/RootLayout";
import Home from "../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import DashboardLayout from "../DashbordLayout/DashboardLayout";
import MainDashboardLayout from "../pages/Dashboard/MaindashboardLayout/MainDashboardLayout";

import ManageProduct from "../DashbordLayout/ManageProduct/ManageProduct";
import AddRequest from "../pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyRequest from "../pages/Dashboard/MyRequest/MyRequest";
import Donate from "../pages/Donate/Donate";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import SearchRequest from "../pages/searchRequest/SearchRequest";

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
      {
        path: "/search-request",
        element: <SearchRequest></SearchRequest>,
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate></Donate>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
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
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "my-request",
        element: <MyRequest />,
      },
    ],
  },
]);

export default router;
