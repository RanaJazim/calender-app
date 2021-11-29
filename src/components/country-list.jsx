import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "./app-loading";
import { loadCountries } from "../store/country";
import { onCountryChanged } from "../store/calender";

export default function CountryList() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [currentCountry, setCurrentCountry] = useState(country.current);

  useEffect(() => {
    dispatch(loadCountries());
  }, []);

  const handleChangeCountry = (e) => {
    const country = e.target.value;
    setCurrentCountry(country);
    dispatch(onCountryChanged(country));
  };

  return (
    <>
      {country.isLoading && <AppLoading />}
      {!country.isLoading && (
        <div className="form-group">
          <label>Select Country:</label>
          <select className="form-control" onChange={handleChangeCountry}>
            {country.list.map((ctry) => (
              <option
                value={ctry["iso-3166"]}
                key={ctry.uuid}
                selected={currentCountry === ctry["iso-3166"]}
              >
                {ctry.country_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
