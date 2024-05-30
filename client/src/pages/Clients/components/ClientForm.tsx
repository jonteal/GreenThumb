import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientType } from "@/services/client/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clientStatuses } from "@/services/client/clientServiceHooks";
import { Button } from "@/components/ui/button";

export type ClientFormProps = {
  onSubmit: (data: ClientType) => void;
  defaultValues?: Partial<ClientType>;
};

export const ClientForm = ({ onSubmit, defaultValues }: ClientFormProps) => {
  const navigate = useNavigate();
  const form = useForm<ClientType>({
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="clientStatus"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientStatuses.map((status) => (
                      <SelectItem key={`status-${status}`} value={status}>
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
          name="clientEmail"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client email" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Client</Button>
        </div>
      </form>
    </Form>
  );
};
