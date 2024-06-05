import { useToast } from "@/components/ui/use-toast";
import { useAddCustomer } from "@/services/client/clientServiceHooks";
import { CustomerType } from "@/services/client/types";
import { useNavigate } from "react-router-dom";
import { ClientForm } from "./components/ClientForm";

export const CustomerAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addClient = useAddCustomer({
    onSuccess: () => {
      toast({
        title: "Client added successfully",
        variant: "success",
      } as any);
      navigate("/client");
    },
  });

  const handleAdd = (data: CustomerType) => {
    addClient.mutate(data);
  };

  return (
    <div>
      <h1>Add Client</h1>
      <ClientForm onSubmit={handleAdd} />
    </div>
  );
};
