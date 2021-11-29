import { configureStore } from "@reduxjs/toolkit";
import apiMiddleware from "./middlewares/api";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
