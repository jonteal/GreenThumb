import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAddCrop, useGetCrops } from "@/services/crop/cropServiceHooks";
import { CropType } from "@/services/crop/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Crops = () => {
  const navigate = useNavigate();
  const { data: crops, isLoading } = useGetCrops();
  console.log("crops: ", crops);
  const form = useForm<CropType>({
    defaultValues: {
      cropId: "",
      cropName: "",
    },
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
    <div className="flex flex-row justify-between">
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-between py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          <span className="mr-3">Crop Library</span>
          <Dialog>
            <DialogTrigger asChild>
              <Plus />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add crop</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAdd)}>
                  <FormField
                    control={form.control}
                    name="cropName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Crop Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="col-span-3"
                                  placeholder="Enter crop name"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                  <DialogFooter>
                    <Button className="bg-green-600" type="submit">
                      Add crop!
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-2">
          {crops?.map((crop) => (
            <span className="font-bold">{crop.cropName}</span>
          ))}
        </CardContent>
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
