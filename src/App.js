import YearList from "./components/year-list";
import CountryList from "./components/country-list";
import HollidayCalender from "./components/holliday-calender";

function App() {
  return (
    <div className="container mb-3">
      <div className="row my-5">
        <div className="col-md-6">
          <YearList />
        </div>
        <div className="col-md-6">
          <CountryList />
        </div>
      </div>

      <HollidayCalender />
    </div>
  );
}

export default App;
