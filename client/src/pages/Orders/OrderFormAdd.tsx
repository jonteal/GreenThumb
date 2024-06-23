import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useOrder } from "../../context/OrderContext";
import { OrderDetails } from "./OrderDetails";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCustomers } from "@/services/customer/customerServiceHooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  packagingOptions,
  useAddOrder,
} from "@/services/orders/orderServiceHooks";
import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { OrderFormInputsType } from "@/services/orders/types";
import { useToast } from "@/components/ui/use-toast";

export type FormValues = {
  productId: string;
  price: number;
  quantity: number;
  customer: string;
  packaging: string;
  cropName: string;
};

export const OrderFormAdd: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<OrderFormInputsType>({
    defaultValues: {
      items: [{ name: "", quantity: 0, price: 0, packaging: "Medium" }],
    },
  });
  const { dispatch } = useOrder();
  const { data: customers, isLoading: isCustomersLoading } = useGetCustomers();
  const { data: crops } = useGetCrops();

  const addOrder = useAddOrder({
    onSuccess: () => {
      toast({
        title: "Customer added successfully",
        variant: "success",
      } as any);
    },
  });

  const onSubmit = (data: OrderFormInputsType) => {
    console.log("onSubmit Data", data);
    addOrder.mutate(data);

    form.reset();
  };

  const handleAddItemSubmit = (data: FormValues) => {
    const product = {
      id: data.productId,
      cropName: data.cropName,
      price: data.price,
      quantity: data.quantity,
      packaging: data.packaging,
    };

    dispatch({ type: "ADD_PRODUCT", product });
    form.reset();
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <>
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
          <Card className="flex flex-col mt-3">
            <CardHeader className="font-bold">Items</CardHeader>
            <CardContent className="flex flex-row">
              {/* <div>
                <label htmlFor="productId">Product ID</label>
                <Input
                  id="productId"
                  {...form.register("productId", { required: true })}
                />
              </div> */}
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

              {/* <FormField
                control={form.control}
                name="cropName"
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
                name="packaging"
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
                name="price"
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
              <FormField
                control={form.control}
                name="quantity"
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
              /> */}
            </CardContent>
          </Card>
          {/* <Button type="submit">Submit Order</Button> */}
        </form>
      </Form>
      <Button className="bg-green-600 mt-3" onClick={handleAddItemSubmit}>
        Add to Order
      </Button>

      <OrderDetails />
    </>
  );
};
