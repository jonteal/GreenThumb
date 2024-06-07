export type TaskSelectType =
  | "Prep Trays"
  | "Seed"
  | "Germinate"
  | "Light"
  | "Harvest";

export type TaskType = {
  taskId: string;
  cropId: string;
  day: number;
  task: TaskSelectType;
  info?: string;
};
