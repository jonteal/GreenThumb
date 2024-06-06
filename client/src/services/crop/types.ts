export type TasksType =
  | "Prep Trays"
  | "Seed"
  | "Germinate"
  | "Light"
  | "Harvest";

export type UnitsType = "g" | "oz";

export type CropType = {
  id: string;
  cropId: string;
  cropName: string;
  growSchedule: {
    day: number;
    task: TasksType;
    info: string;
  }[];
  cropInfo: {
    yieldAmount: number;
    unit: UnitsType;
    notes: string;
  };
};
