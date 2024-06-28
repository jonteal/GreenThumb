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
  packages: PackagesType[];
  unitValue: {
    value: number;
    unit: "g" | "oz";
  };
  storageBuffer: number;
  yieldBuffer: number;
};
