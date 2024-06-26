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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  cropTasks,
  daysOptions,
  unitsOptions,
  useAddCrop,
} from "@/services/crop/cropServiceHooks";
import { CropType } from "@/services/crop/types";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddCrop = () => {
  const navigate = useNavigate();
  const form = useForm<CropType>({
    defaultValues: {
      cropName: "",
      tasks: [{ day: 1, task: "Prep Trays", info: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  });

  const addCrop = useAddCrop({
    onSuccess: () => {
      toast({
        title: "Crop added successfully",
        variant: "success",
      } as any);
      navigate("/crops");
    },
  });

  const handleAdd = (data: CropType) => {
    addCrop.mutate(data);
  };

  return (
    <>
      <h1 className="font-bold">Add crop</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)}>
          <FormField
            control={form.control}
            name="cropName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Crop Name</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3 mt-3"
                    placeholder="Enter crop name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Card className="mt-3">
            <CardHeader className="font-bold">Crop Schedule</CardHeader>
            <CardContent>
              {fields.map((field, index) => (
                <div className="flex flex-row items-start mt-3" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`tasks.${index}.day`}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full mr-10">
                          <FormLabel className="font-bold">Day</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {daysOptions?.map((day, index) => (
                                <SelectItem
                                  key={`day-${day}-${index}`}
                                  value={day.toString()}
                                >
                                  {day}
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
                    name={`tasks.${index}.task`}
                    render={({ field }) => {
                      return (
                        <FormItem className="w-full mr-10">
                          <FormLabel className="font-bold">Tasks</FormLabel>
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
                              {cropTasks?.map((option, index) => (
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
                    name={`tasks.${index}.info`}
                    render={({ field }) => (
                      <FormItem className="w-full mr-10">
                        <FormLabel className="font-bold">Info</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter task info" {...field} />
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

          <Card className="mt-3">
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
          </Card>

          <div className="mt-5">
            <Button
              className="mr-3 bg-green-600"
              type="button"
              onClick={() => {
                append({
                  day: 1,
                  task: "Prep Trays",
                  info: "",
                });
              }}
            >
              Add Item
            </Button>
            <Button className="bg-green-600" type="submit">
              Add crop!
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
