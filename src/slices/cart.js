import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SHIPPING_OPTIONS } from "../utils/constants";
import { updateBookStatus } from "../services/firestore";

export const markBooksAsSold = createAsyncThunk(
  "books/updateBookStatus",
  async (bookIds, { getState }) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await updateBookStatus(bookIds, "Sold");
          resolve({ transactionComplete: true });
        } catch (error) {
          reject(error.message);
        }
      }, 5000);
    });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartLoading: false,
    cartError: false,
    bookAddedToCart: "",
    bookRemovedFromCart: "",
    subtotal: "0.00",
    shipping: "0.00",
    shippingType: "",
    total: "0.00",
    transactionComplete: false,
  },
  reducers: {
    addToCart: (state, action) => {
      if (state.cart.every((book) => book.SERIAL !== action.payload.SERIAL)) {
        state.cart.push(action.payload);
        state.subtotal = (
          Number(state.subtotal) + Number(action.payload.PRICE)
        ).toFixed(2);
        state.total = (
          Number(state.total) + Number(action.payload.PRICE)
        ).toFixed(2);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.SERIAL !== action.payload.SERIAL
      );
      state.subtotal = (
        Number(state.subtotal) - Number(action.payload.PRICE)
      ).toFixed(2);
      state.total = (
        Number(state.total) - Number(action.payload.PRICE)
      ).toFixed(2);
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
        state.bookAddedToCart = action.payload.book.TITLE;
      } else if (action.payload.action === "remove") {
        state.bookRemovedFromCart = action.payload.book.TITLE;
      }
    },
    cartActionFailure: (state, action) => {
      state.cartLoading = false;
      state.cartError = action.payload;
    },
    cartActionReset: (state) => {
      state.cartLoading = false;
      state.cartError = false;
      state.bookAddedToCart = "";
      state.bookRemovedFromCart = "";
    },
    clearCart: (state) => {
      state.cart = [];
      state.subtotal = "0.00";
      state.shipping = "0.00";
      state.shippingType = "";
      state.total = "0.00";
    },
    updateShippingCost: (state, action) => {
      //remove the previous shipping cost if present
      state.total = (Number(state.total) - Number(state.shipping)).toFixed(2);
      state.shipping = action.payload.toFixed(2);
      state.total = (Number(state.subtotal) + Number(state.shipping)).toFixed(
        2
      );
      const matchingShippingType = SHIPPING_OPTIONS.find(
        (type) => Number(type.price).toFixed(2) === state.shipping
      );

      if (matchingShippingType) {
        state.shippingType = matchingShippingType.id;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markBooksAsSold.pending, (state) => {
        state.cartLoading = true;
        state.cartError = false;
      })
      .addCase(markBooksAsSold.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.transactionComplete = action.payload.transactionComplete;
      })
      .addCase(markBooksAsSold.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
  clearCart,
  updateShippingCost,
} = cartSlice.actions;

export default cartSlice.reducer;
