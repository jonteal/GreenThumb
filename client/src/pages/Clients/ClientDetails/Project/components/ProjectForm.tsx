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
import { useNavigate, useParams } from "react-router-dom";
import { projectStatuses } from "@/services/project/projectServiceHooks";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const projectSchema = z.object({
  clientId: z.string(),
  projectName: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  projectStatus: z.enum(projectStatuses),
});

export type ProjectFormProps = {
  onSubmit: (data: ProjectType) => void;
  project?: Partial<ProjectType>;
};

export const ProjectForm = ({ onSubmit, project }: ProjectFormProps) => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      clientId,
      ...project,
    },
  });
  return (
    <Form {...form}>
      <form
        id="project-form"
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
