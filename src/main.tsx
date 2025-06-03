import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import "./index.css";

const Navbar = lazy(() => import("./components/Navbar"));
const Login = lazy(() => import("./routes/Login"));
const Register = lazy(() => import("./routes/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const container = document.getElementById("root");

if (!container) {
  throw new Error("No se encontró el elemento raíz #root");
}

if (!container._reactRootContainer) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="bg-[#16161a] min-h-screen">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </React.StrictMode>
  );
} else {
  container._reactRootContainer.render(
    <React.StrictMode>
      <div className="bg-[#16161a] min-h-screen">
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </React.StrictMode>
  );
}
