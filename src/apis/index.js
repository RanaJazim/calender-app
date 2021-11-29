import axios from "axios";

export const api = axios.create({
  baseURL: "https://calendarific.com/api/v2",
});
