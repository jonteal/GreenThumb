import { useToast } from "@/components/ui/use-toast";
import { useAddClient } from "@/services/client/clientServiceHooks";
import { ClientType } from "@/services/client/types";
import { useNavigate } from "react-router-dom";
import { ClientForm } from "./components/ClientForm";

export const ClientAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const addClient = useAddClient({
    onSuccess: () => {
      toast({
        title: "Client added successfully",
        variant: "success",
      } as any);
      navigate("/client");
    },
  });

  const handleAdd = (data: ClientType) => {
    addClient.mutate(data);
  };

  return (
    <div>
      <h1>Add Client</h1>
      <ClientForm onSubmit={handleAdd} />
    </div>
  );
};
