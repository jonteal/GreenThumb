import { DeleteButton } from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteClient,
  useGetClientById,
} from "@/services/client/clientServiceHooks";
import { useNavigate, useParams } from "react-router-dom";

export const ClientDetails = () => {
  const navigate = useNavigate();
  const { clientId = "" } = useParams();
  const { data: client, isLoading } = useGetClientById(clientId);

  const deleteClientMutation = useDeleteClient();

  const handleDelete = () => {
    deleteClientMutation.mutate(clientId, {
      onSuccess: () => {
        toast({
          title: "Client deleted successfully",
          variant: "success" as any,
        });
        navigate("/client");
      },
      onError: (error) => {
        toast({
          title: "Error delete client",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };
  return (
    <>
      <header className="flex justify-between items-end mt-6">
        <div>
          <h1 className="text-4xl font-bold mb-1 text-gray-800">
            {client?.clientName}
          </h1>
        </div>
        <div>
          <DeleteButton label="Delete Client" handleDelete={handleDelete} />
        </div>
      </header>
      <div></div>
    </>
  );
};
