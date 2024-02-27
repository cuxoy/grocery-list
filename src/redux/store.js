import { configureStore } from "@reduxjs/toolkit";
import grocerySlice from "./slice";

export const store = configureStore({
  reducer: { groceryList: grocerySlice },
});
