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
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDeatils";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AllRequestsPublic from "../pages/AllRequestsPublic";
import AllRequestsAdmin from "../pages/Admin/AllRequestsAdmin";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import EditRequest from "../pages/Dashboard/EditRequest/EditRequest";
import FundingHistory from "../pages/Dashboard/FundingHistory";
import Error404 from "../pages/Error404";



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
        path: "/all-request-public",
        element: <AllRequestsPublic></AllRequestsPublic>,
      },
      {
        path: "/donation-request/:id",
        element: <DonationDetails></DonationDetails>,
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
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails></BlogDetails>,
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
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "/dashboard/add-request",
        element: <AddRequest />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/my-request",
        element: <MyRequest />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/all-requests-admin",
        element: <AllRequestsAdmin />,
      },
      {
        path: "/dashboard/edit-request/:id",
        element: <EditRequest />,
      },
      {
        path: "/dashboard/funding",
        element: <FundingHistory />,
      },

    ],
  },

  {
    path: "*",
    element: <Error404></Error404>,
  }
]);

export default router;
