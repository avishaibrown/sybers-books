import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findByAuthor, findByTitle, findByIsbn } from "../services/firestore";

const initialState = {
  loading: false,
  error: null,
  searchTerm: "",
  searchResults: [],
};

export const searchResults = createAsyncThunk(
  "books/searchResults",
  async (term, { getState }) => {
    try {
      let matchingAuthors = [];
      let matchingTitles = [];
      let matchingIsbns = [];

      //get all objects that match search term from server
      const authorRes = await findByAuthor(term);
      const titleRes = await findByTitle(term);
      const isbnRes = await findByIsbn(term);

      //grab all matching books
      matchingAuthors = authorRes.docs.map((doc) => doc.data());
      matchingTitles = titleRes.docs.map((doc) => doc.data());
      matchingIsbns = isbnRes.docs.map((doc) => doc.data());

      return {
        searchResults: [
          ...matchingAuthors,
          ...matchingTitles,
          ...matchingIsbns,
        ],
        searchTerm: term,
      };
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
      .addCase(searchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...action.payload.searchResults];
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = searchResultsSlice;
export default reducer;
