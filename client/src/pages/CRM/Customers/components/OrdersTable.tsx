import { useGetOrdersByCustomerId } from "@/services/orders/orderServiceHooks";
import { useParams } from "react-router-dom";

export const OrdersTable = () => {
  const { customerId } = useParams();
  const { data: orders } = useGetOrdersByCustomerId(customerId || "");

  console.log("customerId: ", customerId);

  console.log("orders", orders);
  return <div>OrdersTable</div>;
};
