export type ProductType = {
  id: string;
  productId: string;
  productName: string;
  available: boolean;
  packaging: {
    size: "Small" | "Medium" | "Large" | "Bulk";
    price: number;
  };
  unitValue: {
    value: number;
    unit: "g" | "oz";
  };
  storageBuffer: number;
  yieldBuffer: number;
};
