import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findByCategory } from "../services/firestore";

const initialState = {
  loading: false,
  error: null,
  searchResults: [],
};

export const searchResults = createAsyncThunk(
  "books/searchResults",
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

const searchResultsSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchResults.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...action.payload];
      })
      .addCase(searchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = searchResultsSlice;
export default reducer;
