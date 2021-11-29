import { createSlice } from "@reduxjs/toolkit";
import * as apiActions from "../api";

const initialState = {
  list: [],
  isLoading: false,
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
      hollidays.list = hollidaysPayload.map((h) => ({
        title: h.name,
        start: h.date.iso,
        end: h.date.iso,
      }));
      hollidays.isLoading = false;
    },
  },
});

const { hollidaysRequested, hollidaysReceived } = hollidaySlice.actions;
export default hollidaySlice.reducer;

// ACTIONS
export const loadHollidays = () => (dispatch, getState) => {
  const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";
  const { holliday } = getState();

  if (holliday.list.length > 0) return;

  dispatch(
    apiActions.apiCallBegan({
      url: `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=PK&year=2021`,
      onStart: hollidaysRequested.type,
      onSuccess: hollidaysReceived.type,
    })
  );
};
