import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { toast } from "@/components/ui/use-toast";
import { useUpdateCrop } from "@/services/crop/cropServiceHooks";
import { CropType } from "@/services/crop/types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddSchedule = () => {
  const navigate = useNavigate();
  const form = useForm<CropType>();
  const addCropSchedule = useUpdateCrop({
    onSuccess: () => {
      toast({
        title: "Crop schedule added successfully",
        variant: "success",
      } as any);
      navigate("/crops");
    },
  });

  const handleAdd = (data: CropType) => {
    addCropSchedule.mutate(data);
  };
  return (
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
              render={({ field }) => (
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
              )}
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
  );
};
