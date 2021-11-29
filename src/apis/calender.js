import axios from "axios";

// for prod this should be protected something like in env variable
const API_KEY = "43f7a270aab91991f5eadc812d397f3ea9def7d7";

export function fetchYearlyHollidays() {
  const url = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=US&year=2019`;

  return axios.get(url);
}

export function fetchAllCountries() {
  const url = `https://calendarific.com/api/v2/countries?&api_key=${API_KEY}`;

  return axios.get(url);
}
