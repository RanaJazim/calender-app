import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchYearlyHollidays } from "../apis/calender";
import { loadHollidays, onYearChanged } from "../store/holliday";
import AppLoading from "./app-loading";

const localizer = momentLocalizer(moment);
// const events = [{ title: "Today", start: new Date(), end: new Date() }];

export default function HollidayCalender() {
  //   const [hollidayEvents, setHollidayEvents] = useState();

  //   useEffect(() => {
  //     fetchYearlyHollidays().then((res) => {
  //       const hollidays = res.data.response.holidays;

  //       const newHollidays = hollidays.map((h) => ({
  //         title: h.name,
  //         start: h.date.iso,
  //         end: h.date.iso,
  //       }));

  //       setHollidayEvents(newHollidays);
  //     });
  //   }, []);

  const dispatch = useDispatch();
  const holliday = useSelector((state) => state.holliday);

  useEffect(() => {
    dispatch(loadHollidays());
  }, []);

  useEffect(() => {
    dispatch(onYearChanged());
  }, [holliday.currentYear]);

  const handleDateNavigate = (date) => {
    const yearNo = date.getFullYear();
    const monthNo = date.getMonth() + 1;
    console.log("month navigate: ", monthNo, yearNo);
  };

  if (holliday.isLoading) {
    return <AppLoading />;
  }

  return (
    <Calendar
      localizer={localizer}
      events={holliday.list}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      views={["month"]}
      onNavigate={handleDateNavigate}
      drilldownView="agenda"
    />
  );
}
