import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./country";
import apiMiddleware from "./middlewares/api";

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
