import { Input } from "@/components/ui/input";
import { useOrder } from "../../context/OrderContext";
import { Button } from "@/components/ui/button";

export const OrderDetails: React.FC = () => {
  const { state, dispatch } = useOrder();

  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch({ type: "REMOVE_PRODUCT", productId });
  };

  return (
    <div>
      <h2 className="font-bold">Order Details</h2>
      <ul>
        {state.products.map((product) => (
          <li
            className="flex flex-row items-center justify-between"
            key={product.id}
          >
            {product.cropName} - ${product.price} x{" "}
            <Input
              className="w-20"
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product.id, parseInt(e.target.value))
              }
            />{" "}
            = ${(product.price * product.quantity).toFixed(2)}
            <Button onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <h3 className="font-semibold">Total: ${state.totalPrice.toFixed(2)}</h3>
    </div>
  );
};
