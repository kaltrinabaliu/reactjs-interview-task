import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import categoriesReducer from "./categories/categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
