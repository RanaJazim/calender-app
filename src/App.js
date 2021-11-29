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

  const handleDateNavigate = (date) => {
    const yearNo = date.getFullYear();
    const monthNo = date.getMonth() + 1;
    console.log("month navigate: ", monthNo, yearNo);
  };

  return (
    <div className="container mb-3">
      <div className="row my-5">
        <div className="col-md-6">
          <div className="form-group">
            <label for="sel1">Select Year:</label>
            <select className="form-control" id="sel1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="sel1">Select Country:</label>
            <select className="form-control" id="sel1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month"]}
        onNavigate={handleDateNavigate}
        drilldownView="agenda"
      />
    </div>
  );
}

export default App;
