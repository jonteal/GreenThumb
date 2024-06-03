import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClientsTable } from "./components/ClientsTable/ClientsTable";

export const Clients = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Clients</h1>
      <Button onClick={() => navigate("/client/add")}>Add Client</Button>
      <ClientsTable />
    </div>
  );
};
