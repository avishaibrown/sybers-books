import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  findByAuthor,
  findByTitle,
  findByIsbn,
  findByCategory,
} from "../services/firestore";
import { SHOP } from "../utils/constants";

const initialState = {
  loading: false,
  error: null,
  searchTerm: "",
  searchResults: [],
  sortedResults: [],
};

export const searchResults = createAsyncThunk(
  "books/searchResults",
  async (term, { getState }) => {
    try {
      let matchingAuthors = [];
      let matchingTitles = [];
      let matchingIsbns = [];

      //get all book objects that match search term from server
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

export const searchForCategory = createAsyncThunk(
  "books/searchForCategory",
  async (category, { getState }) => {
    try {
      let matchingBooks = [];

      //get all book objects that match category from server
      const categoryRes = await findByCategory(category);

      //grab all matching books
      matchingBooks = categoryRes.docs.map((doc) => doc.data());

      return {
        searchResults: [...matchingBooks],
        searchTerm: category,
      };
    } catch (error) {
      return error.message;
    }
  }
);

const searchResultsSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    sortResults: (state, action) => {
      state.sortedResults = state.searchResults.sort((a, b) =>
        action.payload === SHOP.sortByMenuItems[1].value
          ? b.price1 - a.price1
          : a.price1 - b.price1
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...action.payload.searchResults];
        state.sortedResults = [...action.payload.searchResults];
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchForCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchForCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...action.payload.searchResults];
        state.sortedResults = [...action.payload.searchResults];
        state.searchTerm = action.payload.searchTerm;
      })
      .addCase(searchForCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { sortResults } = searchResultsSlice.actions;

const { reducer } = searchResultsSlice;
export default reducer;
