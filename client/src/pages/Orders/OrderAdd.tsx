import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
// import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { useGetCustomers } from "@/services/customer/customerServiceHooks";
import {
  //   orderStatuses,
  //   packagingOptions,
  //   paymentStatuses,
  useAddOrder,
} from "@/services/orders/orderServiceHooks";
import { OrderItemType, OrderType } from "@/services/orders/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { z } from "zod";

// const orderSchema = z.object({
//   orderId: z.string(),
//   customerId: z.string(),
//   customer: z.string(),
//   total: z.number(),
//   status: z.enum(orderStatuses),
//   startDate: z.string(),
//   dueDate: z.string(),
//   repeat: z.string(),
//   templateId: z.string(),
//   paymentStatus: z.enum(paymentStatuses),
// });

// -----------------------------------------

// NOTES ON HOW TO DO THIS

// 1.

// ------------------------------------------

export const OrderAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  //   const [orderItems, setOrderItems] = useState([]);
  //   const [orderItem, setOrderItem] = useState({
  //     cropId: "",
  //     cropName: "",
  //     packaging: "",
  //     unitPrice: 0,
  //     quantity: 0,
  //   });
  const { data: customers, isLoading: isCustomersLoading } = useGetCustomers();
  //   const { data: products, isLoading: isProductLoading } = useGetCrops();

  const addOrder = useAddOrder({
    onSuccess: () => {
      toast({
        title: "Crop added successfully",
        variant: "success",
      } as any);
      navigate("/orders");
    },
  });

  const form = useForm<OrderType>({
    // resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: "",
    },
  });

  const handleAdd = (data: OrderType) => {
    addOrder.mutate(data);
  };

  //   const handleAddItem = (e: any) => {
  //     const formData = new FormData(e.target)

  //     const newItem = {
  //         cropId,
  //         text,
  //         cropName,
  //         packaging,
  //         unitPrice,
  //         quantity,
  //     }
  //   }

  return (
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
                    {customers?.map((customer, index) => (
                      <SelectItem
                        key={`status-${customer}-${index}`}
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
          <CardContent></CardContent>
        </Card>

        <Button>Add Item</Button>

        <Button className="mt-6" type="submit">
          Save Order!
        </Button>
      </form>
    </Form>
  );
};
