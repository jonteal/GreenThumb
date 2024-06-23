import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  orderStatuses,
  packagingOptions,
  paymentStatuses,
  repeatOptions,
  useAddOrder,
} from "@/services/orders/orderServiceHooks";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  OrderFormInputsType,
  OrderItemTestType,
} from "@/services/orders/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomers } from "@/services/customer/customerServiceHooks";
import { Button } from "@/components/ui/button";
import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const OrderAddTest: React.FC = () => {
  const { toast } = useToast();
  const { data: customers, isLoading: isCustomersLoading } = useGetCustomers();

  const { data: crops } = useGetCrops();

  const form = useForm<OrderFormInputsType>({
    defaultValues: {
      items: [{ cropName: "", quantity: 0, price: 0, packaging: "Medium" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const addOrder = useAddOrder({
    onSuccess: () => {
      toast({
        title: "Customer added successfully",
        variant: "success",
      } as any);
    },
  });

  const onSubmit = (data: OrderFormInputsType) => {
    addOrder.mutate(data);

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-bold mb-3">Order Form</h1>
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => {
            return (
              <FormItem className="w-full mr-10">
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
        <Card className="mt-3">
          <CardHeader className="font-bold">Items</CardHeader>
          <CardContent>
            {fields.map((field, index) => (
              <div className="flex flex-row items-end mt-3" key={field.id}>
                <FormField
                  control={form.control}
                  name={`items.${index}.cropName`}
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full mr-10">
                        <FormLabel className="font-bold">Crop</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a crop name" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {crops?.map((crop, index) => (
                              <SelectItem
                                key={`status-${crop}-${index}`}
                                value={crop.cropName}
                              >
                                {crop.cropName}
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
                      <FormItem className="w-full mr-10">
                        <FormLabel className="font-bold">Packaging</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select packaging" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {packagingOptions?.map((option, index) => (
                              <SelectItem
                                key={`status-${option}-${index}`}
                                value={option}
                              >
                                {option}
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
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="w-full mr-10">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem className="w-full mr-10">
                      <FormLabel>Unit Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-row">
          <FormField
            control={form.control}
            name="repeat"
            render={({ field }) => {
              return (
                <FormItem className="w-full mr-10 mt-3">
                  <FormLabel className="font-bold">Repeat</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select repeat option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {repeatOptions?.map((option, index) => (
                        <SelectItem
                          key={`status-${option}-${index}`}
                          value={option}
                        >
                          {option}
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
            name="repeat"
            render={({ field }) => {
              return (
                <FormItem className="w-full mr-10 mt-3">
                  <FormLabel className="font-bold">Payment Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentStatuses?.map((status, index) => (
                        <SelectItem
                          key={`status-${status}-${index}`}
                          value={status}
                        >
                          {status}
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
            name="status"
            render={({ field }) => {
              return (
                <FormItem className="w-full mr-10 mt-3">
                  <FormLabel className="font-bold">Order Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderStatuses?.map((status, index) => (
                        <SelectItem
                          key={`status-${status}-${index}`}
                          value={status}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              );
            }}
          />
        </div>

        {/* <div className="mt-3">
          <h3 className="font-semibold">Total Quantity: {totalQuantity}</h3>
          <h3 className="font-semibold mt-3">Total Price: ${totalPrice}</h3>
        </div> */}

        <div className="mt-5">
          <Button
            className="mr-3 bg-green-600"
            type="button"
            onClick={() => {
              append({
                quantity: 0,
                cropName: "",
                packaging: "Medium",
                price: 0,
              });
            }}
          >
            Add Item
          </Button>
          <Button type="submit">Submit Order</Button>
        </div>
      </form>
    </Form>
  );
};
