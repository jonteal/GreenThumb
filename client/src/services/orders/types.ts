type StatusType = "SCHEDULED" | "DELIVERED" | "PICKEDUP";

type PaymentStatusType = "onDelivery" | "onPickup";

export type OrderItemType = {
  cropId: string;
  cropName: string;
  packaging: string;
  price: number;
  quantity: number;
};

export type OrderType = {
  id: string;
  orderId: string;
  customerId: string;
  customer: string;
  total: number;
  status: StatusType;
  startDate: string;
  dueDate: string;
  repeat: string;
  // templateId: string; todo: maybe add this later
  paymentStatus: PaymentStatusType;
  items: OrderItemType[];
};

export type OrderItemTestType = {
  id?: string;
  cropName: string;
  packaging: string;
  quantity: number;
  price: number;
};

export type OrderFormInputsType = {
  orderId?: string;
  customer?: string;
  customerId?: string;
  items: OrderItemTestType[];
  repeat?: string;
  paymentStatus?: "onDelivery" | "onPickup";
  status: StatusType;
  total?: number;
  price?: number;
  startDate: string;
  dueDate: string;
};
