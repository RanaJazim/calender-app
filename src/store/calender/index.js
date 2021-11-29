import { createSlice } from "@reduxjs/toolkit";

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

const calenderSlice = createSlice({
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
      hollidays.list = getHollidayEvents(actions.payload.response.holidays);
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
} = calenderSlice.actions;
export default calenderSlice.reducer;

// UTILS
function getHollidayEvents(hollidays) {
  return hollidays.map((h) => ({
    title: h.name,
    start: h.date.iso,
    end: h.date.iso,
  }));
}
