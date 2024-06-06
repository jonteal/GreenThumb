import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CustomersTable } from "./components/CustomersTable/CustomersTable";

export const Customers = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customers</h1>
      <Button
        className="bg-green-600"
        onClick={() => navigate("/crm/customer/add")}
      >
        Add Customer
      </Button>
      <CustomersTable />
    </div>
  );
};
