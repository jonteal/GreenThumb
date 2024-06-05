import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientsTable } from "./components/ClientsTable/ClientsTable";

export const Clients = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customers</h1>
      <Button
        className="bg-green-600"
        onClick={() => navigate("/customer/add")}
      >
        Add Customer
      </Button>
      <ClientsTable />
    </div>
  );
};
