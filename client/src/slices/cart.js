import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateBookStatus } from "../firebase/firestore";
import { SUCCESS } from "../utils/constants";

const initialState = {
  cart: [],
  cartLoading: false,
  cartError: false,
  bookAddedToCart: "",
  bookRemovedFromCart: "",
  subtotal: "0.00",
  checkoutLoading: false,
  checkoutError: false,
};

export const markBooksAsSold = createAsyncThunk(
  "books/updateBookStatus",
  async ({ bookIds, buyerEmail, orderNumber }, { getState }) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await updateBookStatus(
            bookIds,
            buyerEmail,
            orderNumber,
            SUCCESS.soldStatus
          );
          resolve();
        } catch (error) {
          reject(error.message);
        }
      }, 5000);
    });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cart.every((book) => book.SERIAL !== action.payload.SERIAL)) {
        state.cart.push(action.payload);
        state.subtotal = (
          Number(state.subtotal) + Number(action.payload.PRICE)
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
    checkoutStart: (state) => {
      state.checkoutLoading = true;
      state.checkoutError = false;
    },
    checkoutReset: (state) => {
      state.checkoutLoading = false;
      state.checkoutError = false;
    },
    checkoutFailure: (state, action) => {
      state.checkoutLoading = false;
      state.checkoutError = action.payload;
    },
    resetCartState: (state) => {
      Object.assign(state, initialState);
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
        state.cartError = false;
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
  checkoutStart,
  checkoutReset,
  checkoutFailure,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
