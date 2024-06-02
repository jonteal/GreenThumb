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
import { ProjectType } from "@/services/project/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { projectStatuses } from "@/services/project/projectServiceHooks";
import { Button } from "@/components/ui/button";

export type ProjectFormProps = {
  onSubmit: (data: ProjectType) => void;
  defaultValues?: Partial<ProjectType>;
};

export const ProjectForm = ({ onSubmit, defaultValues }: ProjectFormProps) => {
  const navigate = useNavigate();
  const form = useForm<ProjectType>({
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
          name="projectName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="projectStatus"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
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
                    {projectStatuses.map((status) => (
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

        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Project</Button>
        </div>
      </form>
    </Form>
  );
};
