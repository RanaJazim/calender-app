import { createSlice } from "@reduxjs/toolkit";
import * as apiActions from "../api";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const initialState = {
  list: [],
  isLoading: false,
  currentYear: currentYear,
  currentMonth: currentMonth,
  fetchedYears: [currentYear],
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
    currentDateChanged: (hollidays, actions) => {
      const year = actions.payload.year;
      if (hollidays.currentYear !== year) {
        hollidays.currentYear = year;
      }
      hollidays.currentMonth = actions.payload.month ?? hollidays.currentMonth;
    },
    countryChanged: (hollidays, actions) => {
      hollidays.list = actions.payload.response.holidays;
      hollidays.isLoading = false;
      hollidays.fetchedYears = [];
      hollidays.fetchedYears.push(hollidays.currentYear);
    },
  },
});

export const {
  hollidaysRequested,
  hollidaysReceived,
  currentDateChanged,
  countryChanged,
} = hollidaySlice.actions;
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

export const onCountryChanged = () => (dispatch, getState) => {
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
      onSuccess: countryChanged.type,
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
