import App from "@/App";
import { CRM } from "@/pages/CRM/CRM";
import { CustomerAdd } from "@/pages/CRM/Clients/ClientAdd";
import { ClientDetails } from "@/pages/CRM/Clients/ClientDetails/ClientDetails";
import { ClientEdit } from "@/pages/CRM/Clients/ClientDetails/ClientEdit";
import { ProjectAdd } from "@/pages/CRM/Clients/ClientDetails/Project/ProjectAdd";
import { ProjectDetails } from "@/pages/CRM/Clients/ClientDetails/Project/ProjectDetails/ProjectDetails";
import { Clients } from "@/pages/CRM/Clients/Clients";
import { Crops } from "@/pages/Crops/Crops";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { ErrorPage } from "@/pages/ErrorPage";
import { Orders } from "@/pages/Orders/Orders";
import { Production } from "@/pages/Production/Production";
import { Products } from "@/pages/Products/Products";
import { Schedule } from "@/pages/Schedule/Schedule";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";

export const PageRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/production" element={<Production />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/products" element={<Products />} />
      <Route path="/crops" element={<Crops />} />
      <Route path="/orders" element={<Orders />} />
      <Route
        path="/customer"
        element={<Clients />}
        handle={{
          title: "Customer",
        }}
      />
      <Route path="/customer/add" element={<CustomerAdd />} />
      <Route path="/customer/:customerId" element={<ClientDetails />} />
      <Route path="/customer/:customerId/edit" element={<ClientEdit />} />
      <Route path="/customer/:customerId/edit" element={<ClientEdit />} />
      <Route
        path="/customer/:customerId/project/:customerProjectId"
        element={<ProjectDetails />}
      />
      <Route
        path="/customer/:customerId/project/add"
        element={<ProjectAdd />}
      />
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
        path: "/customer/:customerId",
        element: <ClientDetails />,
        handle: { title: "Details" },
      },
      {
        path: "/customer/:customerId/project/:customerProjectId",
        element: <ProjectDetails />,
        handle: { title: "Details" },
      },
      {
        path: "/customer/*",
        element: <Clients />,
        handle: { title: "Customers" },
      },
      {
        path: "*",
        element: <ErrorPage />,
        handle: { title: "Not Found" },
      },
    ],
  },
]);
