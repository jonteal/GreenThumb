import App from "@/App";
import { CRM } from "@/pages/CRM/CRM";
import { CustomerAdd } from "@/pages/CRM/Customers/CustomerAdd";
import { CustomerDetails } from "@/pages/CRM/Customers/CustomerDetails";
import { CustomerEdit } from "@/pages/CRM/Customers/CustomerEdit";
import { Customers } from "@/pages/CRM/Customers/Customers";
import { Crops } from "@/pages/Crops/Crops";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { ErrorPage } from "@/pages/ErrorPage";
import { OrderAdd } from "@/pages/Orders/OrderAdd";
import { Orders } from "@/pages/Orders/Orders";
import { Production } from "@/pages/Production/Production";
import { Products } from "@/pages/Products/Products";
import { Schedule } from "@/pages/Schedule/Schedule";
import { Team } from "@/pages/Team/Team";
import { TeamMemberAdd } from "@/pages/Team/TeamMemberAdd";
import { TeamMemberDetails } from "@/pages/Team/TeamMemberDetails/TeamMemberDetails";
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
      <Route path="/crops/:cropId" element={<Crops />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/add" element={<OrderAdd />} />
      <Route
        path="/crm/customer"
        element={<Customers />}
        handle={{
          title: "Customer",
        }}
      />
      <Route path="/crm/customer/add" element={<CustomerAdd />} />
      <Route path="/crm/customer/:customerId" element={<CustomerDetails />} />
      <Route path="/crm/customer/:customerId/edit" element={<CustomerEdit />} />

      <Route path="/team" element={<Team />} />
      <Route path="/team/add" element={<TeamMemberAdd />} />
      <Route path="/team/:teamMemberId" element={<TeamMemberDetails />} />
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
        element: <CustomerDetails />,
        handle: { title: "Details" },
      },
      {
        path: "/customer/*",
        element: <Customers />,
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
