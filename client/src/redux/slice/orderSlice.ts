import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderState = {
  items: OrderItem[];
  totalQuantity: number;
  totalPrice: number;
};

const initialState: OrderState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items: OrderItem[]) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return { totalQuantity, totalPrice };
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<OrderItem, "id">>) => {
      const newItem = { ...action.payload, id: Date.now().toString() };
      state.items.push(newItem);
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
    },
    updateItem: (state, action: PayloadAction<OrderItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        const totals = calculateTotals(state.items);
        state.totalQuantity = totals.totalQuantity;
        state.totalPrice = totals.totalPrice;
      }
    },
    resetOrder: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateItem, resetOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
