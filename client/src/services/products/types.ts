export type PackagesType = {
  packageId?: string;
  size: "Small" | "Medium" | "Large" | "Bulk";
  price: number;
  active: boolean;
};

export type ProductType = {
  productId: string;
  productName: string;
  available: boolean;
  cropName: string;
  cropId: string;
  packages: PackagesType[];
  unitValue: {
    value: number;
    unit: "g" | "oz";
  };
  storageBuffer: number;
  yieldBuffer: number;
};
