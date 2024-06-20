import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./slice/orderSlice";

const rootReducer = {
  order: orderReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
