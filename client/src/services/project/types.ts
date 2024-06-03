export type ProjectType = {
  clientProjectId: string;
  clientId: string;
  projectName: string;
  projectStatus: "ACTIVE" | "INACTIVE";
  startDate: string;
  endDate: string;
  estimate: number;
  budget: number;
};
