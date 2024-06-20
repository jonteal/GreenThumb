import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { list: [], total: 0 },
  reducers: {
    addToOrder(state, action) {
      const check = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (check !== -1) {
        state.list[check].quantity += action.payload.quantity;
      } else {
        state.list.push(action.payload);
      }

      state.total = state.list.reduce(
        (sum, item) => sum + +item?.price * item?.quantity,
        0
      );
    },
    // updateQuantity(state, action) {
    //   const check = state.list.findIndex(
    //     (book) => book.id === action.payload.id
    //   );
    //   if (check !== -1) {
    //     state.list[check].quantity = action.payload.quantity;
    //   }
    //   state.total = state.list.reduce(
    //     (sum, book) => sum + +book?.price * book?.quantity,
    //     0
    //   );
    // },
    // removeItem(state, action) {
    //   state.list = state.list.filter((book) => book.id !== action.payload.id);
    //   state.total = state.list.reduce(
    //     (sum, book) => sum + +book?.price * book?.quantity,
    //     0
    //   );
    // },
  },
});

const { actions, reducer } = orderSlice;

export const { addToOrder, updateQuantity, removeItem } = actions;

export default reducer;
