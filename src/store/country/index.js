import { createSlice } from "@reduxjs/toolkit";
import * as apiActions from "../api";

const initialState = {
  list: [],
  isLoading: false,
  current: "PK",
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    countriesRequested: (countries, _) => {
      countries.isLoading = true;
    },
    countriesReceived: (countries, actions) => {
      countries.list = actions.payload.response.countries;
      countries.isLoading = false;
    },
    countryChanged: (countries, actions) => {
      if (countries.current !== actions.payload) {
        countries.current = actions.payload;
      }
    },
  },
});

export const { countriesRequested, countriesReceived } = countrySlice.actions;
export default countrySlice.reducer;
