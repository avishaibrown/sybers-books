import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import SearchResultsReducer from "./slices/searchResults";
import CartReducer from "./slices/cart";
import AuthReducer from "./slices/auth";
import AdminReducer from "./slices/admin";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["searchResults", "cart", "auth"],
};

const reducers = combineReducers({
  searchResults: SearchResultsReducer,
  cart: CartReducer,
  auth: AuthReducer,
  admin: AdminReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  //ignore all action types dispatched by Redux Persist to suppress the "A non-serializable value was detected in the state" error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
