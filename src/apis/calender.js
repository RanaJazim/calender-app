import axios from "axios";

export function fetchYearlyHollidays() {
  const url =
    "https://calendarific.com/api/v2/holidays?&api_key=43f7a270aab91991f5eadc812d397f3ea9def7d7&country=US&year=2019";

  return axios.get(url);
}
