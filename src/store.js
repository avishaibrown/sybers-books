import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/books";

const store = configureStore({
  reducer: booksReducer,
  devTools: true,
});

export default store;
