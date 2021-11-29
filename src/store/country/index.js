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

const { countriesRequested, countriesReceived, countryChanged } =
  countrySlice.actions;
export default countrySlice.reducer;

// ACTIONS
export const loadCountries = () => (dispatch, getState) => {
  const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";
  const { country } = getState();

  if (country.list.length > 0) return;

  dispatch(
    apiActions.apiCallBegan({
      url: `/countries?&api_key=${API_KEY}`,
      onStart: countriesRequested.type,
      onSuccess: countriesReceived.type,
    })
  );
};
