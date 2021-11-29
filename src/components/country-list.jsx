import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries } from "../apis/calender";
import { loadCountries } from "../store/country";
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

  useEffect(() => {
    dispatch(loadCountries());
  }, []);

  return (
    <>
      {country.isLoading && <AppLoading />}
      {!country.isLoading && (
        <div className="form-group">
          <label>Select Country:</label>
          <select className="form-control">
            {country.list.map((ctry) => (
              <option
                value={ctry["iso-3166"]}
                key={ctry.uuid}
                selected={country.current === ctry["iso-3166"]}
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
