import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Loading from "./components/Loading";
import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";

const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));
const Overview = lazy(() => import("./routes/Overview"));
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const CreateBoard = lazy(() => import("./routes/CreateBoard"));
const Boards = lazy(() => import("./routes/Boards"));

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Navigate to="/register" replace /> 
  },
  {
    element: <DashboardLayout><Outlet /></DashboardLayout>,
    children: [
      { path: "dashboard/overview", element: <Overview /> },
      { path: "dashboard/create-board", element: <CreateBoard /> },
      { path: "dashboard/boards", element: <Boards /> },
    ],
  },
  { path: "*", element: <Navigate to="/login" /> },
]);

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento raíz #root");
}

const root = ReactDOM.createRoot(container);
root.render(
  <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>

    <AuthProvider>
      <NotificationProvider>
        <div className="bg-[#16161a] min-h-screen text-white">
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </div>
      </NotificationProvider>
    </AuthProvider>
  </SnackbarProvider>
);
