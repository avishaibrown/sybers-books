import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.every((book) => book.Serial !== action.payload.Serial) &&
        state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.Serial !== action.payload.Serial
      );
    },
  },
});

export const selectCart = (state) => state.cart;
export const cartItemsCount = (state) => state.cart.length;

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
