import * as apiActions from "../api";
import { countriesRequested, countriesReceived } from "./index";

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
