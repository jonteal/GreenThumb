import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCustomerById } from "@/services/customer/customerServiceHooks";
import { useGetOrderById } from "@/services/orders/orderServiceHooks";
import { OrderItemType } from "@/services/orders/types";
import { CreditCard } from "lucide-react";
import { useParams } from "react-router-dom";

export const OrderDetails = () => {
  const { orderId } = useParams();

  const { data: order } = useGetOrderById(orderId || "");
  console.log("order", order);

  console.log("order.customerId", order?.customerId);

  const { data: customer } = useGetCustomerById(order?.customerId || "");

  console.log("customer: ", customer);

  function sumPrices(items: OrderItemType[]) {
    return items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  // Example usage:

  let subTotal;

  if (order?.items) {
    subTotal = sumPrices(order.items);
  }
  console.log("subTotal", subTotal);

  return (
    <Card>
      <CardHeader className="font-bold">Order Details</CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            {order?.items.map((item, index) => (
              <li
                key={`${item.cropId}-${index}`}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">
                  {item.cropName} x <span>{item.quantity}</span>
                </span>
                <span>${item.quantity * item.unitPrice}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subTotal}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$5.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${subTotal && (subTotal * 0.065).toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>
                ${`${subTotal && subTotal + 5 + (subTotal * 0.065).toFixed(2)}`}
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{customer?.customer}</span>
              <span>{customer?.address}</span>
              <span>{`${customer?.city}, ${customer?.stateProvince} ${customer?.postalCode}`}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{customer?.customer}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">{customer?.email}</dt>
              <dd>
                <a href="mailto:">{customer?.email}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">{customer?.phone}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Visa
              </dt>
              <dd>**** **** **** 4532</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};
