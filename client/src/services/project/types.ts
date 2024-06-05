export type ProjectType = {
  customerProjectId: string;
  customerId: string;
  projectName: string;
  projectStatus: "ACTIVE" | "INACTIVE";
  startDate: string;
  endDate: string;
  estimate: number;
  budget: number;
};
