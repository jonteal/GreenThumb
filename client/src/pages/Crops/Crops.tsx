import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TasksTable } from "./TasksTable/TasksTable";
import { TaskForm } from "./TaskForm";

import {
  useGetCropById,
  useGetCrops,
  // useUpdateCrop,
} from "@/services/crop/cropServiceHooks";
import { useNavigate } from "react-router-dom";

export const Crops = () => {
  const navigate = useNavigate();
  const { data: crops, isLoading } = useGetCrops();
  const [selectedItem, setSelectedItem] = useState("");

  console.log("selectedItem: ", selectedItem);

  useEffect(() => {
    if (crops && crops.length > 0) {
      setSelectedItem(crops[0].cropId); // Set the first item as the default selected item
    }
  }, [crops]);

  const selectedCropData = crops?.find((crop) => crop.cropId === selectedItem);

  console.log("selectedCropData: ", selectedCropData);

  return (
    <div className="flex flex-row justify-between">
      {/* Crop Library */}
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Library</span>
          <Plus
            onClick={() => {
              navigate("/crops/add");
            }}
          />
        </CardHeader>
        <CardContent className="flex flex-col items-center py-2">
          {crops?.map((crop) => (
            <span
              key={crop.cropId}
              className={`font-bold hover:underline ${
                selectedItem === crop.id ? "active" : ""
              }`}
              onClick={() => setSelectedItem(crop.cropId)}
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
        </CardHeader>
        <CardContent>
          <h2>{selectedCropData?.cropName}</h2>
          {/* Render more data as needed */}
        </CardContent>
      </Card>

      {/* Crop Info */}
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Info</span>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
