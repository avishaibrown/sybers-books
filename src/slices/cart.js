import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.cart.every((book) => book.Serial !== action.payload.Serial)) {
        state.cart.push(action.payload);
        state.subtotal += Number(action.payload.price1);
        state.total += Number(action.payload.price1);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.Serial !== action.payload.Serial
      );
      state.subtotal -= Number(action.payload.price1);
      state.total -= Number(action.payload.price1);
    },
    updateShippingCost: (state, action) => {
      state.total -= state.shipping;
      state.shipping = action.payload;
      state.total += state.shipping;
    },
  },
});

export const { addToCart, removeFromCart, updateShippingCost } =
  cartSlice.actions;

export default cartSlice.reducer;
