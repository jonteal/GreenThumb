import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { AddCrop } from "./AddCrop";
import { useGetCropById, useGetCrops } from "@/services/crop/cropServiceHooks";
import { useState } from "react";
import { AddSchedule } from "./AddSchedule";

export const Crops = () => {
  const { data: crops, isLoading } = useGetCrops();
  const [activeItem, setActiveItem] = useState(crops?.[0].cropId);
  const { data: crop } = useGetCropById(activeItem || "");

  console.log("crop: ", crop);

  console.log("activeItem: ", activeItem);

  return (
    <div className="flex flex-row justify-between">
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
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/2">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Grow Schedule</span>
          <AddSchedule />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
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
