import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AddCrop } from "./AddCrop";
import {
  useGetCropById,
  useGetCrops,
  useUpdateCrop,
} from "@/services/crop/cropServiceHooks";
import { useState } from "react";
import { AddSchedule } from "./AddSchedule";

import { toast } from "@/components/ui/use-toast";
import { CropType, GrowScheduleListType } from "@/services/crop/types";
import { AddTaskForm } from "./AddTaskForm";
import { Tasks } from "./Tasks";
import { useGetTasks } from "@/services/task/taskServiceHooks";
import { TasksTable } from "./TasksTable/TasksTable";

export const Crops = () => {
  const { data: crops, isLoading } = useGetCrops();
  const [activeItem, setActiveItem] = useState(crops?.[0].cropId);
  const [addingTask, setAddingTask] = useState(false);
  const { data: crop } = useGetCropById(activeItem || "");
  const { data: tasksData } = useGetTasks();

  console.log("tasksData: ", tasksData);

  const updateCrop = useUpdateCrop({
    onSuccess: () => {
      toast({
        title: "Customer added successfully",
        variant: "success",
      } as any);
    },
  });
  console.log("crop: ", crop);

  const tasks: GrowScheduleListType = [
    {
      taskId: "1",
      day: 1,
      task: "Germinate",
      info: "Soak seeds to prepare for germination",
    },
    {
      taskId: "2",
      day: 2,
      task: "Seed",
      info: "Spread seeds on tray and cover with weight",
    },
  ];

  return (
    <div className="flex flex-row justify-between">
      {/* Crop Library */}
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Library</span>
          <AddCrop />
        </CardHeader>
        <CardContent className="flex flex-col items-center py-2">
          {crops?.map((crop) => (
            <span
              key={crop.cropId}
              className="font-bold hover:underline"
              onClick={() => setActiveItem(crop.cropId)}
            >
              {crop.cropName}
            </span>
          ))}
        </CardContent>
      </Card>

      {/* Grow Schedule */}
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/2">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Grow Schedule</span>
          <Plus onClick={() => setAddingTask(!addingTask)} />
        </CardHeader>
        <CardContent>
          {/* <AddTaskForm /> */}
          {addingTask && <AddSchedule />}
          <TasksTable />
          {/* <Tasks tasks={tasks} /> */}
        </CardContent>
      </Card>

      {/* Crop Info */}
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Info</span>

          <Plus />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
