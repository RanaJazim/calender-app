import * as apiActions from "../api";

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

export const onCountryChanged = (newCountry) => (dispatch, getState) => {
  const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";
  const { holliday } = getState();

  dispatch(
    apiActions.apiCallBegan({
      url: getHollidayURL(API_KEY, newCountry, holliday.currentYear),
      onStart: hollidaysRequested.type,
      onSuccess: countryChanged.type,
    })
  );
};

// UTILS
function getHollidayURL(key, currCountry, currYear) {
  return `/holidays?&api_key=${key}&country=${currCountry}&year=${currYear}`;
}
