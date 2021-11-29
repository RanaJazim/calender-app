import moment from "moment";
import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { fetchYearlyHollidays } from "./apis/calender";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const events = [{ title: "Today", start: new Date(), end: new Date() }];

function App() {
  // useEffect(() => {
  //   fetchYearlyHollidays().then((res) => {
  //     console.log(res.data.response.holidays);
  //   });
  // }, []);

  return (
    <div>
      <p>Calender App</p>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        onNavigate={(obj) => console.log("fired: ", obj)}
      />
    </div>
  );
}

export default App;
