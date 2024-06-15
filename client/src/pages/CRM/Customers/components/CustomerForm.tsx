import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CustomerType } from "@/services/customer/types";

export type CustomerFormProps = {
  onSubmit: (data: CustomerType) => void;
  defaultValues?: Partial<CustomerType>;
};

export const CustomerForm = ({
  onSubmit,
  defaultValues,
}: CustomerFormProps) => {
  const navigate = useNavigate();
  const form = useForm<CustomerType>({
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <div className="flex flex-row w-full">
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter customer address..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row w-full mt-5">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter customer city"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateProvince"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state / province" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row w-full mt-5">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full mr-10">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter postal code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button className="bg-green-600" type="submit">
            Save Customer
          </Button>
        </div>
      </form>
    </Form>
  );
};
