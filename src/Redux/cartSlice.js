import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    value: 0,
  },
  reducers: {
    // below function are ACTION of reducers
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // state.items.pop();
      let a = current(state.items);
      let b = a.indexOf(action.payload);
      state.items.splice(b, 1);
      // state.items = state.items.filter(
      //   (item) => item.card.info.id !== action.payload
      // );
    },
    clearCart: (state, action) => {
      state.items = []; //[]
    },
    increment: (state, action) => {
      state.items.length = +1;
    },
    decrement: (state, action) => {
      state.items.length = -1;
    },
  },
});
export const { addItem, removeItem, clearCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
