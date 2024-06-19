import { useNavigate, useParams } from "react-router-dom";
import { CustomerForm } from "./components/CustomerForm";
import {
  useGetCustomerById,
  useUpdateCustomer,
} from "@/services/customer/customerServiceHooks";
import { useToast } from "@/components/ui/use-toast";
import { CustomerType } from "@/services/customer/types";

export const CustomerEdit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { customerId = "" } = useParams();

  const { data: customer, isLoading } = useGetCustomerById(customerId);

  console.log("customer: ", customer);

  const updateCustomerMutation = useUpdateCustomer({
    onSuccess: () => {
      toast({
        title: "Customer updated successfully",
        variant: "primary",
      } as any);
      navigate(`/crm/customer/${customerId}`);
    },
  });

  const handleEdit = (data: CustomerType) => {
    updateCustomerMutation.mutate({ ...customer, ...data });
  };

  if (isLoading || !customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Customer</h1>
      <CustomerForm onSubmit={handleEdit} defaultValues={customer} />
    </div>
  );
};
