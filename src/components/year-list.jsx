import { useSelector, useDispatch } from "react-redux";

export default function YearList() {
  const years = [2017, 2018, 2019, 2020, 2021, 2022];
  const dispatch = useDispatch();
  const holliday = useSelector((state) => state.holliday);

  return (
    <div className="form-group">
      <label>Select Year:</label>
      <select className="form-control">
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
