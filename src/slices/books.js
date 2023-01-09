import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findByCategory } from "../services/firestore";

const initialState = {
  loading: false,
  error: null,
  books: [],
};

//TODO: Add Cart Context + UI

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (term, { getState }) => {
    try {
      let matchingBooks = [];

      //get all objects that match search term from server
      const res = await findByCategory(term);

      //grab all matching books
      matchingBooks = res.docs.map((doc) => doc.data());

      return matchingBooks;
    } catch (error) {
      return error.message;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...action.payload];
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = booksSlice;
export default reducer;
