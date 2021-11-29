import { useSelector, useDispatch } from "react-redux";
import { currentDateChanged, onYearChanged } from "../store/calender";

export default function YearList() {
  const years = [2017, 2018, 2019, 2020, 2021, 2022];
  const dispatch = useDispatch();
  const holliday = useSelector((state) => state.holliday);

  const handleYearChanged = (e) => {
    const year = +e.target.value;
    dispatch(currentDateChanged({ year }));
  };

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
