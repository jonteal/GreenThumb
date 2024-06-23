// OrderContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface Product {
  id: string;
  cropName: string;
  price: number;
  quantity: number;
  packaging: string;
}

interface OrderState {
  products: Product[];
  totalPrice: number;
}

type Action =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "REMOVE_PRODUCT"; productId: string };

const initialState: OrderState = {
  products: [],
  totalPrice: 0,
};

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const orderReducer = (state: OrderState, action: Action): OrderState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const existingProduct = state.products.find(
        (p) => p.id === action.product.id
      );
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((p) =>
            p.id === action.product.id
              ? { ...p, quantity: p.quantity + action.product.quantity }
              : p
          ),
          totalPrice:
            state.totalPrice + action.product.price * action.product.quantity,
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.product],
          totalPrice:
            state.totalPrice + action.product.price * action.product.quantity,
        };
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.productId ? { ...p, quantity: action.quantity } : p
        ),
        totalPrice: state.products.reduce(
          (total, product) =>
            total +
            (product.id === action.productId
              ? product.price * action.quantity
              : product.price * product.quantity),
          0
        ),
      };
    case "REMOVE_PRODUCT":
      const filteredProducts = state.products.filter(
        (p) => p.id !== action.productId
      );
      const removedProduct = state.products.find(
        (p) => p.id === action.productId
      );
      return {
        ...state,
        products: filteredProducts,
        totalPrice:
          state.totalPrice -
          (removedProduct ? removedProduct.price * removedProduct.quantity : 0),
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
