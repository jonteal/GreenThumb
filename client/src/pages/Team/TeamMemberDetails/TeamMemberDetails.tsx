import { useGetTeamMemberById } from "@/services/team/teamServiceHooks";
import { useParams } from "react-router-dom";

export const TeamMemberDetails = () => {
  const { teamMemberId } = useParams();

  const { data: memberDetails } = useGetTeamMemberById(teamMemberId || "");

  console.log("memberDetails: ", memberDetails);
  return <div>TeamMemberDetails</div>;
};
