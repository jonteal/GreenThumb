export type UnitsType = "g" | "oz";

export type CropType = {
  id: string;
  cropId: string;
  cropName: string;
  yieldAmount: number;
  unit: UnitsType;
  notes: string;
};
