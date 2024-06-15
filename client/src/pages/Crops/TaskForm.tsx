import { Button } from "@/components/ui/button";

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
import { toast } from "@/components/ui/use-toast";
import { cropTasks } from "@/services/crop/cropServiceHooks";
import { useAddTask } from "@/services/task/taskServiceHooks";
import { TaskType } from "@/services/task/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const TaskForm = () => {
  const navigate = useNavigate();
  const form = useForm<TaskType>();
  const addTask = useAddTask({
    onSuccess: () => {
      toast({
        title: "Crop schedule added successfully",
        variant: "success",
      } as any);
      navigate("/crops");
    },
  });

  const handleAdd = (data: TaskType) => {
    addTask.mutate(data);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)}>
          <div className="flex flex-row">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="mt-3 w-1/4 mr-5">
                  <FormLabel>Day</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      // placeholder="Day"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="task"
              render={({ field }) => {
                return (
                  <FormItem className="mt-3 w-3/4">
                    <FormLabel>Task</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a task" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cropTasks.map((task) => (
                          <SelectItem key={`task-${task}`} value={task}>
                            {task}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Info</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3"
                    placeholder="Enter task info..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="bg-green-600 mt-3" type="submit">
            Add task!
          </Button>
        </form>
      </Form>
    </>
  );
};
