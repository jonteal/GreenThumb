type StatusType = "SCHEDULED" | "DELIVERED" | "PICKEDUP";

type PaymentStatusType = "onDelivery" | "onPickup";

export type OrderItemType = {
  cropId: string;
  cropName: string;
  packaging: string;
  unitPrice: number;
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
  templateId: string;
  paymentStatus: PaymentStatusType;
  items: OrderItemType[];
};
