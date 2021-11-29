import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchYearlyHollidays } from "../apis/calender";
import AppLoading from "./app-loading";

const localizer = momentLocalizer(moment);
// const events = [{ title: "Today", start: new Date(), end: new Date() }];

export default function HollidayCalender() {
  const [hollidayEvents, setHollidayEvents] = useState();

  useEffect(() => {
    fetchYearlyHollidays().then((res) => {
      const hollidays = res.data.response.holidays;

      const newHollidays = hollidays.map((h) => ({
        title: h.name,
        start: h.date.iso,
        end: h.date.iso,
      }));

      setHollidayEvents(newHollidays);
    });
  }, []);

  const handleDateNavigate = (date) => {
    const yearNo = date.getFullYear();
    const monthNo = date.getMonth() + 1;
    console.log("month navigate: ", monthNo, yearNo);
  };

  if (!hollidayEvents) {
    return <AppLoading />;
  }

  return (
    <Calendar
      localizer={localizer}
      events={hollidayEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      views={["month"]}
      onNavigate={handleDateNavigate}
      drilldownView="agenda"
    />
  );
}
