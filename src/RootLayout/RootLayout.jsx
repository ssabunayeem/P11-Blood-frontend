import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-[700px] pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
