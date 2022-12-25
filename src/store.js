import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/books";

const reducer = {
  books: booksReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
