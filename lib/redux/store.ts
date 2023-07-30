import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import categoryReducer from "./features/categorySlice";
import favouriteReducer from "./features/favouriteSlice";
import { swaApi } from "../services/swaApi";

export const store = configureStore({
  reducer: {
    categoryReducer,
    favouriteReducer,
    [swaApi.reducerPath]: swaApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([swaApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
