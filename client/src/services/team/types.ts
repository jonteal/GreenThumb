export type TeamMemberType = {
  teamMemberId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
};

export type TeamType = TeamMemberType[];
