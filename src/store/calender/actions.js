import * as calender from "./index";
import * as apiActions from "../api";
import { API_KEY } from "../../utils/constants";

export const loadHollidays = () => (dispatch, getState) => {
  const { holliday, country } = getState();

  if (holliday.list.length > 0) return;

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(country.current, holliday.currentYear),
      onStart: calender.hollidaysRequested.type,
      onSuccess: calender.hollidaysReceived.type,
    })
  );
};

export const onYearChanged = () => (dispatch, getState) => {
  const { holliday, country } = getState();

  const index = holliday.fetchedYears.findIndex(
    (y) => y === holliday.currentYear
  );
  if (index !== -1) return;

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(country.current, holliday.currentYear),
      onStart: calender.hollidaysRequested.type,
      onSuccess: calender.hollidaysReceived.type,
    })
  );
};

export const onCountryChanged = (newCountry) => (dispatch, getState) => {
  const { holliday } = getState();

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(newCountry, holliday.currentYear),
      onStart: calender.hollidaysRequested.type,
      onSuccess: calender.countryChanged.type,
    })
  );
};

// UTILS
function getHollidayURL(currCountry, currYear) {
  return `/holidays?&api_key=${API_KEY}&country=${currCountry}&year=${currYear}`;
}
