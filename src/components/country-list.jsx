import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries } from "../apis/calender";
import { loadCountries } from "../store/country";
import { onCountryChanged } from "../store/holliday";
import AppLoading from "./app-loading";

export default function CountryList() {
  //   const [countries, setCountries] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetchAllCountries().then((res) => {
  //       const countries = res.data.response.countries;
  //       setCountries(countries);
  //       setIsLoading(false);
  //       console.log(countries);
  //     });
  //   }, []);

  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const [currentCountry, setCurrentCountry] = useState(country.current);

  useEffect(() => {
    dispatch(loadCountries());
  }, []);

  const handleChangeCountry = (e) => {
    const country = e.target.value;
    setCurrentCountry(country);
    console.log("changed country: ", country);
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
