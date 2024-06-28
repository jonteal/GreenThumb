import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { useGetProducts } from "@/services/products/productServiceHooks";

export const Products = () => {
  const { data: crops, isLoading } = useGetCrops();
  const { data: products } = useGetProducts();
  console.log("products: ", products);
  return (
    <div className="flex flex-row">
      <Card className="flex flex-col items-center rounded-md mx-3 w-1/4">
        <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
          Products
        </CardHeader>
        <CardContent className="flex flex-col items-center py-2">
          {crops?.map((crop) => (
            <span key={crop.cropId} className="font-bold">
              {crop.cropName}
            </span>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Packaging Options</CardHeader>
      </Card>
    </div>
  );
};
