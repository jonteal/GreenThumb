import App from "@/App";
import { ClientAdd } from "@/pages/Clients/ClientAdd";
import { ClientDetails } from "@/pages/Clients/ClientDetails/ClientDetails";
import { ClientEdit } from "@/pages/Clients/ClientDetails/ClientEdit";
import { ProjectAdd } from "@/pages/Clients/ClientDetails/Project/ProjectAdd";
import { ProjectDetails } from "@/pages/Clients/ClientDetails/Project/ProjectDetails/ProjectDetails";
import { Clients } from "@/pages/Clients/Clients";
import { Dashboard } from "@/pages/Dashboard";
import { ErrorPage } from "@/pages/ErrorPage";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";

export const PageRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/client"
        element={<Clients />}
        handle={{
          title: "Client",
        }}
      />
      <Route path="/client/add" element={<ClientAdd />} />
      <Route path="/client/:clientId" element={<ClientDetails />} />
      <Route path="/client/:clientId/edit" element={<ClientEdit />} />
      <Route path="/client/:clientId/edit" element={<ClientEdit />} />
      <Route
        path="/client/:clientId/project/:clientProjectId"
        element={<ProjectDetails />}
      />
      <Route path="/client/:clientId/project/add" element={<ProjectAdd />} />
    </Routes>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        handle: { title: "Dashboard" },
      },
      {
        path: "/client/:clientId",
        element: <ClientDetails />,
        handle: { title: "Details" },
      },
      {
        path: "/client/:clientId/project/:clientProjectId",
        element: <ProjectDetails />,
        handle: { title: "Details" },
      },
      {
        path: "/client/*",
        element: <Clients />,
        handle: { title: "Clients" },
      },
      {
        path: "*",
        element: <ErrorPage />,
        handle: { title: "Not Found" },
      },
    ],
  },
]);
