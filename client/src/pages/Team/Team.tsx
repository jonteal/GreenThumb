import { useNavigate } from "react-router-dom";
import { TeamTable } from "./components/TeamTable/TeamTable";
import { Button } from "@/components/ui/button";

export const Team = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Team!</h1>
      <Button className="bg-green-600" onClick={() => navigate("/team/add")}>
        Add Team Member
      </Button>
      <TeamTable />
    </div>
  );
};
