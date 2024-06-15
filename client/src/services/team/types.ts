export type TeamMemberType = {
  id: string;
  teamMemberId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phoneNumber?: string;
  email?: string;
};

export type TeamType = TeamMemberType[];
