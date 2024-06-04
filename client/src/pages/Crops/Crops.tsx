import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const Crops = () => {
  return (
    <div className="flex flex-row justify-between">
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Library</span>
          <Plus />
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/2">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Grow Schedule</span>
          <Plus />
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
