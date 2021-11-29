import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./country";
import hollidayReducer from "./holliday";
import apiMiddleware from "./middlewares/api";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    holliday: hollidayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});
