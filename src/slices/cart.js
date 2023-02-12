import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartLoading: false,
    cartError: false,
    bookAddedToCart: "",
    bookRemovedFromCart: "",
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
    cartActionStart: (state) => {
      state.cartLoading = true;
      state.cartError = false;
      state.bookAddedToCart = "";
      state.bookRemovedFromCart = "";
    },
    cartActionSuccess: (state, action) => {
      state.cartLoading = false;
      if (action.payload.action === "add") {
        state.bookAddedToCart = action.payload.book.title1;
      } else if (action.payload.action === "remove") {
        state.bookRemovedFromCart = action.payload.book.title1;
      }
    },
    cartActionFailure: (state, action) => {
      state.cartLoading = false;
      state.cartError = action.payload;
    },
    updateShippingCost: (state, action) => {
      //remove the previous shipping cost if present
      state.total -= state.shipping;
      state.shipping = action.payload;
      state.total += state.shipping;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  updateShippingCost,
} = cartSlice.actions;

export default cartSlice.reducer;
