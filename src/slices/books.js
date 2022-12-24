import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FirestoreService from "../services/firestore";

const initialState = {
  loading: false,
  error: null,
  books: [],
};

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (term, { getState }) => {
    try {
      let newBooks = [];

      //get all objectIDs that match search term from server
      const res = await FirestoreService.findByTitle(term);
      console.log('res', res);
      
      // let searchResultObjectIDs = res.data.objectIDs;

      // do {
      //   //populate objectIDs array configurable range of unique objectIDs from server
      //   let objectIDs;
      //   if (searchResultObjectIDs.length >= 10) {
      //     objectIDs = searchResultObjectIDs.splice(0, 10);
      //   } else {
      //     objectIDs = searchResultObjectIDs;
      //   }

      //   //retrieve object for each objectID from server if it contains data
      //   for (let objectID of objectIDs) {
      //     await MetService.get(objectID)
      //       .then((response) => {
      //         newBooks.push(response.data);
      //       })
      //       .catch((error) => {
      //         console.error(error.message);
      //       });
      //   }
      // } while (!!searchResultObjectIDs && newBooks.length < 10);

      return newBooks;
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
