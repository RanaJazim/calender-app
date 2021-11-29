import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import AppLoading from "./app-loading";
import * as calenderActions from "../store/calender/actions";
import { onYearChanged, currentDateChanged } from "../store/calender";

const localizer = momentLocalizer(moment);

export default function HollidayCalender() {
  const dispatch = useDispatch();
  const holliday = useSelector((state) => state.holliday);
  const currentDate = new Date(
    `${holliday.currentYear}/${holliday.currentMonth}/01`
  );

  useEffect(() => {
    dispatch(calenderActions.loadHollidays());
  }, []);

  useEffect(() => {
    dispatch(calenderActions.onYearChanged());
  }, [holliday.currentYear]);

  const handleDateNavigate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    dispatch(currentDateChanged({ year, month }));
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
      date={currentDate}
    />
  );
}
