import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./router/MainRouter.jsx";
import AuthProvider from "./providers/AuthContext";
import { SkeletonTheme } from "react-loading-skeleton";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <AuthProvider>
      <RouterProvider router={MainRouter}></RouterProvider>
    </AuthProvider>
    </SkeletonTheme>
  </React.StrictMode>
);
