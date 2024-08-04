import { DeleteButton } from "@/components/DeleteButton";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteCustomer,
  useGetCustomerById,
} from "@/services/customer/customerServiceHooks";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerDetailsCard } from "./components/CustomerDetailsCard";
import { Button } from "@/components/ui/button";
import { OrdersTable } from "./components/OrdersTable";

export const CustomerDetails = () => {
  const navigate = useNavigate();
  const { customerId = "" } = useParams();
  const { data: customer, isLoading } = useGetCustomerById(customerId);

  const deleteCustomerMutation = useDeleteCustomer();

  const handleDelete = () => {
    deleteCustomerMutation.mutate(customerId, {
      onSuccess: () => {
        toast({
          title: "Customer deleted successfully",
          variant: "success" as any,
        });
        navigate("/crm/customer");
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
          <DeleteButton label="Delete Customer" handleDelete={handleDelete} />
        </div>
      </header>
      <div>
        <CustomerDetailsCard customer={customer} />
        <OrdersTable />
      </div>
    </>
  );
};
