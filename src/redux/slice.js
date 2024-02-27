import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const grocerySlice = createSlice({
  name: "groceryList",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: v4(),
        text: action.payload,
        isBought: false,
      };
      state.push(newItem);
    },
    toggleIsBought: (state, action) => {
      const groceryItem = state.find((item) => item.id === action.payload);
      if (groceryItem) {
        groceryItem.isBought = !groceryItem.isBought;
      }
    },
    deleteItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addItem, toggleIsBought, deleteItem } = grocerySlice.actions;
export default grocerySlice.reducer;
