import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCustomer,
  useGetCustomerById,
} from "@/services/customer/customerServiceHooks";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerDetailsCard } from "./components/CustomerDetailsCard";
import { Button } from "@/components/ui/button";
import { ProjectsTable } from "./Project/components/ProjectTable/ProjectTable";
import { OrderTable } from "@/pages/Orders/OrdersTable/OrdersTable";
import { OrdersTable } from "./components/OrdersTable";

export const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId = "" } = useParams();
  const { data: customer, isLoading } = useGetCustomerById(customerId);

  const deleteCustomerMutation = useDeleteCustomer();

  console.log("test details component");

  const handleDelete = () => {
    deleteCustomerMutation.mutate(customerId, {
      onSuccess: () => {
        toast({
          title: "Customer deleted successfully",
          variant: "success" as any,
        });
        navigate("/customer");
      },
      onError: (error) => {
        toast({
          title: "Error delete customer",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading || !customer) return <div>Loading...</div>;
  return (
    <>
      <header className="flex justify-between items-end mt-6">
        <div>
          <Button
            onClick={() => navigate(`/crm/customer/${customerId}/project/add`)}
          >
            Add Project
          </Button>
          <DeleteButton label="Delete Customer" handleDelete={handleDelete} />
        </div>
      </header>
      <div>
        <CustomerDetailsCard customer={customer} />
        {/* <ProjectsTable /> */}
        <OrdersTable />
      </div>
    </>
  );
};
