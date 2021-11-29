import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { fetchAllCountries } from "./apis/calender";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CountryList from "./components/country-list";

const localizer = momentLocalizer(moment);
const events = [{ title: "Today", start: new Date(), end: new Date() }];

function App() {
  const [countries, setCountries] = useState();

  useEffect(() => {
    fetchAllCountries().then((res) => {
      const countries = res.data.response.countries;
      setCountries(countries);
      console.log(countries);
    });
  }, []);

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
            <label>Select Year:</label>
            <select className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <CountryList />
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
