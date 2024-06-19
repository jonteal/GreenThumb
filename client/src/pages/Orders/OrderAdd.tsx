import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { useGetCustomers } from "@/services/customer/customerServiceHooks";
import {
  orderStatuses,
  packagingOptions,
  paymentStatuses,
  useAddOrder,
} from "@/services/orders/orderServiceHooks";
import { OrderItemType, OrderType } from "@/services/orders/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

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

export const OrderAdd = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: customers, isLoading: isCustomersLoading } = useGetCustomers();
  const { data: products, isLoading: isProductLoading } = useGetCrops();

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
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: "",
    },
  });

  const handleAdd = (data: OrderType) => {
    addOrder.mutate(data);
  };

  let itemsList: OrderItemType[] = [];

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
            {itemsList.map((item, index) => (
              <div key={`${item.cropName}-${index}`}>
                <FormField
                  control={form.control}
                  name={`items.${index}.cropName`}
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
                            {products?.map((product) => (
                              <SelectItem
                                key={`status-${product}`}
                                value={product.cropName}
                              >
                                {product.cropName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.packaging`}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full mt-6">
                        <FormLabel className="font-bold">Packaging</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a packaging option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {packagingOptions?.map((size) => (
                              <SelectItem key={`status-${size}`} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Info</FormLabel>
                      <FormControl>
                        <Input
                          className="col-span-3"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          className="col-span-3"
                          placeholder="Enter quantity..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Button>Add Item</Button>

        <Button className="mt-6" type="submit">
          Save Order!
        </Button>
      </form>
    </Form>
  );
};
