import { useGetClients } from "@/services/client/clientServiceHooks";

export const ClientsTable = () => {
  const { data: clients } = useGetClients();

  console.log("clients: ", clients);
  return <div>ClientsTable</div>;
};
