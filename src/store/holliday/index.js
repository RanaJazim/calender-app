import { createSlice } from "@reduxjs/toolkit";
import * as apiActions from "../api";

const initialState = {
  list: [],
  isLoading: false,
  currentYear: new Date().getFullYear(),
  fetchedYears: [new Date().getFullYear()],
};

const hollidaySlice = createSlice({
  name: "holliday",
  initialState,
  reducers: {
    hollidaysRequested: (hollidays, _) => {
      hollidays.isLoading = true;
    },
    hollidaysReceived: (hollidays, actions) => {
      const hollidaysPayload = actions.payload.response.holidays;
      hollidays.list = [
        ...hollidays.list,
        ...getHollidayEvents(hollidaysPayload),
      ];
      hollidays.isLoading = false;
      hollidays.fetchedYears.push(hollidays.currentYear);
    },
    currentYearChanged: (hollidays, actions) => {
      hollidays.currentYear = actions.payload;
    },
  },
});

export const { hollidaysRequested, hollidaysReceived, currentYearChanged } =
  hollidaySlice.actions;
export default hollidaySlice.reducer;

// ACTIONS
export const loadHollidays = () => (dispatch, getState) => {
  const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";
  const { holliday, country } = getState();

  if (holliday.list.length > 0) return;

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(API_KEY, country.current, holliday.currentYear),
      onStart: hollidaysRequested.type,
      onSuccess: hollidaysReceived.type,
    })
  );
};

export const onYearChanged = () => (dispatch, getState) => {
  const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";
  const { holliday, country } = getState();

  const index = holliday.fetchedYears.findIndex(
    (y) => y === holliday.currentYear
  );
  if (index !== -1) return;

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(API_KEY, country.current, holliday.currentYear),
      onStart: hollidaysRequested.type,
      onSuccess: hollidaysReceived.type,
    })
  );
};

// UTILS
function getHollidayEvents(hollidays) {
  return hollidays.map((h) => ({
    title: h.name,
    start: h.date.iso,
    end: h.date.iso,
  }));
}

function getHollidayURL(key, currCountry, currYear) {
  return `/holidays?&api_key=${key}&country=${currCountry}&year=${currYear}`;
}
