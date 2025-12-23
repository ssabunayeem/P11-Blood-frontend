import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </>
);
