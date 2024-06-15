import { toast } from "@/components/ui/use-toast";
import { useAddTeamMember } from "@/services/team/teamServiceHooks";
import { TeamMemberType } from "@/services/team/types";
import { useNavigate } from "react-router-dom";
import { TeamForm } from "./components/TeamForm";

export const TeamMemberAdd = () => {
  const navigate = useNavigate();

  const addTeamMember = useAddTeamMember({
    onSuccess: () => {
      toast({
        title: "Team Member added successfully",
        variant: "success",
      } as any);
      navigate("/team");
    },
  });

  const handleAdd = (data: TeamMemberType) => {
    addTeamMember.mutate(data);
  };

  return (
    <div className="w-full ml-5">
      <h1 className="mb-3 font-semibold">Add Team Member</h1>
      <TeamForm onSubmit={handleAdd} />
    </div>
  );
};
