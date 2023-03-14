import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addBookStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload;
    },
    addBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    addBookReset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const { addBookStart, addBookSuccess, addBookFailure, addBookReset } =
  adminSlice.actions;

export default adminSlice.reducer;
