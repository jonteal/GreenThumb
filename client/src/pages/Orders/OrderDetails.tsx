import { useGetOrderById } from "@/services/orders/orderServiceHooks";
import { useParams } from "react-router-dom";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const { data: order } = useGetOrderById(orderId || "");
  console.log("order", order);
  return (
    <div>
      <h2 className="font-bold">Order Details</h2>
    </div>
  );
};
