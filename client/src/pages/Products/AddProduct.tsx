import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

import {
  sizeOptions,
  useAddProduct,
} from "@/services/products/productServiceHooks";
import { ProductType } from "@/services/products/types";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm<ProductType>({
    defaultValues: {
      productName: "",
      packages: [{ active: false, size: "Small", price: 0 }],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "packages",
  });

  console.log("fields: ", fields);

  const addProduct = useAddProduct({
    onSuccess: () => {
      toast({
        title: "Crop added successfully",
        variant: "success",
      } as any);
      navigate("/products");
    },
  });

  const handleAdd = (data: ProductType) => {
    addProduct.mutate(data);
  };

  return (
    <>
      <h1 className="font-bold">Add Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)}>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Product Name</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3 mt-3"
                    placeholder="Enter product name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-3">
                <FormLabel className="font-bold">Available</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Card className="mt-3">
            <CardHeader className="font-bold">Packages</CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div
                  className="flex flex-row items-end justify-between mt-3"
                  key={field.id}
                >
                  <div className="flex flex-row mt-3 justify-between w-full mr-20">
                    <FormField
                      control={form.control}
                      name={`packages.${index}.active`}
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/4 mr-10 flex flex-col">
                            <FormLabel className="font-bold">Active</FormLabel>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked)
                              }
                            />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`packages.${index}.size`}
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full mr-10 flex flex-col">
                            <FormLabel className="font-bold">Size</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Task" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizeOptions?.map((option, index) => (
                                  <SelectItem
                                    key={`task-${option}-${index}`}
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
                      name={`packages.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="col-span-3 mt-3"
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mr-3 mt-5 bg-green-600"
                type="button"
                onClick={() => {
                  append({
                    active: false,
                    size: "Medium",
                    price: 0,
                  });
                }}
              >
                Add Item
              </Button>
            </CardContent>
          </Card>

          {/* <Card className="mt-3">
            <CardContent className="flex flex-col justify-between">
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="yieldAmount"
                  render={({ field }) => (
                    <FormItem className="mt-3 w-1/2">
                      <FormLabel className="font-bold">Yield</FormLabel>
                      <FormControl>
                        <Input
                          className="col-span-3 mt-3"
                          placeholder="Enter yield amount"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <p className="mt-3 mx-5 font-bold">x</p>

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2 mr-10 mt-3">
                        <FormLabel className="font-bold">Unit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Task" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {unitsOptions?.map((option, index) => (
                              <SelectItem
                                key={`unit-${option}-${index}`}
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

                <p className="mt-3 mx-5 font-bold">/tray</p>
              </div>

              <div className="flex flex-col mt-3">
                <FormField
                  control={form.control}
                  name="lot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold mt-3">Lot</FormLabel>
                      <FormControl>
                        <Input
                          className="col-span-3 mt-3"
                          placeholder="Enter lot"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="w-full mr-10 mt-3">
                      <FormLabel className="font-bold">Info</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter task info" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card> */}

          <div className="mt-5">
            <Button className="bg-green-600" type="submit">
              Add Product!
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
