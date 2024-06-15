import { useToast } from "@/components/ui/use-toast";
import { useAddCustomer } from "@/services/customer/customerServiceHooks";
import { useNavigate } from "react-router-dom";
import { CustomerForm } from "./components/CustomerForm";
import { CustomerType } from "@/services/customer/types";

export const CustomerAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addCustomer = useAddCustomer({
    onSuccess: () => {
      toast({
        title: "Customer added successfully",
        variant: "success",
      } as any);
      navigate("/customer");
    },
  });

  const handleAdd = (data: CustomerType) => {
    addCustomer.mutate(data);
  };

  return (
    <div className="w-full ml-5">
      <h1 className="mb-3 font-semibold">Add Customer</h1>
      <CustomerForm onSubmit={handleAdd} />
    </div>
  );
};
