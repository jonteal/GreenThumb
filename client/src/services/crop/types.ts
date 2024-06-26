export type UnitsType = "g" | "oz";

export type TaskSelectType =
  | "Prep Trays"
  | "Seed"
  | "Germinate"
  | "Light"
  | "Harvest";

export type TaskType = {
  taskId?: string;
  cropId?: string;
  day: number;
  task: TaskSelectType;
  info?: string;
};

export type CropType = {
  id: string;
  cropId: string;
  cropName: string;
  yieldAmount: number;
  unit: UnitsType;
  notes: string;
  tasks: TaskType[];
  lot: string;
};
