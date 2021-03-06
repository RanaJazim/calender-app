import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "./app-loading";
import * as countryActions from "../store/country/actions";
import * as calenderActions from "../store/calender/actions";

export default function CountryList() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [currentCountry, setCurrentCountry] = useState(country.current);

  useEffect(() => {
    dispatch(countryActions.loadCountries());
  }, []);

  const handleChangeCountry = (e) => {
    const country = e.target.value;
    setCurrentCountry(country);
    dispatch(calenderActions.onCountryChanged(country));
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
