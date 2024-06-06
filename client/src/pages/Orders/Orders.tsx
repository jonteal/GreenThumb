import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderTable } from "./OrdersTable/OrdersTable";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomers } from "@/services/customer/customerServiceHooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderType } from "@/services/orders/types";
import { z } from "zod";
import {
  orderStatuses,
  paymentStatuses,
  useAddOrder,
} from "@/services/orders/orderServiceHooks";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const orderSchema = z.object({
  orderId: z.string(),
  customerId: z.string(),
  customer: z.string(),
  total: z.number(),
  status: z.enum(orderStatuses),
  startDate: z.string(),
  dueDate: z.string(),
  repeat: z.string(),
  templateId: z.string(),
  paymentStatus: z.enum(paymentStatuses),
});

export const Orders = () => {
  const navigate = useNavigate();

  const { data: customers, isLoading } = useGetCustomers();

  const form = useForm<OrderType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: "",
    },
  });

  const addOrder = useAddOrder({
    onSuccess: () => {
      toast({
        title: "Crop added successfully",
        variant: "success",
      } as any);
      navigate("/orders");
    },
  });

  const handleAdd = (data: OrderType) => {
    addOrder.mutate(data);
  };
  return (
    <div>
      <Card>
        <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          Graphs
        </CardHeader>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Order</Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>New Order</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                className="w-full flex flex-col items-center"
                onSubmit={form.handleSubmit(handleAdd)}
              >
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel className="font-bold">Customer</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a customer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers?.map((customer) => (
                              <SelectItem
                                key={`status-${customer}`}
                                value={customer.customer}
                              >
                                {customer.customer}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />

                <Card className="w-full mt-6">
                  <CardHeader className="font-bold">Items</CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="customer"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full mt-6">
                            <FormLabel className="font-bold">Product</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {customers?.map((customer) => (
                                  <SelectItem
                                    key={`status-${customer}`}
                                    value={customer.customer}
                                  >
                                    {customer.customer}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        );
                      }}
                    />
                  </CardContent>
                </Card>

                <DialogFooter>
                  <Button className="mt-6" type="submit">
                    Save Order!
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <OrderTable />
      </Card>
    </div>
  );
};
