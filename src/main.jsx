import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import AdminLayout from "./Admin/AdminComponent/AdminLaout";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import ProtectedRoutes from "./Admin/utils/ProtectedRoutes";
import MainLayout from "./Components/Layout/MainLayout";
import InfoUpdate from "./Admin/Pages/InfoUpdate";
import ProjectUpdate from "./Admin/Pages/ProjectUpdate";
import ExperienceUpdate from "./Admin/Pages/ExperienceUpdate";

/* VITE_SERVER_API=https://mernstackportfoliobackend-teds3zq3.b4a.run/info */

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Uncomment and define the login route if you have a login page
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
    ],
  },
  /* Admin Panel ------------------------------- */
  {
    path: "",
    element: (
      <ProtectedRoutes>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/infoupdate",
        element: <InfoUpdate />,
      },
      {
        path: "/projectsupdate",
        element: <ProjectUpdate />,
      },
      {
        path: "/experienceupdate",
        element: <ExperienceUpdate />,
      },
      // Add more routes as needed
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
