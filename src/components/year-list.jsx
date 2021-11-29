import { useSelector, useDispatch } from "react-redux";
import { currentDateChanged } from "../store/calender";

export default function YearList() {
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const dispatch = useDispatch();
  const holliday = useSelector((state) => state.holliday);

  const handleYearChanged = (e) => {
    const year = +e.target.value;
    dispatch(currentDateChanged({ year }));
  };

  if (holliday.currentYear > years[years.length - 1]) {
    return (
      <div className="alert alert-info">
        You've cross from 2023 that's not the error because I've used limited
        years from 2017-2023.
      </div>
    );
  }

  return (
    <div className="form-group">
      <label>Select Year:</label>
      <select className="form-control" onChange={handleYearChanged}>
        {years.map((year) => (
          <option
            key={year}
            value={year}
            selected={year === holliday.currentYear}
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
