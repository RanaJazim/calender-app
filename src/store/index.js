import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./country";
import calenderReducer from "./calender";
import apiMiddleware from "./middlewares/api";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    holliday: calenderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
