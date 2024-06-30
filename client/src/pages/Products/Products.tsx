import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetCrops } from "@/services/crop/cropServiceHooks";
import { useGetProducts } from "@/services/products/productServiceHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackagesTable } from "./PackagesTable/PackagesTable";

export const Products = () => {
  const { data: crops } = useGetCrops();
  const { data: products } = useGetProducts();
  const [selectedItem, setSelectedItem] = useState("");

  console.log("products: ", products);

  useEffect(() => {
    if (crops && crops.length > 0) {
      setSelectedItem(crops[0].cropId);
    }
  }, [crops]);

  const selectedProductData = products?.find(
    (product) => product.productId === selectedItem
  );

  console.log("selectedProductData: ", selectedProductData);

  return (
    <div className="flex flex-col items-start w-full">
      <Button asChild variant="outline" className="bg-green-600 text-slate-50">
        <Link to="/products/add">Add Product</Link>
      </Button>
      <div className="flex flex-row w-full">
        <Card className="flex flex-col items-center rounded-md w-1/4 mt-3">
          <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
            Products
          </CardHeader>
          <CardContent className="flex flex-col items-center py-2">
            {products?.map((product) => (
              <span
                key={product.productId}
                className={`font-bold hover:underline ${
                  selectedItem === product.productId ? "active" : ""
                }`}
                onClick={() => setSelectedItem(product.productId)}
              >
                {product.productName}
              </span>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col w-1/2 ml-10">
          <div
            className={`border ${
              selectedProductData?.available ? "bg-green-600" : "bg-red-400"
            } flex justify-center items-center text-slate-50 rounded-md font-semibold py-2`}
          >
            {selectedProductData?.available ? "Available" : "Not Available"}
          </div>
          <Card className="mt-3 w-full">
            <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
              Packaging Options
            </CardHeader>
            <CardContent>
              <PackagesTable packages={selectedProductData?.packages} />
            </CardContent>
          </Card>
          <Card className="mt-3 w-full">
            <CardHeader className="text-md font-semibold flex flex-row justify-center py-2 text-neutral-50 w-full bg-neutral-600 rounded-t">
              Product Info
            </CardHeader>
            <CardContent>
              <h4 className="font-bold text-sm mt-3">Unit Value</h4>
              <p>
                ${selectedProductData?.unitValue.value} /{" "}
                {selectedProductData?.unitValue.unit}
              </p>
              <h4 className="font-bold text-sm mt-3">Storage Buffer</h4>
              <p>{selectedProductData?.storageBuffer} Days</p>
              <h4 className="font-bold text-sm mt-3">Yield Buffer</h4>
              <p>{selectedProductData?.yieldBuffer} %</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
