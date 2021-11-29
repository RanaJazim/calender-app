import * as apiActions from "../api";
import { API_KEY } from "../../utils/constants";
import { countriesRequested, countriesReceived } from "./index";

export const loadCountries = () => (dispatch, getState) => {
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
